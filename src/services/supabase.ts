import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SiteConfig, BenefitSlide, BookingLead, SupabaseConfig, SeoConfig, BlogPost } from '../types/retreat';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Science of 432Hz: How Sacred Sound Downregulates the Nervous System',
    slug: 'science-of-432hz-sound-healing',
    category: 'Sound Healing',
    author: 'Komal Makhetra',
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
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sound Alchemy',
    published: true
  },
  {
    id: 'post-2',
    title: 'Pranayama in the Pines: Awakening Prana Through Himalayan Mountain Air',
    slug: 'pranayama-in-the-pines-himalayan-breath',
    category: 'Yoga & Breathwork',
    author: 'Anmol Khatti',
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
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    tag: 'Breathwork',
    published: true
  },
  {
    id: 'post-3',
    title: 'The Sattvic Kitchen: Why Pure Vegetarian Food Changes Your Meditation Depth',
    slug: 'sattvic-kitchen-ayurvedic-meditation-nutrition',
    category: 'Ayurvedic Nourishment',
    author: 'Anmol Khatti',
    date: 'September 30, 2026',
    readTime: '7 min read',
    summary: 'According to Ayurveda, the purity of mind (Sattva) begins on your plate. Learn why seasonal, garden-fresh ingredients open pathways for effortless stillness.',
    content: `In the ancient texts of the Chandogya Upanishad, it is written: *"From the purity of food comes the purity of nature; from the purity of nature comes memory; and from memory, freedom from all bonds."*

Most people view food merely as calories, proteins, and carbohydrates. In the Ayurvedic tradition, food is *Brahma*—sacred energy that directly influences your mental states:
- **Tamasic Food**: Heavy, stale, processed, or overly greasy. Causes lethargy, brain fog, and depression.
- **Rajasic Food**: Overly spicy, caffeinated, sour, or stimulating. Agitates thoughts, elevates heart rate, and sparks restlessness.
- **Sattvic Food**: Light, organic, seasonal, prepared with reverence. Enhances mental clarity, compassion, and deep meditative absorption.

At Shunya Sync, all meals are grown on terraced organic farms without chemical pesticides. Prepared fresh with digestive spices like fresh ginger, turmeric root, cumin, and coriander, each meal leaves you light, energized, and ready for silent contemplation.`,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    tag: 'Ayurveda',
    published: true
  },
  {
    id: 'post-4',
    title: 'Solo Travel as a Spiritual Mirror: Finding Freedom Beyond Social Conditioning',
    slug: 'solo-travel-spiritual-mirror-retreat',
    category: 'Inner Alignment',
    author: 'Komal Makhetra',
    date: 'September 20, 2026',
    readTime: '8 min read',
    summary: 'Over 65% of Shunya Sync guests arrive alone. Here is how entering an intimate circle of strangers allows you to shed societal masks and experience pure self-acceptance.',
    content: `Throughout daily life, we are constantly holding up masks: the reliable employee, the attentive parent, the dutiful partner, the accomplished professional. We become so entangled in who we are supposed to be that we forget who we are underneath.

When you pack a single bag and travel alone to a sacred retreat, something miraculous happens:
Nobody in the room knows your job title, your past regrets, or your social status. You enter a circle of seekers where everyone has come to lay down their heavy armor.

### Sacred Vulnerability in Small Circles
Because our cohort is strictly limited to 10–14 participants, you are never lost in a crowd. During evening sharing circles, bonfires, and silent tea rituals, deep human connection blossoms without pretense.

Seekers often tell us that the friends they met at Shunya Sync feel like family they had known for centuries. When you return home, you carry not just relaxation, but a grounded, clear knowing of your authentic self.`,
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Inner Growth',
    published: true
  }
];

