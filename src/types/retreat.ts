export interface PackagePricingItem {
  title: string;
  twinPrice: number; // Double sharing per person
  soloPrice: number; // Private accommodation per person
  badge: string;
  description: string;
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

