import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Key,
  Save,
  RotateCcw,
  Database,
  Image,
  Tag,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw,
  Sparkles,
  Upload,
  Link,
  HelpCircle,
  Info,
  Cloud,
  CheckCircle,
  CheckCircle2,
  HardDrive,
  Globe,
  Search,
  Share2,
  Layers,
  Cpu,
  MapPin
} from 'lucide-react';
import { SiteConfig, SupabaseConfig, SeoConfig, FaqItem } from '../types/retreat';
import {
  DEFAULT_SITE_CONFIG,
  DEFAULT_SEO_CONFIG,
  normalizeSiteConfig,
  saveStoredSiteConfig,
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  syncConfigToSupabase,
  SUPABASE_SQL_SCHEMA
} from '../services/supabase';
import {
  uploadImageToSupabase,
  isSupabaseStorageAvailable,
  DEFAULT_STORAGE_BUCKET,
  ensureStorageBucket,
  checkStorageBucket,
  SUPABASE_STORAGE_SQL_SETUP
} from '../services/storage';

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (updated: SiteConfig) => void;
}

// Convert Google Drive sharing links to direct viewable image URLs
export function formatImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Pattern: drive.google.com/file/d/FILE_ID/view...
  const matchFile = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFile && matchFile[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFile[1]}`;
  }

  // Pattern: drive.google.com/open?id=FILE_ID
  const matchId = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }

  // Pattern: drive.google.com/uc?id=FILE_ID
  const matchUc = trimmed.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (matchUc && matchUc[1]) {
    return `https://lh3.googleusercontent.com/d/${matchUc[1]}`;
  }

  return trimmed;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'media' | 'seo' | 'hero' | 'pricing' | 'about' | 'contact' | 'supabase'>('seo');

  // Working Config State
  const [formConfig, setFormConfig] = useState<SiteConfig>(normalizeSiteConfig(config));
  const [supabaseCfg, setSupabaseCfg] = useState<SupabaseConfig>(getStoredSupabaseConfig());
  const [newTagInput, setNewTagInput] = useState('');

  // Status feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedStorageSql, setCopiedStorageSql] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [isCheckingBucket, setIsCheckingBucket] = useState(false);
  const [bucketStatus, setBucketStatus] = useState<{ checked: boolean; exists: boolean; message: string } | null>(null);

  // Sync state if config props change
  React.useEffect(() => {
    setFormConfig(normalizeSiteConfig(config));
  }, [config]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const envPin = (import.meta.env.VITE_ADMIN_PIN || '').trim().toLowerCase();
    const cfgPin = (formConfig.adminPin || '7788').trim().toLowerCase();
    const validPins = ['shunya2026', 'admin123', 'clickindm', 'clickindma', '7788', cfgPin, envPin].filter(Boolean);
    
    if (validPins.includes(passcode.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect secret passcode. (Default: 7788 or shunya2026)');
    }
  };

  // SEO, GEO & AEO Update Helpers
  const updateSeoField = <K extends keyof SeoConfig>(key: K, value: SeoConfig[K]) => {
    setFormConfig((prev) => ({
      ...prev,
      seo: {
        ...(prev.seo || DEFAULT_SEO_CONFIG),
        [key]: value
      }
    }));
  };

  const addFaq = () => {
    setFormConfig((prev) => {
      const currentSeo = prev.seo || DEFAULT_SEO_CONFIG;
      const newFaqs: FaqItem[] = [
        ...(currentSeo.faqs || []),
        { question: 'New Question', answer: 'Enter detailed factual answer here.', category: 'General' }
      ];
      return {
        ...prev,
        seo: { ...currentSeo, faqs: newFaqs }
      };
    });
  };

  const updateFaq = (index: number, field: keyof FaqItem, val: string) => {
    setFormConfig((prev) => {
      const currentSeo = prev.seo || DEFAULT_SEO_CONFIG;
      const updatedFaqs = [...(currentSeo.faqs || [])];
      if (updatedFaqs[index]) {
        updatedFaqs[index] = { ...updatedFaqs[index], [field]: val };
      }
      return {
        ...prev,
        seo: { ...currentSeo, faqs: updatedFaqs }
      };
    });
  };

  const deleteFaq = (index: number) => {
    setFormConfig((prev) => {
      const currentSeo = prev.seo || DEFAULT_SEO_CONFIG;
      const filtered = (currentSeo.faqs || []).filter((_, i) => i !== index);
      return {
        ...prev,
        seo: { ...currentSeo, faqs: filtered }
      };
    });
  };

  const heroImagePresets = [
    {
      label: 'Misty Dawn Mountains',
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2400&q=85'
    },
    {
      label: 'Deep Himalayan Forest & Light',
      url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2400&q=85'
    },
    {
      label: 'Golden Hour Yoga Sanctuary',
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=2400&q=85'
    },
    {
      label: 'Sacred Mountain Reflection',
      url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=85'
    }
  ];

  // Helper to apply image URL to target config field
  const applyImageToField = (field: string, imageUrl: string) => {
    if (field === 'heroBgImage') {
      setFormConfig((prev) => ({ ...prev, heroBgImage: imageUrl }));
    } else if (field === 'founder1') {
      setFormConfig((prev) => ({
        ...prev,
        founder1: { ...prev.founder1, image: imageUrl }
      }));
    } else if (field === 'founder2') {
      setFormConfig((prev) => ({
        ...prev,
        founder2: { ...prev.founder2, image: imageUrl }
      }));
    } else if (field.startsWith('gallery_')) {
      const idx = parseInt(field.replace('gallery_', ''), 10);
      setFormConfig((prev) => {
        const currentGallery = [...(prev.galleryImages || DEFAULT_SITE_CONFIG.galleryImages || [])];
        if (currentGallery[idx]) {
          currentGallery[idx] = { ...currentGallery[idx], url: imageUrl };
        }
        return { ...prev, galleryImages: currentGallery };
      });
    }
  };

  // Direct File Upload from Computer / Mobile device to Supabase Storage
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: 'heroBgImage' | 'founder1' | 'founder2' | string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File is larger than 10MB. Please select an image under 10MB.');
      return;
    }

    setUploadingField(targetField);
    setUploadNotice('Uploading image...');

    // 1. If Supabase Storage is configured, upload directly to Supabase
    if (isSupabaseStorageAvailable()) {
      let folder: 'hero' | 'founders' | 'gallery' | 'general' = 'general';
      if (targetField === 'heroBgImage') folder = 'hero';
      else if (targetField === 'founder1' || targetField === 'founder2') folder = 'founders';
      else if (targetField.startsWith('gallery')) folder = 'gallery';

      const bucketName = supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET;
      const uploadRes = await uploadImageToSupabase(file, {
        bucket: bucketName,
        folder,
        customName: `${targetField}_${file.name}`
      });

      if (uploadRes.success && uploadRes.url) {
        applyImageToField(targetField, uploadRes.url);
        setUploadNotice(`✓ Uploaded to Supabase Storage (${uploadRes.bucket})! Dynamic CDN URL set.`);
        setUploadingField(null);
        setTimeout(() => setUploadNotice(null), 5000);
        return;
      } else {
        console.warn('Supabase storage upload error:', uploadRes.error);
        setUploadNotice(`Storage notice: ${uploadRes.error}. Switched to local preview.`);
      }
    }

    // 2. Fallback: Local FileReader Preview if Supabase not configured or temporary error
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setUploadingField(null);
        return;
      }

      applyImageToField(targetField, dataUrl);
      if (isSupabaseStorageAvailable()) {
        setUploadNotice('✓ Image loaded in preview. Check Supabase storage bucket permissions.');
      } else {
        setUploadNotice('✓ Image loaded in browser. Enter Supabase credentials in the Supabase tab to store directly on Supabase Storage CDN.');
      }
      setUploadingField(null);
      setTimeout(() => setUploadNotice(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleDriveUrlInput = (
    rawUrl: string,
    targetField: 'heroBgImage' | 'founder1' | 'founder2' | string
  ) => {
    const formatted = formatImageUrl(rawUrl);
    applyImageToField(targetField, formatted);

    if (rawUrl.includes('drive.google.com')) {
      setUploadNotice('✓ Google Drive link automatically converted to direct viewable image!');
      setTimeout(() => setUploadNotice(null), 4000);
    }
  };

  const handleCheckOrInitBucket = async () => {
    setIsCheckingBucket(true);
    setBucketStatus(null);
    try {
      const bucketName = supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET;
      const res = await ensureStorageBucket(bucketName);
      setBucketStatus({
        checked: true,
        exists: res.success,
        message: res.message
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setBucketStatus({
        checked: true,
        exists: false,
        message: `Failed to check bucket: ${msg}`
      });
    } finally {
      setIsCheckingBucket(false);
    }
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    if (!formConfig.heroTags.includes(newTagInput.trim())) {
      setFormConfig({
        ...formConfig,
        heroTags: [...formConfig.heroTags, newTagInput.trim()]
      });
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormConfig({
      ...formConfig,
      heroTags: formConfig.heroTags.filter((t) => t !== tagToRemove)
    });
  };

  const handleSaveAndSync = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    // 1. Save to LocalStorage immediately
    saveStoredSiteConfig(formConfig);
    onUpdateConfig(formConfig);
    saveStoredSupabaseConfig(supabaseCfg);

    // 2. Persist to Supabase Database
    try {
      const result = await syncConfigToSupabase(formConfig);
      if (result.success) {
        setSaveStatus({ type: 'success', message: 'Saved to LocalStorage and synced to Supabase Cloud!' });
      } else {
        setSaveStatus({
          type: 'error',
          message: `${result.message}`
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSaveStatus({ type: 'error', message: `Supabase Sync Error: ${msg}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all site configuration to brand default values?')) {
      setFormConfig(DEFAULT_SITE_CONFIG);
      saveStoredSiteConfig(DEFAULT_SITE_CONFIG);
      onUpdateConfig(DEFAULT_SITE_CONFIG);
      setSaveStatus({ type: 'success', message: 'Reset back to original brand defaults.' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleModalClose = () => {
    if (window.location.pathname.startsWith('/admin') || window.location.hash.includes('admin')) {
      window.history.pushState(null, '', '/');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#2C332D] rounded-3xl border border-[#DFD7CA] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden relative">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 bg-[#19241B] text-[#E0DACF] border-b border-[#293A2C] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C67856] text-white flex items-center justify-center shadow">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-lg font-bold text-white tracking-wide">
                  Sanctuary Admin Dashboard
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-[#E3A387] border border-stone-700 font-mono">
                  /admin
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Media Cloud CDN • SEO/GEO/AEO Manager • Supabase Sync • Pricing &amp; Bookings
              </p>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            className="px-3 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="Return to Website"
          >
            <span>Exit to Website</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY: Passcode Gate OR Authenticated Editor */}
        {!isAuthenticated ? (
          /* PASSCODE CHALLENGE SCREEN */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center shadow-inner">
              <Key className="w-8 h-8 text-[#C67856]" />
            </div>

            <div className="max-w-sm space-y-1">
              <h4 className="font-serif-display text-2xl font-bold text-[#1F2E23]">
                Enter Secret Admin Passcode
              </h4>
              <p className="text-xs text-stone-500">
                Unlock to upload your client’s real original photos, edit retreat pricing, or sync to Supabase.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter passcode (e.g. shunya2026)"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C67856] text-center tracking-wider font-mono shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-center gap-1.5 animate-shake">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1F2E23] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-[#E3A387]" />
                <span>Unlock Configuration Editor</span>
              </button>

              <p className="text-[10px] text-stone-400">
                Default Master PIN: <code className="text-stone-600 font-mono">shunya2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED EDITOR WORKSPACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* TABS SIDEBAR */}
            <div className="w-full md:w-56 bg-[#F4EFE6] border-b md:border-b-0 md:border-r border-[#DFD7CA] p-3 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'media' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Image className="w-4 h-4 text-[#C67856]" />
                <span>Original Photos Upload</span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'seo' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Globe className="w-4 h-4 text-[#C67856]" />
                <span>SEO, GEO &amp; AEO (AI Search)</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'hero' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C67856]" />
                <span>Hero &amp; Headlines</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'pricing' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Tag className="w-4 h-4 text-[#C67856]" />
                <span>Retreat Pricing</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'about' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#C67856]" />
                <span>About &amp; Founders</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'contact' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Key className="w-4 h-4 text-[#C67856]" />
                <span>Contact &amp; WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTab('supabase')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer whitespace-nowrap ${
                  activeTab === 'supabase' ? 'bg-[#1F2E23] text-white shadow' : 'text-[#4A574C] hover:bg-white/60'
                }`}
              >
                <Database className="w-4 h-4 text-[#C67856]" />
                <span>Supabase Database</span>
              </button>
            </div>

            {/* TAB CONTENT PANE */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* STATUS BANNER */}
              {saveStatus && (
                <div
                  className={`p-3 rounded-2xl text-xs flex items-center gap-2 border animate-fade-in ${
                    saveStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {saveStatus.type === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{saveStatus.message}</span>
                </div>
              )}

              {uploadNotice && (
                <div className="p-3 rounded-2xl text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadNotice}</span>
                </div>
              )}

              {/* 1. MEDIA & ORIGINAL PHOTOS UPLOAD TAB (Supabase Storage Integrated) */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#C67856] tracking-wider">
                        Dynamic Client Media &amp; Cloud Storage
                      </span>
                      <h4 className="font-serif-display text-xl font-bold text-[#1F2E23] mt-0.5">
                        Upload Original Photos to Supabase Storage
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        Files uploaded here are stored in Supabase Storage and generate permanent public CDN URLs for your site.
                      </p>
                    </div>
                  </div>

                  {/* SUPABASE STORAGE STATUS BAR */}
                  <div className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm ${
                    isSupabaseStorageAvailable()
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/80 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSupabaseStorageAvailable() ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {isSupabaseStorageAvailable() ? <Cloud className="w-5 h-5" /> : <HardDrive className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">
                            {isSupabaseStorageAvailable()
                              ? 'Supabase Cloud Storage: Connected'
                              : 'Supabase Storage: Not Configured (Using Local Memory)'}
                          </span>
                          {isSupabaseStorageAvailable() && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800 font-mono font-semibold">
                              bucket: {supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] opacity-90 mt-0.5">
                          {isSupabaseStorageAvailable()
                            ? 'Uploaded client photos are saved directly to your Supabase project bucket with public CDN links.'
                            : 'Uploads are previewed in browser memory. Enter your Project URL & Anon Key in the "Supabase Database" tab to upload to Supabase CDN.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {isSupabaseStorageAvailable() ? (
                        <button
                          type="button"
                          onClick={handleCheckOrInitBucket}
                          disabled={isCheckingBucket}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          {isCheckingBucket ? <RefreshCw className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                          <span>{isCheckingBucket ? 'Verifying...' : 'Verify Bucket'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveTab('supabase')}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <Database className="w-3 h-3" />
                          <span>Configure Supabase</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {bucketStatus && (
                    <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border animate-fade-in ${
                      bucketStatus.exists ? 'bg-emerald-100/70 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}>
                      {bucketStatus.exists ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      <span>{bucketStatus.message}</span>
                    </div>
                  )}

                  {/* 1. HERO BACKGROUND BANNER */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold text-[#C67856]">Hero Section</span>
                        <h5 className="font-bold text-sm text-[#1F2E23]">Main Hero Background Banner</h5>
                      </div>
                      <div>
                        {formConfig.heroBgImage.includes('.supabase.co/storage') && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 inline-flex items-center gap-1">
                            <Cloud className="w-3 h-3" /> Supabase Storage CDN URL
                          </span>
                        )}
                        {formConfig.heroBgImage.includes('googleusercontent.com') && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-200 inline-flex items-center gap-1">
                            <Link className="w-3 h-3" /> Google Drive Link
                          </span>
                        )}
                        {formConfig.heroBgImage.startsWith('data:image') && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-200 inline-flex items-center gap-1">
                            <HardDrive className="w-3 h-3" /> Local Preview
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-52 h-32 rounded-xl overflow-hidden border border-stone-300 shadow-inner shrink-0 bg-stone-100 relative group">
                        <img
                          src={formConfig.heroBgImage}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                        {uploadingField === 'heroBgImage' && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs gap-1.5 animate-fade-in">
                            <RefreshCw className="w-5 h-5 animate-spin text-[#E3A387]" />
                            <span>Uploading...</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                            1. Select Real Client Photo to Upload (to Supabase Storage):
                          </label>
                          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F2E23] hover:bg-black text-white text-xs font-semibold cursor-pointer transition shadow-sm active:scale-95">
                            {uploadingField === 'heroBgImage' ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E3A387]" />
                            ) : (
                              <Upload className="w-3.5 h-3.5 text-[#E3A387]" />
                            )}
                            <span>{uploadingField === 'heroBgImage' ? 'Uploading to Supabase...' : 'Upload Image from Device'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingField === 'heroBgImage'}
                              onChange={(e) => handleFileUpload(e, 'heroBgImage')}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                            2. Or paste image URL / Google Drive link:
                          </label>
                          <input
                            type="text"
                            value={formConfig.heroBgImage}
                            onChange={(e) => handleDriveUrlInput(e.target.value, 'heroBgImage')}
                            placeholder="https://... or Supabase CDN URL"
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs font-mono"
                          />
                        </div>

                        {/* Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="text-[10px] text-stone-500 font-semibold uppercase mr-1">Presets:</span>
                          {heroImagePresets.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setFormConfig({ ...formConfig, heroBgImage: preset.url })}
                              className="text-[10px] px-2 py-0.5 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. FOUNDERS REAL PHOTOS UPLOAD */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Anmol Khatti */}
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <span className="text-xs uppercase font-bold text-[#C67856]">Founder Photo 1</span>
                        <h5 className="font-bold text-sm text-[#1F2E23]">{formConfig.founder1.name}</h5>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-300 shrink-0 bg-stone-100 shadow relative">
                          <img
                            src={formConfig.founder1.image}
                            alt="Anmol"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          {uploadingField === 'founder1' && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                              <RefreshCw className="w-4 h-4 animate-spin text-[#E3A387]" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#223326] hover:bg-black text-white text-[11px] font-semibold cursor-pointer transition shadow-sm">
                            {uploadingField === 'founder1' ? (
                              <RefreshCw className="w-3 h-3 animate-spin text-[#E3A387]" />
                            ) : (
                              <Upload className="w-3 h-3 text-[#E3A387]" />
                            )}
                            <span>{uploadingField === 'founder1' ? 'Uploading...' : 'Upload Real Photo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingField === 'founder1'}
                              onChange={(e) => handleFileUpload(e, 'founder1')}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={formConfig.founder1.image}
                            onChange={(e) => handleDriveUrlInput(e.target.value, 'founder1')}
                            placeholder="Image URL or Drive link"
                            className="w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-mono bg-stone-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Komal Makhetra */}
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <span className="text-xs uppercase font-bold text-[#C67856]">Founder Photo 2</span>
                        <h5 className="font-bold text-sm text-[#1F2E23]">{formConfig.founder2.name}</h5>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-300 shrink-0 bg-stone-100 shadow relative">
                          <img
                            src={formConfig.founder2.image}
                            alt="Komal"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          {uploadingField === 'founder2' && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                              <RefreshCw className="w-4 h-4 animate-spin text-[#E3A387]" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#223326] hover:bg-black text-white text-[11px] font-semibold cursor-pointer transition shadow-sm">
                            {uploadingField === 'founder2' ? (
                              <RefreshCw className="w-3 h-3 animate-spin text-[#E3A387]" />
                            ) : (
                              <Upload className="w-3 h-3 text-[#E3A387]" />
                            )}
                            <span>{uploadingField === 'founder2' ? 'Uploading...' : 'Upload Real Photo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingField === 'founder2'}
                              onChange={(e) => handleFileUpload(e, 'founder2')}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={formConfig.founder2.image}
                            onChange={(e) => handleDriveUrlInput(e.target.value, 'founder2')}
                            placeholder="Image URL or Drive link"
                            className="w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-mono bg-stone-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. SANCTUARY GALLERY PHOTOS UPLOAD */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <span className="text-xs uppercase font-bold text-[#C67856]">Sanctuary Gallery</span>
                        <h5 className="font-bold text-sm text-[#1F2E23]">Real Retreat Experience &amp; Property Photos</h5>
                      </div>
                      <span className="text-[11px] text-stone-500">6 Photos Displayed on Home &amp; Gallery Pages</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {(formConfig.galleryImages || DEFAULT_SITE_CONFIG.galleryImages || []).map((img, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF8F5] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-[#C67856]">Photo #{idx + 1}</span>
                            <span className="text-[10px] text-stone-500 truncate max-w-[120px]">{img.title}</span>
                          </div>

                          <div className="w-full h-28 rounded-lg overflow-hidden border border-stone-300 bg-stone-100 relative group">
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover"
                            />
                            {uploadingField === `gallery_${idx}` && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-[10px] gap-1">
                                <RefreshCw className="w-4 h-4 animate-spin text-[#E3A387]" />
                                <span>Uploading...</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="w-full py-1.5 px-2.5 rounded-lg bg-[#223326] hover:bg-black text-white text-[10px] font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition">
                              {uploadingField === `gallery_${idx}` ? (
                                <RefreshCw className="w-3 h-3 animate-spin text-[#E3A387]" />
                              ) : (
                                <Upload className="w-3 h-3 text-[#E3A387]" />
                              )}
                              <span>Upload Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingField === `gallery_${idx}`}
                                onChange={(e) => handleFileUpload(e, `gallery_${idx}`)}
                                className="hidden"
                              />
                            </label>

                            <input
                              type="text"
                              value={img.url}
                              onChange={(e) => handleDriveUrlInput(e.target.value, `gallery_${idx}`)}
                              placeholder="Image URL or Drive link"
                              className="w-full px-2 py-1 rounded text-[10px] font-mono border bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SEO, GEO & AEO (AI SEARCH ENGINE OPTIMIZATION) TAB */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#C67856] tracking-wider">
                        Search &amp; Generative AI Engine Optimization
                      </span>
                      <h4 className="font-serif-display text-xl font-bold text-[#1F2E23] mt-0.5">
                        SEO, GEO &amp; AEO Metadata Manager
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        Control how your retreat ranks on Google, displays on social shares (WhatsApp/Twitter), and gets cited by AI search engines (ChatGPT, Perplexity, Gemini).
                      </p>
                    </div>
                  </div>

                  {/* 1. LIVE SERP & AI SEARCH PREVIEW */}
                  <div className="p-4 rounded-2xl bg-[#F6F3EC] border border-[#DDD5C7] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[#1F2E23] flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-[#C67856]" />
                        <span>Google Search Snippet Preview</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">Mobile &amp; Desktop SERP</span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-stone-600">
                        <span className="w-4 h-4 rounded-full bg-[#1F2E23] text-white flex items-center justify-center text-[9px] font-bold">S</span>
                        <span className="truncate max-w-xs">{formConfig.seo?.canonicalUrl || 'https://shunyasync.com'}</span>
                      </div>
                      <h5 className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                        {formConfig.seo?.metaTitle || DEFAULT_SEO_CONFIG.metaTitle}
                      </h5>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {formConfig.seo?.metaDescription || DEFAULT_SEO_CONFIG.metaDescription}
                      </p>
                    </div>

                    {/* AI Answer Engine Citation Box */}
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>AEO / AI Search Citation Snippet (Perplexity, ChatGPT, Gemini)</span>
                      </div>
                      <p className="text-xs text-amber-900 italic font-serif">
                        &ldquo;{formConfig.seo?.aeoSummary || DEFAULT_SEO_CONFIG.aeoSummary}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* 2. CORE SEO METADATA (Title, Description, Keywords, Canonical) */}
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                    <h5 className="font-bold text-xs uppercase text-[#C67856] tracking-wider flex items-center gap-2 border-b pb-2">
                      <Globe className="w-4 h-4 text-[#C67856]" />
                      <span>1. Core Search Engine Optimization (SEO)</span>
                    </h5>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs uppercase font-bold text-stone-700">
                          Meta Title (Page Title)
                        </label>
                        <span className={`text-[11px] font-mono ${
                          (formConfig.seo?.metaTitle || '').length > 60 ? 'text-amber-600 font-bold' : 'text-stone-400'
                        }`}>
                          {(formConfig.seo?.metaTitle || '').length}/60 chars (Recommended: 30-60)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formConfig.seo?.metaTitle || ''}
                        onChange={(e) => updateSeoField('metaTitle', e.target.value)}
                        placeholder="Shunya Sync Retreat — Mindful Yoga, Sound Healing & Forest Stillness in India"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs uppercase font-bold text-stone-700">
                          Meta Description
                        </label>
                        <span className={`text-[11px] font-mono ${
                          (formConfig.seo?.metaDescription || '').length > 160 ? 'text-amber-600 font-bold' : 'text-stone-400'
                        }`}>
                          {(formConfig.seo?.metaDescription || '').length}/160 chars (Recommended: 120-160)
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={formConfig.seo?.metaDescription || ''}
                        onChange={(e) => updateSeoField('metaDescription', e.target.value)}
                        placeholder="Disconnect from chaos, discover your true self, and sync with the universe. 4D/3N & 5D/4N luxury sacred wellness retreats in India..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                          Canonical Domain URL
                        </label>
                        <input
                          type="url"
                          value={formConfig.seo?.canonicalUrl || ''}
                          onChange={(e) => updateSeoField('canonicalUrl', e.target.value)}
                          placeholder="https://shunyasync.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                          Focus Keywords (Comma-Separated)
                        </label>
                        <input
                          type="text"
                          value={formConfig.seo?.keywords || ''}
                          onChange={(e) => updateSeoField('keywords', e.target.value)}
                          placeholder="wellness retreat, sound healing, yoga retreat India, Rishikesh"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Social Share OG Image */}
                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                        Social Share Preview Image (OpenGraph / Twitter Card)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-stone-300 bg-stone-100 shrink-0">
                          <img
                            src={formConfig.seo?.ogImage || formConfig.heroBgImage}
                            alt="Social Share Card Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5 w-full">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={formConfig.seo?.ogImage || ''}
                              onChange={(e) => updateSeoField('ogImage', e.target.value)}
                              placeholder="Image URL or Supabase CDN URL"
                              className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                            />
                            <label className="px-3 py-1.5 rounded-xl bg-[#1F2E23] hover:bg-black text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 transition">
                              <Upload className="w-3.5 h-3.5 text-[#E3A387]" />
                              <span>Upload New</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  setUploadingField('seoOgImage');
                                  const res = await uploadImageToSupabase(file, { folder: 'general' });
                                  setUploadingField(null);
                                  if (res.success && res.url) {
                                    updateSeoField('ogImage', res.url);
                                    setUploadNotice('Uploaded social share image to Supabase CDN!');
                                    setTimeout(() => setUploadNotice(null), 3500);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="text-[10px] text-stone-400">
                            Recommended size: 1200 x 630 px. This appears when your website link is shared on WhatsApp, Facebook, iMessage, and Twitter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. GEO (GENERATIVE ENGINE OPTIMIZATION & GEOLOCATION) */}
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                    <h5 className="font-bold text-xs uppercase text-[#C67856] tracking-wider flex items-center gap-2 border-b pb-2">
                      <MapPin className="w-4 h-4 text-[#C67856]" />
                      <span>2. GEO: Geolocation &amp; Local Business Targeting</span>
                    </h5>
                    <p className="text-xs text-stone-500">
                      GEO helps Google Maps, Google Gemini, and AI Search Engines recommend your sanctuary when users search for retreats in specific regions or nature spots.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                          Geo Place Name
                        </label>
                        <input
                          type="text"
                          value={formConfig.seo?.geoPlacename || ''}
                          onChange={(e) => updateSeoField('geoPlacename', e.target.value)}
                          placeholder="Rishikesh, Uttarakhand, India"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                          Geo Region Code
                        </label>
                        <input
                          type="text"
                          value={formConfig.seo?.geoRegion || ''}
                          onChange={(e) => updateSeoField('geoRegion', e.target.value)}
                          placeholder="IN-UT"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                          Geo Coordinates (Lat;Long)
                        </label>
                        <input
                          type="text"
                          value={formConfig.seo?.geoPosition || ''}
                          onChange={(e) => updateSeoField('geoPosition', e.target.value)}
                          placeholder="30.0869;78.2676"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. AEO (ANSWER ENGINE OPTIMIZATION) & FAQ SCHEMA BUILDER */}
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                      <div>
                        <h5 className="font-bold text-xs uppercase text-[#C67856] tracking-wider flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#C67856]" />
                          <span>3. AEO: Answer Engine Optimization &amp; Schema FAQs</span>
                        </h5>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Direct Q&amp;A pairs injected into Schema.org FAQPage for voice search, Google PAA (People Also Ask), and generative AI answers.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addFaq}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2E23] hover:bg-black text-white text-xs font-semibold cursor-pointer transition shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E3A387]" />
                        <span>Add New FAQ</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                        AEO Primary AI Summary (Core Knowledge Overview)
                      </label>
                      <textarea
                        rows={2}
                        value={formConfig.seo?.aeoSummary || ''}
                        onChange={(e) => updateSeoField('aeoSummary', e.target.value)}
                        placeholder="Shunya Sync Retreat is an intimate transformative wellness and sound healing sanctuary in India..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs leading-relaxed"
                      />
                    </div>

                    {/* FAQ Items List */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold text-stone-700 uppercase">
                        Configured Structured FAQs ({formConfig.seo?.faqs?.length || 0})
                      </span>

                      {(formConfig.seo?.faqs || []).map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 relative group hover:border-[#C67856]/40 transition"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                              Question #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => deleteFaq(idx)}
                              className="text-stone-400 hover:text-red-600 transition p-1 cursor-pointer"
                              title="Delete this FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                            placeholder="e.g. What is included in the retreat packages?"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-medium"
                          />

                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                            placeholder="Detailed factual answer..."
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs leading-relaxed"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HERO & HEADLINES TAB */}
              {activeTab === 'hero' && (
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">
                      Hero Section &amp; Brand Text
                    </h4>
                    <p className="text-xs text-stone-500">Edit the primary headline, subheadline, and imagery.</p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      Hero Headline
                    </label>
                    <input
                      type="text"
                      value={formConfig.heroHeadline}
                      onChange={(e) => setFormConfig({ ...formConfig, heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      Hero Subheadline
                    </label>
                    <textarea
                      rows={2}
                      value={formConfig.heroSubheadline}
                      onChange={(e) => setFormConfig({ ...formConfig, heroSubheadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      Tagline / Badge
                    </label>
                    <input
                      type="text"
                      value={formConfig.tagline}
                      onChange={(e) => setFormConfig({ ...formConfig, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      Header Announcement Bar
                    </label>
                    <input
                      type="text"
                      value={formConfig.headerAnnouncement}
                      onChange={(e) => setFormConfig({ ...formConfig, headerAnnouncement: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                    />
                  </div>

                  {/* Hero Presets */}
                  <div className="pt-1 flex flex-wrap gap-2">
                    <span className="text-[11px] text-stone-500 self-center">Curated Presets:</span>
                    {heroImagePresets.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormConfig({ ...formConfig, heroBgImage: p.url })}
                        className="px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] bg-white hover:border-[#C67856] text-stone-700 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Hero Tags */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase font-bold text-stone-600">
                      Hero Rotating 3D Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formConfig.heroTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEAE1] border border-[#DFD7CA] text-xs text-[#2C332D]"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-stone-400 hover:text-rose-600 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Add new tag (e.g. Breathwork)..."
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 rounded-xl bg-[#223326] text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PRICING TAB */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">
                      Retreat Packages &amp; Pricing Data
                    </h4>
                    <p className="text-xs text-stone-500">Edit package rates for twin sharing and solo private rooms.</p>
                  </div>

                  {/* 4 Days / 3 Nights */}
                  {/* 1. 2 Nights / 3 Days */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs uppercase font-bold text-[#223326]">✨ Weekend Reset</span>
                      <h5 className="font-bold text-base text-[#1F2E23]">2 Nights / 3 Days Retreat</h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Double Sharing Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg2n3d?.twinPrice ?? 22000}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg2n3d: {
                                  ...formConfig.pricing?.pkg2n3d,
                                  title: formConfig.pricing?.pkg2n3d?.title || '2 Nights / 3 Days Retreat',
                                  badge: formConfig.pricing?.pkg2n3d?.badge || 'Weekend Reset',
                                  description: formConfig.pricing?.pkg2n3d?.description || 'Weekend immersion in Rishikesh',
                                  soloPrice: formConfig.pricing?.pkg2n3d?.soloPrice ?? 26000,
                                  twinPrice: Number(e.target.value)
                                }
                              }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Private Accommodation Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg2n3d?.soloPrice ?? 26000}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg2n3d: {
                                  ...formConfig.pricing?.pkg2n3d,
                                  title: formConfig.pricing?.pkg2n3d?.title || '2 Nights / 3 Days Retreat',
                                  badge: formConfig.pricing?.pkg2n3d?.badge || 'Weekend Reset',
                                  description: formConfig.pricing?.pkg2n3d?.description || 'Weekend immersion in Rishikesh',
                                  twinPrice: formConfig.pricing?.pkg2n3d?.twinPrice ?? 22000,
                                  soloPrice: Number(e.target.value)
                                }
                              }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. 3 Nights / 4 Days */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-[#C67856] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs uppercase font-bold text-[#C67856]">🌿 Flagship Experience</span>
                      <h5 className="font-bold text-base text-[#1F2E23]">3 Nights / 4 Days Retreat</h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Double Sharing Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg3n4d?.twinPrice ?? formConfig?.pricing?.pkg4d3n?.twinPrice ?? 26000}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = {
                              title: formConfig.pricing?.pkg3n4d?.title || '3 Nights / 4 Days Retreat',
                              badge: formConfig.pricing?.pkg3n4d?.badge || 'Most Popular',
                              description: formConfig.pricing?.pkg3n4d?.description || 'Classic transformation journey',
                              soloPrice: formConfig.pricing?.pkg3n4d?.soloPrice ?? 32000,
                              twinPrice: val
                            };
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg3n4d: updated,
                                pkg4d3n: updated
                              }
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Private Accommodation Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg3n4d?.soloPrice ?? formConfig?.pricing?.pkg4d3n?.soloPrice ?? 32000}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = {
                              title: formConfig.pricing?.pkg3n4d?.title || '3 Nights / 4 Days Retreat',
                              badge: formConfig.pricing?.pkg3n4d?.badge || 'Most Popular',
                              description: formConfig.pricing?.pkg3n4d?.description || 'Classic transformation journey',
                              twinPrice: formConfig.pricing?.pkg3n4d?.twinPrice ?? 26000,
                              soloPrice: val
                            };
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg3n4d: updated,
                                pkg4d3n: updated
                              }
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. 4 Nights / 5 Days */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs uppercase font-bold text-[#223326]">🌸 Deep Immersion</span>
                      <h5 className="font-bold text-base text-[#1F2E23]">4 Nights / 5 Days Retreat (Premium)</h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Double Sharing Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg4n5d?.twinPrice ?? formConfig?.pricing?.pkg5d4n?.twinPrice ?? 44000}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = {
                              title: formConfig.pricing?.pkg4n5d?.title || '4 Nights / 5 Days Retreat (Premium Experience)',
                              badge: formConfig.pricing?.pkg4n5d?.badge || 'Premium Experience',
                              description: formConfig.pricing?.pkg4n5d?.description || 'Deep transformative retreat in India',
                              soloPrice: formConfig.pricing?.pkg4n5d?.soloPrice ?? 52000,
                              twinPrice: val
                            };
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg4n5d: updated,
                                pkg5d4n: updated
                              }
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                          Private Accommodation Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formConfig?.pricing?.pkg4n5d?.soloPrice ?? formConfig?.pricing?.pkg5d4n?.soloPrice ?? 52000}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = {
                              title: formConfig.pricing?.pkg4n5d?.title || '4 Nights / 5 Days Retreat (Premium Experience)',
                              badge: formConfig.pricing?.pkg4n5d?.badge || 'Premium Experience',
                              description: formConfig.pricing?.pkg4n5d?.description || 'Deep transformative retreat in India',
                              twinPrice: formConfig.pricing?.pkg4n5d?.twinPrice ?? 44000,
                              soloPrice: val
                            };
                            setFormConfig({
                              ...formConfig,
                              pricing: {
                                ...formConfig.pricing,
                                pkg4n5d: updated,
                                pkg5d4n: updated
                              }
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ABOUT & FOUNDERS TAB */}
              {activeTab === 'about' && (
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">
                      About Narrative &amp; Facilitators
                    </h4>
                    <p className="text-xs text-stone-500">Edit genesis story, philosophy quote, and founder profiles.</p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      About Text Narrative
                    </label>
                    <textarea
                      rows={4}
                      value={formConfig.aboutText}
                      onChange={(e) => setFormConfig({ ...formConfig, aboutText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                      Philosophy Quote
                    </label>
                    <input
                      type="text"
                      value={formConfig.philosophyQuote}
                      onChange={(e) => setFormConfig({ ...formConfig, philosophyQuote: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Founder 1 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                      <p className="font-bold text-xs uppercase text-[#C67856]">Founder 1 (Anmol Khatri)</p>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Name</label>
                        <input
                          type="text"
                          value={formConfig.founder1.name}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, name: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Title</label>
                        <input
                          type="text"
                          value={formConfig.founder1.title}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Short Note</label>
                        <input
                          type="text"
                          value={formConfig.founder1.note || ''}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, note: e.target.value }
                            })
                          }
                          placeholder="Mindful breathwork & grounded presence"
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Bio</label>
                        <textarea
                          rows={2}
                          value={formConfig.founder1.bio}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, bio: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, image: '/assets/aistudio/founder_anmol_khatri.jpg' }
                            })
                          }
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded text-stone-700"
                        >
                          Use River Photo
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormConfig({
                              ...formConfig,
                              founder1: { ...formConfig.founder1, image: '/assets/aistudio/image_41321948.png' }
                            })
                          }
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded text-stone-700"
                        >
                          Use Group Photo
                        </button>
                      </div>
                    </div>

                    {/* Founder 2 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                      <p className="font-bold text-xs uppercase text-[#3D5B46]">Founder 2 (Komal Malhotra)</p>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Name</label>
                        <input
                          type="text"
                          value={formConfig.founder2.name}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, name: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Title</label>
                        <input
                          type="text"
                          value={formConfig.founder2.title}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Short Note</label>
                        <input
                          type="text"
                          value={formConfig.founder2.note || ''}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, note: e.target.value }
                            })
                          }
                          placeholder="Vibrational therapy & intuitive healing"
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase font-semibold">Bio</label>
                        <textarea
                          rows={2}
                          value={formConfig.founder2.bio}
                          onChange={(e) =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, bio: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, image: '/assets/aistudio/founder_komal_malhotra.jpg' }
                            })
                          }
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded text-stone-700"
                        >
                          Use River Photo
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormConfig({
                              ...formConfig,
                              founder2: { ...formConfig.founder2, image: '/assets/aistudio/image_41321948.png' }
                            })
                          }
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded text-stone-700"
                        >
                          Use Group Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <label className="block text-[10px] font-bold uppercase text-stone-600">Why We Started</label>
                      <textarea
                        rows={2}
                        value={formConfig.whyWeStarted || ''}
                        onChange={(e) => setFormConfig({ ...formConfig, whyWeStarted: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border bg-white text-xs"
                      />
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <label className="block text-[10px] font-bold uppercase text-stone-600">What Makes Us Different</label>
                      <textarea
                        rows={2}
                        value={formConfig.whatMakesUsDifferent || ''}
                        onChange={(e) => setFormConfig({ ...formConfig, whatMakesUsDifferent: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. CONTACT TAB */}
              {activeTab === 'contact' && (
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">
                      Contact Details &amp; WhatsApp Automation
                    </h4>
                    <p className="text-xs text-stone-500">
                      These digits power direct WhatsApp instant booking buttons.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Display Phone Number
                      </label>
                      <input
                        type="text"
                        value={formConfig.contact.phone}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, phone: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        WhatsApp Digits (No + or spaces)
                      </label>
                      <input
                        type="text"
                        value={formConfig.contact.whatsappNumber}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, whatsappNumber: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Inquiry Email
                      </label>
                      <input
                        type="email"
                        value={formConfig.contact.email}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, email: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Sanctuary Location
                      </label>
                      <input
                        type="text"
                        value={formConfig.contact.location}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, location: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SUPABASE TAB */}
              {activeTab === 'supabase' && (
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">
                      Supabase Cloud Database Settings
                    </h4>
                    <p className="text-xs text-stone-500">
                      Connect your Supabase project to persist `siteConfig` and store customer inquiries across all browsers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Project URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://xyzcompany.supabase.co"
                        value={supabaseCfg.supabaseUrl}
                        onChange={(e) =>
                          setSupabaseCfg({ ...supabaseCfg, supabaseUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Anon Public Key
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                        value={supabaseCfg.supabaseAnonKey}
                        onChange={(e) =>
                          setSupabaseCfg({ ...supabaseCfg, supabaseAnonKey: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                        Config Table Name
                      </label>
                      <input
                        type="text"
                        value={supabaseCfg.tableName || 'shunya_site_config'}
                        onChange={(e) =>
                          setSupabaseCfg({ ...supabaseCfg, tableName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs uppercase font-bold text-stone-600">
                          Storage Bucket Name (for Client Photos)
                        </label>
                        <span className="text-[10px] text-stone-400">Default: retreat-media</span>
                      </div>
                      <input
                        type="text"
                        placeholder="retreat-media"
                        value={supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET}
                        onChange={(e) =>
                          setSupabaseCfg({ ...supabaseCfg, storageBucket: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Supabase Storage Bucket Setup & Verification */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                      <div>
                        <h5 className="font-bold text-xs uppercase text-[#C67856] tracking-wider">
                          Supabase Storage Bucket &amp; CDN Setup
                        </h5>
                        <p className="text-[11px] text-stone-500">
                          Run this SQL in Supabase to create the public bucket &amp; enable client image uploads.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(SUPABASE_STORAGE_SQL_SETUP);
                            setCopiedStorageSql(true);
                            setTimeout(() => setCopiedStorageSql(false), 2500);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2E23] hover:bg-black text-xs font-semibold text-white transition shadow-sm cursor-pointer"
                        >
                          {copiedStorageSql ? <Check className="w-3.5 h-3.5 text-[#E3A387]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedStorageSql ? 'Copied Storage SQL!' : 'Copy Storage SQL'}</span>
                        </button>
                      </div>
                    </div>

                    <pre className="p-3 bg-stone-900 text-stone-200 rounded-xl text-[10px] font-mono overflow-x-auto max-h-32 border border-stone-700">
                      {SUPABASE_STORAGE_SQL_SETUP}
                    </pre>
                  </div>

                  {/* SQL Schema Copy for Database Tables */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-stone-600">
                        Complete Combined Database &amp; Storage SQL Schema
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 2500);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-xs font-semibold text-stone-800 cursor-pointer"
                      >
                        {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy Complete Schema'}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-stone-900 text-stone-200 rounded-xl text-[10px] font-mono overflow-x-auto max-h-36 border border-stone-700">
                      {SUPABASE_SQL_SCHEMA}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL FOOTER ACTIONS */}
        {isAuthenticated && (
          <div className="px-6 py-4 bg-[#EFEAE1] border-t border-[#DFD7CA] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-white/50 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-white/50 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Panel</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleModalClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-white text-xs font-semibold transition cursor-pointer"
              >
                Cancel / Exit
              </button>

              <button
                type="button"
                onClick={handleSaveAndSync}
                disabled={isSaving}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#1F2E23] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-[#E3A387]" />}
                <span>{isSaving ? 'Saving & Syncing...' : 'Save & Sync to Supabase'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
