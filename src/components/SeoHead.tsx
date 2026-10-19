import React, { useEffect } from 'react';
import { SiteConfig, PageRoute, SeoConfig } from '../types/retreat';
import { DEFAULT_SEO_CONFIG } from '../services/supabase';

interface SeoHeadProps {
  config: SiteConfig;
  currentRoute: PageRoute;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ config, currentRoute }) => {
  const seo: SeoConfig = config.seo || DEFAULT_SEO_CONFIG;

  useEffect(() => {
    // 1. Compute Route-Specific Titles & Descriptions for Maximum SEO/GEO impact
    let pageTitle = seo.metaTitle;
    let pageDesc = seo.metaDescription;

    switch (currentRoute) {
      case 'about':
        pageTitle = `About Founders Anmol & Komal | Lineage & Philosophy • ${config.brandName}`;
        pageDesc = `Meet our founders Anmol Khatti (Movement Guide) and Komal Makhetra (Sound Alchemist). Explore our philosophy of Shunya (sacred stillness) and holistic healing in India.`;
        break;
      case 'experiences':
        pageTitle = `Sacred Experiences • 432Hz Sound Healing & Hatha Yoga | ${config.brandName}`;
        pageDesc = `Discover Tibetan bowl sound immersions, ecstatic movement, silence walks, and breathwork rituals engineered for deep nervous system recovery.`;
        break;
      case 'packages':
        pageTitle = `Retreat Packages & All-Inclusive Pricing (4D/3N & 5D/4N) | ${config.brandName}`;
        pageDesc = `Explore all-inclusive sanctuary rates: 4 Days / 3 Nights (₹26k-32k) and 5 Days / 4 Nights (₹38k-44k). Organic sattvic dining, private suites, and daily rituals included.`;
        break;
      case 'inclusions':
        pageTitle = `Sanctuary Inclusions & Sattvic Organic Nutrition | ${config.brandName}`;
        pageDesc = `From Ayurvedic farm-to-table cuisine and sound ceremonies to luxury nature quarters and private airport transfers. Zero hidden charges.`;
        break;
      case 'why-us':
        pageTitle = `Why Choose Shunya Sync • Intimate 12-Seeker Cohorts | ${config.brandName}`;
        pageDesc = `Why Shunya Sync is different: Strict 10-14 seeker cohort caps, scientific nervous system regulation, genuine authentic facilitators, and zero dogmatic commercialism.`;
        break;
      case 'gallery':
        pageTitle = `Sanctuary Photo Gallery & Mountain Shala Views | ${config.brandName}`;
        pageDesc = `Step inside our open-air wooden yoga shala, acoustic sound healing dome, sacred forest trails, and serene eco-luxury guest sanctuaries.`;
        break;
      case 'journal':
        pageTitle = `Sanctuary Journal & Vedic Wisdom Reflections | ${config.brandName}`;
        pageDesc = `Articles and reflections on nervous system down-regulation, 432Hz sound frequencies, circadian sleep architecture, and mindful living.`;
        break;
      case 'faq':
        pageTitle = `Retreat FAQs & Preparation Guide | ${config.brandName}`;
        pageDesc = `Answers to common queries: Travel logistics, packing checklists, dietary accommodations, beginner suitability, and cancellation terms.`;
        break;
      case 'contact':
        pageTitle = `Connect & Reserve Your Sanctuary Suite | ${config.brandName}`;
        pageDesc = `Reach out via WhatsApp (+91 9259698064) or direct booking inquiry for upcoming cohorts. Limited sacred spots available.`;
        break;
      case 'admin':
        pageTitle = `Private Admin Console • ${config.brandName}`;
        pageDesc = `Administrative dashboard for managing website content, Supabase cloud sync, media CDN, and booking leads.`;
        break;
      case 'privacy-policy':
        pageTitle = `Privacy Policy • ${config.brandName}`;
        break;
      case 'terms-conditions':
        pageTitle = `Terms & Conditions • ${config.brandName}`;
        break;
      case 'cancellation-refund':
        pageTitle = `Cancellation & Refund Policy • ${config.brandName}`;
        break;
      case 'health-waiver':
        pageTitle = `Health & Wellness Participant Waiver • ${config.brandName}`;
        break;
      default:
        pageTitle = seo.metaTitle || `${config.brandName} Retreat — Disconnect from chaos. Reconnect with your true self.`;
        pageDesc = seo.metaDescription;
        break;
    }

    // Apply document title
    document.title = pageTitle;

    // Helper to safely set or create meta tags
    const setMeta = (nameOrProp: string, isProp: boolean, content: string) => {
      if (!content) return;
      const attr = isProp ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, nameOrProp);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Search Engine SEO Meta
    setMeta('description', false, pageDesc);
    setMeta('keywords', false, seo.keywords);
    setMeta('author', false, `${config.founder1.name} & ${config.founder2.name}`);
    setMeta('robots', false, currentRoute === 'admin' ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 3. GEO Meta Tags (Generative & Geolocation Search Engines)
    setMeta('geo.region', false, seo.geoRegion || 'IN-UT');
    setMeta('geo.placename', false, seo.geoPlacename || 'Rishikesh, Uttarakhand, India');
    setMeta('geo.position', false, seo.geoPosition || '30.0869;78.2676');
    setMeta('ICBM', false, (seo.geoPosition || '30.0869, 78.2676').replace(';', ', '));

    // 4. AEO & AI Engine Answer Meta (ChatGPT, Perplexity, Gemini, Copilot)
    setMeta('ai-summary', false, seo.aeoSummary || config.aboutText);
    setMeta('theme-color', false, '#111A13');

    // 5. Canonical Link
    const fullCanonical = `${(seo.canonicalUrl || window.location.origin).replace(/\/$/, '')}${currentRoute === 'home' ? '' : '/' + currentRoute}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonical);

    // 6. OpenGraph (Facebook, WhatsApp, LinkedIn, Discord preview cards)
    setMeta('og:type', true, 'website');
    setMeta('og:title', true, pageTitle);
    setMeta('og:description', true, pageDesc);
    setMeta('og:url', true, fullCanonical);
    setMeta('og:site_name', true, config.brandName);
    setMeta('og:image', true, seo.ogImage || config.heroBgImage);
    setMeta('og:image:alt', true, `${config.brandName} Retreat Nature Sanctuary`);
    setMeta('og:locale', true, 'en_IN');

    // 7. Twitter / X Card
    setMeta('twitter:card', false, 'summary_large_image');
    setMeta('twitter:title', false, pageTitle);
    setMeta('twitter:description', false, pageDesc);
    setMeta('twitter:image', false, seo.ogImage || config.heroBgImage);

    // 8. Schema.org JSON-LD Structured Data Injection
    const schemaId = 'shunya-sync-json-ld';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${seo.canonicalUrl}#website`,
          url: seo.canonicalUrl,
          name: config.brandName,
          description: config.tagline,
          publisher: {
            '@id': `${seo.canonicalUrl}#organization`
          }
        },
        {
          '@type': 'HealthAndBeautyBusiness',
          '@id': `${seo.canonicalUrl}#organization`,
          name: config.brandName,
          url: seo.canonicalUrl,
          logo: seo.ogImage || config.heroBgImage,
          image: seo.ogImage || config.heroBgImage,
          description: config.aboutText,
          telephone: config.contact.phone,
          email: config.contact.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: seo.geoPlacename,
            addressRegion: 'Uttarakhand',
            addressCountry: 'IN'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: (seo.geoPosition || '30.0869').split(';')[0],
            longitude: (seo.geoPosition || '78.2676').split(';')[1] || '78.2676'
          },
          founders: [
            {
              '@type': 'Person',
              name: config.founder1.name,
              jobTitle: config.founder1.title,
              description: config.founder1.note
            },
            {
              '@type': 'Person',
              name: config.founder2.name,
              jobTitle: config.founder2.title,
              description: config.founder2.note
            }
          ],
          priceRange: '₹₹₹',
          makesOffer: [
            {
              '@type': 'Offer',
              name: config.pricing.pkg4d3n.title,
              description: config.pricing.pkg4d3n.description,
              price: config.pricing.pkg4d3n.soloPrice,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock'
            },
            {
              '@type': 'Offer',
              name: config.pricing.pkg5d4n.title,
              description: config.pricing.pkg5d4n.description,
              price: config.pricing.pkg5d4n.soloPrice,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock'
            }
          ]
        },
        // Event schema for upcoming cohorts
        {
          '@type': 'Event',
          name: `${config.brandName} Sacred Cohort Retreat`,
          startDate: '2026-11-14T08:00:00+05:30',
          endDate: '2026-11-17T17:00:00+05:30',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: `${config.brandName} Sanctuary`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: seo.geoPlacename,
              addressCountry: 'IN'
            }
          },
          image: [seo.ogImage || config.heroBgImage],
          description: seo.aeoSummary || config.aboutText,
          organizer: {
            '@id': `${seo.canonicalUrl}#organization`
          }
        },
        // FAQPage schema for Answer Engines (AEO)
        ...(seo.faqs && seo.faqs.length > 0
          ? [
              {
                '@type': 'FAQPage',
                mainEntity: seo.faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer
                  }
                }))
              }
            ]
          : [])
      ]
    };

    scriptTag.text = JSON.stringify(structuredData);
  }, [config, currentRoute, seo]);

  return null;
};
