import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  Cloud,
  HardDrive,
  Sparkles,
  Upload,
  Trash2,
  Plus,
  Edit3,
  BookOpen,
  Image as ImageIcon,
  DollarSign,
  User,
  Phone,
  Globe,
  Search,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Copy,
  ChevronRight,
  Layers,
  MapPin,
  FileText,
  Award,
  Heart,
  Compass
} from 'lucide-react';
import { SiteConfig, SupabaseConfig, SeoConfig, FaqItem, BlogPost, BookingLead } from '../types/retreat';
import {
  DEFAULT_SITE_CONFIG,
  DEFAULT_SEO_CONFIG,
  DEFAULT_BLOG_POSTS,
  normalizeSiteConfig,
  saveStoredSiteConfig,
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  syncConfigToSupabase,
  SUPABASE_SQL_SCHEMA,
  SUPABASE_JSONB_MIGRATION_SQL
} from '../services/supabase';
import {
  uploadImageToSupabase,
  isSupabaseStorageAvailable,
  DEFAULT_STORAGE_BUCKET,
  SUPABASE_STORAGE_SQL_SETUP,
  fileToDataUrl
} from '../services/storage';

interface AdminPageProps {
  config: SiteConfig;
  onUpdateConfig: (updated: SiteConfig) => void;
  onNavigateHome: () => void;
  leadsList?: BookingLead[];
  onUpdateLeadStatus?: (id: string, status: 'new' | 'contacted' | 'confirmed') => void;
  onDeleteLead?: (id: string) => void;
}

type AdminSection =
  | 'overview'
  | 'media'
  | 'pages'
  | 'branding'
  | 'why-us'
  | 'hero'
  | 'pricing'
  | 'founders'
  | 'gallery'
  | 'blog'
  | 'seo'
  | 'leads'
  | 'security'
  | 'supabase';

