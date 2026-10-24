import React from 'react';
import { SiteConfig } from '../types/retreat';
import { AboutFoundersSection } from '../components/AboutFoundersSection';
import { Leaf, CheckCircle2, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onOpenBooking }) => {
  return (
    <div className="py-10 sm:py-16 space-y-16 animate-fade-in">
      {/* 1. Main About & Authentic Founders Section (Matching User's Real Photos & Design) */}
      <AboutFoundersSection
        config={config}
        onOpenBooking={onOpenBooking}
        showExtendedBios={true}
      />

      {/* 2. Deep Philosophy & Meaning of Shunya */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-[32px] bg-[#F4EFE6] border border-[#E5DDD0]">
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
              <img
                src="https://www.shunyasync.com/images/IMG_3021.JPG"
                alt="Shunya Sync Sacred Circle & Presence"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 p-5 rounded-2xl bg-[#1F2E23] text-white shadow-xl max-w-xs hidden sm:block border border-[#3E5242]">
              <p className="text-[10px] uppercase tracking-widest text-[#E3A387] font-semibold">The Meaning of Shunya</p>
              <p className="text-xs font-serif-display italic mt-1 text-stone-200">
                The sacred zero — stillness before creation, the space where the mind returns to peace.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C67856]">
              Core Foundation
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1F2E23] leading-tight">
              Healing Begins When We Gather in Sacred Presence
            </h3>
            <p className="text-sm sm:text-base text-[#526355] leading-relaxed font-light">
              In our hyper-connected world, human nervous systems are subjected to constant sensory overload. At Shunya Sync, we strip away artificial urgency and return to biological rhythms: sunrise movement, pure sound frequencies, organic soil, and authentic communal connection.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1F2E23] font-medium bg-white px-3.5 py-1.5 rounded-full border border-[#DFD7CA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856]" />
                <span>Ancient Yogic Lineage</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1F2E23] font-medium bg-white px-3.5 py-1.5 rounded-full border border-[#DFD7CA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856]" />
                <span>Certified Sound Therapists</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1F2E23] font-medium bg-white px-3.5 py-1.5 rounded-full border border-[#DFD7CA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856]" />
                <span>Safe Emotional Containers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sanctuary Call to Action */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="rounded-[32px] p-8 sm:p-12 bg-[#1F2E23] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C67856]/15 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#FAF7F0]">
            Ready to Step into Your Sacred Pause?
          </h3>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Join our upcoming intimate circle in India. Connect directly with {config.founder1?.name || 'Anmol Khatri'} and {config.founder2?.name || 'Komal Malhotra'} to reserve your spot.
          </p>
          <div>
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C67856] hover:bg-[#B36544] text-white transition shadow-lg active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Reserve Your Sanctuary Spot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
