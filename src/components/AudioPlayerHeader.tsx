import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerHeaderProps {
  active: boolean;
  onToggle: () => void;
}

export const AudioPlayerHeader: React.FC<AudioPlayerHeaderProps> = ({ active, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
        active
          ? 'bg-[#28382B] text-[#F3EFE6] border-[#3E5242] ring-2 ring-[#C67856]/40'
          : 'bg-white/80 text-[#3D473F] border-[#E5DFD5] hover:bg-[#F2ECE3]'
      }`}
      title="432Hz Harmonic Singing Bowl Ambiance"
    >
      {active ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C67856] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C67856]"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#C67856] animate-pulse" />
          <span className="hidden sm:inline">432Hz Sound Bath Active</span>
          <span className="sm:hidden">432Hz On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8A9687]" />
          <span className="hidden sm:inline">Play 432Hz Sound Bath</span>
          <span className="sm:hidden">Sound Bath</span>
        </>
      )}
    </button>
  );
};
