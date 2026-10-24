import React from 'react';
import { SiteConfig } from '../types/retreat';
import { Sparkles, Heart, Compass, ArrowRight } from 'lucide-react';

interface AboutFoundersSectionProps {
  config: SiteConfig;
  onOpenBooking?: () => void;
  showExtendedBios?: boolean;
}

export const AboutFoundersSection: React.FC<AboutFoundersSectionProps> = ({
  config,
  onOpenBooking,
  showExtendedBios = true
}) => {
  const founder1 = config.founder1 || (config.site_settings as any)?.founders?.founder1 || (config.pages_content as any)?.founders?.founder1 || {
    name: 'Anmol Khatri',
    title: 'Founder & Movement Guide',
    note: 'Mindful breathwork & grounded presence',
    bio: 'Anmol brings years of dedicated sadhana in traditional Hatha yoga, somatic movement, and nervous system regulation.',
    image: 'https://www.shunyasync.com/images/founder-1.jpg'
  };

  const founder2 = config.founder2 || (config.site_settings as any)?.founders?.founder2 || (config.pages_content as any)?.founders?.founder2 || {
    name: 'Komal Malhotra',
    title: 'Founder & Sound Alchemist',
    note: 'Vibrational therapy & intuitive healing',
    bio: 'Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance.',
    image: 'https://www.shunyasync.com/images/cofounder.JPG'
  };

  const anmolImage = founder1.image || 'https://www.shunyasync.com/images/founder-1.jpg';
  const komalImage = founder2.image || 'https://www.shunyasync.com/images/cofounder.JPG';

  const whyWeStartedText =
    config.whyWeStarted || 'To offer intimate, soulful journeys away from daily noise.';
  const whatMakesUsDifferentText =
    config.whatMakesUsDifferent ||
    'Intimate groups, nature-based settings, soulful evenings, and expert guides.';

  const aboutParagraph =
    config.aboutText ||
    'At Shunya Sync Retreat, At Shunya Sync, we curate soulful retreats that bring together yoga, mindfulness, nature, adventure, and meaningful human connections—helping you reconnect with yourself and live with greater clarity and purpose.';

  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="space-y-12 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFE6] border border-[#E5DDD0] text-[11px] text-[#8C5D44] tracking-widest uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C67856]" />
            <span>Our Sacred Founders &amp; Genesis</span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23] tracking-tight">
            About Shunya Sync
          </h2>

          <p className="text-base sm:text-lg text-[#4E5D52] leading-relaxed font-light">
            {aboutParagraph}
          </p>
        </div>

        {/* 2 Portrait Founders Cards (Directly matching the authentic photo layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Founder 1: Anmol Khatri */}
          <div className="group rounded-[28px] overflow-hidden bg-white border border-[#E7DFD3] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-100">
              <img
                src={anmolImage}
                alt={founder1.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-5 sm:p-6 bg-white">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#1F2E23]">
                {founder1.name}
              </h3>
            </div>
          </div>

          {/* Founder 2: Komal Malhotra */}
          <div className="group rounded-[28px] overflow-hidden bg-white border border-[#E7DFD3] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-100">
              <img
                src={komalImage}
                alt={founder2.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-5 sm:p-6 bg-white">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#1F2E23]">
                {founder2.name}
              </h3>
            </div>
          </div>
        </div>

        {/* 2 Feature Cards: Why we started & What makes us different */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: Why we started */}
          <div className="p-7 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#EAE3D6] shadow-xs hover:border-[#C67856]/40 transition space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#C67856]">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-serif-display text-xl sm:text-2xl font-normal text-[#1F2E23]">
                Why we started
              </h4>
            </div>
            <p className="text-sm sm:text-base text-[#526355] leading-relaxed font-light pl-10">
              {whyWeStartedText}
            </p>
          </div>

          {/* Card 2: What makes us different */}
          <div className="p-7 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#EAE3D6] shadow-xs hover:border-[#C67856]/40 transition space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EAF2EC] flex items-center justify-center text-emerald-800">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-serif-display text-xl sm:text-2xl font-normal text-[#1F2E23]">
                What makes us different
              </h4>
            </div>
            <p className="text-sm sm:text-base text-[#526355] leading-relaxed font-light pl-10">
              {whatMakesUsDifferentText}
            </p>
          </div>
        </div>

        {/* Action Prompt */}
        {onOpenBooking && (
          <div className="text-center pt-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Meet {founder1.name} &amp; {founder2.name} in Person</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
