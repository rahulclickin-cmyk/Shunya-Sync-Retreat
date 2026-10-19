import React from 'react';
import { ArrowRight, Compass, Sparkles, MessageCircle, Calendar } from 'lucide-react';

interface Hero3DButtonsProps {
  onViewRetreats: () => void;
  onBookNow: () => void;
}

export const Hero3DButtons: React.FC<Hero3DButtonsProps> = ({
  onViewRetreats,
  onBookNow
}) => {
  return (
    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-xl mx-auto">
      {/* 1. SECONDARY 3D FLIP BUTTON: View Retreats -> Sacred Itineraries */}
      <div
        onClick={onViewRetreats}
        className="group relative w-full sm:w-56 h-13 cursor-pointer select-none [perspective:1000px]"
        role="button"
        tabIndex={0}
        aria-label="View Retreats and Itineraries"
      >
        <div className="relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] shadow-lg rounded-full">
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden rounded-full flex items-center justify-center gap-2.5 px-6 border-2 border-[#FAF8F5]/85 bg-black/25 backdrop-blur-md text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 group-hover:border-white">
            <Compass className="w-4 h-4 text-[#E3A387] shrink-0" />
            <span>View Retreats</span>
            <span className="text-[10px] text-stone-300 font-light opacity-60">✦</span>
          </div>

          {/* BACK FACE (REVEALED ON 3D FLIP) */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateX(180deg)] rounded-full flex items-center justify-center gap-2 px-6 bg-[#FAF7F0] text-[#1F2E23] text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
            <span>Explore Details</span>
            <ArrowRight className="w-4 h-4 text-[#C67856] shrink-0" />
          </div>
        </div>
      </div>

      {/* 2. PRIMARY 3D FLIP BUTTON: Book Now -> Reserve Your Spot */}
      <div
        onClick={onBookNow}
        className="group relative w-full sm:w-64 h-13 cursor-pointer select-none [perspective:1000px]"
        role="button"
        tabIndex={0}
        aria-label="Book Retreat Sanctuary Spot"
      >
        <div className="relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] shadow-xl shadow-[#C67856]/25 rounded-full overflow-hidden">
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden rounded-full flex items-center justify-center gap-2.5 px-7 bg-gradient-to-r from-[#C67856] via-[#D48967] to-[#B56745] text-white text-xs font-semibold uppercase tracking-[0.22em] border border-[#E3A387]/60 shadow-lg relative overflow-hidden">
            {/* Shimmer light beam */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-20 animate-shimmer-beam pointer-events-none" />
            <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 text-white shrink-0" />
          </div>

          {/* BACK FACE (REVEALED ON 3D FLIP) */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateX(180deg)] rounded-full flex items-center justify-center gap-2.5 px-6 bg-[#162218] text-[#E3A387] border-2 border-[#C67856] text-xs font-bold uppercase tracking-[0.18em] shadow-2xl">
            <Calendar className="w-4 h-4 text-[#FAF7F0] shrink-0" />
            <span>Reserve Sanctuary</span>
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
