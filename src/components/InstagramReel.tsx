import React, { useState } from 'react';
import { Instagram, ExternalLink, Play, Sparkles } from 'lucide-react';
import { SiteConfig, ReelDisplayPosition } from '../types/retreat';

export interface InstagramReelProps {
  config?: SiteConfig;
  positionTarget?: 'below-hero' | 'below-packages' | 'above-footer';
  overrideUrl?: string;
  overridePosition?: ReelDisplayPosition;
  className?: string;
  isPreview?: boolean;
}

/**
 * Automatically formats any standard Instagram Reel / Post URL into an embeddable iframe URL.
 * Handles:
 * - https://www.instagram.com/reel/CODE/
 * - https://www.instagram.com/reel/CODE/?utm_source=...
 * - https://instagram.com/p/CODE/
 * - https://instagram.com/tv/CODE/
 * - Raw shortcode (e.g. DXtQI5Fko0_)
 * - Existing embed URLs
 */
export function formatInstagramEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // If already an embed URL
  if (trimmed.includes('/embed')) {
    const clean = trimmed.split('?')[0].replace(/\/+$/, '');
    return `${clean}/`;
  }

  // Extract shortcode from standard Instagram URL patterns
  // Matches /reel/CODE, /p/CODE, or /tv/CODE
  const match = trimmed.match(/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (match && match[1]) {
    const code = match[1];
    const type = trimmed.includes('/p/') ? 'p' : trimmed.includes('/tv/') ? 'tv' : 'reel';
    return `https://www.instagram.com/${type}/${code}/embed/`;
  }

  // If raw shortcode was pasted (alphanumeric with _ or -)
  if (/^[A-Za-z0-9_-]{8,15}$/.test(trimmed)) {
    return `https://www.instagram.com/reel/${trimmed}/embed/`;
  }

  // Fallback: Clean query params and append /embed/
  try {
    const urlObj = new URL(trimmed);
    const cleanPath = urlObj.pathname.replace(/\/+$/, '');
    return `${urlObj.origin}${cleanPath}/embed/`;
  } catch {
    const clean = trimmed.split('?')[0].replace(/\/+$/, '');
    return `${clean}/embed/`;
  }
}

export const InstagramReel: React.FC<InstagramReelProps> = ({
  config,
  positionTarget,
  overrideUrl,
  overridePosition,
  className = '',
  isPreview = false
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Determine active URL and position from props or config
  const rawUrl =
    overrideUrl ??
    config?.instagramReelUrl ??
    config?.instagramReel?.url ??
    'https://www.instagram.com/reel/DXtQI5Fko0_/';

  const position: ReelDisplayPosition =
    overridePosition ??
    config?.instagramReelPosition ??
    config?.instagramReel?.position ??
    'below-packages';

  // If this instance is targeted for a specific layout position (e.g. below-hero, below-packages, above-footer)
  if (positionTarget && position !== positionTarget) {
    return null;
  }

  // If explicitly hidden and not in preview mode
  if (position === 'hide' && !isPreview) {
    return null;
  }

  const embedUrl = formatInstagramEmbedUrl(rawUrl);

  if (!embedUrl) {
    return null;
  }

  const title =
    config?.instagramReelTitle ??
    config?.instagramReel?.title ??
    'Living Atmosphere & Sacred Flow';

  const caption =
    config?.instagramReelCaption ??
    config?.instagramReel?.caption ??
    'Experience the living frequency of breathwork, sound alchemy, and peaceful forest stillness captured at Shunya Sync Retreat.';

  return (
    <section
      id="instagram-reel-section"
      className={`relative py-16 sm:py-24 px-4 sm:px-8 overflow-hidden ${
        isPreview ? 'py-6 px-2' : 'bg-[#FAF8F5] border-y border-[#EAE3D6]'
      } ${className}`}
    >
      {/* Decorative ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C67856]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#C67856] text-xs font-semibold uppercase tracking-widest border border-[#E8DFC0] shadow-sm">
            <Instagram className="w-3.5 h-3.5" />
            <span>Official Instagram Reel</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2E23]">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#556057] font-light leading-relaxed">
            {caption}
          </p>
        </div>

        {/* Responsive Instagram Embed Container */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-white border border-[#DFD7CA] shadow-xl hover:shadow-2xl transition duration-500">
            {/* Top delicate branded bar */}
            <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#EAE3D6] flex items-center justify-between text-xs text-[#556057]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[#1F2E23]">@shunyasync</span>
              </div>
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C67856] hover:underline"
              >
                <span>Open in App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embed Iframe with fixed vertical aspect ratio */}
            <div className="relative w-full aspect-[9/16] min-h-[560px] sm:min-h-[620px] bg-stone-900">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 bg-stone-950/80 p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-spin">
                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <p className="text-xs text-stone-300">Loading Instagram Transmission...</p>
                </div>
              )}

              <iframe
                src={embedUrl}
                title="Shunya Sync Retreat Instagram Reel"
                className="w-full h-full border-0"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
              />
            </div>

            {/* Card footer CTA */}
            <div className="p-4 bg-white border-t border-[#EAE3D6] flex items-center justify-between">
              <span className="text-xs text-[#7A867C] font-light">
                Follow our sacred journeys &amp; soundscapes
              </span>
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-xs font-semibold shadow-sm transition"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