export const DEFAULT_SEO_CONFIG: SeoConfig = {
  metaTitle: 'Shunya Sync Retreat — Mindful Yoga, Sound Healing & Forest Stillness in India',
  metaDescription: 'Disconnect from chaos, discover your true self, and sync with the universe. Luxury 4D/3N & 5D/4N sacred wellness retreats in India with 432Hz sound therapy, Hatha yoga, and organic sattvic nourishment.',
  keywords: 'wellness retreat India, sound healing retreat, yoga retreat India, Rishikesh yoga retreat, 432Hz sound bath, mindful meditation, sattvic food retreat, digital detox India, Shunya Sync',
  ogImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
  canonicalUrl: 'https://shunyasync.com',
  geoRegion: 'IN-UT',
  geoPlacename: 'Rishikesh, Uttarakhand, India',
  geoPosition: '30.0869;78.2676',
  aeoSummary: 'Shunya Sync Retreat is an intimate transformative wellness and sound healing sanctuary in India, hosted by Anmol Khatti & Komal Makhetra, featuring 432Hz acoustic therapy, authentic Hatha yoga, and 100% farm-to-table sattvic cuisine.',
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
      answer: '432Hz is a natural harmonic frequency known to induce deep theta and delta brainwave states. Certified sound therapist Komal Makhetra utilizes handcrafted Himalayan singing bowls, planetary gongs, and chime frequencies to physically soothe stress hormones.',
      category: 'Practices'
    },
    {
      question: 'How do I reserve my spot?',
      answer: 'You can submit the booking form on this website or chat directly via WhatsApp (+91 9259698064). A deposit secures your sanctuary suite.',
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
  heroBgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2400&q=85',
  heroTags: ['Somatic Yoga', 'Vedic Sound Bath', 'Forest Bathing', 'Digital Fasting', 'Inner Alignment'],
  aboutText: 'At Shunya Sync Retreat, At Shunya Sync, we curate soulful retreats that bring together yoga, mindfulness, nature, adventure, and meaningful human connections—helping you reconnect with yourself and live with greater clarity and purpose.',
  philosophyQuote: 'In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.',
  whyWeStarted: 'To offer intimate, soulful journeys away from daily noise.',
  whatMakesUsDifferent: 'Intimate groups, nature-based settings, soulful evenings, and expert guides.',
  adminPin: '7788',
  logoUrl: '/logo.png',
  founder1: {
    name: 'Anmol Khatri',
    title: 'Founder & Movement Guide',
    note: 'Mindful breathwork & grounded presence',
    bio: 'Anmol brings years of dedicated sadhana in traditional Hatha yoga, somatic movement, and nervous system regulation. His grounded, compassionate presence guides seekers back into deep bodily connection and authentic inner stillness.',
    image: '/assets/aistudio/founder_anmol_khatri.jpg'
  },
  founder2: {
    name: 'Komal Malhotra',
    title: 'Founder & Sound Alchemist',
    note: 'Vibrational therapy & intuitive healing',
    bio: 'Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance. Her sacred sound baths dissolve emotional tension and transport participants into rejuvenating theta brainwave states.',
    image: '/assets/aistudio/founder_komal_malhotra.jpg'
  },
  pricing: {
    pkg2n3d: {
      title: '2 Nights / 3 Days Retreat',
      twinPrice: 22000,
      soloPrice: 26000,
      badge: 'Weekend Reset',
      description: 'Choose your duration — each package includes a full day-by-day schedule and transparent pricing.'
    },
    pkg3n4d: {
      title: '3 Nights / 4 Days Retreat',
      twinPrice: 26000,
      soloPrice: 32000,
      badge: 'Most Popular',
      description: 'Body & breath connection, evening Ganga Aarti, chakra & sound healing, and thrilling adventure.'
    },
    pkg4n5d: {
      title: '4 Nights / 5 Days Retreat (Premium Experience)',
      twinPrice: 44000,
      soloPrice: 52000,
      badge: 'Premium Experience',
      description: 'Deep healing, river rafting, ecstatic dance, inner work, and complete spiritual integration.'
    },
    // Backward compatibility aliases
    pkg4d3n: {
      title: '3 Nights / 4 Days Retreat',
      twinPrice: 26000,
      soloPrice: 32000,
      badge: 'Most Popular',
      description: 'Body & breath connection, evening Ganga Aarti, chakra & sound healing, and thrilling adventure.'
    },
    pkg5d4n: {
      title: '4 Nights / 5 Days Retreat (Premium Experience)',
      twinPrice: 44000,
      soloPrice: 52000,
      badge: 'Premium Experience',
      description: 'Deep healing, river rafting, ecstatic dance, inner work, and complete spiritual integration.'
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
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      title: 'Sunrise Yoga Shala',
      caption: 'Open-air timber pavilion overlooking mist-cloaked Himalayan valleys'
    },
    {
      url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
      title: 'Sound Healing Dome',
      caption: 'Acoustically tuned circular sanctuary for Tibetan singing bowls and gongs'
    },
    {
      url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      title: 'Sattvic Nourishment',
      caption: 'Organic garden-to-table vegetarian feast tables and healing herbal infusions'
    },
    {
      url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      title: 'Free Movement & Dance',
      caption: 'Expressive somatic liberation without inhibition or judgment'
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Eco-Luxury Nature Quarters',
      caption: 'Peaceful accommodation with sustainable organic linens and forest views'
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      title: 'Forest Bathing Trail',
      caption: 'Sacred river and tree canopy guided mindfulness walking meditation'
    }
  ],
  seo: DEFAULT_SEO_CONFIG,
  brandSubtitle: 'Retreat Sanctuary',
  showLogoIcon: true,
  whyChooseUs: {
    eyebrow: 'WHY SHUNYA SYNC',
    headingPrefix: 'Why',
    headingHighlight: 'Choose Us',
    bgImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75',
    cards: [
      { id: 1, title: 'Small intimate groups', desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.' },
      { id: 2, title: 'Personalized attention', desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.' },
      { id: 3, title: 'Certified instructors & hosts', desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.' },
      { id: 4, title: 'Beginner friendly', desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.' },
      { id: 5, title: 'Nature & Spiritual blend', desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.' },
      { id: 6, title: 'Safe & supportive space', desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.' }
    ]
  },
  blogPosts: DEFAULT_BLOG_POSTS
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
 * never cause undefined property crashes even if legacy or partial data is retrieved.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeSiteConfig(input: any): SiteConfig {
  if (!input || typeof input !== 'object') {
    return DEFAULT_SITE_CONFIG;
  }

  // Safely construct pricing
  const rawPricing = input.pricing || {};
  const rawPkg2 = rawPricing.pkg2n3d || {};
  const rawPkg3 = rawPricing.pkg3n4d || rawPricing.pkg4d3n || {};
  const rawPkg4 = rawPricing.pkg4n5d || rawPricing.pkg5d4n || {};

  const pkg2Item = {
    title: typeof rawPkg2.title === 'string' && rawPkg2.title ? rawPkg2.title : DEFAULT_SITE_CONFIG.pricing.pkg2n3d.title,
    twinPrice: typeof rawPkg2.twinPrice === 'number' && !isNaN(rawPkg2.twinPrice) ? rawPkg2.twinPrice : DEFAULT_SITE_CONFIG.pricing.pkg2n3d.twinPrice,
    soloPrice: typeof rawPkg2.soloPrice === 'number' && !isNaN(rawPkg2.soloPrice) ? rawPkg2.soloPrice : DEFAULT_SITE_CONFIG.pricing.pkg2n3d.soloPrice,
    badge: typeof rawPkg2.badge === 'string' && rawPkg2.badge ? rawPkg2.badge : DEFAULT_SITE_CONFIG.pricing.pkg2n3d.badge,
    description: typeof rawPkg2.description === 'string' && rawPkg2.description ? rawPkg2.description : DEFAULT_SITE_CONFIG.pricing.pkg2n3d.description
  };

  const pkg3Item = {
    title: typeof rawPkg3.title === 'string' && rawPkg3.title ? rawPkg3.title : DEFAULT_SITE_CONFIG.pricing.pkg3n4d.title,
    twinPrice: typeof rawPkg3.twinPrice === 'number' && !isNaN(rawPkg3.twinPrice) ? rawPkg3.twinPrice : DEFAULT_SITE_CONFIG.pricing.pkg3n4d.twinPrice,
    soloPrice: typeof rawPkg3.soloPrice === 'number' && !isNaN(rawPkg3.soloPrice) ? rawPkg3.soloPrice : DEFAULT_SITE_CONFIG.pricing.pkg3n4d.soloPrice,
    badge: typeof rawPkg3.badge === 'string' && rawPkg3.badge ? rawPkg3.badge : DEFAULT_SITE_CONFIG.pricing.pkg3n4d.badge,
    description: typeof rawPkg3.description === 'string' && rawPkg3.description ? rawPkg3.description : DEFAULT_SITE_CONFIG.pricing.pkg3n4d.description
  };

  const pkg4Item = {
    title: typeof rawPkg4.title === 'string' && rawPkg4.title ? rawPkg4.title : DEFAULT_SITE_CONFIG.pricing.pkg4n5d.title,
    twinPrice: typeof rawPkg4.twinPrice === 'number' && !isNaN(rawPkg4.twinPrice) ? rawPkg4.twinPrice : DEFAULT_SITE_CONFIG.pricing.pkg4n5d.twinPrice,
    soloPrice: typeof rawPkg4.soloPrice === 'number' && !isNaN(rawPkg4.soloPrice) ? rawPkg4.soloPrice : DEFAULT_SITE_CONFIG.pricing.pkg4n5d.soloPrice,
    badge: typeof rawPkg4.badge === 'string' && rawPkg4.badge ? rawPkg4.badge : DEFAULT_SITE_CONFIG.pricing.pkg4n5d.badge,
    description: typeof rawPkg4.description === 'string' && rawPkg4.description ? rawPkg4.description : DEFAULT_SITE_CONFIG.pricing.pkg4n5d.description
  };

  const safePricing = {
    pkg2n3d: pkg2Item,
    pkg3n4d: pkg3Item,
    pkg4n5d: pkg4Item,
    // Backward compatibility aliases
    pkg4d3n: pkg3Item,
    pkg5d4n: pkg4Item
  };

  // Safely construct founders with smooth migration
  const rawFounder1 = input.founder1 || {};
  const founder1 = {
    ...DEFAULT_SITE_CONFIG.founder1,
    ...rawFounder1,
    name: rawFounder1.name && rawFounder1.name !== 'Anmol Khatti' && rawFounder1.name !== 'Aarav Sharma' ? rawFounder1.name : 'Anmol Khatri',
    image: rawFounder1.image && !rawFounder1.image.includes('unsplash.com/photo-1545205597') && !rawFounder1.image.includes('photo-1506794778202') ? rawFounder1.image : '/assets/aistudio/founder_anmol_khatri.jpg'
  };

  const rawFounder2 = input.founder2 || {};
  const founder2 = {
    ...DEFAULT_SITE_CONFIG.founder2,
    ...rawFounder2,
    name: rawFounder2.name && rawFounder2.name !== 'Komal Makhetra' && rawFounder2.name !== 'Devanshi Mehta' ? rawFounder2.name : 'Komal Malhotra',
    image: rawFounder2.image && !rawFounder2.image.includes('unsplash.com/photo-1508214751196') && !rawFounder2.image.includes('unsplash.com/photo-1534528741775') ? rawFounder2.image : '/assets/aistudio/founder_komal_malhotra.jpg'
  };

  // Safely construct contact
  const contact = {
    ...DEFAULT_SITE_CONFIG.contact,
    ...(input.contact || {}),
    phone: input.contact?.phone && input.contact.phone.includes('9259698064') ? input.contact.phone : DEFAULT_SITE_CONFIG.contact.phone,
    whatsappNumber: input.contact?.whatsappNumber && input.contact.whatsappNumber.includes('9259698064') ? input.contact.whatsappNumber : DEFAULT_SITE_CONFIG.contact.whatsappNumber
  };

  // Safely construct gallery images
  const galleryImages = Array.isArray(input.galleryImages) && input.galleryImages.length > 0
    ? input.galleryImages
    : (Array.isArray(input.gallery_images) && input.gallery_images.length > 0
        ? input.gallery_images
        : DEFAULT_SITE_CONFIG.galleryImages);

  // Safely construct SEO
  const seo = {
    ...DEFAULT_SEO_CONFIG,
    ...(input.seo || {})
  };

  const currentTagline = input.tagline && !input.tagline.toLowerCase().includes('disconnect from chaos')
    ? input.tagline
    : DEFAULT_SITE_CONFIG.tagline;

  return {
    brandName: input.brandName || input.brand_name || DEFAULT_SITE_CONFIG.brandName,
    tagline: currentTagline,
    headerAnnouncement: input.headerAnnouncement ?? input.header_announcement ?? DEFAULT_SITE_CONFIG.headerAnnouncement,
    heroHeadline: input.heroHeadline || input.hero_headline || DEFAULT_SITE_CONFIG.heroHeadline,
    heroSubheadline: input.heroSubheadline || input.hero_subheadline || DEFAULT_SITE_CONFIG.heroSubheadline,
    heroBgImage: input.heroBgImage || input.hero_bg_image || DEFAULT_SITE_CONFIG.heroBgImage,
    heroTags: Array.isArray(input.heroTags) ? input.heroTags : (Array.isArray(input.hero_tags) ? input.hero_tags : DEFAULT_SITE_CONFIG.heroTags),
    aboutText: input.aboutText || input.about_text || DEFAULT_SITE_CONFIG.aboutText,
    philosophyQuote: input.philosophyQuote ?? input.philosophy_quote ?? DEFAULT_SITE_CONFIG.philosophyQuote,
    whyWeStarted: input.whyWeStarted || input.why_we_started || DEFAULT_SITE_CONFIG.whyWeStarted || 'To offer intimate, soulful journeys away from daily noise.',
    whatMakesUsDifferent: input.whatMakesUsDifferent || input.what_makes_us_different || DEFAULT_SITE_CONFIG.whatMakesUsDifferent || 'Intimate groups, nature-based settings, soulful evenings, and expert guides.',
    founder1,
    founder2,
    pricing: safePricing,
    contact,
    galleryImages,
    seo,
    adminPin: input.adminPin || input.admin_pin || DEFAULT_SITE_CONFIG.adminPin || '7788',
    logoUrl: input.logoUrl || input.logo_url || DEFAULT_SITE_CONFIG.logoUrl || '/logo.png',
    brandSubtitle: typeof input.brandSubtitle === 'string' ? input.brandSubtitle : (typeof input.brand_subtitle === 'string' ? input.brand_subtitle : DEFAULT_SITE_CONFIG.brandSubtitle || 'Retreat Sanctuary'),
    showLogoIcon: input.showLogoIcon !== undefined ? Boolean(input.showLogoIcon) : (input.show_logo_icon !== undefined ? Boolean(input.show_logo_icon) : true),
    whyChooseUs: {
      eyebrow: input.whyChooseUs?.eyebrow || input.why_choose_us?.eyebrow || DEFAULT_SITE_CONFIG.whyChooseUs?.eyebrow || 'WHY SHUNYA SYNC',
      headingPrefix: input.whyChooseUs?.headingPrefix || input.why_choose_us?.heading_prefix || DEFAULT_SITE_CONFIG.whyChooseUs?.headingPrefix || 'Why',
      headingHighlight: input.whyChooseUs?.headingHighlight || input.why_choose_us?.heading_highlight || DEFAULT_SITE_CONFIG.whyChooseUs?.headingHighlight || 'Choose Us',
      bgImage: input.whyChooseUs?.bgImage || input.why_choose_us?.bg_image || DEFAULT_SITE_CONFIG.whyChooseUs?.bgImage || 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75',
      cards: Array.isArray(input.whyChooseUs?.cards) && input.whyChooseUs.cards.length > 0
        ? input.whyChooseUs.cards
        : (Array.isArray(input.why_choose_us?.cards) && input.why_choose_us.cards.length > 0
            ? input.why_choose_us.cards
            : DEFAULT_SITE_CONFIG.whyChooseUs?.cards)
    },
    blogPosts: Array.isArray(input.blogPosts) && input.blogPosts.length > 0
      ? input.blogPosts
      : (Array.isArray(input.blog_posts) && input.blog_posts.length > 0
          ? input.blog_posts
          : DEFAULT_SITE_CONFIG.blogPosts || DEFAULT_BLOG_POSTS)
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
 * Fetches latest site config from Supabase cloud database if connected
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

    const merged = normalizeSiteConfig({
      ...data,
      brandName: data.brand_name,
      tagline: data.tagline,
      headerAnnouncement: data.header_announcement,
      heroHeadline: data.hero_headline,
      heroSubheadline: data.hero_subheadline,
      heroBgImage: data.hero_bg_image,
      heroTags: data.hero_tags,
      aboutText: data.about_text,
      philosophyQuote: data.philosophy_quote,
      whyWeStarted: data.why_we_started,
      whatMakesUsDifferent: data.what_makes_us_different,
      galleryImages: data.gallery_images,
      adminPin: data.admin_pin,
      logoUrl: data.logo_url,
      brandSubtitle: data.brand_subtitle,
      showLogoIcon: data.show_logo_icon,
      whyChooseUs: data.why_choose_us,
      blogPosts: data.blog_posts
    });

    saveStoredSiteConfig(merged);
    return merged;
  } catch (err) {
    console.warn('Failed to fetch config from Supabase:', err);
    return null;
  }
}

export async function syncConfigToSupabase(config: SiteConfig): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  const cfg = getStoredSupabaseConfig();
  if (!client) {
    return {
      success: false,
      message: 'Supabase credentials not configured. Changes saved locally in browser storage.'
    };
  }

  try {
    const tableName = cfg.tableName || 'shunya_site_config';
    const payload = {
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
      why_we_started: config.whyWeStarted,
      what_makes_us_different: config.whatMakesUsDifferent,
      founder1: config.founder1,
      founder2: config.founder2,
      pricing: config.pricing,
      contact: config.contact,
      gallery_images: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages,
      seo: config.seo || DEFAULT_SEO_CONFIG,
      admin_pin: config.adminPin || '7788',
      logo_url: config.logoUrl || '/logo.png',
      brand_subtitle: config.brandSubtitle || 'Retreat Sanctuary',
      show_logo_icon: config.showLogoIcon !== false,
      why_choose_us: config.whyChooseUs || DEFAULT_SITE_CONFIG.whyChooseUs,
      blog_posts: config.blogPosts || DEFAULT_BLOG_POSTS,
      updated_at: new Date().toISOString()
    };

    const { error } = await client.from(tableName).upsert(payload);
    if (error) {
      console.error('Supabase upsert error:', error);
      return { success: false, message: `Supabase Error: ${error.message}` };
    }

    return { success: true, message: 'Successfully synced siteConfig and SEO to Supabase database!' };
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

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================
-- SHUNYA SYNC RETREAT - SUPABASE SQL SCHEMA & STORAGE BUCKET
-- Paste this entire script in your Supabase Dashboard -> SQL Editor
-- ==============================================================

-- 1. Site Configuration Table (For WordPress-like CMS Settings)
CREATE TABLE IF NOT EXISTS public.shunya_site_config (
  id TEXT PRIMARY KEY DEFAULT 'current_config',
  brand_name TEXT NOT NULL DEFAULT 'Shunya Sync',
  tagline TEXT NOT NULL DEFAULT 'Disconnect from chaos. Reconnect with your true self.',
  header_announcement TEXT DEFAULT '🌿 Next Sacred Immersive Retreat: March 15 - 20, 2026 • Limited to 18 Seekers',
  hero_headline TEXT NOT NULL DEFAULT 'Shunya Sync Retreat',
  hero_subheadline TEXT NOT NULL DEFAULT 'A transformative sanctuary for nervous system regulation, somatic breathwork, sound healing, and deep digital detox in Rishikesh.',
  hero_bg_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=85',
  hero_tags JSONB NOT NULL DEFAULT '["Somatic Yoga","Vedic Sound Bath","Forest Bathing","Digital Fasting","Ayurvedic Feasts"]'::jsonb,
  about_text TEXT NOT NULL DEFAULT 'Shunya Sync was conceived in the high tranquility of the Himalayan foothills as a sacred answer to modern sensory overload.',
  philosophy_quote TEXT DEFAULT 'In the quiet zero between each breath, the soul remembers who it was before the world taught it to be hurried.',
  founder1 JSONB NOT NULL DEFAULT '{"name":"Anmol Khatti","title":"Founder & Movement Guide","note":"Mindful living & somatic alignment","bio":"Anmol has spent over a decade studying traditional Ashtanga and contemporary somatic movement. His grounded, compassionate presence guides seekers back to bodily presence.","image":"https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80"}'::jsonb,
  founder2 JSONB NOT NULL DEFAULT '{"name":"Komal Makhetra","title":"Founder & Sound Alchemist","note":"Vibrational therapy & intuitive healing","bio":"Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance.","image":"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}'::jsonb,
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if table was already created
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS admin_pin TEXT DEFAULT '7788';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '/logo.png';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS brand_subtitle TEXT DEFAULT 'Retreat Sanctuary';
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS show_logo_icon BOOLEAN DEFAULT true;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS why_choose_us JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS blog_posts JSONB DEFAULT '[]'::jsonb;

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
