import React, { useState } from 'react';
import { SiteConfig } from '../types/retreat';
import { Check, ChevronDown, ChevronUp, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface PackagesPageProps {
  config: SiteConfig;
  onOpenBooking: (pkg: string, room: 'Twin Sharing' | 'Solo') => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ config, onOpenBooking }) => {
  const [selectedTab, setSelectedTab] = useState<'4d3n' | '5d4n'>('4d3n');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
          Curated Immersion Journeys
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          Retreat Packages &amp; Itineraries
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          Choose between our classic weekend transformation or deep multi-day sanctuary retreat in India.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 bg-[#EFEAE1] rounded-full border border-[#DFD7CA] mt-4">
          <button
            onClick={() => {
              setSelectedTab('4d3n');
              setExpandedDay(1);
            }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              selectedTab === '4d3n' ? 'bg-[#223326] text-white shadow-md' : 'text-[#5B665D] hover:text-[#1F2E23]'
            }`}
          >
            4 Days / 3 Nights Retreat
          </button>
          <button
            onClick={() => {
              setSelectedTab('5d4n');
              setExpandedDay(1);
            }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              selectedTab === '5d4n' ? 'bg-[#223326] text-white shadow-md' : 'text-[#5B665D] hover:text-[#1F2E23]'
            }`}
          >
            5 Days / 4 Nights (Premium)
          </button>
        </div>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: 4D/3N */}
        <div
          className={`rounded-3xl p-8 border transition-all duration-300 card-3d-tilt ${
            selectedTab === '4d3n'
              ? 'bg-white border-[#C67856] ring-2 ring-[#C67856]/20 shadow-xl'
              : 'bg-[#FAF8F5] border-[#DFD7CA]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8A9687]">
                {config.pricing.pkg4d3n.badge}
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                {config.pricing.pkg4d3n.title}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#F0F4EF] text-[#223326] text-xs font-semibold">
              Weekend Reset
            </span>
          </div>

          <p className="text-sm text-[#5B665D] mt-3">
            {config.pricing.pkg4d3n.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#F7F4EE] border border-[#EBE4D8] text-center">
            <div>
              <p className="text-xs uppercase text-[#8A9687] font-medium">Twin Sharing</p>
              <p className="text-3xl font-serif-display font-bold text-[#1F2E23] mt-1">
                ₹{(config?.pricing?.pkg4d3n?.twinPrice ?? 32000).toLocaleString()}
              </p>
              <p className="text-[11px] text-[#717E73]">Per person sharing</p>
            </div>
            <div className="border-l border-[#DFD7CA] pl-2">
              <p className="text-xs uppercase text-[#8A9687] font-medium">Solo Room</p>
              <p className="text-3xl font-serif-display font-bold text-[#1F2E23] mt-1">
                ₹{(config?.pricing?.pkg4d3n?.soloPrice ?? 26000).toLocaleString()}
              </p>
              <p className="text-[11px] text-[#717E73]">Per person private</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-xs sm:text-sm text-[#4E5950]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#3F523E]" />
              <span>Full 3 days of guided itinerary</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#3F523E]" />
              <span>Daily sound baths &amp; morning Pranayama</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#3F523E]" />
              <span>All sattvic gourmet vegetarian meals</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => onOpenBooking(config?.pricing?.pkg4d3n?.title || '4 Days / 3 Nights Retreat', 'Twin Sharing')}
              className="flex-1 py-3 px-4 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#223326] text-white hover:bg-[#152218] transition shadow"
            >
              Book 4D/3N
            </button>
          </div>
        </div>

        {/* Card 2: 5D/4N */}
        <div
          className={`rounded-3xl p-8 border transition-all duration-300 card-3d-tilt ${
            selectedTab === '5d4n'
              ? 'bg-white border-[#C67856] ring-2 ring-[#C67856]/20 shadow-xl'
              : 'bg-[#FAF8F5] border-[#DFD7CA]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C67856]">
                Deep Transformation
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                {config?.pricing?.pkg5d4n?.title || '5 Days / 4 Nights Retreat'}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FBF0EA] text-[#C67856] text-xs font-semibold">
              {config?.pricing?.pkg5d4n?.badge || 'Premium Experience'}
            </span>
          </div>

          <p className="text-sm text-[#5B665D] mt-3">
            {config?.pricing?.pkg5d4n?.description || 'Deep dive into sacred silence, ecstatic movement, advanced sound baths, and permanent life integration.'}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#F7F4EE] border border-[#EBE4D8] text-center">
            <div>
              <p className="text-xs uppercase text-[#8A9687] font-medium">Twin Sharing</p>
              <p className="text-3xl font-serif-display font-bold text-[#1F2E23] mt-1">
                ₹{(config?.pricing?.pkg5d4n?.twinPrice ?? 44000).toLocaleString()}
              </p>
              <p className="text-[11px] text-[#717E73]">Per person sharing</p>
            </div>
            <div className="border-l border-[#DFD7CA] pl-2">
              <p className="text-xs uppercase text-[#8A9687] font-medium">Solo Room</p>
              <p className="text-3xl font-serif-display font-bold text-[#1F2E23] mt-1">
                ₹{(config?.pricing?.pkg5d4n?.soloPrice ?? 38000).toLocaleString()}
              </p>
              <p className="text-[11px] text-[#717E73]">Per person private</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-xs sm:text-sm text-[#4E5950]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C67856]" />
              <span>Extended 5-day itinerary with sacred cacao ceremony</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C67856]" />
              <span>Advanced somatic sound journeys &amp; ecstatic movement</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C67856]" />
              <span>1-on-1 energy consultation with Anmol &amp; Komal</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => onOpenBooking(config.pricing.pkg5d4n.title, 'Twin Sharing')}
              className="flex-1 py-3 px-4 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#C67856] text-white hover:bg-[#B36544] transition shadow"
            >
              Book 5D/4N Premium
            </button>
          </div>
        </div>
      </div>

      {/* Day by Day Schedule Details */}
      <div className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-10 border border-[#DFD7CA]">
        <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mb-6">
          {selectedTab === '4d3n' ? '4 Days / 3 Nights Full Itinerary' : '5 Days / 4 Nights Premium Full Itinerary'}
        </h3>

        {selectedTab === '4d3n' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-2">Day 1: Arrival &amp; Grounding</strong>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#556057]">
                <li>• Arrival &amp; Welcome Ritual (Botanical tea ceremony)</li>
                <li>• Check-in &amp; Orientation through sanctuary grounds</li>
                <li>• Opening Circle &amp; Intention Setting</li>
                <li>• Light Dinner (Sattvic organic food)</li>
                <li>• Evening Sound Bath (Tibetan singing bowls for restorative sleep)</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-2">Day 2: Inner Alignment &amp; Adventure</strong>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#556057]">
                <li>• Morning Yoga Session (Energy + Pranayama)</li>
                <li>• Breakfast (Nutrient-dense seasonal fruits and grains)</li>
                <li>• Nature Walk / Outdoor Meditation in forest canopy</li>
                <li>• Lunch in silent mindfulness</li>
                <li>• Afternoon Session (Breathwork / Sharing Circle)</li>
                <li>• Evening Fire Ceremony / Free Time around sacred bonfire</li>
                <li>• Dinner &amp; evening tea</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-2">Day 3: Integration &amp; Departure</strong>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#556057]">
                <li>• Morning Meditation &amp; Light Yoga</li>
                <li>• Celebration farewell breakfast feast</li>
                <li>• Closing Circle &amp; Integration for returning home</li>
                <li>• Check-out &amp; departure renewed</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-1">Day 1: Arrival &amp; Welcome</strong>
              <p className="text-xs sm:text-sm text-[#556057]">Grounding botanical welcome drink, check-in, sunset opening circle, mindfulness dinner, and deep restorative sound immersion.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-1">Day 2: Foundation of Wellness</strong>
              <p className="text-xs sm:text-sm text-[#556057]">Chakra alignment Hatha yoga, sattvic breakfast, guided forest bathing &amp; riverbed meditation, restorative breathwork mastery circle, twilight silent reflection.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-1">Day 3: Deep Healing &amp; Adventure</strong>
              <p className="text-xs sm:text-sm text-[#556057]">Pranayama sunrise practice, conscious breakfast, sacred mountain trail walk, sound healing vibrational immersion &amp; gong journey, starlight campfire ceremony.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-1">Day 4: Expansion &amp; Joy</strong>
              <p className="text-xs sm:text-sm text-[#556057]">Vibrant movement &amp; ecstatic dance, nourishing brunch, cacao ritual &amp; heart-opening circle, evening celebration kirtan &amp; celebratory dinner banquet.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#DFD7CA]">
              <strong className="text-lg font-serif-display text-[#1F2E23] block mb-1">Day 5: Integration &amp; Departure</strong>
              <p className="text-xs sm:text-sm text-[#556057]">Gratitude sunrise meditation, gentle restorative yoga, farewell breakfast banquet, closing integration circle &amp; blessings, departure with clear purpose.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
