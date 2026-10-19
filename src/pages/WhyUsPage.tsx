import React from 'react';
import { Users, Heart, Award, ShieldCheck, Leaf, Compass } from 'lucide-react';

interface WhyUsPageProps {
  onOpenBooking: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
          The Shunya Sync Difference
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          Why Choose Us
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          We purposefully avoid massive commercial retreat factories. Every Shunya Sync gathering is an intimate sanctuary built on safety, authentic human warmth, and mindful presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Small Intimate Groups</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            We cap our retreat cohorts to a maximum of 10 to 14 participants. This prevents social overwhelm and ensures everyone has space to be truly seen, heard, and supported.
          </p>
        </div>

        {/* 2 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Personalized Attention</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            Because our circles are intimate, facilitators Anmol &amp; Komal actively tailor yoga alignments, breathwork intensities, and sound healing frequencies to your specific physical condition.
          </p>
        </div>

        {/* 3 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Certified Instructors &amp; Hosts</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            Our facilitators are certified sound therapy alchemists and certified yoga instructors with hundreds of hours of real sadhana and clinical holding space experience.
          </p>
        </div>

        {/* 4 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Beginner Friendly</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            Zero flexibility or past meditation experience is required. We take pride in welcoming newcomers into a loving, non-judgmental container where you can start exactly as you are.
          </p>
        </div>

        {/* 5 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Nature &amp; Spiritual Blend</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            We merge authentic ancient Vedic and Himalayan spirituality with grounding outdoor nature immersion, scientific nervous system regulation, and joyous creative expression.
          </p>
        </div>

        {/* 6 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23]">Safe &amp; Supportive Space</h2>
          <p className="text-sm text-[#5B665D] leading-relaxed">
            Total confidentiality, emotional safety, clean verified properties, and compassionate facilitation ensure that you can completely drop your guard and heal.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow-lg active:scale-95"
        >
          Join Our Next Intimate Circle
        </button>
      </div>
    </div>
  );
};
