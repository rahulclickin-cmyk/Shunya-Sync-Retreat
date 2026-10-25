import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  Heart,
  Leaf,
  Sun,
  X
} from 'lucide-react';
import { SiteConfig, FaqItem } from '../types/retreat';
import { DEFAULT_SEO_CONFIG } from '../services/supabase';

interface FAQPageProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

// Comprehensive categorized curated FAQs to answer every common guest query
const COMPREHENSIVE_DEFAULT_FAQS: FaqItem[] = [
  {
    category: 'General & Philosophy',
    question: 'What is Shunya Sync Retreat and what does "Shunya" mean?',
    answer: 'Shunya (शून्य) is the ancient Sanskrit principle representing the sacred void, absolute stillness, and the zero-point from which clarity and rebirth arise. Shunya Sync is a boutique Himalayan wellness retreat limited to 10–14 seekers. We blend authentic Hatha yoga, 432Hz Tibetan & quartz sound therapy, somatic breathwork, and Ayurvedic sattvic nourishment to dissolve nervous system hyper-vigilance and restore deep inner presence.'
  },
  {
    category: 'General & Philosophy',
    question: 'Can beginners with zero prior yoga or meditation experience attend?',
    answer: 'Absolutely yes. Over 65% of our seekers have never attended a formal wellness retreat before. Our founders, Anmol Khatri (Movement Guide) and Komal Malhotra (Sound Alchemist), hold a gentle, completely non-judgmental space. Every posture and breath practice is customized to your body’s unique comfort and flexibility.'
  },
  {
    category: 'Retreat Experience & Schedule',
    question: 'What does a typical daily schedule look like at Shunya Sync?',
    answer: 'Days follow the natural circadian rhythm of the mountains: \n• 06:30 AM – Herbal tea & sunrise morning Pranayama / gentle Hatha flow\n• 08:45 AM – Organic farm-to-table Sattvic breakfast\n• 10:30 AM – Sacred silence forest bathing & conscious walking meditation\n• 01:00 PM – Ayurvedic midday community lunch & rest\n• 03:30 PM – Nervous system workshops & somatic release\n• 05:30 PM – 432Hz Sacred Sound Alchemy Dome immersion with singing bowls & gongs\n• 07:30 PM – Candlelit Sattvic dinner\n• 09:00 PM – Evening herbal nightcap & restorative sleep'
  },
  {
    category: 'Retreat Experience & Schedule',
    question: 'What is 432Hz Sound Healing and why is it special?',
    answer: 'Standard commercial music is tuned to 440Hz, which can heighten mental agitation. 432Hz is the natural acoustic resonance that aligns with the golden ratio (Phi) and the Earth’s Schumann resonance. Certified sound alchemist Komal Malhotra utilizes authentic hand-hammered Himalayan bronze bowls, tuned wind gongs, and quartz crystals to induce theta and delta brainwave states, releasing stored cellular tension and emotional fatigue.'
  },
  {
    category: 'Retreat Experience & Schedule',
    question: 'Is digital detox strictly mandatory?',
    answer: 'We warmly encourage an intentional digital fast to break dopamine exhaustion and blue-light stress. We recommend keeping phones turned off in your room during rituals. However, we do not confiscate personal devices. If you need to make urgent work or family calls, designated quiet areas are available, and our retreat team can provide an emergency contact line for your family.'
  },
  {
    category: 'Pricing, Suites & Booking',
    question: 'What is included in the retreat pricing?',
    answer: 'Everything is 100% all-inclusive with zero hidden fees:\n• Full luxury accommodations (Solo Suite or Twin Sharing eco-cottage)\n• 3 daily farm-to-table organic Ayurvedic vegetarian meals plus daily mountain herbal tonics\n• Daily sound baths, yoga, guided breathwork, and cacao ceremonies\n• High-grade yoga mats, organic meditation cushions, and journals\n• Private airport/railway transfers from transit points\n• Official mindful photography package of your journey'
  },
  {
    category: 'Pricing, Suites & Booking',
    question: 'How does Twin Sharing work if I am traveling solo?',
    answer: 'If you choose the Twin Sharing package as a solo traveler, we thoughtfully pair you with a retreat participant of the same gender. Many guests form lifelong friendships with their retreat roommates! If you prefer absolute privacy and your own private bathroom, we recommend reserving the Solo Suite.'
  },
  {
    category: 'Pricing, Suites & Booking',
    question: 'What is your cancellation and refund policy?',
    answer: 'Retreat Payment should be 30 days in advance. Under 45 days: 25% refund. Under 30 days: Non refundable.'
  },
  {
    category: 'Nutrition & Dietary Needs',
    question: 'What kind of food is served, and can you accommodate vegan or gluten-free diets?',
    answer: 'We serve 100% pure Sattvic vegetarian food prepared fresh each day by conscious Ayurvedic chefs. Ingredients are sourced from organic Himalayan hillside farms. The food is nutrient-dense, easily digestible, low in refined oils, and prepared without onion, garlic, or chemical additives. We effortlessly accommodate vegan, gluten-free, nut-free, and lactose-intolerant dietary requirements upon advance notice.'
  },
  {
    category: 'Nutrition & Dietary Needs',
    question: 'Are coffee, tea, and alcohol permitted at the retreat?',
    answer: 'We serve aromatic Himalayan herbal infusions, spiced golden milk, and organic ginger-tulsi teas. Commercial coffee is gently paused during the retreat to allow your adrenal glands and cortisol levels to reset. The property is strictly alcohol-free and smoke-free to honor the sacred frequency of the retreat.'
  },
  {
    category: 'Packing & Travel Logistics',
    question: 'What should I pack for the retreat in the mountains?',
    answer: 'We recommend packing:\n• Comfortable, loose-fitting cotton/linen clothing for yoga and movement\n• A warm sweater, fleece, or shawl for cool Himalayan morning and evening breezes\n• Comfortable slip-on sandals or walking shoes for nature forest walks\n• Personal toiletries (we provide organic herbal soap & shampoo)\n• Reusable water bottle\n• A journal or personal sketchbook (a sacred retreat notebook is also provided)'
  },
  {
    category: 'Packing & Travel Logistics',
    question: 'How do I reach the retreat in India?',
    answer: 'Our main retreat enclaves are nestled in the pristine forest foothills around Rishikesh / Dehradun, Uttarakhand, India. \n• By Air: Dehradun Jolly Grant Airport (DED) is 45 minutes away. Direct flights operate daily from Delhi, Mumbai, and Bengaluru.\n• By Train: Haridwar Railway Station or Yog Nagari Rishikesh Station are well-connected.\n• Complimentary scheduled retreat chauffeur pick-ups are provided on retreat arrival and departure dates.'
  },
  {
    category: 'Packing & Travel Logistics',
    question: 'Are there medical facilities or first aid available on-site?',
    answer: 'Yes. Our retreat center is equipped with a comprehensive first-aid station, pulse oximeters, blood pressure monitors, and natural homeopathic/Ayurvedic relief for travel fatigue. A reputable hospital is located within a 20-minute drive in case of any rare emergency.'
  }
];

