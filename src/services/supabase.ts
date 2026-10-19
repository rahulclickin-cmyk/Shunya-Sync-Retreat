import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SiteConfig, BenefitSlide, BookingLead, SupabaseConfig, SeoConfig } from '../types/retreat';

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
  tagline: 'Disconnect from chaos. Reconnect with your true self.',
  headerAnnouncement: '🌿 Next Sacred Cohort: Nov 14–17 & Dec 12–16, 2026 • Limited to 12 Seekers • Direct WhatsApp: +91 9259698064',
  heroHeadline: 'Shunya Sync Retreat',
  heroSubheadline: 'Disconnect the noise, find your true self and sync with the universe.',
  heroBgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2400&q=85',
  heroTags: ['Yoga', 'Meditation', 'Sound Healing', 'Nature', 'Inner Alignment'],
  aboutText: 'At Shunya Sync Retreat, we believe that true healing begins when we come together. Through mindful yoga, sound adventures, and meaningful human connections – helping you reconnect with yourself and live with greater clarity and purpose.',
  philosophyQuote: 'Shunya is the sacred void — the zero point from which peace and creation arise.',
  adminPin: '7788',
  founder1: {
    name: 'Anmol Khatti',
    title: 'Founder & Movement Guide',
    note: 'Mindful breathwork & grounded presence',
    bio: 'Anmol brings years of dedicated sadhana in traditional Hatha yoga, somatic movement, and nervous system regulation. His sessions guide seekers back into deep connection with their physical vessel and authentic inner stillness.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  founder2: {
    name: 'Komal Makhetra',
    title: 'Founder & Sound Alchemist',
    note: 'Vibrational therapy & intuitive healing',
    bio: 'Komal is a certified sound therapist and master of Himalayan singing bowls, planetary gongs, and vocal frequency resonance. Her sacred sound baths dissolve emotional tension and transport participants into rejuvenating theta and delta brainwave states.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  pricing: {
    pkg4d3n: {
      title: '4 Days / 3 Nights Retreat',
      twinPrice: 32000,
      soloPrice: 26000,
      badge: 'Weekend Reset',
      description: 'The essential weekend reset. Arrive overwhelmed, leave deeply aligned and recharged.'
    },
    pkg5d4n: {
      title: '5 Days / 4 Nights Retreat',
      twinPrice: 44000,
      soloPrice: 38000,
      badge: 'Premium Experience',
      description: 'Deep dive into sacred silence, ecstatic movement, advanced sound baths, and permanent life integration.'
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
      caption: 'Open-air timber pavilion overlooking misty mountain ranges'
    },
    {
      url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
      title: 'Sound Healing Dome',
      caption: 'Acoustically tuned circular sanctuary for Tibetan singing bowls and gongs'
    },
    {
      url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      title: 'Sattvic Nourishment',
      caption: 'Organic garden-to-table vegetarian feast tables'
    },
    {
      url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      title: 'Free Movement & Dance',
      caption: 'Expressive freedom without inhibition or judgment'
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Eco-Luxury Nature Quarters',
      caption: 'Peaceful accommodation with sustainable organic linens'
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      title: 'Forest Bathing Trail',
      caption: 'Sacred river and tree canopy guided mindfulness walks'
    }
  ],
  seo: DEFAULT_SEO_CONFIG
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
  const pkg4 = rawPricing.pkg4d3n || {};
  const pkg5 = rawPricing.pkg5d4n || {};

  const safePricing = {
    pkg4d3n: {
      title: typeof pkg4.title === 'string' && pkg4.title ? pkg4.title : DEFAULT_SITE_CONFIG.pricing.pkg4d3n.title,
      twinPrice: typeof pkg4.twinPrice === 'number' && !isNaN(pkg4.twinPrice) ? pkg4.twinPrice : DEFAULT_SITE_CONFIG.pricing.pkg4d3n.twinPrice,
      soloPrice: typeof pkg4.soloPrice === 'number' && !isNaN(pkg4.soloPrice) ? pkg4.soloPrice : DEFAULT_SITE_CONFIG.pricing.pkg4d3n.soloPrice,
      badge: typeof pkg4.badge === 'string' && pkg4.badge ? pkg4.badge : DEFAULT_SITE_CONFIG.pricing.pkg4d3n.badge,
      description: typeof pkg4.description === 'string' && pkg4.description ? pkg4.description : DEFAULT_SITE_CONFIG.pricing.pkg4d3n.description
    },
    pkg5d4n: {
      title: typeof pkg5.title === 'string' && pkg5.title ? pkg5.title : DEFAULT_SITE_CONFIG.pricing.pkg5d4n.title,
      twinPrice: typeof pkg5.twinPrice === 'number' && !isNaN(pkg5.twinPrice) ? pkg5.twinPrice : DEFAULT_SITE_CONFIG.pricing.pkg5d4n.twinPrice,
      soloPrice: typeof pkg5.soloPrice === 'number' && !isNaN(pkg5.soloPrice) ? pkg5.soloPrice : DEFAULT_SITE_CONFIG.pricing.pkg5d4n.soloPrice,
      badge: typeof pkg5.badge === 'string' && pkg5.badge ? pkg5.badge : DEFAULT_SITE_CONFIG.pricing.pkg5d4n.badge,
      description: typeof pkg5.description === 'string' && pkg5.description ? pkg5.description : DEFAULT_SITE_CONFIG.pricing.pkg5d4n.description
    }
  };

  // Safely construct founders
  const founder1 = {
    ...DEFAULT_SITE_CONFIG.founder1,
    ...(input.founder1 || {})
  };
  const founder2 = {
    ...DEFAULT_SITE_CONFIG.founder2,
    ...(input.founder2 || {})
  };

  // Safely construct contact
  const contact = {
    ...DEFAULT_SITE_CONFIG.contact,
    ...(input.contact || {})
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

  return {
    brandName: input.brandName || input.brand_name || DEFAULT_SITE_CONFIG.brandName,
    tagline: input.tagline || DEFAULT_SITE_CONFIG.tagline,
    headerAnnouncement: input.headerAnnouncement ?? input.header_announcement ?? DEFAULT_SITE_CONFIG.headerAnnouncement,
    heroHeadline: input.heroHeadline || input.hero_headline || DEFAULT_SITE_CONFIG.heroHeadline,
    heroSubheadline: input.heroSubheadline || input.hero_subheadline || DEFAULT_SITE_CONFIG.heroSubheadline,
    heroBgImage: input.heroBgImage || input.hero_bg_image || DEFAULT_SITE_CONFIG.heroBgImage,
    heroTags: Array.isArray(input.heroTags) ? input.heroTags : (Array.isArray(input.hero_tags) ? input.hero_tags : DEFAULT_SITE_CONFIG.heroTags),
    aboutText: input.aboutText || input.about_text || DEFAULT_SITE_CONFIG.aboutText,
    philosophyQuote: input.philosophyQuote ?? input.philosophy_quote ?? DEFAULT_SITE_CONFIG.philosophyQuote,
    founder1,
    founder2,
    pricing: safePricing,
    contact,
    galleryImages,
    seo,
    adminPin: input.adminPin || input.admin_pin || DEFAULT_SITE_CONFIG.adminPin || '7788'
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
      galleryImages: data.gallery_images,
      adminPin: data.admin_pin
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
      founder1: config.founder1,
      founder2: config.founder2,
      pricing: config.pricing,
      contact: config.contact,
      gallery_images: config.galleryImages || DEFAULT_SITE_CONFIG.galleryImages,
      seo: config.seo || DEFAULT_SEO_CONFIG,
      admin_pin: config.adminPin || '7788',
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
  pricing JSONB NOT NULL DEFAULT '{"pkg4d3n":{"title":"4 Days / 3 Nights Retreat","twinPrice":32000,"soloPrice":26000,"badge":"Weekend Reset","description":"The essential weekend reset. Arrive overwhelmed, leave deeply aligned and recharged."},"pkg5d4n":{"title":"5 Days / 4 Nights Retreat","twinPrice":44000,"soloPrice":38000,"badge":"Premium Experience","description":"Deep dive into sacred silence, ecstatic movement, advanced sound baths, and permanent life integration."}}'::jsonb,
  contact JSONB NOT NULL DEFAULT '{"phone":"+91 9259698064","whatsappNumber":"919259698064","email":"hello@shunyasync.com","location":"India – Nature Retreat Destination"}'::jsonb,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  admin_pin TEXT DEFAULT '7788',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
  contact JSONB NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  admin_pin TEXT DEFAULT '7788',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if table was already created
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.shunya_site_config ADD COLUMN IF NOT EXISTS admin_pin TEXT DEFAULT '7788';

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
