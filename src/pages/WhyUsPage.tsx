import React from 'react';
import { SiteConfig } from '../types/retreat';
import { WhyChooseUsParallax } from '../components/WhyChooseUsParallax';
import { DEFAULT_SITE_CONFIG } from '../services/supabase';

interface WhyUsPageProps {
  onOpenBooking: () => void;
  config?: SiteConfig;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onOpenBooking, config = DEFAULT_SITE_CONFIG }) => {
  return (
    <div className="animate-fade-in">
      {/* Intro Subtitle Bar */}
      <div className="bg-[#FAF8F5] py-10 px-5 text-center border-b border-[#EAE3D6]">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
            The Shunya Sync Difference
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2E23]">
            Curated Sanctuary, Zero Overwhelm
          </h1>
          <p className="text-sm sm:text-base text-[#556057] font-light max-w-2xl mx-auto">
            We purposefully avoid massive commercial retreat factories. Every Shunya Sync gathering is an intimate sanctuary built on safety, authentic human warmth, and mindful presence.
          </p>
        </div>
      </div>

      {/* Signature Fixed-Background Parallax Section */}
      <WhyChooseUsParallax config={config} onOpenBooking={onOpenBooking} />

      {/* Closing Assurance Box */}
      <div className="py-16 px-5 bg-[#FAF8F5] border-t border-[#EAE3D6] text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="font-serif-display text-xl sm:text-2xl text-[#1F2E23] italic">
            &ldquo;In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.&rdquo;
          </p>
          <div>
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow-lg active:scale-95 cursor-pointer"
            >
              Join Our Next Intimate Circle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