export const FAQPage: React.FC<FAQPageProps> = ({ config, onOpenBooking }) => {
  // Combine custom FAQs from config/admin with comprehensive defaults
  const allFaqs = useMemo(() => {
    const customFaqs = config.seo?.faqs && config.seo.faqs.length > 0
      ? config.seo.faqs
      : DEFAULT_SEO_CONFIG.faqs;

    // Create a map to avoid duplicate questions
    const map = new Map<string, FaqItem>();

    // Add custom/configured FAQs first
    customFaqs.forEach((item) => {
      if (item.question?.trim()) {
        map.set(item.question.trim().toLowerCase(), {
          ...item,
          category: item.category || 'General & Philosophy'
        });
      }
    });

    // Merge comprehensive defaults
    COMPREHENSIVE_DEFAULT_FAQS.forEach((item) => {
      const key = item.question.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  }, [config.seo?.faqs]);

  // Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All Questions');
    allFaqs.forEach((faq) => {
      if (faq.category) set.add(faq.category);
    });
    return Array.from(set);
  }, [allFaqs]);

  // State
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All Questions' || faq.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        (faq.category && faq.category.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setOpenIndices(filteredFaqs.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndices([]);
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 animate-fade-in">
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE8] border border-[#E8DACF] text-xs font-semibold tracking-[0.2em] uppercase text-[#C67856]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Seeker Knowledge Base &amp; Preparation</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23] leading-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-base sm:text-lg text-[#556057] font-light leading-relaxed">
          Everything you need to know about our sacred Himalayan gatherings, all-inclusive pricing, Sattvic nourishment, room options, and travel preparations.
        </p>

        {/* Quick Highlights Badge Grid */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-[#3D473F]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD7CA] shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C67856]" />
            <span>Strict 10–14 Seeker Cap</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD7CA] shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>100% Organic Sattvic Cuisine</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD7CA] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C67856]" />
            <span>Beginner Welcoming</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD7CA] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#223326]" />
            <span>Zero Hidden Fees</span>
          </span>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS BAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#DFD7CA] shadow-sm space-y-5">
        {/* Search Input Box */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. beginner, twin sharing, airport, diet, clothes)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-[#1F2E23] placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C67856]/40 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & Expand/Collapse Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 border-t border-[#F0ECE1]">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1F2E23] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#EFEAE1] hover:text-[#1F2E23] border border-[#E5DFD5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Expand / Collapse */}
          <div className="flex items-center gap-2 text-xs shrink-0 text-stone-500 self-end lg:self-auto">
            <span className="text-[11px] font-medium text-stone-400 mr-1">
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </span>
            <button
              onClick={expandAll}
              className="px-2.5 py-1 rounded-lg hover:bg-stone-100 hover:text-stone-800 transition"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 rounded-lg hover:bg-stone-100 hover:text-stone-800 transition"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* 3. ACCORDION FAQ LIST */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#DFD7CA] space-y-3">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif-display text-xl font-bold text-[#1F2E23]">
              No questions found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Try searching with different keywords, or message our retreat hosts directly on WhatsApp for immediate personal assistance.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Questions');
              }}
              className="mt-2 px-5 py-2 rounded-full text-xs font-semibold bg-[#223326] text-white hover:bg-[#152218] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={faq.question}
                className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#C67856]/60 shadow-md ring-1 ring-[#C67856]/20'
                    : 'border-[#DFD7CA] hover:border-stone-300 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 pr-2">
                    {faq.category && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C67856] bg-[#FDF6F2] px-2.5 py-0.5 rounded-full border border-[#F3DFD5]">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1F2E23] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#F9ECE5] text-[#C67856] rotate-180'
                        : 'bg-[#FAF8F5] text-stone-500 hover:bg-stone-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[#4E5950] leading-relaxed border-t border-[#F5EFE7] animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="whitespace-pre-line bg-[#FCFAF7] p-4 sm:p-5 rounded-2xl border border-[#EFEAE1] mt-2">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. STILL HAVE QUESTIONS CTA BOX */}
      <div className="bg-gradient-to-br from-[#1C2C20] via-[#223326] to-[#162319] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#2D4533] relative overflow-hidden space-y-6">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#E3A387]">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Personal Human Support</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-white">
            Have a Specific Question or Custom Accommodation Need?
          </h2>

          <p className="text-sm sm:text-base text-[#B3C2B5] font-light leading-relaxed">
            Our hosts Anmol and Komal personally answer all guest inquiries regarding medical adjustments, travel connections, and custom dietary preparation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${config.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-widest font-semibold transition shadow-md hover:shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C67856] hover:bg-[#B56745] text-white text-xs uppercase tracking-widest font-semibold transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Submit Booking Inquiry</span>
            </button>

            <a
              href={`mailto:${config.contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs uppercase tracking-wider font-semibold border border-white/20 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
          <HelpCircle className="w-96 h-96 text-white" />
        </div>
      </div>
    </div>
  );
};
