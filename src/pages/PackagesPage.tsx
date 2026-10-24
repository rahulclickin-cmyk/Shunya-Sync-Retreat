import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../types/retreat';
import {
  Check,
  Calendar,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
  Flame,
  Music,
  Heart,
  Compass,
  Coffee,
  Leaf,
  Users,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export type PackageId = '2n3d' | '3n4d' | '4n5d';

interface PackagesPageProps {
  config: SiteConfig;
  initialPackage?: PackageId;
  onOpenBooking: (pkg: string, room: 'Twin Sharing' | 'Solo') => void;
}

interface ItineraryDayData {
  dayNumber: number;
  title: string;
  activities: string[];
}

interface PackageDetailData {
  id: PackageId;
  title: string;
  shortTitle: string;
  nightsDays: string;
  badge: string;
  tagline: string;
  emoji: string;
  popular?: boolean;
  itinerary: ItineraryDayData[];
}

export const PACKAGE_PHOTOS: Record<PackageId, Array<{ url: string; caption: string }>> = {
  '2n3d': [
    { url: 'https://www.shunyasync.com/images/DSC05576.JPG', caption: 'Sunrise River Yoga Session' },
    { url: 'https://www.shunyasync.com/images/DSC05974.JPG', caption: 'Nature Excursions & Walks' },
    { url: 'https://www.shunyasync.com/images/DSC06017.JPG', caption: 'Day 2 Evening Ganga Aarti' }
  ],
  '3n4d': [
    { url: 'https://www.shunyasync.com/images/DSC05503.JPG', caption: 'Yoga at Beach/Ghat' },
    { url: 'https://www.shunyasync.com/images/DSC05860.JPG', caption: 'Sacred Waterfalls & Nature' },
    { url: 'https://www.shunyasync.com/images/C9738T01.JPG', caption: 'Vibrational Sound Bath Sanctuary' }
  ],
  '4n5d': [
    { url: 'https://www.shunyasync.com/images/DSC05860.JPG', caption: 'Waterfall & Forest Streams' },
    { url: 'https://www.shunyasync.com/images/IMG_3221.JPG', caption: 'Forest Sanctuary Grounds' },
    { url: 'https://www.shunyasync.com/images/IMG_3218.JPG', caption: 'Ecstatic Dance & Kirtan' }
  ]
};

export const RETREAT_PACKAGES: Record<PackageId, PackageDetailData> = {
  '2n3d': {
    id: '2n3d',
    title: '2 Nights / 3 Days Retreat',
    shortTitle: '2N / 3D Retreat',
    nightsDays: '2 Nights / 3 Days',
    badge: 'Weekend Reset',
    tagline: 'A revitalizing weekend escape to disconnect from mental noise and restore physical energy.',
    emoji: '✨',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & Grounding',
        activities: [
          'Arrival & Welcome Drink',
          'Check-in to comfort & luxury accommodation',
          'Introduction Circle & Retreat Briefing',
          'Sunset Opening Circle & Restorative Tea',
          'Dinner (Satvik Meal)',
          'Lights off'
        ]
      },
      {
        dayNumber: 2,
        title: 'Inner Alignment & Sacred Aarti',
        activities: [
          'Morning Yoga Session (Asanas + Pranayama)',
          'Breakfast',
          'Chakra Healing',
          'Lunch',
          'Afternoon Excursion / Nature Walk',
          'Evening Ganga Aarti Experience',
          'Fun Activity (Dance / Group Games / Ice-breaking)',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 3,
        title: 'Integration & Departure',
        activities: [
          'Morning Meditation & Light Yoga Flow',
          'Breakfast',
          'Reflection Circle & Closing Ceremony',
          'Check-out'
        ]
      }
    ]
  },
  '3n4d': {
    id: '3n4d',
    title: '3 Nights / 4 Days Retreat',
    shortTitle: '3N / 4D Retreat',
    nightsDays: '3 Nights / 4 Days',
    badge: 'Most Popular',
    tagline: 'Our flagship transformation journey blending breath, sound, adventure, and deep release.',
    emoji: '🌿',
    popular: true,
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & Settling In',
        activities: [
          'Arrival & Welcome Ritual',
          'Check-in & Leisure Time',
          'Sunset Opening Circle & Herbal Tea',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 2,
        title: 'Body, Breath & Sacred Aarti',
        activities: [
          'Morning Yoga Session (Strength + Flexibility)',
          'Breakfast',
          'Pranayama & Breathwork Masterclass',
          'Lunch',
          'Afternoon Nature Excursion / Local Exploration',
          'Evening Ganga Aarti Experience',
          'Fun Activity (Dance Therapy / Group Bonding)',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 3,
        title: 'Energy Healing & Exploration',
        activities: [
          'Morning Meditation & Yoga Flow',
          'Breakfast',
          'Chakra Healing / Sound Healing',
          'Lunch',
          'Afternoon River Rafting / Adventure Activity',
          'Free Time / Riverside Chill',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 4,
        title: 'Closure & Departure',
        activities: [
          'Morning Gentle Yoga & Gratitude Meditation',
          'Breakfast',
          'Sharing Circle & Closing Ritual',
          'Check-out'
        ]
      }
    ]
  },
  '4n5d': {
    id: '4n5d',
    title: '4 Nights / 5 Days Retreat (Premium Experience)',
    shortTitle: '4N / 5D Premium',
    nightsDays: '4 Nights / 5 Days',
    badge: 'Premium Experience',
    tagline: 'Deep dive into profound stillness, artistic expression, adventure, and long-term life integration.',
    emoji: '🌸',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & Welcome',
        activities: [
          'Arrival, Welcome Drink & Check-in',
          'Leisure Time & Orientation',
          'Sunset Opening Circle & Restorative Sound Bath',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 2,
        title: 'Foundation of Wellness & Sacred Aarti',
        activities: [
          'Morning Yoga Session (Asanas + Pranayama)',
          'Breakfast',
          'Breathwork & Mindfulness Workshop',
          'Lunch',
          'Waterfall Nature Trail & Forest Excursion',
          'Evening Ganga Aarti Experience',
          'Fun Activity (Dance / Ice-breaker Games)',
          'Dinner',
          'Lights off'
        ]
      },
      {
        dayNumber: 3,
        title: 'Deep Healing & Adventure',
        activities: [
          'Morning Meditation & Advanced Yoga Flow',
          'Breakfast',
          'Chakra Healing / Sound Healing',
          'Lunch',
          'Afternoon River Rafting / Adventure Sports',
          'Free Time / Self Reflection',
          'Dinner',
          'Night: Silent Meditation'
        ]
      },
      {
        dayNumber: 4,
        title: 'Expansion & Joy',
        activities: [
          'Morning Sunrise Yoga & Breathwork',
          'Breakfast',
          'Inner Work Session (Journaling / Self-discovery)',
          'Lunch',
          'Afternoon Excursion / Café Hopping / Cultural Visit',
          'Fun Activity (Dance Night)',
          'Dinner',
          'Night: Gratitude Meditation'
        ]
      },
      {
        dayNumber: 5,
        title: 'Integration & Departure',
        activities: [
          'Morning Gentle Yoga & Closing Meditation',
          'Breakfast',
          'Closing Ceremony & Feedback',
          'Check-out'
        ]
      }
    ]
  }
};

