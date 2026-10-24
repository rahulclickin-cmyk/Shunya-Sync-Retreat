import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SiteConfig, BenefitSlide, BookingLead, SupabaseConfig, SeoConfig, BlogPost } from '../types/retreat';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Science of 432Hz: How Sacred Sound Downregulates the Nervous System',
    slug: 'science-of-432hz-sound-healing',
    category: 'Sound Healing',
    author: 'Anmol Khatri',
    date: 'October 14, 2026',
    readTime: '6 min read',
    summary: 'Explore the biophysical mechanisms through which Tibetan singing bowls and gong harmonics shift brainwaves from high-stress beta states down into theta and delta stillness.',
    content: `Sound is not merely something we perceive through our auditory canal; it is a vibrational tactile force that bathes every organ, cellular membrane, and neural pathway in the human body.

In our high-velocity modern existence, the human nervous system is repeatedly pushed into sympathetic overdrive—the fight-or-flight state. Cortisol levels remain chronically elevated, digestion slows, and restorative theta brainwave cycles become rare.

### Why 432Hz Resonance Matters
While commercial audio standards are calibrated to 440Hz, ancient acoustic instruments and natural harmonic geometries resonate closer to 432Hz. Known as the natural frequency of the golden ratio, 432Hz aligns with the mathematical patterns found in pine cones, unfurling ferns, and the Earth's natural resonance.

When subjected to acoustic vibrations from handcrafted Himalayan singing bowls, our neural oscillations naturally entrain with these slower frequencies:
1. **Beta Waves (14–30 Hz)**: Active problem solving, stress, vigilance.
2. **Alpha Waves (8–13 Hz)**: Deep calm, creative contemplation.
3. **Theta Waves (4–7 Hz)**: Somatic cellular repair, deep meditation, emotional integration.

During our daily 432Hz sacred sound immersions at Shunya Sync, participants lie comfortably in our acoustically tuned sanctuary dome. As the resonance washes over, the vagus nerve signals the adrenal glands to halt adrenaline release, enabling profound rest and cellular restoration.`,
    image: 'https://www.shunyasync.com/images/C9738T01.JPG',
    tag: 'Sound Alchemy',
    published: true
  },
  {
    id: 'post-2',
    title: 'Pranayama in the Pines: Awakening Prana Through Himalayan Mountain Air',
    slug: 'pranayama-in-the-pines-himalayan-breath',
    category: 'Yoga & Breathwork',
    author: 'Komal Malhotra',
    date: 'October 08, 2026',
    readTime: '5 min read',
    summary: 'Why practicing conscious breath control at dawn surrounded by pine forest canopy elevates oxygen saturation, purifies subtle energy channels, and restores mental clarity.',
    content: `Breath is the bridge between the conscious and unconscious mind. In yogic philosophy, *Prana* is not simply breath—it is the subtle life force that animates all living matter.

When we awaken at dawn in the Himalayan foothills, the mountain atmosphere carries a uniquely high concentration of negative air ions and pine terpenes. Practicing Pranayama in this living sanctuary has an exponential healing impact on the lungs and nervous system.

### The Sacred Breathwork Sequence
At Shunya Sync, each sunrise begins with conscious breathwork:
- **Kapalabhati (Skull Shining Breath)**: Gently stimulates the digestive fire and purifies the frontal sinuses.
- **Nadi Shodhana (Alternate Nostril Breathing)**: Equalizes energy flow between Pingala (solar active channel) and Ida (lunar reflective channel), balancing the brain's hemispheres.
- **Bhramari (Humming Bee Breath)**: The internal humming vibration stimulates nitric oxide production in the nasal airways and calms the vagal complex within seconds.

Seekers discover that when the breath becomes slow, deep, and rhythmic, the turbulent mind automatically settles into the zero-point of peace.`,
    image: 'https://www.shunyasync.com/images/DSC05503.JPG',
    tag: 'Breathwork',
    published: true
  },
  {
    id: 'post-3',
    title: 'The Sattvic Kitchen: Why Pure Vegetarian Food Changes Your Meditation Depth',
    slug: 'sattvic-kitchen-ayurvedic-meditation-nutrition',
    category: 'Ayurvedic Nourishment',
    author: 'Anmol Khatri',
    date: 'September 30, 2026',
    readTime: '7 min read',
    summary: 'According to Ayurveda, the purity of mind (Sattva) begins on your plate. Learn why seasonal, garden-fresh ingredients open pathways for effortless stillness.',
    content: `In the ancient texts of the Chandogya Upanishad, it is written: *"From the purity of food comes the purity of nature; from the purity of nature comes memory; and from memory, freedom from all bonds."*

Most people view food merely as calories, proteins, and carbohydrates. In the Ayurvedic tradition, food is *Brahma*—sacred energy that directly influences your mental states:
- **Tamasic Food**: Heavy, stale, processed, or overly greasy. Causes lethargy, brain fog, and depression.
- **Rajasic Food**: Overly spicy, caffeinated, sour, or stimulating. Agitates thoughts, elevates heart rate, and sparks restlessness.
- **Sattvic Food**: Light, organic, seasonal, prepared with reverence. Enhances mental clarity, compassion, and deep meditative absorption.

At Shunya Sync, all meals are grown on terraced organic farms without chemical pesticides. Prepared fresh with digestive spices like fresh ginger, turmeric root, cumin, and coriander, each meal leaves you light, energized, and ready for silent contemplation.`,
    image: 'https://www.shunyasync.com/images/satvik.JPG',
    tag: 'Ayurveda',
    published: true
  },
  {
    id: 'post-4',
    title: 'Solo Travel as a Spiritual Mirror: Finding Freedom Beyond Social Conditioning',
    slug: 'solo-travel-spiritual-mirror-retreat',
    category: 'Inner Alignment',
    author: 'Komal Malhotra',
    date: 'September 20, 2026',
    readTime: '8 min read',
    summary: 'Over 65% of Shunya Sync guests arrive alone. Here is how entering an intimate circle of strangers allows you to shed societal masks and experience pure self-acceptance.',
    content: `Throughout daily life, we are constantly holding up masks: the reliable employee, the attentive parent, the dutiful partner, the accomplished professional. We become so entangled in who we are supposed to be that we forget who we are underneath.

When you pack a single bag and travel alone to a sacred retreat, something miraculous happens:
Nobody in the room knows your job title, your past regrets, or your social status. You enter a circle of seekers where everyone has come to lay down their heavy armor.

### Sacred Vulnerability in Small Circles
Because our cohort is strictly limited to 10–14 participants, you are never lost in a crowd. During evening sharing circles, bonfires, and silent tea rituals, deep human connection blossoms without pretense.

Seekers often tell us that the friends they met at Shunya Sync feel like family they had known for centuries. When you return home, you carry not just relaxation, but a grounded, clear knowing of your authentic self.`,
    image: 'https://www.shunyasync.com/images/DSC05738.JPG',
    tag: 'Inner Growth',
    published: true
  }
];

