import React, { useState } from 'react';
import { Sun, Sparkles, Volume2, Leaf, Heart, CircleDot } from 'lucide-react';

interface FlippingHeroTagsProps {
  tags?: string[];
}

interface PillarItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeBg: string;
}

export const FlippingHeroTags: React.FC<FlippingHeroTagsProps> = ({ tags }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Curated retreat modalities with high-end spiritual metadata
  const pillars: PillarItem[] = [
    {
      id: 'yoga',
      name: 'Mindful Yoga',
      subtitle: 'Hatha & Somatic Flow',
      icon: <Sun className="w-3.5 h-3.5 text-amber-300" />,
      accentColor: '#E3A387',
      badgeBg: 'rgba(227, 163, 135, 0.12)'
    },
    {
      id: 'meditation',
      name: 'Sacred Meditation',
      subtitle: 'Silence & Vipassana',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-300" />,
      accentColor: '#A2B19F',
      badgeBg: 'rgba(162, 177, 159, 0.12)'
    },
    {
      id: 'sound',
      name: 'Sound Healing',
      subtitle: '432Hz Tibetan Bowls',
      icon: <Volume2 className="w-3.5 h-3.5 text-[#E3A387]" />,
      accentColor: '#C67856',
      badgeBg: 'rgba(198, 120, 86, 0.14)'
    },
    {
      id: 'nature',
      name: 'Nature Immersion',
      subtitle: 'Rivers & Forest Walks',
      icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />,
      accentColor: '#68B07A',
      badgeBg: 'rgba(104, 176, 122, 0.12)'
    },
    {
      id: 'alignment',
      name: 'Inner Alignment',
      subtitle: 'Pranayama & Peace',
      icon: <Heart className="w-3.5 h-3.5 text-rose-300" />,
      accentColor: '#EAA9A9',
      badgeBg: 'rgba(234, 169, 169, 0.12)'
    }
  ];

  return (
    <div className="pt-3 max-w-4xl mx-auto">
      {/* Top micro-label */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E3A387]/60" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#E3A387] font-medium flex items-center gap-1.5">
          <CircleDot className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
          Sacred Modalities Included
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E3A387]/60" />
      </div>

      {/* Luxury Modality Badges: Steady, Clean, Professional & Interactive */}
      <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5">
        {pillars.map((item, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group cursor-pointer transition-all duration-300 ease-out"
              style={{ perspective: '800px' }}
            >
              <div
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2.5 select-none backdrop-blur-md ${
                  isHovered
                    ? 'bg-[#1C281F]/90 border-[#E3A387] shadow-[0_10px_25px_-5px_rgba(198,120,86,0.35)] -translate-y-1 scale-105'
                    : 'bg-black/35 border-white/20 hover:border-white/40 shadow-sm'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isHovered
                    ? 'perspective(800px) rotateX(4deg) translateY(-3px)'
                    : 'perspective(800px) rotateX(0deg) translateY(0)'
                }}
              >
                {/* Gentle Shimmer Beam Effect on Hover or ambient */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-20 ${
                      isHovered ? 'animate-shimmer-beam' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Pillar Icon with gentle glow */}
                <span
                  className="p-1 rounded-full bg-white/10 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: item.accentColor }}
                >
                  {item.icon}
                </span>

                {/* Pillar Name & Context */}
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-stone-100 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-stone-300/80 font-light tracking-wider leading-none hidden sm:block">
                    {item.subtitle}
                  </span>
                </div>

                {/* Live subtle dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isHovered
                      ? 'bg-[#E3A387] scale-125 shadow-[0_0_8px_#E3A387]'
                      : 'bg-stone-400/50'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
