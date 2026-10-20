import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Heart,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  Users,
  Sun,
  Leaf,
  Send,
  MessageCircle,
  Check,
  Info,
  Flame,
  Award,
  CircleDot,
  BookOpen,
  Home,
  FileText,
  Sparkles,
  Camera,
  HelpCircle,
  Shield,
  Instagram,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { SiteConfig, BenefitSlide, BookingLead, PageRoute } from './types/retreat';
import {
  getStoredSiteConfig,
  getStoredBenefits,
  getStoredLeads,
  saveBookingLead,
  updateLeadStatus,
  deleteLead,
  DEFAULT_SITE_CONFIG,
  DEFAULT_BENEFITS,
  fetchConfigFromSupabase
} from './services/supabase';
import { FlippingHeroTags } from './components/FlippingHeroTags';
import { BenefitsSlider } from './components/BenefitsSlider';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AudioPlayerHeader } from './components/AudioPlayerHeader';
import { MarqueeTicker } from './components/MarqueeTicker';
import { SeoHead } from './components/SeoHead';

// Dedicated Detailed Pages
import { AboutPage } from './pages/AboutPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { PackagesPage, PackageId } from './pages/PackagesPage';
import { InclusionsPage } from './pages/InclusionsPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { SanctuaryPage } from './pages/SanctuaryPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage, LegalTab } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';
import { SecretAdminModal } from './components/SecretAdminModal';
import { Footer } from './components/Footer';
import { Hero3DButtons } from './components/Hero3DButtons';
import { WhyChooseUsParallax } from './components/WhyChooseUsParallax';

// 432Hz harmonic singing bowl chime using Web Audio
class AmbientChime {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;

  start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;
      this.playChime();
      this.intervalId = window.setInterval(() => {
        if (this.isPlaying) this.playChime();
      }, 7000);
    } catch {
      // Audio context restricted or unsupported
    }
  }

  playChime() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const frequencies = [432, 864, 1296];
    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const amp = idx === 0 ? 0.08 : idx === 1 ? 0.03 : 0.015;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(amp, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 5.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 6);
    });
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

