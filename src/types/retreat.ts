export interface PackagePricingItem {
  title: string;
  twinPrice: number; // Double sharing per person
  soloPrice: number; // Private accommodation per person
  badge: string;
  description: string;
}

/**
 * Dynamic JSONB Site Settings Structure
 * Stores all global website settings, branding, logos, announcements, and contact information.
 * Supports unlimited dynamic fields without altering the database schema.
 */
export interface SiteSettings {
  brandName?: string;
  brandSubtitle?: string;
  tagline?: string;
  headerAnnouncement?: string;
  logoUrl?: string;
  showLogoIcon?: boolean;
  adminPin?: string;
  contact?: {
    phone: string;
    whatsappNumber: string;
    email: string;
    location: string;
    address?: string;
  };
  seo_geo_tags?: SeoConfig;

  // Dynamic Instagram Reel Embed Settings
  instagramReelUrl?: string;
  instagramReelPosition?: ReelDisplayPosition;
  instagramReelTitle?: string;
  instagramReelCaption?: string;
  instagramReel?: InstagramReelSettings;

  // Unlimited dynamic settings without schema migrations
  [key: string]: unknown;
}

export type ReelDisplayPosition = 'below-hero' | 'below-packages' | 'above-footer' | 'hide';

export interface InstagramReelSettings {
  url?: string;
  position?: ReelDisplayPosition;
  title?: string;
  caption?: string;
}

/**
 * Dynamic JSONB Pages Content Structure
 * Stores all page content, typography, hero details, storytelling narratives, and section data.
 * Supports unlimited dynamic content without altering the database schema.
 */
export interface PagesContent {
  // Hero Section
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBgImage?: string;
  heroTags?: string[];
  heroBadge?: string;
  heroQuote?: string;

  // Narratives & Philosophy
  aboutText?: string;
  philosophyQuote?: string;
  whyWeStarted?: string;
  whatMakesUsDifferent?: string;
  tagline?: string;

  // Why Choose Us Section
  whyChooseUs?: {
    eyebrow?: string;
    headingPrefix?: string;
    headingHighlight?: string;
    bgImage?: string;
    cards?: Array<{
      id: number;
      title: string;
      desc?: string;
    }>;
  };

  // Founders & Gallery
  founder1?: {
    name: string;
    title: string;
    note: string;
    bio: string;
    image: string;
  };
  founder2?: {
    name: string;
    title: string;
    note: string;
    bio: string;
    image: string;
  };
  galleryImages?: Array<{
    url: string;
    title: string;
    caption?: string;
  }>;

  // Packages & Blog
  retreat_packages?: Record<string, PackagePricingItem>;
  blog_posts?: BlogPost[];
  dynamic_sections?: Array<{ id: string; data: unknown }>;

  // Footer & Legal
  footerDescription?: string;
  footerCopyright?: string;

  // Unlimited dynamic page fields without schema migrations
  [key: string]: unknown;
}

/**
 * Supabase Row Representation for shunya_site_config
 */
export interface SupabaseSiteConfigRow {
  id: string;
  site_settings?: SiteSettings;
  pages_content?: PagesContent;
  blog_posts?: BlogPost[];
  retreat_packages?: Record<string, PackagePricingItem>;
  seo_geo_tags?: SeoConfig;
  dynamic_sections?: Array<{ id: string; data: unknown }>;
  updated_at?: string;

  // Optional legacy flat columns for backward compatibility reading
  brand_name?: string;
  tagline?: string;
  header_announcement?: string;
  hero_headline?: string;
  hero_subheadline?: string;
  hero_bg_image?: string;
  hero_tags?: string[];
  about_text?: string;
  philosophy_quote?: string;
  founder1?: unknown;
  founder2?: unknown;
  pricing?: unknown;
  contact?: unknown;
  gallery_images?: unknown;
  seo?: unknown;

  [key: string]: unknown;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  headerAnnouncement: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBgImage: string;
  heroTags: string[];
  aboutText: string;
  philosophyQuote: string;
  whyWeStarted?: string;
  whatMakesUsDifferent?: string;
  founder1: {
    name: string;
    title: string;
    note: string;
    bio: string;
    image: string;
  };
  founder2: {
    name: string;
    title: string;
    note: string;
    bio: string;
    image: string;
  };
  pricing: {
    pkg2n3d: PackagePricingItem;
    pkg3n4d: PackagePricingItem;
    pkg4n5d: PackagePricingItem;
    // Backward compatibility
    pkg4d3n: PackagePricingItem;
    pkg5d4n: PackagePricingItem;
  };
  contact: {
    phone: string;
    whatsappNumber: string;
    email: string;
    location: string;
    address?: string;
  };
  galleryImages?: Array<{
    url: string;
    title: string;
    caption?: string;
  }>;
  seo?: SeoConfig;
  adminPin?: string;
  logoUrl?: string;
  brandSubtitle?: string;
  showLogoIcon?: boolean;
  heroBadge?: string;
  heroQuote?: string;
  footerDescription?: string;
  footerCopyright?: string;
  whyChooseUs?: {
    eyebrow?: string;
    headingPrefix?: string;
    headingHighlight?: string;
    bgImage?: string;
    cards?: Array<{
      id: number;
      title: string;
      desc?: string;
    }>;
  };
  blogPosts?: BlogPost[];

  // Dynamic Instagram Reel Embed
  instagramReelUrl?: string;
  instagramReelPosition?: ReelDisplayPosition;
  instagramReelTitle?: string;
  instagramReelCaption?: string;
  instagramReel?: InstagramReelSettings;

  // Headless JSONB bundles
  site_settings?: SiteSettings;
  pages_content?: PagesContent;
  dynamic_sections?: Array<{ id: string; data: unknown }>;
  retreat_packages?: Record<string, PackagePricingItem>;
  seo_geo_tags?: SeoConfig;

  // Dynamic index signature for unlimited future fields without schema changes
  [key: string]: unknown;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  tag?: string;
  published?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  // GEO (Generative Engine Optimization & Geolocation)
  geoRegion: string; // e.g. "IN-UT"
  geoPlacename: string; // e.g. "Rishikesh, Uttarakhand, India"
  geoPosition: string; // "latitude;longitude"
  // AEO (Answer Engine Optimization)
  aeoSummary: string;
  faqs: FaqItem[];
}

export interface BenefitSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'leaf' | 'sun' | 'heart' | 'volume' | 'shield' | 'compass' | 'lotus' | 'moon';
  badge: string;
  bgGradient: string;
}

export interface BookingLead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  roomType: string;
  datePreference: string;
  message: string;
  status: 'new' | 'contacted' | 'confirmed';
}

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  tableName: string;
  storageBucket?: string;
  isConnected: boolean;
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'experiences'
  | 'packages'
  | 'inclusions'
  | 'why-us'
  | 'gallery'
  | 'journal'
  | 'faq'
  | 'contact'
  | 'admin'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'cancellation-refund'
  | 'health-waiver';