export const DEFAULT_SEO_CONFIG: SeoConfig = {
  metaTitle: 'Shunya Sync Retreat — Mindful Yoga, Sound Healing & Forest Stillness in India',
  metaDescription: 'Disconnect from chaos, discover your true self, and sync with the universe. Luxury 4D/3N & 5D/4N sacred wellness retreats in India with 432Hz sound therapy, Hatha yoga, and organic sattvic nourishment.',
  keywords: 'wellness retreat India, sound healing retreat, yoga retreat India, Rishikesh yoga retreat, 432Hz sound bath, mindful meditation, sattvic food retreat, digital detox India, Shunya Sync',
  ogImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2560&q=85',
  canonicalUrl: 'https://shunyasync.com',
  geoRegion: 'IN-UT',
  geoPlacename: 'Rishikesh, Uttarakhand, India',
  geoPosition: '30.0869;78.2676',
  aeoSummary: 'Shunya Sync Retreat is an intimate transformative wellness and sound healing sanctuary in India, hosted by Anmol Khatri & Komal Malhotra, featuring 432Hz acoustic therapy, authentic Hatha yoga, and 100% farm-to-table sattvic cuisine.',
  faqs: [
    {
      question: 'What is Shunya Sync Retreat?',
      answer: 'Shunya Sync Retreat is a boutique sacred wellness gathering in India limited to 10–14 participants, blending mindful Hatha yoga, 432Hz Tibetan & quartz sound baths, guided forest bathing, and Ayurvedic sattvic nourishment for complete nervous system restoration.',
      category: 'General'
    },
    {
      question: 'Where is the retreat held and how do I reach?',
      answer: 'Our sanctuaries are situated in pristine nature corridors in India (foothills of Uttarakhand / Rishikesh nature sanctuaries). We provide private airport and railway transfers from the nearest transit hubs.',
      category: 'Location'
    },
    {
      question: 'What packages are available and what is the pricing?',
      answer: 'We offer two core formats: 4 Days / 3 Nights (₹26,000 Solo / ₹32,000 Twin Sharing) and 5 Days / 4 Nights (₹38,000 Solo / ₹44,000 Twin Sharing). All accommodation, organic sattvic meals, daily sound immersions, yoga sessions, and ceremony materials are included.',
      category: 'Pricing'
    },
    {
      question: 'Can beginners with no prior yoga or meditation experience join?',
      answer: 'Yes, absolutely. Our facilitators tailor each practice to individual bodies and comfort levels. There is zero competition, performance anxiety, or dogma.',
      category: 'Experience'
    },
    {
      question: 'What kind of meals and nutrition are provided?',
      answer: 'We serve 100% organic, seasonal, farm-to-table vegetarian sattvic meals prepared fresh according to Ayurvedic principles to promote gut health and cellular vitality. Vegan and gluten-free dietary needs are gladly accommodated.',
      category: 'Diet'
    },
    {
      question: 'What is 432Hz sound healing and how does it work?',
      answer: '432Hz is a natural harmonic frequency known to induce deep theta and delta brainwave states. Certified sound therapist Komal Malhotra utilizes handcrafted Himalayan singing bowls, planetary gongs, and chime frequencies to physically soothe stress hormones.',
      category: 'Practices'
    },
    {
      question: 'How do I reserve my spot and what is the cancellation policy?',
      answer: 'Retreat Payment should be 30 days in advance. Under 45 days: 25% refund. Under 30 days: Non refundable. You can submit the booking form on this website or chat directly via WhatsApp (+91 9259698064).',
      category: 'Booking'
    }
  ]
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'Shunya Sync',
  tagline: 'FIND STILLNESS • ALIGN WITHIN • AWAKEN',
  headerAnnouncement: '🌿 Next Sacred Cohort: Nov 14–17 & Dec 12–16, 2026 • Limited to 12 Seekers • Direct WhatsApp: +91 9259698064',
  heroHeadline: 'Shunya Sync Retreat',
  heroSubheadline: 'FIND STILLNESS • ALIGN WITHIN • AWAKEN — Disconnect the noise, find your true self and sync with the universe.',
  heroBgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2560&q=85',
  heroTags: ['Somatic Yoga', 'Vedic Sound Bath', 'Forest Bathing', 'Digital Fasting', 'Inner Alignment'],
  aboutText: 'At Shunya Sync Retreat, At Shunya Sync, we curate soulful retreats that bring together yoga, mindfulness, nature, adventure, and meaningful human connections—helping you reconnect with yourself and live with greater clarity and purpose.',
  philosophyQuote: 'In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.',
  whyWeStarted: 'To offer intimate, soulful journeys away from daily noise.',
  whatMakesUsDifferent: 'Intimate groups, nature-based settings, soulful evenings, and expert guides.',
  adminPin: '7788',
  logoUrl: '/logo_original.png',
  founder1: {
    name: 'Anmol Khatri',
    title: 'Founder & Movement Guide',
    note: 'Mindful breathwork & grounded presence',
    bio: 'Anmol brings years of dedicated sadhana in traditional Hatha yoga, somatic movement, and nervous system regulation. His grounded, compassionate presence guides seekers back into deep bodily connection and authentic inner stillness.',
    image: 'https://www.shunyasync.com/images/founder-1.jpg'
  },
  founder2: {
    name: 'Komal Malhotra',
    title: 'Founder & Sound Alchemist',
    note: 'Vibrational therapy & intuitive healing',
    bio: 'Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance. Her sacred sound baths dissolve emotional tension and transport participants into rejuvenating theta brainwave states.',
    image: 'https://www.shunyasync.com/images/cofounder.JPG'
  },
  pricing: {
    pkg2n3d: {
      title: '2 Nights / 3 Days Retreat',
      twinPrice: 22000,
      soloPrice: 26000,
      badge: 'Weekend Reset',
      description: 'Choose your duration — each package includes a full day-by-day schedule and transparent pricing.',
      image: 'https://www.shunyasync.com/images/DSC05576.JPG'
    },
    pkg3n4d: {
      title: '3 Nights / 4 Days Retreat',
      twinPrice: 26000,
      soloPrice: 32000,
      badge: 'Most Popular',
      description: 'Body & breath connection, Day 2 sacred Ganga Aarti, chakra & sound healing, and thrilling adventure.',
      image: 'https://www.shunyasync.com/images/DSC05503.JPG' // Yoga at Beach / Ghat
    },
    pkg4n5d: {
      title: '4 Nights / 5 Days Retreat (Premium Experience)',
      twinPrice: 44000,
      soloPrice: 52000,
      badge: 'Premium Experience',
      description: 'Deep healing, waterfall excursions, river rafting, ecstatic dance, inner work, and complete spiritual integration.',
      image: 'https://www.shunyasync.com/images/DSC05860.JPG' // Waterfall image
    },
    // Backward compatibility aliases
    pkg4d3n: {
      title: '3 Nights / 4 Days Retreat',
      twinPrice: 26000,
      soloPrice: 32000,
      badge: 'Most Popular',
      description: 'Body & breath connection, Day 2 sacred Ganga Aarti, chakra & sound healing, and thrilling adventure.',
      image: 'https://www.shunyasync.com/images/DSC05503.JPG'
    },
    pkg5d4n: {
      title: '4 Nights / 5 Days Retreat (Premium Experience)',
      twinPrice: 44000,
      soloPrice: 52000,
      badge: 'Premium Experience',
      description: 'Deep healing, waterfall excursions, river rafting, ecstatic dance, inner work, and complete spiritual integration.',
      image: 'https://www.shunyasync.com/images/DSC05860.JPG'
    }
  },
  contact: {
    phone: '+91 9259698064',
    whatsappNumber: '919259698064',
    email: 'hello@shunyasync.com',
    location: 'India – Nature Retreat Destination'
  },
  galleryImages: [
    {
      url: 'https://www.shunyasync.com/images/DSC05503.JPG',
      title: 'Sunrise Yoga & Pranayama',
      caption: 'Guided sunrise asana practice and conscious breathwork beside the sacred river'
    },
    {
      url: 'https://www.shunyasync.com/images/C9738T01.JPG',
      title: 'Sacred Sound Healing Immersion',
      caption: 'Handcrafted Tibetan singing bowls and vibrational frequency therapy in nature'
    },
    {
      url: 'https://www.shunyasync.com/images/satvik.JPG',
      title: 'Organic Sattvic Nourishment',
      caption: 'Farm-to-table Ayurvedic vegetarian feast tables and healing herbal infusions'
    },
    {
      url: 'https://www.shunyasync.com/images/DSC05719.JPG',
      title: 'Ecstatic Dance & Somatic Liberation',
      caption: 'Joyful movement sessions, conscious dance, and emotional release in safe space'
    },
    {
      url: 'https://www.shunyasync.com/images/DSC06017.JPG',
      title: 'Himalayan Nature Excursions',
      caption: 'Sacred temple visits, Ganga beach meditation, and guided forest trail bathing'
    },
    {
      url: 'https://www.shunyasync.com/images/IMG_3021.JPG',
      title: 'Community Celebration & Kirtan',
      caption: 'Soulful evening sharing circles, bonfire rituals, and lifelong heart connections'
    }
  ],
  seo: DEFAULT_SEO_CONFIG,
  brandSubtitle: 'RETREAT',
  showLogoIcon: true,
  heroBadge: 'COHORT 2026',
  heroQuote: 'In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.',
  footerDescription: 'At Shunya Sync Retreat, we curate soulful retreats that bring together yoga, mindfulness, nature, adventure, and meaningful human connections.',
  footerCopyright: '© 2026 Shunya Sync Retreat. All sacred rights reserved.',
  whyChooseUs: {
    eyebrow: 'WHY SHUNYA SYNC',
    headingPrefix: 'Why',
    headingHighlight: 'Choose Us',
    bgImage: 'https://www.shunyasync.com/images/DSC05962.JPG',
    cards: [
      { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
      { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
      { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
      { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
      { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
      { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
    ]
  },
  blogPosts: DEFAULT_BLOG_POSTS,
  refundPolicy: {
    under30Days: 'Under 30 days: Non refundable',
    under45Days: 'Under 45 days: 25% refund',
    advancePaymentPolicy: 'Retreat Payment should be 30 days in advance.',
    customNotes: 'All retreat payments must be completed 30 days in advance to secure your room and catering arrangements.'
  },
  instagramReelUrl: 'https://www.instagram.com/reel/DXtQI5Fko0_/',
  instagramReelPosition: 'below-packages',
  instagramReelTitle: 'Living Atmosphere & Sacred Flow',
  instagramReelCaption: 'Experience the living frequency of breathwork, sound alchemy, and peaceful forest stillness captured at Shunya Sync Retreat.'
};

export const DEFAULT_BENEFITS: BenefitSlide[] = [
  {
    id: 'b1',
    title: 'Nervous System & Cortisol Reset',
    subtitle: 'From High Alert to Deep Parasympathetic Stillness',
    description: 'Somatic breathwork and silent forest immersion downregulate fight-or-flight stress hormones, allowing your adrenal glands to fully recover.',
    iconName: 'shield',
    badge: 'Restorative Wellness',
    bgGradient: 'from-[#223326] to-[#142116]'
  },
  {
    id: 'b2',
    title: '432Hz Sound Healing Immersion',
    subtitle: 'Vibrational Therapy for Deep Cellular Harmony',
    description: 'Acoustic resonance of ancient Tibetan singing bowls penetrates deep muscle and neural tissues, washing away mental clutter and somatic blockages.',
    iconName: 'volume',
    badge: 'Core Ritual',
    bgGradient: 'from-[#2E2822] to-[#1C1713]'
  },
  {
    id: 'b3',
    title: 'Organic Sattvic Nutritional Cleansing',
    subtitle: 'Farm-Fresh Vegetarian Cuisine Prepared with Love',
    description: 'Light, nutrient-dense meals made from seasonal local harvest to cleanse the gut microbiome, enhance focus, and restore radiant energy.',
    iconName: 'leaf',
    badge: 'Gut-Brain Reset',
    bgGradient: 'from-[#203024] to-[#111C14]'
  },
  {
    id: 'b4',
    title: 'Sacred Sharing Circles & Joyful Movement',
    subtitle: 'Authentic Human Connections in Safe Spaces',
    description: 'Break free from emotional isolation with ecstatic free movement, bonfire intention ceremonies, and non-judgmental community bonding.',
    iconName: 'heart',
    badge: 'Human Connection',
    bgGradient: 'from-[#352520] to-[#1F1410]'
  },
  {
    id: 'b5',
    title: 'Restored Circadian Rhythm & Sleep',
    subtitle: 'Natural Delta-Wave Sleep Without Technology',
    description: 'Starlight nights, zero artificial blue light, and evening sound frequency baths guide your brain into restorative REM and deep sleep cycles.',
    iconName: 'moon',
    badge: 'Sleep Architecture',
    bgGradient: 'from-[#1A252C] to-[#10171C]'
  }
];

const CONFIG_STORAGE_KEY = 'shunya_sync_site_config_v3';
const BENEFITS_STORAGE_KEY = 'shunya_sync_benefits_v3';
const LEADS_STORAGE_KEY = 'shunya_sync_leads_v3';
const SUPABASE_STORAGE_KEY = 'shunya_sync_supabase_config_v3';

/**
 * Normalizes and deep-validates any incoming configuration object
 * ensuring that nested structures like pricing, founders, contact, and SEO
 * never cause undefined property crashes even if legacy, partial, or headless JSONB data is retrieved.
 */
/**
 * Helper to pick the first valid, non-empty, non-null value from candidates.
 * Prioritizes user input / direct mutated properties over nested stale JSONB,
 * and only falls back to hardcoded defaults if no valid value exists anywhere.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function firstValid<T = any>(...values: (T | undefined | null)[]): T | undefined {
  for (const v of values) {
    if (v !== undefined && v !== null) {
      if (typeof v === 'string') {
        if (v.trim() !== '') return v;
      } else if (typeof v === 'number') {
        if (!isNaN(v)) return v;
      } else if (typeof v === 'boolean') {
        return v;
      } else if (Array.isArray(v)) {
        if (v.length > 0) return v;
      } else if (typeof v === 'object') {
        if (Object.keys(v).length > 0) return v;
      }
    }
  }
  return undefined;
}

/**
 * Normalizes and deep-validates any incoming configuration object.
 * Strictly guarantees that user mutations and fresh uploads are never overwritten
 * by stale nested JSONB objects or hardcoded defaults.
 * Synchronizes top-level properties into site_settings and pages_content for 100% two-way data binding.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeSiteConfig(input: any): SiteConfig {
  if (!input || typeof input !== 'object') {
    return DEFAULT_SITE_CONFIG;
  }

  // 1. Extract JSONB structures if present
  const settings = (input.site_settings && typeof input.site_settings === 'object') ? input.site_settings : {};
  const pages = (input.pages_content && typeof input.pages_content === 'object') ? input.pages_content : {};

  // Pricing: check input.pricing first, then JSONB packages
  const pr = input.pricing || input.retreat_packages || {};
  const sPr = settings.pricing || settings.retreat_packages || {};
  const pPr = pages.pricing || pages.retreat_packages || {};

  const p2 = pr.pkg2n3d || {};
  const sp2 = sPr.pkg2n3d || {};
  const pp2 = pPr.pkg2n3d || {};
  const pkg2Item = {
    title: firstValid(p2.title, sp2.title, pp2.title, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.title)!,
    twinPrice: firstValid(p2.twinPrice, sp2.twinPrice, pp2.twinPrice, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.twinPrice)!,
    soloPrice: firstValid(p2.soloPrice, sp2.soloPrice, pp2.soloPrice, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.soloPrice)!,
    badge: firstValid(p2.badge, sp2.badge, pp2.badge, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.badge)!,
    description: firstValid(p2.description, sp2.description, pp2.description, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.description)!,
    image: firstValid(p2.image, sp2.image, pp2.image, DEFAULT_SITE_CONFIG.pricing.pkg2n3d.image || 'https://www.shunyasync.com/images/DSC05576.JPG')!
  };

  const p3 = pr.pkg3n4d || pr.pkg4d3n || {};
  const sp3 = sPr.pkg3n4d || sPr.pkg4d3n || {};
  const pp3 = pPr.pkg3n4d || pPr.pkg4d3n || {};
  const pkg3Item = {
    title: firstValid(p3.title, sp3.title, pp3.title, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.title)!,
    twinPrice: firstValid(p3.twinPrice, sp3.twinPrice, pp3.twinPrice, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.twinPrice)!,
    soloPrice: firstValid(p3.soloPrice, sp3.soloPrice, pp3.soloPrice, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.soloPrice)!,
    badge: firstValid(p3.badge, sp3.badge, pp3.badge, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.badge)!,
    description: firstValid(p3.description, sp3.description, pp3.description, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.description)!,
    image: firstValid(p3.image, sp3.image, pp3.image, DEFAULT_SITE_CONFIG.pricing.pkg3n4d.image || 'https://www.shunyasync.com/images/DSC05503.JPG')!
  };

  const p4 = pr.pkg4n5d || pr.pkg5d4n || {};
  const sp4 = sPr.pkg4n5d || sPr.pkg5d4n || {};
  const pp4 = pPr.pkg4n5d || pPr.pkg5d4n || {};
  const pkg4Item = {
    title: firstValid(p4.title, sp4.title, pp4.title, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.title)!,
    twinPrice: firstValid(p4.twinPrice, sp4.twinPrice, pp4.twinPrice, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.twinPrice)!,
    soloPrice: firstValid(p4.soloPrice, sp4.soloPrice, pp4.soloPrice, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.soloPrice)!,
    badge: firstValid(p4.badge, sp4.badge, pp4.badge, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.badge)!,
    description: firstValid(p4.description, sp4.description, pp4.description, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.description)!,
    image: firstValid(p4.image, sp4.image, pp4.image, DEFAULT_SITE_CONFIG.pricing.pkg4n5d.image || 'https://www.shunyasync.com/images/DSC05860.JPG')!
  };

  const safePricing = {
    pkg2n3d: pkg2Item,
    pkg3n4d: pkg3Item,
    pkg4n5d: pkg4Item,
    pkg4d3n: pkg3Item,
    pkg5d4n: pkg4Item
  };

  // Founders: prioritize direct input mutations before nested objects
  const f1 = input.founder1 || input.founders?.founder1 || {};
  const sF1 = settings.founder1 || settings.founders?.founder1 || {};
  const pF1 = pages.founder1 || pages.founders?.founder1 || {};
  const founder1 = {
    name: firstValid(f1.name, sF1.name, pF1.name, DEFAULT_SITE_CONFIG.founder1.name)!,
    title: firstValid(f1.title, sF1.title, pF1.title, DEFAULT_SITE_CONFIG.founder1.title)!,
    note: firstValid(f1.note, sF1.note, pF1.note, DEFAULT_SITE_CONFIG.founder1.note)!,
    bio: firstValid(f1.bio, sF1.bio, pF1.bio, DEFAULT_SITE_CONFIG.founder1.bio)!,
    image: firstValid(f1.image, sF1.image, pF1.image, DEFAULT_SITE_CONFIG.founder1.image)!
  };

  const f2 = input.founder2 || input.founders?.founder2 || {};
  const sF2 = settings.founder2 || settings.founders?.founder2 || {};
  const pF2 = pages.founder2 || pages.founders?.founder2 || {};
  const founder2 = {
    name: firstValid(f2.name, sF2.name, pF2.name, DEFAULT_SITE_CONFIG.founder2.name)!,
    title: firstValid(f2.title, sF2.title, pF2.title, DEFAULT_SITE_CONFIG.founder2.title)!,
    note: firstValid(f2.note, sF2.note, pF2.note, DEFAULT_SITE_CONFIG.founder2.note)!,
    bio: firstValid(f2.bio, sF2.bio, pF2.bio, DEFAULT_SITE_CONFIG.founder2.bio)!,
    image: firstValid(f2.image, sF2.image, pF2.image, DEFAULT_SITE_CONFIG.founder2.image)!
  };

  // Contact: prioritize direct input mutations
  const c = input.contact || {};
  const sC = settings.contact || {};
  const pC = pages.contact || {};
  const contact = {
    phone: firstValid(c.phone, sC.phone, pC.phone, DEFAULT_SITE_CONFIG.contact.phone)!,
    whatsappNumber: firstValid(c.whatsappNumber, sC.whatsappNumber, pC.whatsappNumber, DEFAULT_SITE_CONFIG.contact.whatsappNumber)!,
    email: firstValid(c.email, sC.email, pC.email, DEFAULT_SITE_CONFIG.contact.email)!,
    location: firstValid(c.location, sC.location, pC.location, DEFAULT_SITE_CONFIG.contact.location)!,
    address: firstValid(c.address, sC.address, pC.address, DEFAULT_SITE_CONFIG.contact.address || '')!
  };

  // Gallery: prioritize direct input
  const galleryImages = firstValid(input.galleryImages, input.gallery_images, pages.galleryImages, settings.galleryImages, DEFAULT_SITE_CONFIG.galleryImages)!;

  // SEO & Geo Tags
  const rawSeo = input.seo || input.seo_geo_tags || settings.seo_geo_tags || pages.seo_geo_tags || settings.seo;
  const seo = {
    ...DEFAULT_SEO_CONFIG,
    ...(rawSeo || {})
  };

  // Why Choose Us
  const w = input.whyChooseUs || input.why_choose_us || {};
  const sW = settings.whyChooseUs || {};
  const pW = pages.whyChooseUs || {};
  const whyChooseUs = {
    eyebrow: firstValid(w.eyebrow, sW.eyebrow, pW.eyebrow, DEFAULT_SITE_CONFIG.whyChooseUs?.eyebrow || 'WHY SHUNYA SYNC')!,
    headingPrefix: firstValid(w.headingPrefix, sW.headingPrefix, pW.headingPrefix, DEFAULT_SITE_CONFIG.whyChooseUs?.headingPrefix || 'Why')!,
    headingHighlight: firstValid(w.headingHighlight, sW.headingHighlight, pW.headingHighlight, DEFAULT_SITE_CONFIG.whyChooseUs?.headingHighlight || 'Choose Us')!,
    bgImage: firstValid(w.bgImage, sW.bgImage, pW.bgImage, DEFAULT_SITE_CONFIG.whyChooseUs?.bgImage || 'https://www.shunyasync.com/images/DSC05962.JPG')!,
    cards: firstValid(w.cards, sW.cards, pW.cards, DEFAULT_SITE_CONFIG.whyChooseUs?.cards || [])!
  };

  // Hero Section: direct input MUST take precedence over stale JSONB/defaults
  let heroBgImage = firstValid(input.heroBgImage, input.hero_bg_image, pages.heroBgImage, settings.heroBgImage, DEFAULT_SITE_CONFIG.heroBgImage)!;
  // Seamlessly migrate stale legacy hero image to the new serene yoga meditation banner
  if (!heroBgImage || heroBgImage === 'https://www.shunyasync.com/images/DSC05470.JPG' || heroBgImage.includes('DSC05470.JPG')) {
    heroBgImage = DEFAULT_SITE_CONFIG.heroBgImage;
  }
  const heroHeadline = firstValid(input.heroHeadline, input.hero_headline, pages.heroHeadline, settings.heroHeadline, DEFAULT_SITE_CONFIG.heroHeadline)!;
  const heroSubheadline = firstValid(input.heroSubheadline, input.hero_subheadline, pages.heroSubheadline, settings.heroSubheadline, DEFAULT_SITE_CONFIG.heroSubheadline)!;
  const heroTags = firstValid(input.heroTags, input.hero_tags, pages.heroTags, settings.heroTags, DEFAULT_SITE_CONFIG.heroTags)!;
  const heroBadge = firstValid(input.heroBadge, input.hero_badge, pages.heroBadge, settings.heroBadge, DEFAULT_SITE_CONFIG.heroBadge || 'COHORT 2026')!;
  const heroQuote = firstValid(input.heroQuote, input.hero_quote, pages.heroQuote, settings.heroQuote, DEFAULT_SITE_CONFIG.heroQuote)!;

  // Brand & Header
  const brandName = firstValid(input.brandName, input.brand_name, settings.brandName, pages.brandName, DEFAULT_SITE_CONFIG.brandName)!;
  const brandSubtitle = firstValid(input.brandSubtitle, input.brand_subtitle, settings.brandSubtitle, pages.brandSubtitle, DEFAULT_SITE_CONFIG.brandSubtitle)!;
  const tagline = firstValid(input.tagline, settings.tagline, pages.tagline, DEFAULT_SITE_CONFIG.tagline)!;
  const headerAnnouncement = firstValid(input.headerAnnouncement, input.header_announcement, settings.headerAnnouncement, pages.headerAnnouncement, DEFAULT_SITE_CONFIG.headerAnnouncement)!;
  const logoUrl = firstValid(input.logoUrl, input.logo_url, settings.logoUrl, pages.logoUrl, DEFAULT_SITE_CONFIG.logoUrl)!;
  const showLogoIcon = input.showLogoIcon !== undefined
    ? Boolean(input.showLogoIcon)
    : (settings.showLogoIcon !== undefined
      ? Boolean(settings.showLogoIcon)
      : (pages.showLogoIcon !== undefined
        ? Boolean(pages.showLogoIcon)
        : (input.show_logo_icon !== undefined ? Boolean(input.show_logo_icon) : true)));

  const adminPin = firstValid(input.adminPin, input.admin_pin, settings.adminPin, pages.adminPin, DEFAULT_SITE_CONFIG.adminPin || '7788')!;

  // Narratives & Descriptions
  const aboutText = firstValid(input.aboutText, input.about_text, pages.aboutText, settings.aboutText, DEFAULT_SITE_CONFIG.aboutText)!;
  const philosophyQuote = firstValid(input.philosophyQuote, input.philosophy_quote, pages.philosophyQuote, settings.philosophyQuote, DEFAULT_SITE_CONFIG.philosophyQuote)!;
  const whyWeStarted = firstValid(input.whyWeStarted, input.why_we_started, pages.whyWeStarted, settings.whyWeStarted, DEFAULT_SITE_CONFIG.whyWeStarted)!;
  const whatMakesUsDifferent = firstValid(input.whatMakesUsDifferent, input.what_makes_us_different, pages.whatMakesUsDifferent, settings.whatMakesUsDifferent, DEFAULT_SITE_CONFIG.whatMakesUsDifferent)!;
  const footerDescription = firstValid(input.footerDescription, input.footer_description, pages.footerDescription, settings.footerDescription, DEFAULT_SITE_CONFIG.footerDescription)!;
  const footerCopyright = firstValid(input.footerCopyright, input.footer_copyright, pages.footerCopyright, settings.footerCopyright, DEFAULT_SITE_CONFIG.footerCopyright)!;

  // Blog Posts
  const rawBlogs = firstValid(input.blogPosts, input.blog_posts, pages.blog_posts, settings.blog_posts, settings.blogPosts);
  const blogPosts = Array.isArray(rawBlogs) && rawBlogs.length > 0 ? rawBlogs : (DEFAULT_SITE_CONFIG.blogPosts || DEFAULT_BLOG_POSTS);

  // Instagram Reel
  const reelObj = input.instagramReel || {};
  const sReelObj = settings.instagramReel || {};
  const pReelObj = pages.instagramReel || {};
  const instagramReelUrl = firstValid(input.instagramReelUrl, reelObj.url, settings.instagramReelUrl, sReelObj.url, pages.instagramReelUrl, pReelObj.url, DEFAULT_SITE_CONFIG.instagramReelUrl)!;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instagramReelPosition = firstValid(input.instagramReelPosition, reelObj.position, settings.instagramReelPosition, sReelObj.position, pages.instagramReelPosition, pReelObj.position, DEFAULT_SITE_CONFIG.instagramReelPosition) as any;
  const instagramReelTitle = firstValid(input.instagramReelTitle, reelObj.title, settings.instagramReelTitle, sReelObj.title, pages.instagramReelTitle, pReelObj.title, DEFAULT_SITE_CONFIG.instagramReelTitle)!;
  const instagramReelCaption = firstValid(input.instagramReelCaption, reelObj.caption, settings.instagramReelCaption, sReelObj.caption, pages.instagramReelCaption, pReelObj.caption, DEFAULT_SITE_CONFIG.instagramReelCaption)!;

  // Refund Policy
  const ref = input.refundPolicy || {};
  const sRef = settings.refundPolicy || {};
  const pRef = pages.refundPolicy || {};
  const refundPolicy = {
    under30Days: firstValid(ref.under30Days, sRef.under30Days, pRef.under30Days, DEFAULT_SITE_CONFIG.refundPolicy?.under30Days || 'Under 30 days: Non refundable')!,
    under45Days: firstValid(ref.under45Days, sRef.under45Days, pRef.under45Days, DEFAULT_SITE_CONFIG.refundPolicy?.under45Days || 'Under 45 days: 25% refund')!,
    advancePaymentPolicy: firstValid(ref.advancePaymentPolicy, sRef.advancePaymentPolicy, pRef.advancePaymentPolicy, DEFAULT_SITE_CONFIG.refundPolicy?.advancePaymentPolicy || 'Retreat Payment should be 30 days in advance.')!,
    customNotes: firstValid(ref.customNotes, sRef.customNotes, pRef.customNotes, DEFAULT_SITE_CONFIG.refundPolicy?.customNotes || '')!
  };

  // Synchronized Headless JSONB Bundles:
  // Strictly mirrors all latest values so site_settings and pages_content never drift
  const synchronizedSiteSettings = {
    ...settings,
    brandName,
    brandSubtitle,
    tagline,
    headerAnnouncement,
    logoUrl,
    showLogoIcon,
    adminPin,
    contact,
    founder1,
    founder2,
    founders: {
      founder1,
      founder2
    },
    heroBgImage,
    pricing: safePricing,
    retreat_packages: safePricing,
    refundPolicy,
    seo_geo_tags: seo,
    instagramReelUrl,
    instagramReelPosition,
    instagramReelTitle,
    instagramReelCaption,
    instagramReel: {
      url: instagramReelUrl,
      position: instagramReelPosition,
      title: instagramReelTitle,
      caption: instagramReelCaption
    }
  };

  const synchronizedPagesContent = {
    ...pages,
    heroHeadline,
    heroSubheadline,
    heroBgImage,
    heroTags,
    heroBadge,
    heroQuote,
    aboutText,
    philosophyQuote,
    whyWeStarted,
    whatMakesUsDifferent,
    whyChooseUs,
    founder1,
    founder2,
    founders: {
      founder1,
      founder2
    },
    pricing: safePricing,
    retreat_packages: safePricing,
    galleryImages,
    blog_posts: blogPosts,
    footerDescription,
    footerCopyright,
    refundPolicy,
    instagramReelUrl,
    instagramReelPosition,
    instagramReelTitle,
    instagramReelCaption
  };

  return {
    ...input,
    brandName,
    brandSubtitle,
    tagline,
    headerAnnouncement,
    logoUrl,
    showLogoIcon,
    adminPin,
    heroHeadline,
    heroSubheadline,
    heroBgImage,
    heroTags,
    heroBadge,
    heroQuote,
    aboutText,
    philosophyQuote,
    whyWeStarted,
    whatMakesUsDifferent,
    founder1,
    founder2,
    founders: {
      founder1,
      founder2
    },
    pricing: safePricing,
    retreat_packages: safePricing,
    contact,
    galleryImages,
    seo,
    whyChooseUs,
    blogPosts,
    refundPolicy,
    footerDescription,
    footerCopyright,
    instagramReelUrl,
    instagramReelPosition,
    instagramReelTitle,
    instagramReelCaption,
    instagramReel: {
      url: instagramReelUrl,
      position: instagramReelPosition,
      title: instagramReelTitle,
      caption: instagramReelCaption
    },
    site_settings: synchronizedSiteSettings,
    pages_content: synchronizedPagesContent
  };
}

export function getStoredSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return normalizeSiteConfig(parsed);
    }
  } catch {
    // fallback
  }
  return DEFAULT_SITE_CONFIG;
}

export function saveStoredSiteConfig(config: SiteConfig): void {
  try {
    const normalized = normalizeSiteConfig(config);
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(normalized));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('shunya_config_updated', { detail: normalized }));
    }
  } catch (e) {
    console.error('Failed to save site config to localStorage', e);
  }
}

export function getStoredBenefits(): BenefitSlide[] {
  try {
    const raw = localStorage.getItem(BENEFITS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return DEFAULT_BENEFITS;
}

export function saveStoredBenefits(benefits: BenefitSlide[]): void {
  try {
    localStorage.setItem(BENEFITS_STORAGE_KEY, JSON.stringify(benefits));
  } catch (e) {
    console.error('Failed to save benefits', e);
  }
}

export function getStoredLeads(): BookingLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [];
}

export function saveBookingLead(lead: Omit<BookingLead, 'id' | 'created_at' | 'status'>): BookingLead {
  const newLead: BookingLead = {
    ...lead,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
    status: 'new'
  };

  try {
    const existing = getStoredLeads();
    const updated = [newLead, ...existing];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save booking lead', e);
  }

  // Also push to Supabase if configured
  syncLeadToSupabase(newLead).catch(console.warn);

  return newLead;
}

export function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'confirmed'): void {
  try {
    const existing = getStoredLeads();
    const updated = existing.map((lead) => (lead.id === id ? { ...lead, status } : lead));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update lead status', e);
  }
}

export function deleteLead(id: string): void {
  try {
    const existing = getStoredLeads();
    const updated = existing.filter((lead) => lead.id !== id);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete lead', e);
  }
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  const envBucket = (import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'retreat-media').trim();
  const envTable = (import.meta.env.VITE_SUPABASE_TABLE_NAME || 'shunya_site_config').trim();

  try {
    const raw = localStorage.getItem(SUPABASE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const finalUrl = parsed.supabaseUrl || envUrl;
      const finalKey = parsed.supabaseAnonKey || envKey;
      return {
        supabaseUrl: finalUrl,
        supabaseAnonKey: finalKey,
        tableName: parsed.tableName || envTable,
        storageBucket: parsed.storageBucket || envBucket,
        isConnected: Boolean(finalUrl && finalKey)
      };
    }
  } catch {
    // fallback
  }

  return {
    supabaseUrl: envUrl,
    supabaseAnonKey: envKey,
    tableName: envTable,
    storageBucket: envBucket,
    isConnected: Boolean(envUrl && envKey)
  };
}

export function saveStoredSupabaseConfig(cfg: SupabaseConfig): void {
  try {
    localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(cfg));
  } catch (e) {
    console.error('Failed to save Supabase config', e);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const cfg = getStoredSupabaseConfig();
  if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
    try {
      return createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Fetches latest site config from Supabase cloud database if connected.
 * Extracts all content, narratives, branding, and dynamic fields from JSONB structures
 * with graceful fallback to legacy relational columns if present.
 */
export async function fetchConfigFromSupabase(): Promise<SiteConfig | null> {
  const client = getSupabaseClient();
  const cfg = getStoredSupabaseConfig();
  if (!client) return null;

  try {
    const tableName = cfg.tableName || 'shunya_site_config';
    const { data, error } = await client
      .from(tableName)
      .select('*')
      .eq('id', 'current_config')
      .maybeSingle();

    if (error || !data) return null;

    // 1. Extract JSONB structures
    const pages = (data.pages_content && typeof data.pages_content === 'object') ? data.pages_content : {};
    const settings = (data.site_settings && typeof data.site_settings === 'object') ? data.site_settings : {};
    const dynamicSections = Array.isArray(data.dynamic_sections)
      ? data.dynamic_sections
      : (Array.isArray(pages.dynamic_sections) ? pages.dynamic_sections : []);
    const blogPosts = Array.isArray(data.blog_posts)
      ? data.blog_posts
      : (Array.isArray(pages.blog_posts) ? pages.blog_posts : undefined);
    const packages = data.retreat_packages || pages.retreat_packages || data.pricing;
    const seoTags = data.seo_geo_tags || settings.seo_geo_tags || data.seo;

    // 2. Normalize and extract with priority: JSONB > legacy flat column > defaults
    const merged = normalizeSiteConfig({
      // Start with raw table data
      ...data,
      // Layer JSONB pages_content
      ...pages,
      // Layer JSONB site_settings
      ...settings,

      // Explicit field mappings ensuring JSONB takes precedence
      brandName: settings.brandName || data.brand_name,
      brandSubtitle: settings.brandSubtitle || data.brand_subtitle,
      tagline: settings.tagline || pages.tagline || data.tagline,
      headerAnnouncement: settings.headerAnnouncement || data.header_announcement,
      logoUrl: settings.logoUrl || data.logo_url,
      showLogoIcon: settings.showLogoIcon ?? data.show_logo_icon,
      adminPin: settings.adminPin || data.admin_pin,
      contact: settings.contact || data.contact,

      heroHeadline: pages.heroHeadline || data.hero_headline,
      heroSubheadline: pages.heroSubheadline || data.hero_subheadline,
      heroBgImage: pages.heroBgImage || data.hero_bg_image,
      heroTags: pages.heroTags || data.hero_tags,
      heroBadge: pages.heroBadge || data.hero_badge,
      heroQuote: pages.heroQuote || data.hero_quote,

      aboutText: pages.aboutText || data.about_text,
      philosophyQuote: pages.philosophyQuote || data.philosophy_quote,
      whyWeStarted: pages.whyWeStarted || data.why_we_started,
      whatMakesUsDifferent: pages.whatMakesUsDifferent || data.what_makes_us_different,

      whyChooseUs: pages.whyChooseUs || data.why_choose_us,
      founder1: settings.founder1 || (settings.founders as any)?.founder1 || pages.founder1 || (pages.founders as any)?.founder1 || data.founder1,
      founder2: settings.founder2 || (settings.founders as any)?.founder2 || pages.founder2 || (pages.founders as any)?.founder2 || data.founder2,
      galleryImages: pages.galleryImages || data.gallery_images,
      pricing: packages,
      seo: seoTags,
      blogPosts,
      refundPolicy: settings.refundPolicy || pages.refundPolicy || data.refund_policy,

      footerDescription: pages.footerDescription || data.footer_description,
      footerCopyright: pages.footerCopyright || data.footer_copyright,

      site_settings: settings,
      pages_content: pages,
      dynamic_sections: dynamicSections,
      retreat_packages: packages,
      seo_geo_tags: seoTags
    });

    saveStoredSiteConfig(merged);
    return merged;
  } catch (err) {
    console.warn('Failed to fetch config from Supabase:', err);
    return null;
  }
}

/**
 * 100% Dynamic & Schema-Independent Supabase Sync Engine
 * Bundles all site configuration text, hero details, and miscellaneous flat fields
 * into JSONB documents (site_settings and pages_content) so NO new standalone flat columns
 * are ever sent to Supabase. This guarantees that new input fields can be added to the
 * React Admin Panel indefinitely without ever needing ALTER TABLE schema modifications in Supabase.
 */
export async function syncConfigToSupabase(config: SiteConfig): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  const cfg = getStoredSupabaseConfig();
  if (!client) {
    return {
      success: false,
      message: 'Supabase credentials not configured. Changes saved locally in browser storage.'
    };
  }

  const tableName = cfg.tableName || 'shunya_site_config';

  // 1. Bundle all global settings, branding, logos, and pins into site_settings (JSONB)
  const bundledSiteSettings: Record<string, unknown> = {
    ...(config.site_settings || {}),
    brandName: config.brandName,
    brandSubtitle: config.brandSubtitle || 'RETREAT',
    tagline: config.tagline,
    headerAnnouncement: config.headerAnnouncement,
    logoUrl: config.logoUrl || '/logo_original.png',
    showLogoIcon: config.showLogoIcon !== false,
    adminPin: config.adminPin || '7788',
    contact: config.contact,
    founder1: config.founder1,
    founder2: config.founder2,
    founders: {
      founder1: config.founder1,
      founder2: config.founder2
    },
    seo_geo_tags: config.seo || DEFAULT_SEO_CONFIG,
    refundPolicy: config.refundPolicy || DEFAULT_SITE_CONFIG.refundPolicy,
    retreat_packages: config.pricing,
    pricing: config.pricing,
    heroBgImage: config.heroBgImage,
    heroHeadline: config.heroHeadline,
    heroSubheadline: config.heroSubheadline,
    whyChooseUs: config.whyChooseUs || DEFAULT_SITE_CONFIG.whyChooseUs,
    galleryImages: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages,
    instagramReelUrl: config.instagramReelUrl,
    instagramReelPosition: config.instagramReelPosition || 'below-packages',
    instagramReelTitle: config.instagramReelTitle,
    instagramReelCaption: config.instagramReelCaption,
    instagramReel: config.instagramReel || {
      url: config.instagramReelUrl,
      position: config.instagramReelPosition || 'below-packages',
      title: config.instagramReelTitle,
      caption: config.instagramReelCaption
    }
  };

  // 2. Bundle all page narratives, hero typography, quotes, and sections into pages_content (JSONB)
  const bundledPagesContent: Record<string, unknown> = {
    ...(config.pages_content || {}),
    heroHeadline: config.heroHeadline,
    heroSubheadline: config.heroSubheadline,
    heroBgImage: config.heroBgImage,
    heroTags: config.heroTags,
    heroBadge: config.heroBadge || 'COHORT 2026',
    heroQuote: config.heroQuote,
    aboutText: config.aboutText,
    philosophyQuote: config.philosophyQuote,
    whyWeStarted: config.whyWeStarted,
    whatMakesUsDifferent: config.whatMakesUsDifferent,
    tagline: config.tagline,
    whyChooseUs: config.whyChooseUs || DEFAULT_SITE_CONFIG.whyChooseUs,
    founder1: config.founder1,
    founder2: config.founder2,
    founders: {
      founder1: config.founder1,
      founder2: config.founder2
    },
    galleryImages: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages,
    retreat_packages: config.pricing,
    pricing: config.pricing,
    refundPolicy: config.refundPolicy || DEFAULT_SITE_CONFIG.refundPolicy,
    blog_posts: config.blogPosts || DEFAULT_BLOG_POSTS,
    footerDescription: config.footerDescription,
    footerCopyright: config.footerCopyright,
    instagramReelUrl: config.instagramReelUrl,
    instagramReelPosition: config.instagramReelPosition || 'below-packages',
    instagramReelTitle: config.instagramReelTitle,
    instagramReelCaption: config.instagramReelCaption
  };

  // 3. Dynamically capture any arbitrary new custom fields added to config
  const knownKeys = new Set([
    'brandName', 'brandSubtitle', 'tagline', 'headerAnnouncement', 'logoUrl', 'showLogoIcon',
    'adminPin', 'contact', 'heroHeadline', 'heroSubheadline', 'heroBgImage', 'heroTags',
    'heroBadge', 'heroQuote', 'aboutText', 'philosophyQuote', 'whyWeStarted', 'whatMakesUsDifferent',
    'footerDescription', 'footerCopyright', 'founder1', 'founder2', 'pricing', 'galleryImages',
    'seo', 'whyChooseUs', 'blogPosts', 'refundPolicy', 'site_settings', 'pages_content', 'dynamic_sections',
    'retreat_packages', 'seo_geo_tags', 'instagramReelUrl', 'instagramReelPosition',
    'instagramReelTitle', 'instagramReelCaption', 'instagramReel'
  ]);

  for (const [k, v] of Object.entries(config)) {
    if (!knownKeys.has(k) && v !== undefined) {
      bundledSiteSettings[k] = v;
    }
  }

  // 4. Construct Pure Headless JSONB Payload:
  // ZERO new flat relational columns are sent as root keys.
  // Everything lives inside flexible JSONB containers.
  const jsonbPayload: Record<string, unknown> = {
    id: 'current_config',
    site_settings: bundledSiteSettings,
    pages_content: bundledPagesContent,
    dynamic_sections: [
      { id: 'why-us', data: config.whyChooseUs || DEFAULT_SITE_CONFIG.whyChooseUs },
      { id: 'gallery', data: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages },
      { id: 'founders', data: { founder1: config.founder1, founder2: config.founder2 } }
    ],
    retreat_packages: config.pricing,
    seo_geo_tags: config.seo || DEFAULT_SEO_CONFIG,
    blog_posts: config.blogPosts || DEFAULT_BLOG_POSTS,
    updated_at: new Date().toISOString()
  };

  try {
    // 5. Self-healing adaptive upsert loop
    // If Supabase table does not yet have an optional extended JSONB column,
    // it automatically nests that data into pages_content/site_settings, drops the root key, and retries.
    let currentPayload = { ...jsonbPayload };
    let attempts = 0;
    const maxRetries = 6;

    while (attempts < maxRetries) {
      attempts++;
      const { error } = await client.from(tableName).upsert(currentPayload);

      if (!error) {
        return {
          success: true,
          message: '✓ All settings, texts, and images saved to Supabase (Dynamic JSONB CMS active)!'
        };
      }

      // Check for missing column error in PostgREST schema cache
      const missingMatch =
        error.message.match(/Could not find the ['"]([^'"]+)['"] column/i) ||
        error.message.match(/column ['"]([^'"]+)['"] of relation/i) ||
        error.message.match(/column ['"]([^'"]+)['"] does not exist/i);

      if (missingMatch && missingMatch[1]) {
        const missingCol = missingMatch[1];
        console.warn(`Supabase schema missing optional column '${missingCol}'. Bundling into JSONB and retrying...`);

        if (missingCol === 'retreat_packages' && currentPayload.retreat_packages) {
          bundledPagesContent.retreat_packages = currentPayload.retreat_packages;
        } else if (missingCol === 'blog_posts' && currentPayload.blog_posts) {
          bundledPagesContent.blog_posts = currentPayload.blog_posts;
        } else if (missingCol === 'dynamic_sections' && currentPayload.dynamic_sections) {
          bundledPagesContent.dynamic_sections = currentPayload.dynamic_sections;
        } else if (missingCol === 'seo_geo_tags' && currentPayload.seo_geo_tags) {
          bundledSiteSettings.seo_geo_tags = currentPayload.seo_geo_tags;
        }

        delete currentPayload[missingCol];
        continue;
      }

      // If site_settings or pages_content column itself is missing:
      if (error.message.includes('site_settings') || error.message.includes('pages_content')) {
        console.warn('Table lacks site_settings/pages_content JSONB. Attempting safe legacy flat sync...');
        const legacySafePayload: Record<string, unknown> = {
          id: 'current_config',
          brand_name: config.brandName,
          tagline: config.tagline,
          header_announcement: config.headerAnnouncement,
          hero_headline: config.heroHeadline,
          hero_subheadline: config.heroSubheadline,
          hero_bg_image: config.heroBgImage,
          hero_tags: config.heroTags,
          about_text: config.aboutText,
          philosophy_quote: config.philosophyQuote,
          founder1: config.founder1,
          founder2: config.founder2,
          pricing: config.pricing,
          contact: config.contact,
          gallery_images: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages,
          seo: config.seo || DEFAULT_SEO_CONFIG,
          updated_at: new Date().toISOString()
        };
        const { error: legErr } = await client.from(tableName).upsert(legacySafePayload);
        if (!legErr) {
          return {
            success: true,
            message: '✓ Saved standard fields to Supabase! (Tip: Run 1-Click JSONB Migration in Supabase tab to enable unlimited dynamic custom fields).'
          };
        }
        return {
          success: false,
          message: `Supabase Table Error: Please click '1-Click Copy Migration SQL' in the Supabase tab and run it in your Supabase SQL Editor.`
        };
      }

      // Other database error (RLS, permissions, network)
      return { success: false, message: `Supabase Error: ${error.message}` };
    }

    return { success: false, message: 'Sync could not complete after multiple schema adaptation retries.' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Failed to sync to Supabase', msg);
    return { success: false, message: `Sync failed: ${msg}` };
  }
}

async function syncLeadToSupabase(lead: BookingLead) {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('retreat_bookings').insert([lead]);
  } catch (err) {
    console.warn('Supabase lead sync error (fallback to local)', err);
  }
}

/**
 * SQL Migration snippet specifically for initializing dynamic headless JSONB columns
 */
export const SUPABASE_JSONB_MIGRATION_SQL = `-- ==============================================================
-- SHUNYA SYNC RETREAT - DYNAMIC HEADLESS JSONB CMS MIGRATION
-- Run this in your Supabase SQL Editor to initialize dynamic columns
-- ==============================================================
ALTER TABLE public.shunya_site_config
ADD COLUMN IF NOT EXISTS blog_posts JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS pages_content JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS dynamic_sections JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS site_settings JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS retreat_packages JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS seo_geo_tags JSONB DEFAULT '{}'::jsonb;
`;

/**
 * Strict Row Level Security (RLS) enforcement SQL script.
 * Public can only SELECT; UPDATE/INSERT/DELETE restricted exclusively to authenticated admin sessions.
 */
export const SUPABASE_RLS_ENFORCEMENT_SQL = `-- ==============================================================
-- SHUNYA SYNC RETREAT - STRICT SUPABASE ROW LEVEL SECURITY (RLS)
-- Enforces Public Read-Only + Authenticated Admin Write Policies
-- Run this in your Supabase Dashboard -> SQL Editor
-- ==============================================================

-- 1. Enable Row Level Security on the config table
ALTER TABLE public.shunya_site_config ENABLE ROW LEVEL SECURITY;

-- 2. Clean up any existing permissive or conflicting policies
DROP POLICY IF EXISTS "Allow public read site config" ON public.shunya_site_config;
DROP POLICY IF EXISTS "Allow update site config" ON public.shunya_site_config;
DROP POLICY IF EXISTS "Allow public read-only access" ON public.shunya_site_config;
DROP POLICY IF EXISTS "Restrict write to authenticated admin" ON public.shunya_site_config;

-- 3. Policy: Public / Anon users can ONLY read the configuration
CREATE POLICY "Allow public read-only access"
ON public.shunya_site_config
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Policy: Strict restriction for UPDATE, INSERT, and DELETE
-- Only authenticated admin users (Supabase Auth session / service_role) can modify site data
CREATE POLICY "Restrict write to authenticated admin"
ON public.shunya_site_config
FOR ALL
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 5. Bookings table RLS: Public can insert inquiries, authenticated admin can manage
ALTER TABLE public.retreat_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert bookings" ON public.retreat_bookings;
DROP POLICY IF EXISTS "Allow admin manage bookings" ON public.retreat_bookings;

CREATE POLICY "Allow public insert bookings"
ON public.retreat_bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow admin manage bookings"
ON public.retreat_bookings
FOR ALL
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
`;

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================
-- SHUNYA SYNC RETREAT - SUPABASE SQL SCHEMA & STORAGE BUCKET
-- Paste this entire script in your Supabase Dashboard -> SQL Editor
-- ==============================================================

-- 1. Site Configuration Table (For WordPress-like CMS Settings)
CREATE TABLE IF NOT EXISTS public.shunya_site_config (
  id TEXT PRIMARY KEY DEFAULT 'current_config',
  brand_name TEXT NOT NULL DEFAULT 'Shunya Sync',
  tagline TEXT NOT NULL DEFAULT 'FIND STILLNESS • ALIGN WITHIN • AWAKEN',
  header_announcement TEXT DEFAULT '🌿 Next Sacred Immersive Retreat • Limited to 12 Seekers • Direct WhatsApp: +91 9259698064',
  hero_headline TEXT NOT NULL DEFAULT 'Shunya Sync Retreat',
  hero_subheadline TEXT NOT NULL DEFAULT 'FIND STILLNESS • ALIGN WITHIN • AWAKEN — Disconnect the noise, find your true self and sync with the universe.',
  hero_bg_image TEXT NOT NULL DEFAULT 'https://www.shunyasync.com/images/DSC05470.JPG',
  hero_tags JSONB NOT NULL DEFAULT '["Somatic Yoga","Vedic Sound Bath","Forest Bathing","Digital Fasting","Ayurvedic Feasts"]'::jsonb,
  about_text TEXT NOT NULL DEFAULT 'At Shunya Sync Retreat, we curate soulful retreats that bring together yoga, mindfulness, nature, adventure, and meaningful human connections.',
  philosophy_quote TEXT DEFAULT 'In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.',
  founder1 JSONB NOT NULL DEFAULT '{"name":"Anmol Khatri","title":"Founder & Movement Guide","note":"Mindful living & somatic alignment","bio":"Anmol has spent over a decade studying traditional Hatha yoga and contemporary somatic movement.","image":"https://www.shunyasync.com/images/founder-1.jpg"}'::jsonb,
  founder2 JSONB NOT NULL DEFAULT '{"name":"Komal Malhotra","title":"Founder & Sound Alchemist","note":"Vibrational therapy & intuitive healing","bio":"Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance.","image":"https://www.shunyasync.com/images/cofounder.JPG"}'::jsonb,
  pricing JSONB NOT NULL DEFAULT '{"pkg2n3d":{"title":"2 Nights / 3 Days Retreat","twinPrice":22000,"soloPrice":26000,"badge":"Weekend Reset","description":"Choose your duration — each package includes a full day-by-day schedule and transparent pricing."},"pkg3n4d":{"title":"3 Nights / 4 Days Retreat","twinPrice":26000,"soloPrice":32000,"badge":"Most Popular","description":"Body & breath connection, evening Ganga Aarti, chakra & sound healing, and thrilling adventure."},"pkg4n5d":{"title":"4 Nights / 5 Days Retreat (Premium Experience)","twinPrice":44000,"soloPrice":52000,"badge":"Premium Experience","description":"Deep healing, river rafting, ecstatic dance, inner work, and complete spiritual integration."},"pkg4d3n":{"title":"3 Nights / 4 Days Retreat","twinPrice":26000,"soloPrice":32000,"badge":"Most Popular","description":"Body & breath connection, evening Ganga Aarti, chakra & sound healing, and thrilling adventure."},"pkg5d4n":{"title":"4 Nights / 5 Days Retreat (Premium Experience)","twinPrice":44000,"soloPrice":52000,"badge":"Premium Experience","description":"Deep healing, river rafting, ecstatic dance, inner work, and complete spiritual integration."}}'::jsonb,
  contact JSONB NOT NULL DEFAULT '{"phone":"+91 9259698064","whatsappNumber":"919259698064","email":"hello@shunyasync.com","location":"India – Nature Retreat Destination"}'::jsonb,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  admin_pin TEXT DEFAULT '7788',
  logo_url TEXT DEFAULT '/logo.png',
  brand_subtitle TEXT DEFAULT 'Retreat Sanctuary',
  show_logo_icon BOOLEAN DEFAULT true,
  why_choose_us JSONB DEFAULT '{}'::jsonb,
  blog_posts JSONB DEFAULT '[]'::jsonb,
  pages_content JSONB DEFAULT '{}'::jsonb,
  dynamic_sections JSONB DEFAULT '[]'::jsonb,
  site_settings JSONB DEFAULT '{}'::jsonb,
  retreat_packages JSONB DEFAULT '[]'::jsonb,
  seo_geo_tags JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure dynamic JSONB columns exist if table was already created
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS admin_pin TEXT DEFAULT '7788';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '/logo.png';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS brand_subtitle TEXT DEFAULT 'Retreat Sanctuary';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS show_logo_icon BOOLEAN DEFAULT true;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS why_choose_us JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS blog_posts JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS pages_content JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS dynamic_sections JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS site_settings JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS retreat_packages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS seo_geo_tags JSONB DEFAULT '{}'::jsonb;

-- 2. Bookings & Inquiries Table (For Leads from Website)
CREATE TABLE IF NOT EXISTS public.retreat_bookings (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  package TEXT NOT NULL,
  room_type TEXT NOT NULL,
  date_preference TEXT,
  message TEXT,
  status TEXT DEFAULT 'new'
);

-- 3. Row Level Security Policies
ALTER TABLE public.shunya_site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retreat_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read site config" 
ON public.shunya_site_config FOR SELECT USING (true);

CREATE POLICY "Allow public insert bookings" 
ON public.retreat_bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update site config" 
ON public.shunya_site_config FOR ALL USING (true);

-- 4. Supabase Storage Bucket for Client Photos ('retreat-media')
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'retreat-media',
  'retreat-media',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public Read Access on retreat-media" ON storage.objects;
CREATE POLICY "Public Read Access on retreat-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'retreat-media');

DROP POLICY IF EXISTS "Allow Uploads on retreat-media" ON storage.objects;
CREATE POLICY "Allow Uploads on retreat-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'retreat-media');

DROP POLICY IF EXISTS "Allow Updates on retreat-media" ON storage.objects;
CREATE POLICY "Allow Updates on retreat-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'retreat-media');
`;