const chimePlayer = new AmbientChime();

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getStoredSiteConfig());
  const [benefitsList] = useState<BenefitSlide[]>(getStoredBenefits());
  const [, setLeadsList] = useState<BookingLead[]>(getStoredLeads());

  // URL Hash Routing & Active Page State
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesDropdownOpen, setPackagesDropdownOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  // Secret Admin Modal State & Triggers
  const [secretAdminOpen, setSecretAdminOpen] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<string>('3 Nights / 4 Days Retreat');
  const [selectedRoomType, setSelectedRoomType] = useState<'Twin Sharing' | 'Solo'>('Twin Sharing');

  // Package Page Selection
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>('3n4d');

  // Home interactive states
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Booking Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '3 Nights / 4 Days Retreat',
    roomType: 'Twin Sharing',
    datePreference: 'Upcoming Cohort (Next Month)',
    message: ''
  });

  // Secret Trigger 1: Global Keyboard Shortcut (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setSecretAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch live site configuration from Supabase on mount (if connected)
  useEffect(() => {
    fetchConfigFromSupabase().then((remoteCfg) => {
      if (remoteCfg) {
        setSiteConfig(remoteCfg);
      }
    });
  }, []);

  // Primary URL Navigation & /admin Path Listener
  useEffect(() => {
    const handleLocationChange = () => {
      // 1. Check path (e.g. /admin, /about, /packages)
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      // 2. Check hash (e.g. #admin, #about)
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

      // Direct /admin check requested by user
      if (pathname === 'admin' || hash === 'admin' || hash === 'secret-admin') {
        setSecretAdminOpen(true);
        setCurrentRoute('home');
        return;
      }

      const active = pathname || hash;
      const validRoutes: PageRoute[] = [
        'home',
        'about',
        'experiences',
        'packages',
        'inclusions',
        'why-us',
        'gallery',
        'journal',
        'faq',
        'contact',
        'admin',
        'privacy-policy',
        'terms-conditions',
        'cancellation-refund',
        'health-waiver'
      ];

      if (active === 'sanctuary' || active === 'gallery') {
        setCurrentRoute('gallery');
      } else if (validRoutes.includes(active as PageRoute)) {
        if (active === 'admin') {
          setSecretAdminOpen(true);
          setCurrentRoute('home');
        } else {
          setCurrentRoute(active as PageRoute);
        }
      } else if (!active) {
        setCurrentRoute('home');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Multi-directional 3D Section Flip & Reveal Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // When user scrolls back up, re-arm the section for the next 3D flip
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [currentRoute]);

  const toggleAudio = () => {
    if (audioActive) {
      chimePlayer.stop();
      setAudioActive(false);
    } else {
      chimePlayer.start();
      setAudioActive(true);
    }
  };

  const navigateTo = (route: PageRoute) => {
    setMobileMenuOpen(false);
    setPackagesDropdownOpen(false);

    if (route === 'admin') {
      setSecretAdminOpen(true);
      window.history.pushState(null, '', '/admin');
      return;
    }

    setCurrentRoute(route);
    if (route === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/${route}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (pkgName?: string, roomType?: 'Twin Sharing' | 'Solo') => {
    if (pkgName) {
      setSelectedPackageForModal(pkgName);
      setFormData((prev) => ({ ...prev, package: pkgName }));
    }
    if (roomType) {
      setSelectedRoomType(roomType);
      setFormData((prev) => ({ ...prev, roomType: roomType }));
    }
    setBookingModalOpen(true);
  };

  const handleOpenPackageItinerary = (pkgId: PackageId) => {
    setSelectedPackageId(pkgId);
    navigateTo('packages');
    setPackagesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello ${siteConfig.brandName}! I am interested in booking a retreat.%0A%0A*Name:* ${encodeURIComponent(
      formData.name || 'Inquirer'
    )}%0A*Package:* ${encodeURIComponent(formData.package)}%0A*Room:* ${encodeURIComponent(
      formData.roomType
    )}%0A*Phone:* ${encodeURIComponent(formData.phone || 'N/A')}%0A*Email:* ${encodeURIComponent(
      formData.email || 'N/A'
    )}%0A*Preference:* ${encodeURIComponent(formData.datePreference)}%0A*Notes:* ${encodeURIComponent(
      formData.message || 'I would like more information.'
    )}`;
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
  };

  // Dynamic Gallery items from siteConfig (Supabase CDN / user-uploaded), with graceful fallback
  const fallbackGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      title: 'Sunrise Yoga Shala',
      caption: 'Open-air timber pavilion overlooking misty mountain ranges'
    },
    {
      url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
      title: 'Sound Healing Dome',
      caption: 'Acoustically tuned circular sanctuary for Tibetan singing bowls and gongs'
    },
    {
      url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      title: 'Sattvic Nourishment',
      caption: 'Organic garden-to-table vegetarian feast tables'
    },
    {
      url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      title: 'Free Movement & Dance',
      caption: 'Expressive freedom without inhibition or judgment'
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Eco-Luxury Nature Quarters',
      caption: 'Peaceful accommodation with sustainable organic linens'
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      title: 'Forest Bathing Trail',
      caption: 'Sacred river and tree canopy guided mindfulness walks'
    }
  ];

  const activeGalleryImages = siteConfig.galleryImages && siteConfig.galleryImages.length > 0
    ? siteConfig.galleryImages
    : fallbackGalleryImages;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C332D] font-sans relative selection:bg-[#E2DDD3] overflow-x-hidden">
      {/* DYNAMIC SEO, GEO & AEO HEAD ENGINE */}
      <SeoHead config={siteConfig} currentRoute={currentRoute} />

      {/* 1. TOP UTILITY HEADER: Clean, No Admin links, Sound Player gracefully positioned */}
      <div className="bg-[#19241B] text-[#E0DACF] text-[11px] py-2 px-4 border-b border-[#293A2C] relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Announcement Text */}
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#C67856] shrink-0 animate-ping" />
            <p className="font-light tracking-wide text-stone-200 truncate">
              {siteConfig.headerAnnouncement}
            </p>
          </div>

          {/* Header Controls: Sound Player & WhatsApp direct */}
          <div className="flex items-center gap-4 text-xs shrink-0">
            <AudioPlayerHeader active={audioActive} onToggle={toggleAudio} />

            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#C67856]" />
              <span>{siteConfig.contact.location}</span>
            </span>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. STREAMLINED STICKY NAVBAR (No Admin, Why Choose Us removed from menu, Packages has sub-items) */}
      <header
        className={`sticky top-0 left-0 right-0 z-30 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EBE5DA] py-3'
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#EBE5DA]/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo with Light Emblem */}
          <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group text-left cursor-pointer">
            {siteConfig.showLogoIcon !== false && (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E5DFD5] p-1 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={siteConfig.logoUrl || '/logo.png'}
                  alt={siteConfig.brandName}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-serif-display text-2xl sm:text-3xl tracking-tight text-[#1F2E23] font-semibold leading-none">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase font-light text-[#8A9687] mt-1">
                {siteConfig.brandSubtitle || 'Retreat Sanctuary'}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links (Streamlined & Clean) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs sm:text-sm font-medium tracking-wide">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'home' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'about' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              About Us
            </button>

            {/* RETREAT PACKAGES & ITINERARY (With elegant dropdown for subpages) */}
            <div
              className="relative"
              onMouseEnter={() => setPackagesDropdownOpen(true)}
              onMouseLeave={() => setPackagesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('packages')}
                className={`flex items-center gap-1 transition-colors cursor-pointer ${
                  currentRoute === 'packages' ||
                  currentRoute === 'experiences' ||
                  currentRoute === 'inclusions'
                    ? 'text-[#C67856] font-bold'
                    : 'text-[#3D473F] hover:text-[#C67856]'
                }`}
              >
                <span>Retreat Packages &amp; Itinerary</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${packagesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Luxury Submenu Dropdown */}
              {packagesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#DFD7CA] p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleOpenPackageItinerary('2n3d')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#1F2E23] hover:bg-[#F5F0E8] hover:text-[#C67856] transition flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">✨ 2 Nights / 3 Days Retreat</p>
                      <p className="text-[10px] text-stone-500">Double ₹22k | Private ₹26k • Weekend Reset</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <button
                    onClick={() => handleOpenPackageItinerary('3n4d')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#1F2E23] hover:bg-[#F5F0E8] hover:text-[#C67856] transition flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">🌿 3 Nights / 4 Days Retreat</p>
                      <p className="text-[10px] text-stone-500">Double ₹26k | Private ₹32k • Most Popular</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <button
                    onClick={() => handleOpenPackageItinerary('4n5d')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#1F2E23] hover:bg-[#F5F0E8] hover:text-[#C67856] transition flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">🌸 4 Nights / 5 Days Retreat</p>
                      <p className="text-[10px] text-stone-500">Double ₹44k | Private ₹52k • Premium</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <div className="border-t border-[#EFEAE1] my-1" />

                  <button
                    onClick={() => {
                      navigateTo('inclusions');
                      setPackagesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium text-[#556057] hover:bg-[#F5F0E8] hover:text-[#1F2E23] transition flex items-center justify-between"
                  >
                    <span>What's Included in All Retreats</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('gallery')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'gallery' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              Sanctuary
            </button>

            <button
              onClick={() => navigateTo('journal')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'journal' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              Journal
            </button>

            <button
              onClick={() => navigateTo('faq')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'faq' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'contact' ? 'text-[#C67856] font-bold' : 'text-[#3D473F] hover:text-[#C67856]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Header Action CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleOpenBooking()}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md bg-[#223326] hover:bg-[#152218] text-[#F9F7F2] hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#1F2E23]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E5DFD5] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#2C332D]">
              <button
                onClick={() => navigateTo('home')}
                className="text-left py-1.5 border-b border-[#EFEAE1] flex items-center justify-between"
              >
                <span>Home Page</span>
                <Home className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => navigateTo('about')}
                className="text-left py-1.5 border-b border-[#EFEAE1]"
              >
                About Us &amp; Founders
              </button>

              {/* Nested Mobile Group for Retreat Packages */}
              <div className="py-1 border-b border-[#EFEAE1] space-y-2">
                <p className="text-xs uppercase tracking-wider font-bold text-[#C67856]">
                  Retreat Packages &amp; Itinerary
                </p>
                <div className="pl-3 space-y-2 text-xs text-stone-700">
                  <button
                    onClick={() => handleOpenPackageItinerary('2n3d')}
                    className="block w-full text-left py-1 hover:text-[#C67856]"
                  >
                    • ✨ 2 Nights / 3 Days Retreat Itinerary
                  </button>
                  <button
                    onClick={() => handleOpenPackageItinerary('3n4d')}
                    className="block w-full text-left py-1 hover:text-[#C67856]"
                  >
                    • 🌿 3 Nights / 4 Days Retreat Itinerary (Popular)
                  </button>
                  <button
                    onClick={() => handleOpenPackageItinerary('4n5d')}
                    className="block w-full text-left py-1 hover:text-[#C67856]"
                  >
                    • 🌸 4 Nights / 5 Days Retreat Itinerary (Premium)
                  </button>
                  <button
                    onClick={() => navigateTo('inclusions')}
                    className="block w-full text-left py-1 hover:text-[#C67856] text-stone-500"
                  >
                    • What’s Included in All Retreats
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigateTo('gallery')}
                className="text-left py-1.5 border-b border-[#EFEAE1]"
              >
                Sanctuary Life (Gallery)
              </button>

              <button
                onClick={() => navigateTo('journal')}
                className="text-left py-1.5 border-b border-[#EFEAE1]"
              >
                Journal &amp; Wisdom
              </button>

              <button
                onClick={() => navigateTo('faq')}
                className="text-left py-1.5 border-b border-[#EFEAE1] flex items-center justify-between"
              >
                <span className={currentRoute === 'faq' ? 'text-[#C67856] font-bold' : ''}>
                  FAQs &amp; Guest Guide
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F3EDE2] text-[#C67856]">
                  Help
                </span>
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="text-left py-1.5 border-b border-[#EFEAE1]"
              >
                Contact &amp; Location
              </button>

              <button
                onClick={() => navigateTo('privacy-policy')}
                className="text-left py-1.5 border-b border-[#EFEAE1] text-xs text-stone-500"
              >
                Legal Policies &amp; Waivers
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="w-full text-center py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] text-[#FAF8F5]"
              >
                Book Your Sanctuary Spot
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. PAGE VIEW ROUTER */}
      <main className="preserve-3d">
        {/* SUBPAGE 1: ABOUT PAGE */}
        {currentRoute === 'about' && (
          <div className="animate-3d-flip-right">
            <AboutPage config={siteConfig} onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* SUBPAGE 2: EXPERIENCES PAGE */}
        {currentRoute === 'experiences' && (
          <div className="animate-3d-flip-right">
            <ExperiencesPage onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* SUBPAGE 3: PACKAGES & ITINERARY */}
        {currentRoute === 'packages' && (
          <div className="animate-3d-flip-right">
            <PackagesPage
              config={siteConfig}
              initialPackage={selectedPackageId}
              onOpenBooking={(pkg, room) => handleOpenBooking(pkg, room)}
            />
          </div>
        )}

        {/* SUBPAGE 4: WHAT'S INCLUDED */}
        {currentRoute === 'inclusions' && (
          <div className="animate-3d-flip-right">
            <InclusionsPage onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* SUBPAGE 5: WHY CHOOSE US */}
        {currentRoute === 'why-us' && (
          <div className="animate-3d-flip-right">
            <WhyUsPage onOpenBooking={() => handleOpenBooking()} config={siteConfig} />
          </div>
        )}

        {/* SUBPAGE 6: SANCTUARY GALLERY */}
        {currentRoute === 'gallery' && (
          <div className="animate-3d-flip-right">
            <SanctuaryPage config={siteConfig} onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* SUBPAGE 7: JOURNAL & WISDOM */}
        {currentRoute === 'journal' && (
          <div className="animate-3d-flip-right">
            <JournalPage config={siteConfig} onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* SUBPAGE 8: DEDICATED ACCORDION FAQ PAGE */}
        {currentRoute === 'faq' && (
          <div className="animate-3d-flip-right">
            <FAQPage
              config={siteConfig}
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {/* SUBPAGE 9: CONTACT */}
        {currentRoute === 'contact' && (
          <div className="animate-3d-flip-right">
            <ContactPage
              config={siteConfig}
              onLeadSubmitted={(newLead) => setLeadsList((prev) => [newLead, ...prev])}
            />
          </div>
        )}

        {/* SUBPAGE 9: LEGAL POLICIES */}
        {(currentRoute === 'privacy-policy' ||
          currentRoute === 'terms-conditions' ||
          currentRoute === 'cancellation-refund' ||
          currentRoute === 'health-waiver') && (
          <div className="animate-3d-flip-right">
            <LegalPage
              initialTab={currentRoute as LegalTab}
              config={siteConfig}
            />
          </div>
        )}

        {/* FULL HOME PAGE: With multi-directional scroll entrance on EVERY section */}
        {currentRoute === 'home' && (
          <div className="space-y-0">
            {/* 1. HERO SECTION: Multi-directional reveals */}
            <section className="scroll-section in-view relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-5 sm:px-8 overflow-hidden">
              {/* Dynamic Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={siteConfig.heroBgImage}
                  alt={siteConfig.heroHeadline}
                  className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-[pulse_16s_ease-in-out_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#1B291E]/60 to-[#121C14]/75 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
              </div>

              {/* Hero Content Container */}
              <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-7">
                {/* Tagline / Spiritual badge: From Top */}
                <div className="reveal-init from-top delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm tracking-[0.22em] uppercase font-light text-stone-100 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-[#E3A387]" />
                  <span>{siteConfig.tagline}</span>
                </div>

                {/* Hero Headline: Glides in from Left */}
                <h1 className="reveal-init from-left delay-200 font-serif-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FAF7F0] leading-[1.12] drop-shadow-sm">
                  {siteConfig.heroHeadline}
                </h1>

                {/* Hero Subheadline: Glides in from Right */}
                <p className="reveal-init from-right delay-300 text-lg sm:text-2xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed font-serif-display italic">
                  &ldquo;{siteConfig.heroSubheadline}&rdquo;
                </p>

                {/* Dynamic 3D Flipping Hero Tags: Rises from Bottom */}
                <div className="reveal-init from-bottom delay-400">
                  <FlippingHeroTags tags={siteConfig.heroTags} />
                </div>

                {/* HERO CTA BUTTONS: 3D Flip on Hover */}
                <div className="reveal-init from-bottom delay-500 pt-5">
                  <Hero3DButtons
                    onViewRetreats={() => navigateTo('packages')}
                    onBookNow={() => handleOpenBooking()}
                  />
                </div>

                {/* WHY CHOOSE US HIGHLIGHTS in Hero Section (As requested: "उसका एक सेक्शन आएगा हीरो सेक्शन में") */}
                <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
                  {/* Left from Left */}
                  <div className="reveal-init from-left delay-500 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-stone-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#E3A387] font-semibold text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Small Intimate Groups</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-tight">
                      Capped at 10-14 guests for deep, personal attention.
                    </p>
                  </div>

                  {/* Middle from Bottom */}
                  <div className="reveal-init from-bottom delay-600 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-stone-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-xs">
                      <Leaf className="w-4 h-4" />
                      <span>Certified Hosts &amp; Guides</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-tight">
                      Guided personally by founders Anmol &amp; Komal.
                    </p>
                  </div>

                  {/* Right from Right */}
                  <div className="reveal-init from-right delay-500 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-stone-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
                      <Sun className="w-4 h-4" />
                      <span>Beginner Friendly Space</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-tight">
                      Warm, safe, and welcoming for solo travelers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-stone-400">
                <span className="text-[10px] uppercase tracking-[0.25em] mb-1 text-stone-500 font-light">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-stone-400" />
              </div>
            </section>

            {/* INFINITE TEXT TICKER SLIDER (BENEATH HERO SECTION: LEFT TO RIGHT, CALM LUXURY SPEED) */}
            <div className="relative z-30 w-full bg-[#121B14] shadow-md border-y border-[#263728]">
              <MarqueeTicker direction="ltr" variant="dark" speed="slow" />
            </div>

            {/* 2. BENEFITS SLIDER SECTION (3D FLIP IN FROM LEFT ON SCROLL) */}
            <div id="benefits-slider" className="scroll-section scroll-flip-left pt-14 pb-8 sm:pt-20 sm:pb-12">
              <BenefitsSlider benefits={benefitsList} onOpenBooking={() => handleOpenBooking()} />
            </div>

            {/* 3. ABOUT US & FOUNDERS SECTION (3D FLIP IN FROM RIGHT ON SCROLL) */}
            <section id="about" className="scroll-section scroll-flip-right py-24 px-5 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
                {/* Visual Column: Glides in from LEFT */}
                <div className="lg:col-span-5 relative card-3d-tilt reveal-init from-left delay-100">
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
                      alt="Mindful yoga and stillness at Shunya Sync"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-[11px] uppercase tracking-widest text-[#E3A387] font-medium">The Shunya Philosophy</span>
                      <p className="font-serif-display text-lg italic mt-1 text-stone-100">
                        &ldquo;{siteConfig.philosophyQuote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Column: Glides in from RIGHT */}
                <div className="lg:col-span-7 space-y-6 reveal-init from-right delay-200">
                  <div className="inline-block px-3.5 py-1 rounded-full bg-[#EFEAE1] text-[#2C332D] text-xs font-semibold tracking-widest uppercase">
                    Our Sacred Genesis
                  </div>
                  <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1F2E23] leading-tight">
                    About Shunya Sync
                  </h2>
                  <p className="text-base sm:text-lg text-[#556057] leading-relaxed font-light">
                    {siteConfig.aboutText}
                  </p>

                  {/* Founders Cards: Staggered from Left & Right */}
                  <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="reveal-init from-left delay-300 p-5 rounded-2xl bg-white border border-[#DFD7CA] shadow-sm space-y-2 card-3d-tilt">
                      <p className="text-xs uppercase tracking-wider text-[#C67856] font-semibold">{siteConfig.founder1.title}</p>
                      <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">{siteConfig.founder1.name}</h4>
                      <p className="text-xs text-[#556057] italic">&ldquo;{siteConfig.founder1.note}&rdquo;</p>
                      <p className="text-xs text-[#7A877B] leading-relaxed pt-1">{siteConfig.founder1.bio}</p>
                    </div>

                    <div className="reveal-init from-right delay-400 p-5 rounded-2xl bg-white border border-[#DFD7CA] shadow-sm space-y-2 card-3d-tilt">
                      <p className="text-xs uppercase tracking-wider text-[#C67856] font-semibold">{siteConfig.founder2.title}</p>
                      <h4 className="font-serif-display text-xl font-bold text-[#1F2E23]">{siteConfig.founder2.name}</h4>
                      <p className="text-xs text-[#556057] italic">&ldquo;{siteConfig.founder2.note}&rdquo;</p>
                      <p className="text-xs text-[#7A877B] leading-relaxed pt-1">{siteConfig.founder2.bio}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo('about')}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#C67856] hover:underline cursor-pointer"
                    >
                      <span>Read Deep Founder Story &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. THE THREE PILLARS (Experiences): 3D FLIP IN FROM LEFT */}
            <section id="pillars" className="scroll-section scroll-flip-left py-24 px-5 sm:px-8 bg-[#F5F0E8] border-y border-[#E8E1D5] scroll-mt-20">
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Header from Top */}
                <div className="text-center max-w-3xl mx-auto space-y-4 reveal-init from-top">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856]">
                    Curated Experiences Woven into Every Retreat
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1F2E23]">
                    Where Shunya Sync Takes You
                  </h2>
                  <p className="text-base text-[#556057] font-light">
                    From day to week-long journeys — grounded in ancient wisdom, vibrational acoustics, and communal joy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Pillar 1: Yoga - Glides in from LEFT */}
                  <div className="reveal-init from-left delay-200 bg-white rounded-3xl overflow-hidden shadow-sm border border-[#DFD7CA] hover:shadow-xl transition-all duration-300 flex flex-col card-3d-tilt">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                        alt="Yoga Guided Sessions"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#1F2E23]/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Pillar 01
                      </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mb-2">
                          1. Yoga
                        </h3>
                        <p className="text-sm font-serif-display italic text-[#C67856] mb-3">
                          Deepen your practice with guided sessions
                        </p>
                        <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                          Mindful asanas, pranayama breathwork, and alignment to liberate stored physical stress and awaken inner vitality.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Sound Healing - Rises from BOTTOM */}
                  <div className="reveal-init from-bottom delay-300 bg-white rounded-3xl overflow-hidden shadow-sm border border-[#DFD7CA] hover:shadow-xl transition-all duration-300 flex flex-col card-3d-tilt">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80"
                        alt="Sound Healing Therapy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#1F2E23]/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Pillar 02
                      </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mb-2">
                          2. Sound Healing
                        </h3>
                        <p className="text-sm font-serif-display italic text-[#C67856] mb-3">
                          Vibrational therapy for deep relaxation and inner peace
                        </p>
                        <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                          Tibetan singing bowls, gongs, and pure 432Hz harmonic chimes designed to calm the nervous system into restorative theta waves.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Dance & Fun - Glides in from RIGHT */}
                  <div className="reveal-init from-right delay-400 bg-white rounded-3xl overflow-hidden shadow-sm border border-[#DFD7CA] hover:shadow-xl transition-all duration-300 flex flex-col card-3d-tilt">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80"
                        alt="Dance and Fun"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#1F2E23]/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Pillar 03
                      </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mb-2">
                          3. Dance &amp; Fun
                        </h3>
                        <p className="text-sm font-serif-display italic text-[#C67856] mb-3">
                          Free movement sessions and activities for joy &amp; connection
                        </p>
                        <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                          Somatic rhythm release, community bonfire ceremonies, and playful spontaneous expression with like-minded souls.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 reveal-init from-bottom delay-500">
                  <button
                    onClick={() => navigateTo('experiences')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2E23] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition cursor-pointer"
                  >
                    <span>Explore All Experiences &rarr;</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 5. PACKAGES & ITINERARY PREVIEW SECTION: 3D FLIP IN FROM RIGHT */}
            <section id="packages" className="scroll-section scroll-flip-right py-24 px-5 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 reveal-init from-top">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
                  Shunya Sync Retreat Itinerary
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1F2E23]">
                  Choose Your Duration
                </h2>
                <p className="text-base text-[#556057] font-light max-w-2xl mx-auto">
                  Choose your duration — each package includes a full day-by-day schedule and transparent pricing.
                </p>
              </div>

              {/* 3 Package Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. 2 Nights / 3 Days */}
                <div className="reveal-init from-left delay-100 bg-white rounded-3xl p-7 border border-[#DFD7CA] shadow-sm hover:shadow-xl transition space-y-6 card-3d-tilt flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EFEAE1] pb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-[#223326]">
                          ✨ Weekend Reset
                        </span>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
                          2 Nights / 3 Days Retreat
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#556057] leading-relaxed">
                      Arrival &amp; Grounding, Evening Ganga Aarti, Chakra Healing, and Nature Walk.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center">
                        <p className="text-[11px] uppercase font-semibold text-stone-500">Double sharing</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg2n3d?.twinPrice ?? 22000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center">
                        <p className="text-[11px] uppercase font-semibold text-stone-500">Private accommodation</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg2n3d?.soloPrice ?? 26000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => handleOpenPackageItinerary('2n3d')}
                      className="w-full py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] text-[#1F2E23] text-xs font-semibold tracking-wider uppercase border border-[#DFD7CA] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View 2N/3D Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C67856]" />
                    </button>
                    <button
                      onClick={() => handleOpenBooking('2 Nights / 3 Days Retreat', 'Twin Sharing')}
                      className="w-full py-3 rounded-full bg-[#223326] hover:bg-[#152218] text-white text-xs uppercase tracking-widest font-semibold transition cursor-pointer shadow-sm active:scale-95"
                    >
                      Book 2N/3D Retreat
                    </button>
                  </div>
                </div>

                {/* 2. 3 Nights / 4 Days (Highlighted Most Popular) */}
                <div className="reveal-init from-bottom delay-200 bg-white rounded-3xl p-7 border-2 border-[#C67856] shadow-xl space-y-6 card-3d-tilt relative flex flex-col justify-between">
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C67856] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>

                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between border-b border-[#F5E6DC] pb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-[#C67856]">
                          🌿 Flagship Experience
                        </span>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
                          3 Nights / 4 Days Retreat
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#556057] leading-relaxed">
                      Pranayama Masterclass, Sound &amp; Chakra Healing, River Rafting, and Aarti.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FAD7C8] text-center">
                        <p className="text-[11px] uppercase font-semibold text-[#A4502E]">Double sharing</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg3n4d?.twinPrice ?? 26000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FAD7C8] text-center">
                        <p className="text-[11px] uppercase font-semibold text-[#A4502E]">Private accommodation</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg3n4d?.soloPrice ?? 32000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => handleOpenPackageItinerary('3n4d')}
                      className="w-full py-2.5 rounded-full bg-[#FFF9F6] hover:bg-[#FBEBE2] text-[#A4502E] text-xs font-semibold tracking-wider uppercase border border-[#FAD7C8] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View 3N/4D Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C67856]" />
                    </button>
                    <button
                      onClick={() => handleOpenBooking('3 Nights / 4 Days Retreat', 'Twin Sharing')}
                      className="w-full py-3 rounded-full bg-[#C67856] hover:bg-[#B36544] text-white text-xs uppercase tracking-widest font-semibold transition cursor-pointer shadow-md active:scale-95"
                    >
                      Book 3N/4D Retreat
                    </button>
                  </div>
                </div>

                {/* 3. 4 Nights / 5 Days (Premium) */}
                <div className="reveal-init from-right delay-300 bg-white rounded-3xl p-7 border border-[#DFD7CA] shadow-sm hover:shadow-xl transition space-y-6 card-3d-tilt flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EFEAE1] pb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-[#223326]">
                          🌸 Deep Immersion
                        </span>
                        <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
                          4 Nights / 5 Days Retreat
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#556057] leading-relaxed">
                      Silent Meditation, River Rafting, Ecstatic Dance, Inner Work &amp; Integration.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center">
                        <p className="text-[11px] uppercase font-semibold text-stone-500">Double sharing</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg4n5d?.twinPrice ?? 44000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center">
                        <p className="text-[11px] uppercase font-semibold text-stone-500">Private accommodation</p>
                        <p className="text-xl font-serif-display font-bold text-[#1F2E23] mt-1">
                          ₹{(siteConfig?.pricing?.pkg4n5d?.soloPrice ?? 52000).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-stone-500">per person</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => handleOpenPackageItinerary('4n5d')}
                      className="w-full py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] text-[#1F2E23] text-xs font-semibold tracking-wider uppercase border border-[#DFD7CA] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View 4N/5D Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C67856]" />
                    </button>
                    <button
                      onClick={() => handleOpenBooking('4 Nights / 5 Days Retreat (Premium Experience)', 'Twin Sharing')}
                      className="w-full py-3 rounded-full bg-[#223326] hover:bg-[#152218] text-white text-xs uppercase tracking-widest font-semibold transition cursor-pointer shadow-sm active:scale-95"
                    >
                      Book 4N/5D Premium
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 reveal-init from-bottom delay-400">
                <button
                  onClick={() => navigateTo('packages')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C67856] hover:underline cursor-pointer"
                >
                  <span>View Full Day-by-Day Itineraries (All Days) &rarr;</span>
                </button>
              </div>
            </section>

            {/* 6. WHAT'S INCLUDED IN ALL RETREATS: 3D FLIP IN FROM LEFT */}
            <section id="included" className="scroll-section scroll-flip-left py-24 px-5 sm:px-8 bg-[#F5F0E8] border-y border-[#E8E1D5] scroll-mt-20">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-4 reveal-init from-top">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#3F523E] bg-[#E8ECE6] px-3.5 py-1.5 rounded-full border border-[#D5DED3]">
                    All-Inclusive Care
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1F2E23]">
                    What’s Included in All Retreats
                  </h2>
                  <p className="text-base text-[#5D6B60] font-light">
                    Every vital need is lovingly arranged so you can fully disconnect from worldly logistics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="reveal-init from-left delay-100 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <Sun className="w-8 h-8 text-[#223326]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Daily Yoga &amp; Meditation Sessions</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Energizing morning asana, pranayama channels, and twilight guided silent meditation.
                    </p>
                  </div>

                  <div className="reveal-init from-bottom delay-200 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <Volume2 className="w-8 h-8 text-[#C67856]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Sound Healing Sessions</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Vibrational therapy with antique Tibetan singing bowls and deep 432Hz gong baths.
                    </p>
                  </div>

                  <div className="reveal-init from-right delay-300 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <Leaf className="w-8 h-8 text-[#223326]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">All Meals (Vegetarian / Sattvic)</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Fresh farm-to-table vegetarian meals designed to gently cleanse and revitalize vitality.
                    </p>
                  </div>

                  <div className="reveal-init from-left delay-200 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <Compass className="w-8 h-8 text-[#C67856]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Eco-Sanctuary Accommodation</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Spacious timber and stone rooms equipped with organic linens in peaceful surroundings.
                    </p>
                  </div>

                  <div className="reveal-init from-bottom delay-300 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <MapPin className="w-8 h-8 text-[#223326]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Nature Activities &amp; Guided Walks</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Mindful barefoot forest canopy walks, stream visits, and outdoor contemplation.
                    </p>
                  </div>

                  <div className="reveal-init from-right delay-400 bg-white p-7 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-3 card-3d-tilt">
                    <Users className="w-8 h-8 text-[#C67856]" />
                    <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">Experienced Facilitators</h3>
                    <p className="text-xs text-[#5B665D] leading-relaxed">
                      Continuous warm support and guidance from certified instructors Anmol &amp; Komal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6.5. SIGNATURE FIXED-BACKGROUND PARALLAX: WHY CHOOSE US */}
            <WhyChooseUsParallax
              config={siteConfig}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 7. SANCTUARY GALLERY SECTION: 3D FLIP IN FROM RIGHT */}
            <section id="gallery" className="scroll-section scroll-flip-right py-24 px-5 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4 reveal-init from-top">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856]">
                    Sanctuary Life
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1F2E23]">
                    A Glimpse into Shunya Sync
                  </h2>
                  <p className="text-base text-[#556057] font-light">
                    Surrounded by pristine Himalayan nature in India, our retreats provide a peaceful sanctuary far from urban commotion.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeGalleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedGalleryImg(img.url)}
                      className={`reveal-init ${
                        idx % 3 === 0 ? 'from-left' : idx % 3 === 1 ? 'from-bottom' : 'from-right'
                      } delay-${(idx % 3 + 1) * 100} group relative rounded-3xl overflow-hidden shadow-sm aspect-[4/3] cursor-pointer border border-white/60 card-3d-tilt`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <p className="font-serif-display text-lg font-bold">{img.title}</p>
                        <p className="text-xs text-stone-300 font-light mt-0.5">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4 reveal-init from-bottom delay-400">
                  <button
                    onClick={() => navigateTo('gallery')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2E23] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition cursor-pointer"
                  >
                    <span>View Complete Sanctuary Photo Tour &rarr;</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 8. DIRECT CONTACT & INQUIRY FORM: 3D FLIP IN FROM LEFT */}
            <section id="contact" className="scroll-section scroll-flip-left py-24 px-5 sm:px-8 bg-[#F5F0E8] border-t border-[#E8E1D5] scroll-mt-20">
              <ContactPage
                config={siteConfig}
                onLeadSubmitted={(newLead) => setLeadsList((prev) => [newLead, ...prev])}
              />
            </section>
          </div>
        )}
      </main>

      {/* INFINITE TEXT TICKER SLIDER (DIRECTLY ABOVE FOOTER: LEFT TO RIGHT, CALM LUXURY SPEED) */}
      <div className="relative z-20 w-full bg-[#121B14] shadow-md border-y border-[#263728]">
        <MarqueeTicker direction="ltr" variant="dark" speed="slow" />
      </div>

      {/* ULTRA-LUXURY HIGH-END FOOTER WITH ALL PAGE ICONS, MULTI-DIRECTIONAL ENTRANCE & PROMINENT CLICKIN DMA BRANDING */}
      <Footer
        config={siteConfig}
        currentRoute={currentRoute}
        onNavigate={(route) => navigateTo(route)}
        onOpenBooking={() => handleOpenBooking()}
        onSecretAdminTrigger={() => setSecretAdminOpen(true)}
      />

      {/* 5. FLOATING WHATSAPP BUTTON (Always accessible) */}
      <FloatingWhatsApp
        phone={siteConfig.contact.phone}
        brandName={siteConfig.brandName}
      />

      {/* 6. QUICK BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DFD7CA] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold tracking-widest uppercase text-[#C67856]">
              Direct Sanctuary Reservation
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
              Book Your Spot
            </h3>
            <p className="text-xs text-[#5B665D] mt-1">
              Selected: <strong className="text-[#1F2E23]">{selectedPackageForModal}</strong> ({selectedRoomType})
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const saved = saveBookingLead({
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  package: formData.package,
                  roomType: formData.roomType,
                  datePreference: formData.datePreference,
                  message: formData.message
                });
                setLeadsList((prev) => [saved, ...prev]);
                setBookingModalOpen(false);
                alert(`Thank you ${formData.name}! Your reservation request has been submitted. Anmol & Komal will reach out shortly.`);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    name="phone"
                    placeholder="+91..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    name="email"
                    placeholder="email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                  Package
                </label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFD7CA] bg-[#FAF8F5] text-sm"
                >
                  <option value="2 Nights / 3 Days Retreat">2 Nights / 3 Days Retreat (Double ₹{(siteConfig?.pricing?.pkg2n3d?.twinPrice ?? 22000).toLocaleString()} | Private ₹{(siteConfig?.pricing?.pkg2n3d?.soloPrice ?? 26000).toLocaleString()})</option>
                  <option value="3 Nights / 4 Days Retreat">3 Nights / 4 Days Retreat (Double ₹{(siteConfig?.pricing?.pkg3n4d?.twinPrice ?? 26000).toLocaleString()} | Private ₹{(siteConfig?.pricing?.pkg3n4d?.soloPrice ?? 32000).toLocaleString()})</option>
                  <option value="4 Nights / 5 Days Retreat (Premium Experience)">4 Nights / 5 Days Retreat (Double ₹{(siteConfig?.pricing?.pkg4n5d?.twinPrice ?? 44000).toLocaleString()} | Private ₹{(siteConfig?.pricing?.pkg4n5d?.soloPrice ?? 52000).toLocaleString()})</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#5B665D] mb-1">
                  Room Choice
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center p-3 rounded-xl border text-xs cursor-pointer ${
                    formData.roomType === 'Twin Sharing' ? 'border-[#223326] bg-[#F0F4EF] font-bold text-[#1F2E23]' : 'border-[#DFD7CA]'
                  }`}>
                    <input
                      type="radio"
                      name="roomType"
                      value="Twin Sharing"
                      checked={formData.roomType === 'Twin Sharing'}
                      onChange={handleFormChange}
                      className="sr-only"
                    />
                    Twin Sharing
                  </label>
                  <label className={`flex items-center justify-center p-3 rounded-xl border text-xs cursor-pointer ${
                    formData.roomType === 'Solo' ? 'border-[#223326] bg-[#F0F4EF] font-bold text-[#1F2E23]' : 'border-[#DFD7CA]'
                  }`}>
                    <input
                      type="radio"
                      name="roomType"
                      value="Solo"
                      checked={formData.roomType === 'Solo'}
                      onChange={handleFormChange}
                      className="sr-only"
                    />
                    Solo Private Room
                  </label>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#223326] text-white hover:bg-[#152218] active:scale-95 cursor-pointer"
                >
                  Confirm &amp; Proceed
                </button>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#E8F8EE] flex items-center justify-center"
                  title="WhatsApp Instant Reserve"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. GALLERY LIGHTBOX MODAL */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedGalleryImg}
              alt="Sanctuary Expanded View"
              className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-xl"
            />
          </div>
        </div>
      )}
      {/* 8. SANCTUARY ADMIN MODAL (Directly accessible via /admin in URL) */}
      <SecretAdminModal
        isOpen={secretAdminOpen}
        onClose={() => {
          setSecretAdminOpen(false);
          if (window.location.pathname.startsWith('/admin') || window.location.hash.includes('admin')) {
            window.history.pushState(null, '', '/');
          }
        }}
        config={siteConfig}
        onUpdateConfig={(updated) => setSiteConfig(updated)}
      />
    </div>
  );
}
