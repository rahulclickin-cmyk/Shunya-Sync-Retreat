import React from 'react';
import { SiteConfig } from '../types/retreat';
import { Leaf, Sun, Heart, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-20 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EFE9] text-[#C67856] text-xs font-semibold uppercase tracking-[0.2em] border border-[#E9D9CF]">
          <Leaf className="w-3.5 h-3.5" />
          <span>Our Sacred Genesis</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          About Shunya Sync
        </h1>
        <p className="font-serif-display italic text-lg sm:text-2xl text-[#556057]">
          &ldquo;Disconnect from chaos. Reconnect with your true self.&rdquo;
        </p>
      </div>

      {/* Main Philosophy Section with 3D Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] card-3d-tilt">
            <img
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
              alt="Shunya Sync Meditation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#1F2E23] text-white shadow-xl max-w-xs hidden sm:block border border-[#3E5242]">
            <p className="text-xs uppercase tracking-widest text-[#E3A387] font-semibold">The Meaning of Shunya</p>
            <p className="text-sm font-serif-display italic mt-1 text-stone-200">
              The sacred zero — stillness before creation, the space where the mind returns to peace.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1F2E23] leading-tight">
            Healing Begins When We Gather in Sacred Presence
          </h2>
          <p className="text-base text-[#556057] leading-relaxed font-light">
            {config.aboutText}
          </p>
          <p className="text-base text-[#556057] leading-relaxed font-light">
            In our hyper-connected world, human nervous systems are subjected to sensory overload. At Shunya Sync, we strip away artificial urgency and return to biological rhythms: sunrise movement, pure sound frequencies, organic soil, and authentic communal connection.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-[#1F2E23] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#C67856]" />
              <span>Ancient Yogic Lineage</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1F2E23] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#C67856]" />
              <span>Certified Sound Therapists</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1F2E23] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#C67856]" />
              <span>Safe Emotional Containers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Deep Bio */}
      <div className="pt-12 border-t border-[#DFD7CA] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A9687]">
            Visionary Facilitators
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1F2E23]">
            Meet the Founders
          </h2>
          <p className="text-sm text-[#5B665D]">
            Guided with open hearts by Anmol Khatti and Komal Makhetra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founder 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#DFD7CA] shadow-lg card-3d-tilt space-y-6">
            <div className="flex items-center gap-5">
              <img
                src={config.founder1.image}
                alt={config.founder1.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#C67856]"
              />
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23]">{config.founder1.name}</h3>
                <p className="text-xs uppercase tracking-wider text-[#C67856] font-semibold">{config.founder1.title}</p>
                <p className="text-xs text-[#8A9687] mt-0.5">{config.founder1.note}</p>
              </div>
            </div>
            <p className="text-sm text-[#5B665D] leading-relaxed">
              {config.founder1.bio}
            </p>
          </div>

          {/* Founder 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#DFD7CA] shadow-lg card-3d-tilt space-y-6">
            <div className="flex items-center gap-5">
              <img
                src={config.founder2.image}
                alt={config.founder2.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8A9687]"
              />
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23]">{config.founder2.name}</h3>
                <p className="text-xs uppercase tracking-wider text-[#3F523E] font-semibold">{config.founder2.title}</p>
                <p className="text-xs text-[#8A9687] mt-0.5">{config.founder2.note}</p>
              </div>
            </div>
            <p className="text-sm text-[#5B665D] leading-relaxed">
              {config.founder2.bio}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl p-8 sm:p-12 bg-[#223326] text-white text-center space-y-6 shadow-xl card-3d-tilt">
        <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#FAF7F0]">
          Ready to Step into Your Sacred Pause?
        </h3>
        <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light">
          Join our upcoming intimate circle in India. Connect directly with Anmol and Komal to reserve your spot.
        </p>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C67856] hover:bg-[#B36544] text-white transition shadow-lg active:scale-95"
        >
          Reserve Your Spot
        </button>
      </div>
    </div>
  );
};
