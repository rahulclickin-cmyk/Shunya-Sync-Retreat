import React from 'react';
import { Sparkles, Leaf, Sun, Heart, Volume2, Compass, ShieldCheck, Flame, CircleDot } from 'lucide-react';

interface MarqueeTickerProps {
  direction?: 'ltr' | 'rtl';
  variant?: 'dark' | 'light' | 'terracotta' | 'forest';
  speed?: 'normal' | 'slow';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  direction = 'ltr',
  variant = 'dark',
  speed = 'normal'
}) => {
  const items = [
    { text: 'FIND STILLNESS • ALIGN WITHIN • AWAKEN', icon: <Sparkles className="w-3.5 h-3.5 text-[#E3A387]" /> },
    { text: 'DISCONNECT FROM CHAOS', icon: <Leaf className="w-3.5 h-3.5 text-[#E3A387]" /> },
    { text: 'RECONNECT WITH YOUR TRUE SELF', icon: <Heart className="w-3.5 h-3.5 text-[#E3A387]" /> },
    { text: '432Hz HARMONIC SOUND BATH', icon: <Volume2 className="w-3.5 h-3.5 text-[#C67856]" /> },
    { text: 'MINDFUL PRANAYAMA & HATHA YOGA', icon: <Sun className="w-3.5 h-3.5 text-[#E3A387]" /> },
    { text: 'PURE ORGANIC SATTVIC FEASTS', icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" /> },
    { text: 'SOMATIC DANCE & ECSTATIC JOY', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
    { text: 'INTIMATE CIRCLES (10–14 SEEKERS)', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C67856]" /> },
    { text: 'SACRED FOREST TRAILS & RIVERS', icon: <Compass className="w-3.5 h-3.5 text-emerald-300" /> },
    { text: 'SHUNYA SYNC RETREAT SANCTUARY • INDIA', icon: <Sparkles className="w-3.5 h-3.5 text-[#E3A387]" /> },
    { text: 'VIBRATIONAL FREQUENCY ALIGNMENT', icon: <CircleDot className="w-3.5 h-3.5 text-[#C67856]" /> }
  ];

  // Quadruple items to prevent any blank jump on 4K or ultra-wide displays
  const repeated = [...items, ...items, ...items, ...items];

  const bgStyles =
    variant === 'dark'
      ? 'bg-[#121B14] text-[#FAF7F0] border-y border-[#233526]'
      : variant === 'forest'
      ? 'bg-[#18261B] text-[#FAF7F0] border-y border-[#2C3F2F]'
      : variant === 'terracotta'
      ? 'bg-[#C67856] text-white border-y border-[#B56745]'
      : 'bg-[#EFEAE1] text-[#1F2E23] border-y border-[#DFD7CA]';

  const animationClass =
    direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl';

  return (
    <div
      className={`overflow-hidden py-3 select-none relative z-20 ${bgStyles} shadow-inner group`}
      title="Continuous Sanctuary Stream (Hover to Pause)"
    >
      <div
        className={`${animationClass} items-center gap-10 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold`}
        style={{ animationDuration: speed === 'slow' ? '90s' : '75s' }}
      >
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
          >
            {item.icon}
            <span className="whitespace-nowrap tracking-[0.22em]">{item.text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C67856] shrink-0 mx-2 shadow-[0_0_8px_rgba(198,120,86,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