export const PackagesPage: React.FC<PackagesPageProps> = ({
  config,
  initialPackage = '3n4d',
  onOpenBooking
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<PackageId>(initialPackage);

  useEffect(() => {
    if (initialPackage && (initialPackage === '2n3d' || initialPackage === '3n4d' || initialPackage === '4n5d')) {
      setSelectedPkgId(initialPackage);
    }
  }, [initialPackage]);

  const activePackage = RETREAT_PACKAGES[selectedPkgId];

  // Pricing values from site config or defaults
  const getPackagePrices = (id: PackageId) => {
    if (id === '2n3d') {
      const cfg = config?.pricing?.pkg2n3d;
      return {
        privatePrice: cfg?.soloPrice ?? 26000,
        doubleSharingPrice: cfg?.twinPrice ?? 22000
      };
    }
    if (id === '3n4d') {
      const cfg = config?.pricing?.pkg3n4d || config?.pricing?.pkg4d3n;
      return {
        privatePrice: cfg?.soloPrice ?? 32000,
        doubleSharingPrice: cfg?.twinPrice ?? 26000
      };
    }
    // 4n5d
    const cfg = config?.pricing?.pkg4n5d || config?.pricing?.pkg5d4n;
    return {
      privatePrice: cfg?.soloPrice ?? 52000,
      doubleSharingPrice: cfg?.twinPrice ?? 44000
    };
  };

  const prices = getPackagePrices(selectedPkgId);

  // Helper for WhatsApp inquiry
  const handleWhatsAppInquiry = (roomType: string) => {
    const rawNumber = config?.contact?.whatsappNumber || '919259698064';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Shunya Sync Team! I am interested in booking the "${activePackage.title}" (${roomType}). Please share details about upcoming retreat dates and availability.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      {/* 1. TOP HEADER & PACKAGE SELECTION TABS */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EDE2] text-[#C67856] text-xs font-bold uppercase tracking-widest border border-[#E8DFC0]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Shunya Sync Retreat Itinerary</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          Choose Your Duration
        </h1>

        <p className="text-base sm:text-lg text-[#556057] font-light max-w-2xl mx-auto">
          Choose your duration — each package includes a full day-by-day schedule and transparent pricing.
        </p>

        {/* 3 PACKAGE SELECTOR BUTTONS */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          {(['2n3d', '3n4d', '4n5d'] as PackageId[]).map((pkgKey) => {
            const pkg = RETREAT_PACKAGES[pkgKey];
            const isSelected = selectedPkgId === pkgKey;
            return (
              <button
                key={pkgKey}
                onClick={() => {
                  setSelectedPkgId(pkgKey);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#223326] text-white shadow-lg ring-2 ring-[#C67856] ring-offset-2 scale-105'
                    : 'bg-[#FAF8F5] text-[#3D473F] border border-[#DFD7CA] hover:bg-[#EFEAE1] hover:text-[#1F2E23]'
                }`}
              >
                <span className="text-base">{pkg.emoji}</span>
                <span>{pkg.title}</span>
                {pkg.popular && (
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#C67856] text-white' : 'bg-[#FBF0EA] text-[#C67856]'
                  }`}>
                    Popular
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DEDICATED PACKAGE VIEW: ONLY THE SELECTED RETREAT IS DISPLAYED */}
      <div className="space-y-12 animate-in fade-in zoom-in-95 duration-400">
        {/* Banner with Active Package Title & Badge */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E5DFD5] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#EFEAE1]/60 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5DFD5] pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EB] text-[#223326] text-xs font-semibold uppercase tracking-wider">
                <span>{activePackage.badge}</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2E23]">
                {activePackage.emoji} {activePackage.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5B665D] max-w-2xl font-light">
                {activePackage.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleWhatsAppInquiry('General')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#25D366] hover:bg-[#1EBE5D] text-white transition shadow cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Authentic Live Package Visual Preview Strip */}
          {PACKAGE_PHOTOS[selectedPkgId] && (
            <div className="mt-8 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#556057] mb-3">
                Atmosphere &amp; Experiences Included:
              </p>
              {(() => {
                const customCoverImage =
                  selectedPkgId === '2n3d'
                    ? config?.pricing?.pkg2n3d?.image
                    : selectedPkgId === '3n4d'
                    ? config?.pricing?.pkg3n4d?.image || config?.pricing?.pkg4d3n?.image
                    : config?.pricing?.pkg4n5d?.image || config?.pricing?.pkg5d4n?.image;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PACKAGE_PHOTOS[selectedPkgId].map((photo, i) => {
                      const displayUrl = (i === 0 && customCoverImage) ? customCoverImage : photo.url;
                      return (
                        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 border border-[#DFD7CA] shadow-sm">
                          <img
                            src={displayUrl}
                            alt={photo.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                            <span className="text-white text-xs font-medium tracking-wide">
                              {photo.caption}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Pricing Cards for THIS Package */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Private Accommodation Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#DFD7CA] shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C67856]">
                    Private Sanctuary
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
                    Private accommodation
                  </h3>
                </div>
                <span className="p-2 rounded-full bg-[#FAF8F5] text-[#223326]">
                  <Moon className="w-5 h-5" />
                </span>
              </div>

              <div>
                <p className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1F2E23]">
                  ₹{prices.privatePrice.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#717E73] mt-1">
                  per person
                </p>
              </div>

              <p className="text-xs text-[#556057] leading-relaxed">
                Enjoy complete solitude and personal space in your own private room with attached bathroom and serene nature vistas.
              </p>

              <button
                onClick={() => onOpenBooking(activePackage.title, 'Solo')}
                className="w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow cursor-pointer active:scale-95"
              >
                Book Private accommodation (₹{prices.privatePrice.toLocaleString()})
              </button>
            </div>

            {/* Double Sharing Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#DFD7CA] shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3F523E]">
                    Shared Experience
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1F2E23] mt-1">
                    Double sharing
                  </h3>
                </div>
                <span className="p-2 rounded-full bg-[#F4EFE6] text-[#C67856]">
                  <Users className="w-5 h-5" />
                </span>
              </div>

              <div>
                <p className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1F2E23]">
                  ₹{prices.doubleSharingPrice.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#717E73] mt-1">
                  per person
                </p>
              </div>

              <p className="text-xs text-[#556057] leading-relaxed">
                Come with a friend or partner, or let us pair you with a like-minded seeker of the same gender in comfortable twin beds.
              </p>

              <button
                onClick={() => onOpenBooking(activePackage.title, 'Twin Sharing')}
                className="w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#C67856] hover:bg-[#B36544] text-white transition shadow cursor-pointer active:scale-95"
              >
                Book Double sharing (₹{prices.doubleSharingPrice.toLocaleString()})
              </button>
            </div>
          </div>
        </div>

        {/* 3. DAY-BY-DAY ITINERARY DETAILS FOR THIS PACKAGE */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#DFD7CA] shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C67856]">
                Step-by-Step Schedule
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] mt-1">
                Itinerary — {activePackage.nightsDays}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-[#556057]">
              <Clock className="w-4 h-4 text-[#C67856]" />
              <span>Full day-by-day curated schedule</span>
            </div>
          </div>

          {/* List of Days */}
          <div className="space-y-6">
            {activePackage.itinerary.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DFD7CA] shadow-sm hover:border-[#C67856]/40 transition space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#223326] text-white font-serif-display font-bold flex items-center justify-center text-sm shadow">
                    D{day.dayNumber}
                  </span>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1F2E23]">
                    Day {day.dayNumber}: {day.title.replace(/^Day\s*\d+:\s*/i, '')}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {day.activities.map((act, actIdx) => (
                    <div
                      key={actIdx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#F0EAE1]"
                    >
                      <span className="mt-1 w-2 h-2 rounded-full bg-[#C67856] shrink-0" />
                      <span className="text-xs sm:text-sm text-[#2C332D] font-medium leading-relaxed">
                        {act}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA banner at the bottom of itinerary */}
          <div className="p-6 rounded-2xl bg-[#F0EAE1] border border-[#DFD7CA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif-display text-lg font-bold text-[#1F2E23]">
                Ready to experience the {activePackage.title}?
              </p>
              <p className="text-xs text-[#556057]">
                Seats are limited to ensure an intimate, high-vibe cohort of seekers.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking(activePackage.title, 'Twin Sharing')}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#223326] text-white hover:bg-black transition shadow cursor-pointer shrink-0"
            >
              Reserve Your Sanctuary Spot &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 4. WHAT'S INCLUDED IN ALL RETREATS */}
      <section className="bg-white rounded-3xl p-6 sm:p-12 border border-[#DFD7CA] shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#3F523E] bg-[#E8ECE6] px-3.5 py-1.5 rounded-full border border-[#D5DED3]">
            Comprehensive Care
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1F2E23]">
            What's Included in All Retreats
          </h2>
          <p className="text-sm text-[#5D6B60]">
            Everything is arranged so your only focus is resting, healing, and reconnecting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Comfortable Accommodation',
              desc: 'Serene rooms equipped with warm amenities and tranquil surroundings.'
            },
            {
              title: '2 Satvik Meals Daily',
              desc: 'Wholesome, freshly prepared vegetarian nourishment prepared with love.'
            },
            {
              title: 'Daily Yoga & Meditation Sessions',
              desc: 'Guided sunrise and sunset practices suitable for every experience level.'
            },
            {
              title: 'Chakra Healing & Sound Healing',
              desc: 'Vibrational Tibetan singing bowls, gong immersions, and energy balancing.'
            },
            {
              title: 'Excursions & Adventure Activities',
              desc: 'Mindful nature walks, Ganga Aarti, river experiences, and local exploration.'
            },
            {
              title: 'Evening Activities & Community bonding!',
              desc: 'Heart-opening circles, dance therapy, ice-breakers, and joyful connection.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFEAE1]"
            >
              <div className="w-6 h-6 rounded-full bg-[#223326] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-base font-bold text-[#1F2E23]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#556057] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RETREAT ACCOMMODATION & WHY CHOOSE US */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Retreat Accommodation */}
        <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#DFD7CA] shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#EFEAE1] text-[#223326] flex items-center justify-center">
            <Moon className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#C67856]">
              Peaceful Rest
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23]">
              Retreat accommodation
            </h3>
            <p className="text-base text-[#2C332D] font-medium pt-2">
              Calm rooms, warm amenities, and friendly hosts.
            </p>
            <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed pt-1">
              Every room is curated to offer undisturbed sleep, gentle natural light, fresh mountain breezes, and an atmosphere of pure tranquility.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#DFD7CA] shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF1EB] text-[#223326] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#223326]">
              Our Promise
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23]">
              Why Choose Us
            </h3>
          </div>

          <div className="space-y-2.5 pt-2">
            {[
              'Small, curated groups',
              'Beginner-friendly',
              'Premium yet affordable',
              'Nature + Spiritual blend',
              'Located near mountains and rivers'
            ].map((pt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C67856] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#2C332D]">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. WHAT WE OFFER (6 EXPERIENCES) */}
      <section className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-12 border border-[#DFD7CA] shadow-sm space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856]">
            The Journey Within
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1F2E23]">
            What We Offer
          </h2>
          <p className="text-sm sm:text-base text-[#5B665D] font-light">
            Every Shunya Sync retreat weaves these experiences into your journey — practices, nourishment, and moments that help you reset and return home renewed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Daily Yoga & Pranayama',
              desc: 'Guided sunrise and sunset sessions for all levels, by the river and in nature.',
              icon: Sun
            },
            {
              title: 'Meditation & Mindfulness',
              desc: 'Quiet inner work to release stress and restore clarity throughout your stay.',
              icon: Moon
            },
            {
              title: 'Sound Healing',
              desc: 'Vibrational therapy with singing bowls and sacred sound to deepen relaxation.',
              icon: Music
            },
            {
              title: 'Sattvic Nourishment',
              desc: 'Wholesome vegetarian meals prepared with care to support body and mind.',
              icon: Leaf
            },
            {
              title: 'Nature & Excursions',
              desc: 'Temple visits, river walks, and curated outings across Rishikesh.',
              icon: Compass
            },
            {
              title: 'Community & Celebration',
              desc: 'Dance, kirtan, and soulful evenings that connect you with fellow seekers.',
              icon: Heart
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#DFD7CA] shadow-sm space-y-3 hover:border-[#C67856]/50 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#223326] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C67856]" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#1F2E23]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B665D] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. OTHER RETREAT OPTIONS SWITCHER BANNER */}
      <div className="p-8 rounded-3xl bg-[#223326] text-[#F9F7F2] text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6A07E]">
            Explore All Durations
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
            Looking for a different retreat duration?
          </h3>
          <p className="text-xs sm:text-sm text-[#DFD7CA] font-light">
            Click on any retreat package below to view its specific day-by-day itinerary and pricing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {(['2n3d', '3n4d', '4n5d'] as PackageId[]).map((pkgKey) => {
            const pkg = RETREAT_PACKAGES[pkgKey];
            if (pkgKey === selectedPkgId) return null;
            return (
              <button
                key={pkgKey}
                onClick={() => {
                  setSelectedPkgId(pkgKey);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-[#1F2E23] border border-white/20 transition cursor-pointer flex items-center gap-2"
              >
                <span>{pkg.emoji}</span>
                <span>Switch to {pkg.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
