import React from 'react';
import { SiteConfig } from '../types/retreat';

interface WhyChooseUsParallaxProps {
  config: SiteConfig;
  onOpenBooking?: () => void;
  id?: string;
}

export const WhyChooseUsParallax: React.FC<WhyChooseUsParallaxProps> = ({
  config,
  onOpenBooking,
  id = 'why-choose-us'
}) => {
  const whyData = config.whyChooseUs || {};
  const eyebrow = whyData.eyebrow || 'WHY SHUNYA SYNC';
  const headingPrefix = whyData.headingPrefix || 'Why';
  const headingHighlight = whyData.headingHighlight || 'Choose Us';
  const bgImage =
    whyData.bgImage ||
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=75';

  const defaultCards = [
    {
      id: 1,
      title: 'Small intimate groups',
      desc: 'Curated cohorts of 10 to 14 participants to protect energy and ensure everyone is truly seen.'
    },
    {
      id: 2,
      title: 'Personalized attention',
      desc: 'Dedicated adjustments in asana, pranayama, and healing frequencies tailored to your body.'
    },
    {
      id: 3,
      title: 'Certified instructors & hosts',
      desc: 'Certified sound healing alchemists and certified yoga instructors with authentic lineage.'
    },
    {
      id: 4,
      title: 'Beginner friendly',
      desc: 'No past meditation or flexibility required. An open, loving container to begin as you are.'
    },
    {
      id: 5,
      title: 'Nature & Spiritual blend',
      desc: 'Vedic wisdom and sound alchemy paired with sacred river walks and Himalayan forest air.'
    },
    {
      id: 6,
      title: 'Safe & supportive space',
      desc: 'Guaranteed privacy, emotional safety, clean accommodations, and non-judgmental guidance.'
    }
  ];

  const cards = Array.isArray(whyData.cards) && whyData.cards.length > 0 ? whyData.cards : defaultCards;

  // Icon mapping according to index or card id
  const getCardIcon = (index: number) => {
    switch (index % 6) {
      case 0:
        return (
          // Small intimate groups icon (community/people)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 1:
        return (
          // Personalized attention (heart / care)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case 2:
        return (
          // Certified instructors (medal / award / certification)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        );
      case 3:
        return (
          // Beginner friendly (compass / guiding star)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        );
      case 4:
        return (
          // Nature & Spiritual blend (leaf / botanical harmony)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        );
      case 5:
      default:
        return (
          // Safe & supportive space (shield / haven)
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#f1d2c1] fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Scoped CSS for the fixed parallax and frosted glass effect */}
      <style>{`
        .why-parallax-section {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(4.5rem, 10vw, 8rem) 1.5rem;
          color: #ffffff;
        }

        .why-parallax-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background: url("${bgImage}") center / cover no-repeat fixed;
          pointer-events: none;
        }

        .why-parallax-section::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(180deg, rgba(31, 51, 40, 0.82), rgba(31, 51, 40, 0.74));
          pointer-events: none;
        }

        @media (hover: none), (max-width: 900px) {
          .why-parallax-section::before {
            background-attachment: scroll;
          }
        }

        .why-frosted-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 1.9rem;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: transform 0.4s ease-out, background 0.4s ease-out, border-color 0.4s ease-out, box-shadow 0.4s ease-out;
        }

        .why-frosted-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(241, 210, 193, 0.45);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .why-frosted-card,
          .why-frosted-card:hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <section id={id} className="why-parallax-section">
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto mb-12 sm:mb-14">
            {/* Eyebrow with lines on both sides */}
            <div className="inline-flex items-center justify-center gap-3.5 sm:gap-4 mb-3 sm:mb-4">
              <span className="inline-block w-7 h-[1px] bg-[#f1d2c1] opacity-60" aria-hidden="true" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#f1d2c1]">
                {eyebrow}
              </span>
              <span className="inline-block w-7 h-[1px] bg-[#f1d2c1] opacity-60" aria-hidden="true" />
            </div>

            {/* Heading: "Why Choose Us" with "Choose Us" in italic peach */}
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white tracking-tight">
              {headingPrefix} <em className="italic font-serif-display text-[#f1d2c1] font-normal not-italic-fallback">{headingHighlight}</em>
            </h2>
          </div>

          {/* Cards Grid: Responsive repeat(auto-fit, minmax(300px, 1fr)) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, index) => (
              <article key={card.id || index} className="why-frosted-card flex flex-col items-start text-left group">
                {/* 48px circle icon */}
                <div
                  className="w-12 h-12 rounded-full bg-[#f1d2c1]/15 border border-[#f1d2c1]/25 flex items-center justify-center mb-5 shrink-0 group-hover:bg-[#f1d2c1]/25 group-hover:scale-105 transition-all duration-300"
                  aria-hidden="true"
                >
                  {getCardIcon(index)}
                </div>

                {/* Card title */}
                <h3 className="font-serif-display text-[1.35rem] font-normal text-white leading-snug mb-2.5">
                  {card.title}
                </h3>

                {/* Card description */}
                {card.desc && (
                  <p className="font-sans text-[0.92rem] text-white/75 leading-relaxed mt-auto">
                    {card.desc}
                  </p>
                )}
              </article>
            ))}
          </div>

          {/* Optional Action Prompt if Booking is configured */}
          {onOpenBooking && (
            <div className="text-center pt-10 sm:pt-12">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#f1d2c1] hover:bg-white text-[#1f3328] hover:text-[#17251c] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Reserve Your Place In Our Circle</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
