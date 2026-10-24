import React from 'react';
import { CheckCircle2, Sun, Volume2, Heart, ArrowRight } from 'lucide-react';

interface ExperiencesPageProps {
  onOpenBooking: () => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-20 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
          The Three Sacred Pillars
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          Where Shunya Sync Takes You
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B60] font-light">
          Curated experiences woven into every retreat. From day to week-long journeys.
        </p>
      </div>

      {/* Pillar 1 Deep Dive: Yoga */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] card-3d-tilt">
            <img
              src="https://www.shunyasync.com/images/DSC05503.JPG"
              alt="Yoga Guided Sessions beside the Ganges"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F0F4EF] text-[#223326] text-xs font-semibold uppercase tracking-wider">
            Pillar 01 • Movement &amp; Alignment
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F2E23]">
            1. Yoga — Deepen your practice with guided sessions
          </h2>
          <p className="text-base text-[#5B665D] leading-relaxed font-light">
            Our daily yoga sessions are rooted in ancient Hatha and Vinyasa traditions, balanced with restorative somatic awareness. Whether you are an absolute beginner or an advanced yogi, our certified guides adapt every posture to honor your body&apos;s natural alignment.
          </p>
          <ul className="space-y-3 text-sm text-[#3E4A40]">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Sunrise dynamic pranayama to awaken vitality (Prana)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Spinal decompressive asanas to release accumulated posture stress</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Evening restorative yin and chakra balancing</span>
            </li>
          </ul>
          <div>
            <a
              href="https://www.instagram.com/reel/DXtQI5Fko0_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#DFD7CA] text-xs font-semibold text-[#1F2E23] hover:text-[#C67856] hover:border-[#C67856] transition"
            >
              <span>▶ Watch Yoga Session Glimpse on Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Pillar 2 Deep Dive: Sound Healing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#FBF0EA] text-[#C67856] text-xs font-semibold uppercase tracking-wider">
            Pillar 02 • Acoustic Medicine
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F2E23]">
            2. Sound Healing — Vibrational therapy for deep relaxation and inner peace
          </h2>
          <p className="text-base text-[#5B665D] leading-relaxed font-light">
            Everything in existence vibrates at specific frequencies. During our immersive sound baths, master alchemist Komal Malhotra utilizes handcrafted 7-metal Tibetan bowls, resonant symphonic gongs, Koshi chimes, and 432Hz tuning instruments to facilitate spontaneous delta-wave trance states.
          </p>
          <ul className="space-y-3 text-sm text-[#3E4A40]">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Subcellular acoustic massage that releases chronic somatic holding patterns</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Significant reduction of cortisol and stimulation of nitric oxide</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Profound sleep enhancement and neurological recalibration</span>
            </li>
          </ul>
          <div>
            <a
              href="https://www.instagram.com/reel/DXycIlIS6jH/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#DFD7CA] text-xs font-semibold text-[#1F2E23] hover:text-[#C67856] hover:border-[#C67856] transition"
            >
              <span>▶ Watch Waterfall Sound Healing on Instagram</span>
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] card-3d-tilt">
            <img
              src="https://www.shunyasync.com/images/C9738T01.JPG"
              alt="Sound Healing Tibetan Singing Bowls"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pillar 3 Deep Dive: Dance & Fun */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] card-3d-tilt">
            <img
              src="https://www.shunyasync.com/images/DSC05719.JPG"
              alt="Free Movement & Joyful Ecstatic Dance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F0F4EF] text-[#223326] text-xs font-semibold uppercase tracking-wider">
            Pillar 03 • Expressive Joy
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F2E23]">
            3. Dance &amp; Fun — Free movement sessions and activities for joy &amp; connection
          </h2>
          <p className="text-base text-[#5B665D] leading-relaxed font-light">
            Spiritual growth is not solemn or rigid — it is inherently joyful! Our ecstatic dance and free movement journeys create an entirely judgment-free space to laugh, spin, release emotional heaviness, and rediscover uninhibited child-like delight alongside kindred souls.
          </p>
          <ul className="space-y-3 text-sm text-[#3E4A40]">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Non-choreographed, spontaneous somatic freedom</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Evening starlit bonfire circles, live acoustic drumming, and storytelling</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C67856] shrink-0" />
              <span>Deep dopamine and endorphin release that bonds the cohort in love</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="text-center pt-8">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow-lg inline-flex items-center gap-2 active:scale-95"
        >
          <span>Experience All 3 Pillars</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
