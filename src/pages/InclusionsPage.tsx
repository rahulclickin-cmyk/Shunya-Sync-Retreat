import React from 'react';
import { Sun, Volume2, Leaf, Compass, MapPin, Sparkles, Users, CheckCircle2 } from 'lucide-react';

interface InclusionsPageProps {
  onOpenBooking: () => void;
}

export const InclusionsPage: React.FC<InclusionsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#3F523E] bg-[#E8ECE6] px-3.5 py-1.5 rounded-full border border-[#D5DED3]">
          All-Inclusive Care
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          What’s Included in All Retreats
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B60] font-light">
          From the moment you step foot into our retreat sanctuary, your every need is lovingly taken care of.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Inclusion 1 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">Daily Yoga &amp; Meditation Sessions</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            Morning dynamic energy asana, pranayama channel breath purification, and twilight guided silent meditation sessions tailored for every body and experience level.
          </p>
        </div>

        {/* Inclusion 2 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <Volume2 className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">Sound Healing Sessions</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            Full-body vibrational baths utilizing 7-metal antique Himalayan bowls, symphonic gongs, and 432Hz harmonic chimes to dissolve cellular stress.
          </p>
        </div>

        {/* Inclusion 3 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">All Meals (Vegetarian / Sattvic)</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            3 wholesome gourmet vegetarian meals each day, plus morning herbal elixirs, afternoon tea, and cleansing nighttime golden milks prepared with organic local produce.
          </p>
        </div>

        {/* Inclusion 4 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">Accommodation</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            Peaceful nature rooms with organic linens, hot showers, natural ventilation, and views overlooking lush green forest canopies and mountains.
          </p>
        </div>

        {/* Inclusion 5 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F4EF] text-[#223326] flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">Nature Activities &amp; Guided Walks</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            Guided Shinrin-yoku (forest bathing), mindfulness barefoot grounding, sacred riverbed walks, and open-air contemplative sessions.
          </p>
        </div>

        {/* Inclusion 6 */}
        <div className="bg-white p-8 rounded-3xl border border-[#DFD7CA] shadow-sm space-y-4 card-3d-tilt">
          <div className="w-12 h-12 rounded-2xl bg-[#FBF0EA] text-[#C67856] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-[#1F2E23]">Opening &amp; Closing Ceremonies</h2>
          <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
            Intention setting circles, bonfire release rituals, heart-opening cacao or tea ceremonies, and practical tools to integrate peace into daily urban life.
          </p>
        </div>
      </div>

      {/* Facilitator Highlight */}
      <div className="bg-[#1F2E23] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl card-3d-tilt">
        <span className="text-xs uppercase tracking-widest text-[#E3A387] font-semibold">Continuous Guidance</span>
        <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F0]">
          Experienced Facilitators Present Throughout
        </h3>
        <p className="text-sm text-stone-300 leading-relaxed max-w-2xl mx-auto font-light">
          Unlike large resorts with shifting staff, founders Anmol Khatti and Komal Makhetra hold space alongside you throughout the entire retreat journey.
        </p>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C67856] hover:bg-[#B36544] text-white transition shadow active:scale-95"
        >
          Reserve With All Inclusions
        </button>
      </div>
    </div>
  );
};
