import React, { useState } from 'react';
import {
  Compass,
  Heart,
  Calendar,
  Sparkles,
  Sun,
  Award,
  Camera,
  BookOpen,
  Home,
  Shield,
  FileText,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Volume2,
  Lock,
  ExternalLink,
  Instagram,
  CheckCircle2
} from 'lucide-react';
import { SiteConfig, PageRoute } from '../types/retreat';

interface FooterProps {
  config: SiteConfig;
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenBooking: () => void;
  onSecretAdminTrigger: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  currentRoute,
  onNavigate,
  onOpenBooking,
  onSecretAdminTrigger
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailSub('');
    }, 4000);
  };

  const handleSecretClick = () => {
    setSecretClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onSecretAdminTrigger();
        return 0;
      }
      return next;
    });
    setTimeout(() => setSecretClickCount(0), 2500);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello ${config.founder1.name} & ${config.founder2.name}! I am interested in joining the upcoming Shunya Sync Retreat cohort. Could you please share dates and availability?`
    );
    return `https://wa.me/${config.contact.whatsappNumber}?text=${text}`;
  };

  return (
    <footer className="scroll-section bg-[#FAF8F5] text-[#2C3E30] pt-14 sm:pt-16 pb-0 border-t border-[#EAE3D6] relative overflow-hidden">
      {/* Soft atmospheric ambient tints matching the peaceful retreat brand */}
      <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-[#C67856]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[32rem] h-[32rem] bg-[#8FA382]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12 relative z-10">
        {/* 1. TOP LUXURY HIGHLIGHT BAR (3 Value Pillars in light styling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 border-b border-[#EAE3D6]">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-white/90 border border-[#E7E0D3] flex items-center gap-3.5 hover:border-[#C67856]/60 hover:shadow-md transition-all duration-300 group shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#F6EFE6] border border-[#E8DFD2] text-[#C67856] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#C67856] group-hover:text-white transition-all duration-300 shadow-xs">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-[#1F2E23] font-semibold">432Hz Sound Alchemy</h5>
              <p className="text-[11px] text-[#637567] leading-tight mt-0.5">Vibrational Tibetan &amp; Quartz singing bowls</p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-white/90 border border-[#E7E0D3] flex items-center gap-3.5 hover:border-emerald-600/50 hover:shadow-md transition-all duration-300 group shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#EAF2EC] border border-[#D5E3D8] text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-[#1F2E23] font-semibold">Intimate Circle Limit</h5>
              <p className="text-[11px] text-[#637567] leading-tight mt-0.5">Strictly 10–14 seekers for deep transformation</p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-white/90 border border-[#E7E0D3] flex items-center gap-3.5 hover:border-amber-600/50 hover:shadow-md transition-all duration-300 group shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#FAF3E0] border border-[#EFE1BD] text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-[#1F2E23] font-semibold">100% Pure Sattvic Diet</h5>
              <p className="text-[11px] text-[#637567] leading-tight mt-0.5">Ayurvedic farm-to-table organic meals</p>
            </div>
          </div>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* COLUMN 1: Brand & Sacred Genesis */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {config.showLogoIcon !== false && (
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E5C158] p-1 flex items-center justify-center shadow-xs shrink-0">
                    <img
                      src={config.logoUrl || '/logo.png'}
                      alt={config.brandName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="font-serif-display text-2xl sm:text-3xl text-[#1F2E23] font-normal tracking-tight block">
                    {config.brandName}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#C67856] font-semibold">
                    {config.brandSubtitle || 'Sacred Himalayan Sanctuary'}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFE6] border border-[#E5DDD0] text-[11px] text-[#8C5D44] tracking-wider uppercase font-medium">
                <Sparkles className="w-3 h-3 text-[#C67856]" />
                <span>Sacred Wellness Sanctuary • India</span>
              </div>
            </div>

            <p className="text-xs text-[#526355] leading-relaxed font-light">
              {config.tagline}
            </p>
            <p className="text-xs text-[#526355] leading-relaxed font-light">
              Rooted in authentic Himalayan yoga traditions, 432Hz acoustic vibrational alchemy, and pure organic sattvic nourishment to bring you into harmony with natural universal rhythms.
            </p>

            {/* Newsletter / Circle dispatch */}
            <div className="pt-2 space-y-2.5">
              <p className="text-[11px] uppercase tracking-wider text-[#1F2E23] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C67856]" />
                <span>Receive Sacred Circle Reflections</span>
              </p>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>🙏 Namaste! You have joined the sacred circle dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-[#1F2E23] placeholder-[#8A9687] text-xs focus:outline-none focus:ring-1 focus:ring-[#C67856] focus:border-[#C67856] transition shadow-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#C67856] hover:bg-[#B56745] text-white text-xs font-semibold tracking-wider transition shadow-xs hover:shadow active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social & Direct Contact Badges */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/${config.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#25D366] text-[#4E6152] hover:text-white flex items-center justify-center border border-[#DDD5C7] hover:border-[#25D366] transition-all duration-300 hover:scale-110 shadow-xs"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#C67856] text-[#4E6152] hover:text-white flex items-center justify-center border border-[#DDD5C7] hover:border-[#C67856] transition-all duration-300 hover:scale-110 shadow-xs"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="w-9 h-9 rounded-full bg-white hover:bg-emerald-600 text-[#4E6152] hover:text-white flex items-center justify-center border border-[#DDD5C7] hover:border-emerald-600 transition-all duration-300 hover:scale-110 shadow-xs"
                title="Sanctuary Direct Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-pink-600 text-[#4E6152] hover:text-white flex items-center justify-center border border-[#DDD5C7] hover:border-pink-600 transition-all duration-300 hover:scale-110 shadow-xs"
                title="Instagram Retreat Moments"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Retreat Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#1F2E23] border-b border-[#EAE3D6] pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C67856]" />
                <span>Retreat Navigation</span>
              </span>
              <span className="text-[10px] text-stone-500 font-normal">9 Pages</span>
            </h4>

            <ul className="space-y-1 text-xs text-[#526355]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'home'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Home Sanctuary</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'about'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">About Shunya Sync &amp; Founders</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'packages'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Retreat Packages &amp; Pricing</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'experiences'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Where Shunya Sync Takes You</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('inclusions')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'inclusions'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Sun className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">What’s Included in All Retreats</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'why-us'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Award className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Why Choose Us (Pillars)</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'gallery'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Camera className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Sanctuary Photo Tour</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'journal'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Journal &amp; Sacred Wisdom</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'faq'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">FAQs &amp; Preparation</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'contact'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Sanctuary Contact &amp; Inquiry</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Legal & Guest Protections */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#1F2E23] border-b border-[#EAE3D6] pb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C67856]" />
              <span>Guest Protections</span>
            </h4>

            <ul className="space-y-1 text-xs text-[#526355]">
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'privacy-policy'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('terms-conditions')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'terms-conditions'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Terms &amp; Conditions</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('cancellation-refund')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'cancellation-refund'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Refund Policy</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('health-waiver')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'health-waiver'
                      ? 'bg-[#EFE9DD] text-[#1F2E23] font-medium'
                      : 'hover:bg-[#F2ECE1] hover:text-[#1F2E23]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Health &amp; Medical Waiver</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left hover:bg-[#F2ECE1] hover:text-[#1F2E23]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Questions &amp; FAQ</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-[#EAE3D6] space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#4E6152]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856] shrink-0" />
                <span>Small Circles (10-14 Max)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#4E6152]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Pure Sattvic Diet</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#4E6152]">
                <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Secure Direct Booking</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Sanctuary Channels & Facilitators */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#1F2E23] border-b border-[#EAE3D6] pb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C67856]" />
              <span>Sanctuary Contact</span>
            </h4>

            {/* Facilitators Quick Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#E7E0D3] space-y-2.5 shadow-xs hover:border-[#C67856]/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#C67856] font-semibold">Your Hosts</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Cohorts Open</span>
                </span>
              </div>
              <p className="font-serif-display text-base text-[#1F2E23] font-medium">
                {config.founder1.name} &amp; {config.founder2.name}
              </p>
              <p className="text-[11px] text-[#637567] leading-relaxed">
                Certified Yoga Guides &amp; Vibrational Sound Alchemists holding sacred space across India.
              </p>
            </div>

            {/* Direct Channels */}
            <ul className="space-y-2 text-xs text-[#526355]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C67856] shrink-0" />
                <a
                  href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-[#1F2E23] hover:text-[#C67856] transition font-medium"
                >
                  {config.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C67856] shrink-0" />
                <a
                  href={`mailto:${config.contact.email}`}
                  className="hover:text-[#C67856] text-[#1F2E23] transition"
                >
                  {config.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C67856] shrink-0 mt-0.5" />
                <span className="text-[#526355]">{config.contact.location}</span>
              </li>
            </ul>

            {/* Direct Booking CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-full bg-[#C67856] hover:bg-[#B56745] text-white text-xs uppercase tracking-widest font-semibold transition shadow-sm hover:shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Sanctuary Spot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-full border border-emerald-600/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT & SACRED MANTRA ROW */}
        <div className="pt-8 pb-5 border-t border-[#EAE3D6] text-stone-600 text-xs font-normal">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            {/* Copyright with hidden admin trigger on triple tap */}
            <p
              onClick={handleSecretClick}
              className="text-[#6A7C6E] text-[11px] cursor-default select-none transition"
              title="© Shunya Sync"
            >
              © {new Date().getFullYear()} {config.brandName} Retreat. All rights reserved.
            </p>

            {/* Sacred Mantra */}
            <p className="font-serif-display italic text-[#6A7C6E] text-xs max-w-md text-center sm:text-right">
              &ldquo;Disconnect the noise, find your true self and sync with the universe.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 4. SUBTLE, REFINED AGENCY BRANDING AT THE VERY BOTTOM */}
      <div className="py-3.5 px-4 border-t border-[#EBE3D6] bg-[#F3EDE3]/70 text-center">
        <p className="text-[10px] sm:text-[11px] text-[#7A8B7E] tracking-wide inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <span>Designed and Developed by</span>
          <a
            href="https://www.clickindm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1F2E23] hover:text-[#C67856] underline decoration-[#C67856]/40 underline-offset-3 hover:decoration-[#C67856] transition inline-flex items-center gap-1"
          >
            <span>CLICKIN DM</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#C67856] inline-block opacity-80" />
          </a>
          <span className="text-[#B3C1B5]">•</span>
          <a
            href="https://www.clickindm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5F7063] hover:text-[#C67856] underline decoration-stone-300 underline-offset-3 transition"
          >
            www.clickindm.com
          </a>
        </p>
      </div>
    </footer>
  );
};