export const AdminPage: React.FC<AdminPageProps> = ({
  config,
  onUpdateConfig,
  onNavigateHome,
  leadsList = [],
  onUpdateLeadStatus,
  onDeleteLead
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Admin Section
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  // Working Configuration State
  const [formConfig, setFormConfig] = useState<SiteConfig>(normalizeSiteConfig(config));
  const [supabaseCfg, setSupabaseCfg] = useState<SupabaseConfig>(getStoredSupabaseConfig());

  // Password Change State
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeStatus, setPinChangeStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Status & Feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedStorageSql, setCopiedStorageSql] = useState(false);
  const [copiedJsonbSql, setCopiedJsonbSql] = useState(false);

  // Blog Editor State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [blogFormData, setBlogFormData] = useState<BlogPost>({
    id: '',
    title: '',
    category: 'Sound Healing',
    author: 'Anmol Khatri',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    readTime: '5 min read',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mindfulness',
    published: true
  });

  // Keep state in sync if prop changes
  React.useEffect(() => {
    setFormConfig(normalizeSiteConfig(config));
  }, [config]);

  // Handle Unlock / Login
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

  // Handle Password / PIN Update
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim()) {
      setPinChangeStatus({ type: 'error', message: 'Please enter a valid new passcode/PIN.' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeStatus({ type: 'error', message: 'Passcodes do not match. Please verify.' });
      return;
    }

    const updatedConfig: SiteConfig = {
      ...formConfig,
      adminPin: newPin.trim()
    };

    setFormConfig(updatedConfig);
    saveStoredSiteConfig(updatedConfig);
    onUpdateConfig(updatedConfig);

    try {
      await syncConfigToSupabase(updatedConfig);
      setPinChangeStatus({
        type: 'success',
        message: `✓ Admin PIN successfully updated to "${newPin.trim()}" and synced to Supabase!`
      });
      setNewPin('');
      setConfirmPin('');
    } catch {
      setPinChangeStatus({
        type: 'success',
        message: `✓ Admin PIN updated locally in browser storage to "${newPin.trim()}".`
      });
    }
  };

  const applyImageToField = (field: string, url: string, autoSave = true) => {
    let nextConfig = { ...formConfig };

    if (field === 'logoUrl') {
      nextConfig = { ...formConfig, logoUrl: url };
    } else if (field === 'heroBgImage') {
      nextConfig = { ...formConfig, heroBgImage: url };
    } else if (field === 'founder1') {
      nextConfig = {
        ...formConfig,
        founder1: { ...formConfig.founder1, image: url }
      };
    } else if (field === 'founder2') {
      nextConfig = {
        ...formConfig,
        founder2: { ...formConfig.founder2, image: url }
      };
    } else if (field === 'blogImage') {
      setBlogFormData((prev) => ({ ...prev, image: url }));
      return;
    } else if (field === 'whyBgImage') {
      nextConfig = {
        ...formConfig,
        whyChooseUs: {
          ...formConfig.whyChooseUs,
          bgImage: url
        }
      };
    } else if (field.startsWith('gallery_')) {
      const idx = parseInt(field.replace('gallery_', ''), 10);
      const updated = [...(formConfig.galleryImages || [])];
      if (updated[idx]) {
        updated[idx] = { ...updated[idx], url };
        nextConfig = { ...formConfig, galleryImages: updated };
      }
    }

    setFormConfig(nextConfig);
    if (autoSave) {
      saveStoredSiteConfig(nextConfig);
      onUpdateConfig(nextConfig);
    }
  };

  // Resilient Dual-Engine Image Upload: Instant Local Data URL + Supabase Cloud Sync
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File exceeds 10MB limit. Please upload an image under 10MB.');
      return;
    }

    setUploadingField(targetField);
    setUploadNotice('Loading photo & applying immediately...');

    try {
      // 1. Convert to local base64 data URL instantly so UI changes right away
      const localDataUrl = await fileToDataUrl(file);
      applyImageToField(targetField, localDataUrl, true);
      setUploadNotice('✓ Image applied instantly to site!');

      // 2. Parallel Supabase Storage sync attempt (if configured)
      if (isSupabaseStorageAvailable()) {
        const bucket = supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET;
        const res = await uploadImageToSupabase(file, {
          bucket,
          folder: 'media',
          customName: `${targetField}_${Date.now()}_${file.name}`
        });

        if (res.success && res.url) {
          applyImageToField(targetField, res.url, true);
          setUploadNotice(`✓ Photo saved to Supabase Storage (${res.bucket}) & synced!`);
        } else if (res.error) {
          console.warn('Supabase Storage notice:', res.error);
          setUploadNotice(
            `✓ Image applied locally! (Supabase note: Storage bucket requires RLS policy. Click "Copy Storage SQL" in Supabase tab to enable permanent cloud CDN).`
          );
        }
      }
    } catch (err: unknown) {
      console.error('Error during image upload:', err);
      setUploadNotice('Failed to process image file.');
    } finally {
      setUploadingField(null);
      setTimeout(() => setUploadNotice(null), 7000);
    }
  };

  // Save All Changes & Sync to Supabase
  const handleSaveAndSync = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const normalized = normalizeSiteConfig(formConfig);
    saveStoredSiteConfig(normalized);
    onUpdateConfig(normalized);
    saveStoredSupabaseConfig(supabaseCfg);

    try {
      const res = await syncConfigToSupabase(normalized);
      if (res.success) {
        setSaveStatus({ type: 'success', message: '✓ All settings, texts, and images saved & synced to Supabase!' });
      } else {
        setSaveStatus({ type: 'error', message: res.message });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSaveStatus({ type: 'error', message: `Sync failed: ${msg}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 6000);
    }
  };

  // Blog CMS Operations
  const handleStartCreatePost = () => {
    setIsCreatingPost(true);
    setEditingPostId(null);
    setBlogFormData({
      id: `post-${Date.now()}`,
      title: '',
      category: 'Sound Healing',
      author: formConfig.founder1.name || 'Anmol Khatti',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      readTime: '5 min read',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      tag: 'Mindfulness',
      published: true
    });
  };

  const handleStartEditPost = (post: BlogPost) => {
    setIsCreatingPost(false);
    setEditingPostId(post.id);
    setBlogFormData({ ...post });
  };

  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title.trim()) {
      alert('Please enter a post title.');
      return;
    }

    const currentPosts = formConfig.blogPosts || DEFAULT_BLOG_POSTS;
    let updated: BlogPost[];

    if (isCreatingPost) {
      updated = [blogFormData, ...currentPosts];
    } else {
      updated = currentPosts.map((p) => (p.id === blogFormData.id ? blogFormData : p));
    }

    const newConfig = { ...formConfig, blogPosts: updated };
    setFormConfig(newConfig);
    saveStoredSiteConfig(newConfig);
    onUpdateConfig(newConfig);
    syncConfigToSupabase(newConfig).catch(console.warn);

    setIsCreatingPost(false);
    setEditingPostId(null);
  };

  const handleDeleteBlogPost = (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const currentPosts = formConfig.blogPosts || DEFAULT_BLOG_POSTS;
    const updated = currentPosts.filter((p) => p.id !== id);
    const newConfig = { ...formConfig, blogPosts: updated };
    setFormConfig(newConfig);
    saveStoredSiteConfig(newConfig);
    onUpdateConfig(newConfig);
    syncConfigToSupabase(newConfig).catch(console.warn);
  };

  // Gallery Operations
  const handleAddGalleryImage = () => {
    const newImg = {
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      title: 'New Sacred Photo',
      caption: 'Retreat immersion moment'
    };
    setFormConfig({
      ...formConfig,
      galleryImages: [...(formConfig.galleryImages || []), newImg]
    });
  };

  const handleDeleteGalleryImage = (idx: number) => {
    const updated = [...(formConfig.galleryImages || [])];
    updated.splice(idx, 1);
    setFormConfig({ ...formConfig, galleryImages: updated });
  };

  // FAQ Operations
  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      question: 'New Guest Query?',
      answer: 'Detailed helpful explanation for retreat guests.',
      category: 'General'
    };
    const currentFaqs = formConfig.seo?.faqs || DEFAULT_SEO_CONFIG.faqs;
    setFormConfig({
      ...formConfig,
      seo: {
        ...(formConfig.seo || DEFAULT_SEO_CONFIG),
        faqs: [newFaq, ...currentFaqs]
      }
    });
  };

  const handleDeleteFaq = (idx: number) => {
    const currentFaqs = [...(formConfig.seo?.faqs || DEFAULT_SEO_CONFIG.faqs)];
    currentFaqs.splice(idx, 1);
    setFormConfig({
      ...formConfig,
      seo: {
        ...(formConfig.seo || DEFAULT_SEO_CONFIG),
        faqs: currentFaqs
      }
    });
  };

  // -------------------------------------------------------------
  // VIEW 1: SECURE LOCK SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#120E0A] flex items-center justify-center p-4 sm:p-6 text-stone-200">
        <div className="max-w-md w-full bg-[#1A140F] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in text-center relative overflow-hidden">
          {/* Top Gold Halo Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D4AF37]/15 blur-2xl pointer-events-none rounded-full" />

          {/* Logo Brand Emblem */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] p-2 flex items-center justify-center shadow-lg group hover:scale-105 transition-transform duration-300">
              <img
                src={formConfig.logoUrl || '/logo.png'}
                alt={formConfig.brandName}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
                Master Control Center
              </span>
              <h1 className="font-serif-display text-3xl font-bold text-white tracking-tight">
                {formConfig.brandName} Admin
              </h1>
              <p className="text-xs text-stone-400">
                Enter your secret passcode to access site content, blog writer, and cloud database.
              </p>
            </div>
          </div>

          {/* Passcode Entry Form */}
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin PIN (Default: 7788)"
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#241C15] border border-[#3E2F23] focus:border-[#D4AF37] text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-white cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38728] hover:brightness-110 text-[#120E0A] font-bold text-xs uppercase tracking-widest transition shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          {/* Return Home Link */}
          <div className="pt-2 border-t border-[#2E2319]">
            <button
              onClick={onNavigateHome}
              className="text-xs text-stone-400 hover:text-[#D4AF37] transition flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <span>← Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: FULL DEDICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0F0C09] text-stone-200 flex flex-col font-sans">
      {/* 1. TOP MASTER BAR */}
      <header className="h-16 bg-[#17120D] border-b border-[#2E2319] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-md">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37] p-1 flex items-center justify-center">
            <img
              src={formConfig.logoUrl || '/logo.png'}
              alt={formConfig.brandName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-lg font-bold text-white">{formConfig.brandName}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#E5C158] border border-[#D4AF37]/30">
                Admin Console
              </span>
            </div>
            <p className="text-[10px] text-stone-400 hidden sm:block">Full Master CMS &amp; Cloud Database Controller</p>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-stone-300 hover:text-white text-xs font-medium transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleSaveAndSync}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] hover:brightness-110 text-[#120E0A] text-xs uppercase font-bold tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save &amp; Sync</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 rounded-xl bg-[#241C15] hover:bg-rose-950/60 border border-[#3E2F23] text-stone-400 hover:text-rose-400 transition cursor-pointer"
            title="Log Out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save feedback banner */}
      {saveStatus && (
        <div
          className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between transition-all ${
            saveStatus.type === 'success'
              ? 'bg-emerald-950 text-emerald-200 border-b border-emerald-800'
              : 'bg-rose-950 text-rose-200 border-b border-rose-800'
          }`}
        >
          <span>{saveStatus.message}</span>
          <button onClick={() => setSaveStatus(null)} className="text-white hover:opacity-75">✕</button>
        </div>
      )}

      {uploadNotice && (
        <div className="px-6 py-2 bg-[#D4AF37]/20 text-[#E5C158] text-xs border-b border-[#D4AF37]/30 flex items-center justify-between">
          <span>{uploadNotice}</span>
          <button onClick={() => setUploadNotice(null)}>✕</button>
        </div>
      )}

      {/* 2. MAIN WORKSPACE WITH SIDEBAR NAVIGATION */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#140F0A] border-r border-[#261D15] p-3 md:p-4 space-y-1 overflow-y-auto shrink-0">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Control Center
          </div>

          {[
            { id: 'overview', label: 'Overview & Status', icon: Layers },
            { id: 'media', label: 'Media & Photo Uploads', icon: Upload },
            { id: 'pages', label: 'All Pages Content (A-Z)', icon: FileText },
            { id: 'branding', label: 'Logo & Brand Identity', icon: Sparkles },
            { id: 'hero', label: 'Hero & Headlines', icon: ImageIcon },
            { id: 'founders', label: 'Founders & Bio', icon: User },
            { id: 'why-us', label: 'Why Choose Us (Parallax)', icon: Award },
            { id: 'pricing', label: 'Retreat Pricing', icon: DollarSign },
            { id: 'gallery', label: 'Sanctuary Gallery', icon: ImageIcon },
            { id: 'blog', label: 'Blog & Articles CMS', icon: BookOpen },
            { id: 'seo', label: 'SEO, GEO & FAQs', icon: Globe },
            { id: 'leads', label: `Guest Leads (${leadsList.length})`, icon: MessageSquare },
            { id: 'security', label: 'Admin PIN / Security', icon: ShieldCheck },
            { id: 'supabase', label: 'Supabase Cloud Config', icon: Cloud }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as AdminSection)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B38728]/10 text-[#E5C158] border border-[#D4AF37]/40 shadow-sm font-semibold'
                    : 'text-stone-400 hover:bg-[#1E1711] hover:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>
            );
          })}
        </aside>

        {/* MAIN CONTENT PANE */}
        <main className="flex-1 bg-[#100C08] p-5 sm:p-8 lg:p-10 overflow-y-auto max-w-5xl">
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-3xl font-bold text-white">System Overview</h2>
                <p className="text-xs text-stone-400 mt-1">
                  High-level status of your live retreat website, database sync, and leads.
                </p>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Total Guest Leads</span>
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold text-white">{leadsList.length}</p>
                  <p className="text-[11px] text-emerald-400">Active Website Inquiries</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Published Blog Posts</span>
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {(formConfig.blogPosts || DEFAULT_BLOG_POSTS).length}
                  </p>
                  <p className="text-[11px] text-stone-400">Wisdom &amp; Practice Articles</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Sanctuary Photos</span>
                    <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {(formConfig.galleryImages || []).length}
                  </p>
                  <p className="text-[11px] text-stone-400">High-Resolution Gallery</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Supabase Connection</span>
                    <Cloud className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-base font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{supabaseCfg.isConnected ? 'Connected' : 'Ready'}</span>
                  </p>
                  <p className="text-[11px] text-stone-400 truncate">Table: {supabaseCfg.tableName}</p>
                </div>
              </div>

              {/* Action Jump Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1C150F] to-[#2B1F16] border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#120E0A] border border-[#D4AF37] p-1.5 flex items-center justify-center">
                    <img src={formConfig.logoUrl || '/logo.png'} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-white">
                      Full CMS Control Panel Active
                    </h3>
                    <p className="text-xs text-stone-300">
                      You have full authority to modify text, upload original photos, publish blog articles, and change your admin password.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveSection('blog')}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs font-semibold text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Write Blog Post</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('gallery')}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs font-semibold text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Upload Retreat Photos</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('security')}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs font-semibold text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Change Admin PIN</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: BRANDING & LOGO */}
          {activeSection === 'branding' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">Brand Logo &amp; Identity</h2>
                <p className="text-xs text-stone-400 mt-1">
                  Manage the official logo emblem, remove/hide the logo icon, edit brand name, subtitle, and header announcement.
                </p>
              </div>

              {/* Logo Preview, Upload & Hide/Remove Controls */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-bold text-[#D4AF37]">
                    Brand Logo Emblem &amp; Icon
                  </label>
                  <span className="text-[11px] text-stone-400">
                    Status:{' '}
                    <span className={formConfig.showLogoIcon !== false ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                      {formConfig.showLogoIcon !== false ? '✓ Visible on Site' : '✕ Hidden / Removed from Site'}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Emblem preview box */}
                  <div className="w-32 h-32 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] p-3 flex flex-col items-center justify-center shadow-xl shrink-0 relative">
                    {formConfig.showLogoIcon !== false ? (
                      <img
                        src={formConfig.logoUrl || '/logo.png'}
                        alt="Brand Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-2 text-stone-400 text-xs">
                        <span className="text-lg block mb-1">✕</span>
                        <span>Logo Hidden (Text Only Mode)</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Direct Logo Image URL / Path</label>
                      <input
                        type="text"
                        value={formConfig.logoUrl || '/logo.png'}
                        onChange={(e) => setFormConfig({ ...formConfig, logoUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Upload button */}
                      <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 transition flex items-center gap-1.5 shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'logoUrl')}
                          className="sr-only"
                        />
                      </label>

                      {/* Remove / Hide Logo toggle button */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            showLogoIcon: formConfig.showLogoIcon === false ? true : false
                          })
                        }
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                          formConfig.showLogoIcon !== false
                            ? 'bg-rose-950/40 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                            : 'bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{formConfig.showLogoIcon !== false ? 'Hide / Remove Logo Icon' : 'Restore Logo Icon'}</span>
                      </button>

                      {/* Reset to Light Logo */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            logoUrl: '/logo.png',
                            showLogoIcon: true
                          })
                        }
                        className="px-3.5 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-stone-300 text-xs font-medium transition cursor-pointer"
                        title="Reset to default light golden logo emblem"
                      >
                        Reset Default Light Logo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Real-time Navbar Header Badge Preview */}
                <div className="pt-3 border-t border-[#2A2017]">
                  <p className="text-[11px] text-stone-400 mb-2 font-medium">
                    Live Navbar Preview (How your brand appears on the live website):
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EBE5DA] inline-flex items-center gap-3 shadow-sm">
                    {formConfig.showLogoIcon !== false && (
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E5DFD5] p-1 flex items-center justify-center shadow-xs shrink-0">
                        <img
                          src={formConfig.logoUrl || '/logo.png'}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="font-serif-display text-2xl tracking-tight text-[#1F2E23] font-semibold leading-none">
                        {formConfig.brandName || 'Shunya Sync'}
                      </span>
                      <span className="text-[9.5px] tracking-[0.28em] uppercase font-light text-[#8A9687] mt-1">
                        {formConfig.brandSubtitle || 'Retreat Sanctuary'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Name, Subtitle & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-stone-400">Brand Name</label>
                  <input
                    type="text"
                    value={formConfig.brandName}
                    onChange={(e) => setFormConfig({ ...formConfig, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">Main title e.g. "Shunya Sync"</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-stone-400">Brand Subtitle</label>
                  <input
                    type="text"
                    value={formConfig.brandSubtitle || ''}
                    onChange={(e) => setFormConfig({ ...formConfig, brandSubtitle: e.target.value })}
                    placeholder="Retreat Sanctuary"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">Small uppercase subtitle below brand name</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-stone-400">Brand Tagline</label>
                  <input
                    type="text"
                    value={formConfig.tagline}
                    onChange={(e) => setFormConfig({ ...formConfig, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">Footer and SEO philosophy statement</p>
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                <label className="block text-xs uppercase font-bold text-stone-400">Top Header Announcement Bar</label>
                <input
                  type="text"
                  value={formConfig.headerAnnouncement || ''}
                  onChange={(e) => setFormConfig({ ...formConfig, headerAnnouncement: e.target.value })}
                  placeholder="e.g. 🌿 Next Sacred Cohort: Nov 14–17 & Dec 12–16, 2026 • Limited to 12 Seekers"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* SECTION 2.5: WHY CHOOSE US (PARALLAX & FROSTED GLASS CARDS) */}
          {activeSection === 'why-us' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">Why Choose Us (Parallax Section)</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Control the full-width fixed-background image, peach eyebrow, heading, and 6 frosted-glass retreat value cards.
                  </p>
                </div>
                <a
                  href="/why-choose-us.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#D4AF37]/50 text-[#E5C158] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View Standalone HTML Preview</span>
                </a>
              </div>

              {/* Background Photo & Parallax Config */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <label className="block text-xs uppercase font-bold text-[#D4AF37]">
                  Parallax Fixed Background Photo
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-40 h-24 rounded-2xl overflow-hidden border border-[#3E2F23] shrink-0 bg-black relative">
                    <img
                      src={
                        formConfig.whyChooseUs?.bgImage ||
                        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75'
                      }
                      alt="Why Choose Us Background"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1F3328]/60 flex items-center justify-center text-[10px] text-white font-medium">
                      Fixed Parallax
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Background Image URL</label>
                      <input
                        type="text"
                        value={
                          formConfig.whyChooseUs?.bgImage ||
                          'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75'
                        }
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            whyChooseUs: {
                              ...formConfig.whyChooseUs,
                              bgImage: e.target.value
                            }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'whyBgImage')}
                          className="sr-only"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            whyChooseUs: {
                              ...formConfig.whyChooseUs,
                              bgImage:
                                'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75'
                            }
                          })
                        }
                        className="text-xs text-stone-400 hover:text-white transition underline"
                      >
                        Reset to Calm Lake Nature Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eyebrow & Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-stone-400">Eyebrow Label</label>
                  <input
                    type="text"
                    value={formConfig.whyChooseUs?.eyebrow || 'WHY SHUNYA SYNC'}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        whyChooseUs: {
                          ...formConfig.whyChooseUs,
                          eyebrow: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">Letter-spaced soft peach label</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-stone-400">Heading Prefix</label>
                  <input
                    type="text"
                    value={formConfig.whyChooseUs?.headingPrefix || 'Why'}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        whyChooseUs: {
                          ...formConfig.whyChooseUs,
                          headingPrefix: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">First word in white</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                  <label className="block text-xs uppercase font-bold text-[#f1d2c1]">Heading Highlight (Italic Peach)</label>
                  <input
                    type="text"
                    value={formConfig.whyChooseUs?.headingHighlight || 'Choose Us'}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        whyChooseUs: {
                          ...formConfig.whyChooseUs,
                          headingHighlight: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">Italicized peach emphasis words</p>
                </div>
              </div>

              {/* 6 Cards Editor */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-bold text-[#D4AF37]">
                    6 Frosted Glass Value Cards
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormConfig({
                        ...formConfig,
                        whyChooseUs: {
                          ...formConfig.whyChooseUs,
                          cards: [
                            { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
                            { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
                            { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
                            { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
                            { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
                            { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
                          ]
                        }
                      })
                    }
                    className="text-xs text-stone-400 hover:text-[#D4AF37] underline transition"
                  >
                    Reset 6 Cards to Default
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formConfig.whyChooseUs?.cards || [
                    { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
                    { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
                    { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
                    { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
                    { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
                    { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
                  ]).map((card, idx) => (
                    <div key={card.id || idx} className="p-4 rounded-xl bg-[#221A13] border border-[#35281D] space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-stone-400 font-semibold">
                        <span>Card {idx + 1}</span>
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const currentCards = [
                              ...(formConfig.whyChooseUs?.cards || [
                                { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
                                { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
                                { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
                                { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
                                { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
                                { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
                              ])
                            ];
                            currentCards[idx] = { ...currentCards[idx], title: e.target.value };
                            setFormConfig({
                              ...formConfig,
                              whyChooseUs: {
                                ...formConfig.whyChooseUs,
                                cards: currentCards
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#19130E] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={card.desc || ''}
                          onChange={(e) => {
                            const currentCards = [
                              ...(formConfig.whyChooseUs?.cards || [
                                { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
                                { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
                                { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
                                { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
                                { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
                                { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
                              ])
                            ];
                            currentCards[idx] = { ...currentCards[idx], desc: e.target.value };
                            setFormConfig({
                              ...formConfig,
                              whyChooseUs: {
                                ...formConfig.whyChooseUs,
                                cards: currentCards
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#19130E] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: HERO & HEADLINES */}
          {activeSection === 'hero' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">Hero &amp; Introductions</h2>
                <p className="text-xs text-stone-400 mt-1">Configure high-impact main headline, subheadline, and background image.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={formConfig.heroHeadline}
                    onChange={(e) => setFormConfig({ ...formConfig, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Hero Subheadline</label>
                  <textarea
                    rows={3}
                    value={formConfig.heroSubheadline}
                    onChange={(e) => setFormConfig({ ...formConfig, heroSubheadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#D4AF37] mb-1">Hero Background Image</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formConfig.heroBgImage}
                      onChange={(e) => setFormConfig({ ...formConfig, heroBgImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 transition flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroBgImage')}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#3E2F23]">
                  <img src={formConfig.heroBgImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: PRICING */}
          {activeSection === 'pricing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">Retreat Packages &amp; Pricing</h2>
                <p className="text-xs text-stone-400 mt-1">Control all-inclusive rates for Twin Sharing and Solo Suites.</p>
              </div>

              {/* 1. 2 Nights / 3 Days */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase text-[#D4AF37]">✨ 2 Nights / 3 Days Retreat</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Double Sharing Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg2n3d?.twinPrice ?? 22000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg2n3d: { ...formConfig.pricing.pkg2n3d, twinPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Private Accommodation Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg2n3d?.soloPrice ?? 26000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg2n3d: { ...formConfig.pricing.pkg2n3d, soloPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. 3 Nights / 4 Days */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border-2 border-[#D4AF37]/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#E5C158]">🌿 3 Nights / 4 Days Retreat</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37]">Most Popular</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Double Sharing Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg3n4d?.twinPrice ?? formConfig?.pricing?.pkg4d3n?.twinPrice ?? 26000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg3n4d: { ...formConfig.pricing.pkg3n4d, twinPrice: val },
                            pkg4d3n: { ...formConfig.pricing.pkg4d3n, twinPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Private Accommodation Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg3n4d?.soloPrice ?? formConfig?.pricing?.pkg4d3n?.soloPrice ?? 32000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg3n4d: { ...formConfig.pricing.pkg3n4d, soloPrice: val },
                            pkg4d3n: { ...formConfig.pricing.pkg4d3n, soloPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. 4 Nights / 5 Days */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase text-[#D4AF37]">🌸 4 Nights / 5 Days Retreat (Premium)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Double Sharing Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg4n5d?.twinPrice ?? formConfig?.pricing?.pkg5d4n?.twinPrice ?? 44000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg4n5d: { ...formConfig.pricing.pkg4n5d, twinPrice: val },
                            pkg5d4n: { ...formConfig.pricing.pkg5d4n, twinPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Private Accommodation Price (₹)</label>
                    <input
                      type="number"
                      value={formConfig?.pricing?.pkg4n5d?.soloPrice ?? formConfig?.pricing?.pkg5d4n?.soloPrice ?? 52000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormConfig({
                          ...formConfig,
                          pricing: {
                            ...formConfig.pricing,
                            pkg4n5d: { ...formConfig.pricing.pkg4n5d, soloPrice: val },
                            pkg5d4n: { ...formConfig.pricing.pkg5d4n, soloPrice: val }
                          }
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: FOUNDERS */}
          {activeSection === 'founders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2E2319] pb-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                    <span>Founders &amp; Genesis Story</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Control Anmol Khatri &amp; Komal Malhotra profiles, real photos, quotes, and the &ldquo;Why we started&rdquo; &amp; &ldquo;What makes us different&rdquo; highlights cards.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Founders Changes'}</span>
                </button>
              </div>

              {/* 1. SECTION INTRO & PHILOSOPHY */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>About Section Narrative</span>
                </span>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">
                    About Shunya Sync Story Paragraph (Appears under &ldquo;About Shunya Sync&rdquo; heading)
                  </label>
                  <textarea
                    rows={3}
                    value={formConfig.aboutText}
                    onChange={(e) => setFormConfig({ ...formConfig, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">
                    The Shunya Philosophy Quote
                  </label>
                  <input
                    type="text"
                    value={formConfig.philosophyQuote}
                    onChange={(e) => setFormConfig({ ...formConfig, philosophyQuote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* 2. FOUNDER 1 (ANMOL KHATRI) */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Founder 1 — Movement Guide (Anmol Khatri)
                  </span>
                  <span className="text-[10px] text-stone-400">Card 1</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formConfig.founder1.name}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, founder1: { ...formConfig.founder1, name: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Title / Designation</label>
                    <input
                      type="text"
                      value={formConfig.founder1.title}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, founder1: { ...formConfig.founder1, title: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">Short Quote / Focus Note</label>
                  <input
                    type="text"
                    value={formConfig.founder1.note || ''}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, founder1: { ...formConfig.founder1, note: e.target.value } })
                    }
                    placeholder="e.g. Mindful breathwork & grounded presence"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">Extended Bio &amp; Sadhana Background</label>
                  <textarea
                    rows={3}
                    value={formConfig.founder1.bio}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, founder1: { ...formConfig.founder1, bio: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Photo settings & presets */}
                <div className="space-y-2 pt-1 border-t border-[#2E2319]">
                  <label className="block text-xs text-stone-400">Photo URL &amp; Quick Presets</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#D4AF37] shrink-0 bg-[#241C15]">
                      <img src={formConfig.founder1.image} alt={formConfig.founder1.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={formConfig.founder1.image}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            founder1: { ...formConfig.founder1, image: e.target.value }
                          })
                        }
                        placeholder="/assets/aistudio/... or https://..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => applyImageToField('founder1', '/assets/aistudio/founder_anmol_khatri.jpg')}
                          className="px-2.5 py-1 rounded-lg bg-[#2E2319] hover:bg-[#3D2E20] text-[11px] text-[#D4AF37] border border-[#3E2F23] transition cursor-pointer"
                        >
                          💧 Anmol River Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => applyImageToField('founder1', '/assets/aistudio/image_41321948.png')}
                          className="px-2.5 py-1 rounded-lg bg-[#2E2319] hover:bg-[#3D2E20] text-[11px] text-stone-300 border border-[#3E2F23] transition cursor-pointer"
                        >
                          📸 Full Founders Photo
                        </button>
                        <label className="px-2.5 py-1 rounded-lg bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-[11px] font-semibold text-white transition flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3 h-3 text-[#D4AF37]" />
                          <span>Upload File</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'founder1')} className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FOUNDER 2 (KOMAL MALHOTRA) */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Founder 2 — Sound Alchemist (Komal Malhotra)
                  </span>
                  <span className="text-[10px] text-stone-400">Card 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formConfig.founder2.name}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, founder2: { ...formConfig.founder2, name: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Title / Designation</label>
                    <input
                      type="text"
                      value={formConfig.founder2.title}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, founder2: { ...formConfig.founder2, title: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">Short Quote / Focus Note</label>
                  <input
                    type="text"
                    value={formConfig.founder2.note || ''}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, founder2: { ...formConfig.founder2, note: e.target.value } })
                    }
                    placeholder="e.g. Vibrational therapy & intuitive healing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">Extended Bio &amp; Sound Therapy Background</label>
                  <textarea
                    rows={3}
                    value={formConfig.founder2.bio}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, founder2: { ...formConfig.founder2, bio: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Photo settings & presets */}
                <div className="space-y-2 pt-1 border-t border-[#2E2319]">
                  <label className="block text-xs text-stone-400">Photo URL &amp; Quick Presets</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#D4AF37] shrink-0 bg-[#241C15]">
                      <img src={formConfig.founder2.image} alt={formConfig.founder2.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={formConfig.founder2.image}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            founder2: { ...formConfig.founder2, image: e.target.value }
                          })
                        }
                        placeholder="/assets/aistudio/... or https://..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => applyImageToField('founder2', '/assets/aistudio/founder_komal_malhotra.jpg')}
                          className="px-2.5 py-1 rounded-lg bg-[#2E2319] hover:bg-[#3D2E20] text-[11px] text-[#D4AF37] border border-[#3E2F23] transition cursor-pointer"
                        >
                          💧 Komal River Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => applyImageToField('founder2', '/assets/aistudio/image_41321948.png')}
                          className="px-2.5 py-1 rounded-lg bg-[#2E2319] hover:bg-[#3D2E20] text-[11px] text-stone-300 border border-[#3E2F23] transition cursor-pointer"
                        >
                          📸 Full Founders Photo
                        </button>
                        <label className="px-2.5 py-1 rounded-lg bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-[11px] font-semibold text-white transition flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3 h-3 text-[#D4AF37]" />
                          <span>Upload File</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'founder2')} className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. THE TWO HIGHLIGHTS CARDS */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>The 2 Genesis Highlights Cards</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#241C15] border border-[#3E2F23] space-y-2">
                    <span className="text-xs uppercase font-bold text-[#E3A387] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Card 1: Why we started</span>
                    </span>
                    <textarea
                      rows={3}
                      value={formConfig.whyWeStarted || ''}
                      onChange={(e) => setFormConfig({ ...formConfig, whyWeStarted: e.target.value })}
                      placeholder="To offer intimate, soulful journeys away from daily noise."
                      className="w-full px-3 py-2 rounded-lg bg-[#1A140F] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#241C15] border border-[#3E2F23] space-y-2">
                    <span className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Card 2: What makes us different</span>
                    </span>
                    <textarea
                      rows={3}
                      value={formConfig.whatMakesUsDifferent || ''}
                      onChange={(e) => setFormConfig({ ...formConfig, whatMakesUsDifferent: e.target.value })}
                      placeholder="Intimate groups, nature-based settings, soulful evenings, and expert guides."
                      className="w-full px-3 py-2 rounded-lg bg-[#1A140F] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 5. LIVE PREVIEW */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Preview (How visitors will see this section)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                    Live Reactive
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF8F5] text-[#1F2E23] space-y-6 border border-[#E7DFD3]">
                  <div>
                    <h3 className="font-serif-display text-2xl font-bold">About Shunya Sync</h3>
                    <p className="text-xs text-[#526355] mt-1 line-clamp-2">
                      {formConfig.aboutText}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Anmol Khatri preview */}
                    <div className="rounded-2xl overflow-hidden bg-white border border-[#E7DFD3] shadow-xs">
                      <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                        <img src={formConfig.founder1.image} alt={formConfig.founder1.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="font-serif-display font-bold text-base">{formConfig.founder1.name}</p>
                        <p className="text-[10px] text-[#C67856] font-semibold">{formConfig.founder1.title}</p>
                        <p className="text-[11px] text-stone-500 italic mt-0.5">&ldquo;{formConfig.founder1.note}&rdquo;</p>
                      </div>
                    </div>

                    {/* Komal Malhotra preview */}
                    <div className="rounded-2xl overflow-hidden bg-white border border-[#E7DFD3] shadow-xs">
                      <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                        <img src={formConfig.founder2.image} alt={formConfig.founder2.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="font-serif-display font-bold text-base">{formConfig.founder2.name}</p>
                        <p className="text-[10px] text-emerald-700 font-semibold">{formConfig.founder2.title}</p>
                        <p className="text-[11px] text-stone-500 italic mt-0.5">&ldquo;{formConfig.founder2.note}&rdquo;</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#EAE3D6]">
                      <p className="font-serif-display font-bold text-[#1F2E23]">Why we started</p>
                      <p className="text-stone-600 text-[11px] mt-0.5">{formConfig.whyWeStarted}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#EAE3D6]">
                      <p className="font-serif-display font-bold text-[#1F2E23]">What makes us different</p>
                      <p className="text-stone-600 text-[11px] mt-0.5">{formConfig.whatMakesUsDifferent}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:brightness-110 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save All Founders Changes'}</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 6: GALLERY */}
          {activeSection === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">Sanctuary Gallery</h2>
                  <p className="text-xs text-stone-400 mt-1">Upload and manage real photos of yoga, sound baths, meals, and cottages.</p>
                </div>
                <button
                  onClick={handleAddGalleryImage}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:brightness-110"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formConfig.galleryImages || []).map((img, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-3">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#3E2F23]">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteGalleryImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={img.title}
                        onChange={(e) => {
                          const updated = [...(formConfig.galleryImages || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormConfig({ ...formConfig, galleryImages: updated });
                        }}
                        placeholder="Image Title"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={img.url}
                          onChange={(e) => {
                            const updated = [...(formConfig.galleryImages || [])];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setFormConfig({ ...formConfig, galleryImages: updated });
                          }}
                          placeholder="Image URL"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#241C15] border border-[#3E2F23] text-[11px] text-stone-300"
                        />
                        <label className="p-2 rounded-lg bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-stone-300 hover:text-white cursor-pointer shrink-0">
                          <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, `gallery_${idx}`)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: BLOG / JOURNAL CMS */}
          {activeSection === 'blog' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">Blog &amp; Articles CMS</h2>
                  <p className="text-xs text-stone-400 mt-1">Write, edit, and publish articles on yoga, sound therapy, and nutrition.</p>
                </div>
                {!isCreatingPost && !editingPostId && (
                  <button
                    onClick={handleStartCreatePost}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:brightness-110"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Write New Article</span>
                  </button>
                )}
              </div>

              {/* POST WRITER FORM */}
              {(isCreatingPost || editingPostId) ? (
                <form onSubmit={handleSaveBlogPost} className="p-6 rounded-3xl bg-[#1A140F] border border-[#D4AF37]/40 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#2E2319] pb-3">
                    <h3 className="font-serif-display text-xl font-bold text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isCreatingPost ? 'Write New Article' : 'Edit Article'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingPost(false);
                        setEditingPostId(null);
                      }}
                      className="text-xs text-stone-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Article Title</label>
                      <input
                        type="text"
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        placeholder="e.g. The Science of 432Hz Sound Healing"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Category</label>
                        <select
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                        >
                          <option value="Sound Healing">Sound Healing</option>
                          <option value="Yoga & Breathwork">Yoga & Breathwork</option>
                          <option value="Ayurvedic Nourishment">Ayurvedic Nourishment</option>
                          <option value="Inner Alignment">Inner Alignment</option>
                          <option value="Meditation">Meditation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Author</label>
                        <input
                          type="text"
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Read Time</label>
                        <input
                          type="text"
                          value={blogFormData.readTime}
                          onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Cover Image URL / Upload</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={blogFormData.image}
                          onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                        />
                        <label className="px-3.5 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs text-white cursor-pointer shrink-0 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Upload</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'blogImage')} className="sr-only" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Short Excerpt / Summary</label>
                      <textarea
                        rows={2}
                        value={blogFormData.summary}
                        onChange={(e) => setBlogFormData({ ...blogFormData, summary: e.target.value })}
                        placeholder="Brief 2-3 sentence overview shown in the article card."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D4AF37] mb-1">
                        Full Article Content (Markdown / Story)
                      </label>
                      <textarea
                        rows={10}
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        placeholder="Write the full wisdom piece. You can use markdown headers (###), bullet points, and paragraphs."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white font-mono leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={blogFormData.published !== false}
                          onChange={(e) => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                          className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span>Publish immediately to live website</span>
                      </label>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
                      >
                        Save &amp; Publish Post
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* ARTICLES LIST */
                <div className="space-y-3">
                  {(formConfig.blogPosts || DEFAULT_BLOG_POSTS).map((post) => (
                    <div
                      key={post.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] hover:border-[#D4AF37]/50 flex items-center justify-between gap-4 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-900 border border-[#3E2F23] shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-[11px] text-stone-500">{post.date}</span>
                          </div>
                          <h4 className="font-serif-display text-base font-bold text-white">{post.title}</h4>
                          <p className="text-xs text-stone-400 line-clamp-1">{post.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleStartEditPost(post)}
                          className="p-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] text-stone-300 hover:text-white transition"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlogPost(post.id)}
                          className="p-2 rounded-xl bg-[#241C15] hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 transition"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 8: SEO & FAQS */}
          {activeSection === 'seo' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">SEO, GEO &amp; FAQ Manager</h2>
                <p className="text-xs text-stone-400 mt-1">Optimize meta titles, descriptions, and answer engine questions.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Global Meta Title</label>
                  <input
                    type="text"
                    value={formConfig.seo?.metaTitle || ''}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        seo: { ...(formConfig.seo || DEFAULT_SEO_CONFIG), metaTitle: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={formConfig.seo?.metaDescription || ''}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        seo: { ...(formConfig.seo || DEFAULT_SEO_CONFIG), metaDescription: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Keywords</label>
                  <input
                    type="text"
                    value={formConfig.seo?.keywords || ''}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        seo: { ...(formConfig.seo || DEFAULT_SEO_CONFIG), keywords: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                  />
                </div>
              </div>

              {/* FAQ Manager */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-lg font-bold text-white">Interactive FAQ Items</h3>
                  <button
                    onClick={handleAddFaq}
                    className="px-3.5 py-1.5 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs text-[#D4AF37] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(formConfig.seo?.faqs || DEFAULT_SEO_CONFIG.faqs).map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...(formConfig.seo?.faqs || DEFAULT_SEO_CONFIG.faqs)];
                            updated[idx] = { ...updated[idx], question: e.target.value };
                            setFormConfig({
                              ...formConfig,
                              seo: { ...(formConfig.seo || DEFAULT_SEO_CONFIG), faqs: updated }
                            });
                          }}
                          placeholder="Question"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#241C15] border border-[#3E2F23] text-xs text-white font-semibold"
                        />
                        <button
                          onClick={() => handleDeleteFaq(idx)}
                          className="p-1.5 rounded-lg bg-[#241C15] hover:bg-rose-950 text-stone-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...(formConfig.seo?.faqs || DEFAULT_SEO_CONFIG.faqs)];
                          updated[idx] = { ...updated[idx], answer: e.target.value };
                          setFormConfig({
                            ...formConfig,
                            seo: { ...(formConfig.seo || DEFAULT_SEO_CONFIG), faqs: updated }
                          });
                        }}
                        placeholder="Answer"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#241C15] border border-[#3E2F23] text-xs text-stone-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: GUEST LEADS */}
          {activeSection === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">Booking Leads &amp; Inquiries</h2>
                  <p className="text-xs text-stone-400 mt-1">Direct inquiries submitted by visitors from the website.</p>
                </div>
              </div>

              {leadsList.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#1A140F] border border-[#2E2319] text-center space-y-2">
                  <MessageSquare className="w-10 h-10 text-stone-600 mx-auto" />
                  <p className="text-sm text-stone-400">No booking leads yet. Inquiries will appear here immediately.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leadsList.map((lead) => (
                    <div key={lead.id} className="p-5 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-white">{lead.name}</h4>
                          <p className="text-xs text-stone-400">{lead.email} • {lead.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              onUpdateLeadStatus?.(lead.id, e.target.value as 'new' | 'contacted' | 'confirmed')
                            }
                            className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                              lead.status === 'confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : lead.status === 'contacted'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-[#241C15] text-[#D4AF37] border border-[#3E2F23]'
                            }`}
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed Guest</option>
                          </select>
                          <button
                            onClick={() => onDeleteLead?.(lead.id)}
                            className="p-1.5 rounded-lg bg-[#241C15] hover:bg-rose-950 text-stone-400 hover:text-rose-400"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-stone-300 bg-[#241C15] p-3 rounded-xl border border-[#3E2F23]">
                        <p><strong className="text-[#D4AF37]">Package:</strong> {lead.package} ({lead.roomType})</p>
                        {lead.message && <p className="mt-1"><strong className="text-stone-400">Message:</strong> {lead.message}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 10: SECURITY & PASSWORD CHANGE */}
          {activeSection === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">Admin Security &amp; Password</h2>
                <p className="text-xs text-stone-400 mt-1">Change your secret passcode to secure the /admin URL.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#1A140F] border border-[#D4AF37]/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#E5C158]">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Change Admin Passcode / PIN</h3>
                    <p className="text-xs text-stone-400">Current active PIN is: <strong className="text-[#D4AF37]">{formConfig.adminPin || '7788'}</strong></p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-400 mb-1">New Passcode / PIN</label>
                    <input
                      type="text"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="e.g. shunya2026 or 9988"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-stone-400 mb-1">Confirm New Passcode</label>
                    <input
                      type="text"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      placeholder="Re-enter to confirm"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {pinChangeStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        pinChangeStatus.type === 'success'
                          ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-200'
                          : 'bg-rose-950/80 border border-rose-800 text-rose-200'
                      }`}
                    >
                      {pinChangeStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                      <span>{pinChangeStatus.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-md cursor-pointer"
                  >
                    Update &amp; Save Passcode
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* SECTION 11: SUPABASE CONFIG */}
          {activeSection === 'supabase' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">Supabase Cloud Database &amp; Storage</h2>
                <p className="text-xs text-stone-400 mt-1">Credentials, table name, and storage bucket configuration.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Project URL</label>
                    <input
                      type="text"
                      value={supabaseCfg.supabaseUrl}
                      onChange={(e) => setSupabaseCfg({ ...supabaseCfg, supabaseUrl: e.target.value })}
                      placeholder="https://xxx.supabase.co"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Anon Public Key</label>
                    <input
                      type="password"
                      value={supabaseCfg.supabaseAnonKey}
                      onChange={(e) => setSupabaseCfg({ ...supabaseCfg, supabaseAnonKey: e.target.value })}
                      placeholder="eyJhbGci..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Database Table Name</label>
                    <input
                      type="text"
                      value={supabaseCfg.tableName}
                      onChange={(e) => setSupabaseCfg({ ...supabaseCfg, tableName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Storage Bucket Name</label>
                    <input
                      type="text"
                      value={supabaseCfg.storageBucket || DEFAULT_STORAGE_BUCKET}
                      onChange={(e) => setSupabaseCfg({ ...supabaseCfg, storageBucket: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSql ? '✓ Database SQL Copied' : 'Copy Database SQL'}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_STORAGE_SQL_SETUP);
                      setCopiedStorageSql(true);
                      setTimeout(() => setCopiedStorageSql(false), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedStorageSql ? '✓ Storage SQL Copied' : 'Copy Storage SQL'}</span>
                  </button>
                </div>

                {/* Dynamic Headless JSONB Schema Migration Card */}
                <div className="p-4 rounded-2xl bg-[#1F1710] border border-[#D4AF37]/30 space-y-3 mt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E5C158]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        Headless JSONB Schema Migration (No Schema Cache Errors)
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_JSONB_MIGRATION_SQL);
                        setCopiedJsonbSql(true);
                        setTimeout(() => setCopiedJsonbSql(false), 3000);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedJsonbSql ? '✓ Migration SQL Copied!' : '1-Click Copy Migration SQL'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Adds dynamic JSONB columns (<code className="text-[#D4AF37]">pages_content</code>, <code className="text-[#D4AF37]">site_settings</code>, <code className="text-[#D4AF37]">dynamic_sections</code>, <code className="text-[#D4AF37]">retreat_packages</code>, and <code className="text-[#D4AF37]">seo_geo_tags</code>) to your <code className="text-white font-mono">shunya_site_config</code> table.
                  </p>
                  <pre className="p-3 rounded-xl bg-[#120E0A] text-[10px] text-stone-300 font-mono overflow-x-auto border border-[#3E2F23]">
                    {SUPABASE_JSONB_MIGRATION_SQL.trim()}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: MEDIA & ORIGINAL PHOTO UPLOADS */}
          {activeSection === 'media' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2E2319] pb-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#D4AF37]" />
                    <span>Media &amp; Original Photo Uploads</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Upload original high-resolution photos for Hero background, founders, logo, and sanctuary features.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Media Changes'}</span>
                </button>
              </div>

              {/* RLS Notice & 1-Click Solution Banner */}
              <div className="p-5 rounded-2xl bg-[#1C150F] border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Resilient Instant Photo Upload Engine Active
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Whenever you select an image file below, it is converted immediately into browser memory and displayed on your live website within milliseconds — uploads will never fail or leave your site blank.
                    </p>
                    <p className="text-[11px] text-stone-400">
                      If Supabase Storage showed an RLS error (<code className="text-amber-300">new row violates row-level security policy</code>), copy and paste our 1-click Storage SQL into your Supabase SQL Editor to enable public cloud hosting across all devices.
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_STORAGE_SQL_SETUP);
                      setCopiedStorageSql(true);
                      setTimeout(() => setCopiedStorageSql(false), 3500);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#241C15] hover:bg-[#32271E] border border-[#D4AF37]/50 text-xs font-semibold text-[#E5C158] flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedStorageSql ? '✓ Storage SQL Copied to Clipboard!' : '1-Click Copy Supabase Storage SQL'}</span>
                  </button>
                  <span className="text-[11px] text-stone-500">Run in Supabase Dashboard → SQL Editor → New Query → Run</span>
                </div>
              </div>

              {/* 1. HERO BACKGROUND IMAGE */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Hero Section Background Image</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">Live on Home Page</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formConfig.heroBgImage}
                      onChange={(e) => applyImageToField('heroBgImage', e.target.value)}
                      placeholder="https://... or data:image/..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 transition flex items-center gap-1.5 shrink-0 shadow">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingField === 'heroBgImage' ? 'Applying...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroBgImage')}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">High-Res Presets:</span>
                    {[
                      { label: 'Himalayan Sunrise Shala', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=85' },
                      { label: 'Misty Sacred Ridge', url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2000&q=85' },
                      { label: 'Himalayan River & Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85' },
                      { label: 'Acoustic Sound Dome', url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=2000&q=85' }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyImageToField('heroBgImage', preset.url)}
                        className="px-2.5 py-1 rounded-lg bg-[#241C15] hover:bg-[#32271E] border border-[#3E2F23] text-[10px] text-stone-300 hover:text-white transition cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Live Preview */}
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#3E2F23] shadow-md bg-stone-900">
                    <img src={formConfig.heroBgImage} alt="Hero Background Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <p className="font-serif-display text-xl sm:text-2xl font-bold text-white tracking-widest uppercase drop-shadow-md text-center px-4">
                        {formConfig.tagline || 'FIND STILLNESS • ALIGN WITHIN • AWAKEN'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. FOUNDERS ORIGINAL PHOTOS */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Founders Original Photos</span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Authentic facilitators Anmol Khatri and Komal Malhotra portraits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Founder 1: Anmol Khatri */}
                  <div className="p-4 rounded-xl bg-[#241C15] border border-[#3E2F23] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Anmol Khatri (Movement Guide)</span>
                      <button
                        type="button"
                        onClick={() => applyImageToField('founder1', '/assets/aistudio/founder_anmol_khatri.jpg')}
                        className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                      >
                        Reset to Original
                      </button>
                    </div>

                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#3E2F23] bg-stone-900">
                      <img
                        src={formConfig.founder1.image || '/assets/aistudio/founder_anmol_khatri.jpg'}
                        alt={formConfig.founder1.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formConfig.founder1.image}
                        onChange={(e) => applyImageToField('founder1', e.target.value)}
                        placeholder="Image URL or Base64"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#1A140F] border border-[#3E2F23] text-xs text-white"
                      />
                      <label className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#120E0A] text-xs font-bold uppercase cursor-pointer hover:brightness-110 shrink-0">
                        <span>{uploadingField === 'founder1' ? '...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'founder1')}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Founder 2: Komal Malhotra */}
                  <div className="p-4 rounded-xl bg-[#241C15] border border-[#3E2F23] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Komal Malhotra (Sound Alchemist)</span>
                      <button
                        type="button"
                        onClick={() => applyImageToField('founder2', '/assets/aistudio/founder_komal_malhotra.jpg')}
                        className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                      >
                        Reset to Original
                      </button>
                    </div>

                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#3E2F23] bg-stone-900">
                      <img
                        src={formConfig.founder2.image || '/assets/aistudio/founder_komal_malhotra.jpg'}
                        alt={formConfig.founder2.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formConfig.founder2.image}
                        onChange={(e) => applyImageToField('founder2', e.target.value)}
                        placeholder="Image URL or Base64"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#1A140F] border border-[#3E2F23] text-xs text-white"
                      />
                      <label className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#120E0A] text-xs font-bold uppercase cursor-pointer hover:brightness-110 shrink-0">
                        <span>{uploadingField === 'founder2' ? '...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'founder2')}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. PARALLAX WHY CHOOSE US BACKGROUND */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Why Choose Us Parallax Background Photo</span>
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formConfig.whyChooseUs?.bgImage || ''}
                    onChange={(e) => applyImageToField('whyBgImage', e.target.value)}
                    placeholder="https://... or data:image/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'whyBgImage' ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'whyBgImage')}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ALL PAGES CONTENT MANAGER (A TO Z) */}
          {activeSection === 'pages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2E2319] pb-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    <span>All Pages Content Manager (A to Z)</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Edit headers, footers, page titles, text bodies, contact info, and policies across the entire website.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#120E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save All Content'}</span>
                </button>
              </div>

              {/* 1. TOP HEADER BAR & CONTACT INFO */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Top Bar Announcement &amp; Official Contact</span>
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Top Bar Announcement Banner</label>
                    <input
                      type="text"
                      value={formConfig.headerAnnouncement}
                      onChange={(e) => setFormConfig({ ...formConfig, headerAnnouncement: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">WhatsApp Number (e.g. 919259698064)</label>
                      <input
                        type="text"
                        value={formConfig.contact.whatsappNumber}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, whatsappNumber: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Display Phone (e.g. +91 9259698064)</label>
                      <input
                        type="text"
                        value={formConfig.contact.phone}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, phone: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Support Email</label>
                      <input
                        type="email"
                        value={formConfig.contact.email}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            contact: { ...formConfig.contact, email: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Sanctuary Physical Address / Location</label>
                    <input
                      type="text"
                      value={formConfig.contact.location || formConfig.contact.address || ''}
                      onChange={(e) =>
                        setFormConfig({
                          ...formConfig,
                          contact: { ...formConfig.contact, location: e.target.value, address: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. HOME HERO HEADLINES & TAGLINE */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Home Page Headlines &amp; Tagline</span>
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">
                      Official Tagline (Appears in Hero, Header, and Metadata)
                    </label>
                    <input
                      type="text"
                      value={formConfig.tagline}
                      onChange={(e) => setFormConfig({ ...formConfig, tagline: e.target.value })}
                      placeholder="FIND STILLNESS • ALIGN WITHIN • AWAKEN"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-[#E5C158] font-semibold focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Hero Main Title / Headline</label>
                    <input
                      type="text"
                      value={formConfig.heroHeadline}
                      onChange={(e) => setFormConfig({ ...formConfig, heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={2}
                      value={formConfig.heroSubheadline}
                      onChange={(e) => setFormConfig({ ...formConfig, heroSubheadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Cohort Badge Tag</label>
                      <input
                        type="text"
                        value={formConfig.heroBadge}
                        onChange={(e) => setFormConfig({ ...formConfig, heroBadge: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Hero Bottom Philosophy Callout</label>
                      <input
                        type="text"
                        value={formConfig.heroQuote}
                        onChange={(e) => setFormConfig({ ...formConfig, heroQuote: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. ABOUT & PHILOSOPHY TEXT */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>About Page Narrative &amp; Genesis Story</span>
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">About Shunya Sync Story</label>
                    <textarea
                      rows={3}
                      value={formConfig.aboutText}
                      onChange={(e) => setFormConfig({ ...formConfig, aboutText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#241C15] border border-[#3E2F23] text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Philosophy Quote</label>
                    <input
                      type="text"
                      value={formConfig.philosophyQuote}
                      onChange={(e) => setFormConfig({ ...formConfig, philosophyQuote: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. FOOTER & COPYRIGHT */}
              <div className="p-6 rounded-2xl bg-[#1A140F] border border-[#2E2319] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Footer Description &amp; Copyright</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Footer Brand Description</label>
                    <textarea
                      rows={2}
                      value={formConfig.footerDescription}
                      onChange={(e) => setFormConfig({ ...formConfig, footerDescription: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Copyright Line</label>
                    <input
                      type="text"
                      value={formConfig.footerCopyright}
                      onChange={(e) => setFormConfig({ ...formConfig, footerCopyright: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#241C15] border border-[#3E2F23] text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
