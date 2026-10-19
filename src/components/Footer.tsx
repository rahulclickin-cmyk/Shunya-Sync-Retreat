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
  Leaf,
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
    <footer className="scroll-section bg-[#111A13] text-[#D8D2C6] pt-16 sm:pt-20 pb-0 border-t border-[#233526] relative overflow-hidden">
      {/* Ambient background glows for high-end atmospheric depth */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#C67856]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[36rem] h-[36rem] bg-[#1E3322]/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-transparent via-[#0F1711]/40 to-[#0B120D] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14 relative z-10">
        {/* 1. TOP LUXURY HIGHLIGHT BAR (3 Value Pillars with directional entrance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 border-b border-[#233626]">
          {/* Pillar 1: Glides from LEFT */}
          <div className="reveal-init from-left delay-100 p-4 rounded-2xl bg-[#17251A]/80 border border-[#283E2D] flex items-center gap-3.5 hover:border-[#C67856]/50 transition-all duration-300 group">
            <div className="w-11 h-11 rounded-xl bg-[#203424] border border-[#2F4A34] text-[#E3A387] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#C67856] group-hover:text-white transition-all duration-300 shadow-sm">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-white font-medium">432Hz Sound Alchemy</h5>
              <p className="text-[11px] text-[#9FB0A1] leading-tight mt-0.5">Vibrational Tibetan &amp; Quartz singing bowls</p>
            </div>
          </div>

          {/* Pillar 2: Glides from TOP */}
          <div className="reveal-init from-top delay-200 p-4 rounded-2xl bg-[#17251A]/80 border border-[#283E2D] flex items-center gap-3.5 hover:border-[#C67856]/50 transition-all duration-300 group">
            <div className="w-11 h-11 rounded-xl bg-[#203424] border border-[#2F4A34] text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-white font-medium">Intimate Circle Limit</h5>
              <p className="text-[11px] text-[#9FB0A1] leading-tight mt-0.5">Strictly 10–14 seekers for deep transformation</p>
            </div>
          </div>

          {/* Pillar 3: Glides from RIGHT */}
          <div className="reveal-init from-right delay-100 p-4 rounded-2xl bg-[#17251A]/80 border border-[#283E2D] flex items-center gap-3.5 hover:border-[#C67856]/50 transition-all duration-300 group">
            <div className="w-11 h-11 rounded-xl bg-[#203424] border border-[#2F4A34] text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif-display text-sm text-white font-medium">100% Pure Sattvic Diet</h5>
              <p className="text-[11px] text-[#9FB0A1] leading-tight mt-0.5">Ayurvedic farm-to-table organic meals</p>
            </div>
          </div>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* COLUMN 1: Brand & Sacred Genesis (Glides from LEFT) */}
          <div className="lg:col-span-4 space-y-6 reveal-init from-left delay-100">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1E2F22] border border-[#2E4733] flex items-center justify-center text-[#E3A387] shadow-md">
                  <Leaf className="w-5 h-5 text-[#C67856]" />
                </div>
                <span className="font-serif-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
                  {config.brandName}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18261B] border border-[#293F2D] text-[11px] text-[#E3A387] tracking-wider uppercase font-medium">
                <Sparkles className="w-3 h-3 text-[#C67856]" />
                <span>Sacred Wellness Sanctuary • India</span>
              </div>
            </div>

            <p className="text-xs text-[#9FB0A1] leading-relaxed font-light">
              {config.tagline}
            </p>
            <p className="text-xs text-[#9FB0A1] leading-relaxed font-light">
              Rooted in authentic Himalayan yoga traditions, 432Hz acoustic vibrational alchemy, and pure organic sattvic nourishment to bring you into harmony with natural universal rhythms.
            </p>

            {/* Newsletter / Circle dispatch */}
            <div className="pt-2 space-y-2.5">
              <p className="text-[11px] uppercase tracking-wider text-stone-200 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C67856]" />
                <span>Receive Sacred Circle Reflections</span>
              </p>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#17251A] border border-[#283E2D] text-white placeholder-[#788879] text-xs focus:outline-none focus:ring-1 focus:ring-[#C67856] focus:border-[#C67856] transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#C67856] hover:bg-[#B56745] text-white text-xs font-semibold tracking-wider transition shadow-sm hover:shadow active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social & Direct Contact Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${config.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#18261B] hover:bg-[#25D366] text-stone-300 hover:text-white flex items-center justify-center border border-[#293F2D] transition-all duration-300 hover:scale-110 shadow-sm"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="w-9 h-9 rounded-full bg-[#18261B] hover:bg-[#C67856] text-stone-300 hover:text-white flex items-center justify-center border border-[#293F2D] transition-all duration-300 hover:scale-110 shadow-sm"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="w-9 h-9 rounded-full bg-[#18261B] hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center border border-[#293F2D] transition-all duration-300 hover:scale-110 shadow-sm"
                title="Sanctuary Direct Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#18261B] hover:bg-pink-600 text-stone-300 hover:text-white flex items-center justify-center border border-[#293F2D] transition-all duration-300 hover:scale-110 shadow-sm"
                title="Instagram Retreat Moments"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Retreat Navigation with Individual Icons & Dynamic Hover (Glides from TOP) */}
          <div className="lg:col-span-3 space-y-4 reveal-init from-top delay-200">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-white border-b border-[#283E2D] pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C67856]" />
                <span>Retreat Navigation</span>
              </span>
              <span className="text-[10px] text-stone-400 font-normal">9 Pages</span>
            </h4>

            <ul className="space-y-1.5 text-xs text-[#9FB0A1]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'home'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Home Sanctuary</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'about'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">About Shunya Sync &amp; Founders</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'packages'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Retreat Packages &amp; Pricing</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'experiences'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Where Shunya Sync Takes You</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('inclusions')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'inclusions'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Sun className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">What’s Included in All Retreats</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'why-us'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Award className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Why Choose Us (Pillars)</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'gallery'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Camera className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Sanctuary Photo Tour</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'journal'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Journal &amp; Sacred Wisdom</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'contact'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 group-hover:text-[#E3A387] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Sanctuary Contact &amp; Inquiry</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Legal & Guest Protections with Individual Icons (Glides from BOTTOM) */}
          <div className="lg:col-span-2 space-y-4 reveal-init from-bottom delay-300">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-white border-b border-[#283E2D] pb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C67856]" />
              <span>Guest Protections</span>
            </h4>

            <ul className="space-y-1.5 text-xs text-[#9FB0A1]">
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'privacy-policy'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('terms-conditions')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'terms-conditions'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Terms &amp; Conditions</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('cancellation-refund')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'cancellation-refund'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Refund Policy</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('health-waiver')}
                  className={`w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    currentRoute === 'health-waiver'
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Health &amp; Medical Waiver</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full group flex items-center justify-between px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-left hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-[#C67856] group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Questions &amp; FAQ</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-[#283E2D] space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856] shrink-0" />
                <span>Small Circles (10-14 Max)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Pure Sattvic Diet</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-300">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Secure Direct Booking</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Sanctuary Channels & Facilitators (Glides from RIGHT) */}
          <div className="lg:col-span-3 space-y-4 reveal-init from-right delay-200">
            <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-white border-b border-[#283E2D] pb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C67856]" />
              <span>Sanctuary Contact</span>
            </h4>

            {/* Facilitators Quick Card */}
            <div className="p-4 rounded-2xl bg-[#17251A] border border-[#283E2D] space-y-2.5 shadow-sm hover:border-[#C67856]/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#E3A387] font-semibold">Your Hosts</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Cohorts Open</span>
                </span>
              </div>
              <p className="font-serif-display text-base text-white font-medium">
                {config.founder1.name} &amp; {config.founder2.name}
              </p>
              <p className="text-[11px] text-[#9FB0A1] leading-relaxed">
                Certified Yoga Guides &amp; Vibrational Sound Alchemists holding sacred space across India.
              </p>
            </div>

            {/* Direct Channels */}
            <ul className="space-y-2 text-xs text-[#9FB0A1]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C67856] shrink-0" />
                <a
                  href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-white hover:text-[#E3A387] transition font-medium"
                >
                  {config.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C67856] shrink-0" />
                <a
                  href={`mailto:${config.contact.email}`}
                  className="hover:text-white transition"
                >
                  {config.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C67856] shrink-0 mt-0.5" />
                <span>{config.contact.location}</span>
              </li>
            </ul>

            {/* Direct Booking CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-full bg-[#C67856] hover:bg-[#B56745] text-white text-xs uppercase tracking-widest font-semibold transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Sanctuary Spot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-full border border-emerald-600/60 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/40 hover:text-white text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. DEDICATED SEPARATE AGENCY BRANDING & COPYRIGHT BOTTOM BAR */}
        <div className="pt-10 pb-8 border-t border-[#1C2C1F] text-stone-400 text-xs font-normal">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
            {/* Copyright */}
            <p className="text-stone-400 text-[11px]">
              © {new Date().getFullYear()} {config.brandName} Retreat. All rights reserved.
            </p>

            {/* PROMINENT, ULTRA-CLASSY AGENCY BRANDING (CLICKIN DMA) */}
            <div className="flex items-center justify-center gap-2.5 py-1.5 px-4 rounded-full bg-[#162319] border border-[#273D2C] shadow-inner hover:border-[#C67856]/60 transition-all duration-300 group">
              <span className="text-[11px] sm:text-xs tracking-wide text-stone-300">
                Designed and Developed by{' '}
                <a
                  href="https://clickindma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white group-hover:text-[#E3A387] underline decoration-[#C67856]/40 underline-offset-4 hover:decoration-[#C67856] transition inline-flex items-center gap-1"
                >
                  <span>CLICKIN DMA</span>
                  <ExternalLink className="w-3 h-3 text-[#C67856] inline-block opacity-75 group-hover:opacity-100" />
                </a>{' '}
                - <span className="text-stone-300 font-medium">Digital Marketing Agency</span>
              </span>
            </div>

            {/* Sacred Mantra */}
            <p className="font-serif-display italic text-[#A7B6A9] text-xs max-w-xs text-center lg:text-right">
              &ldquo;Disconnect the noise, find your true self and sync with the universe.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
