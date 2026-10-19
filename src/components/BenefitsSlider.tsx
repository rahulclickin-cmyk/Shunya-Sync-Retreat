import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Shield, Volume2, Leaf, Heart, Moon, Sun, Compass } from 'lucide-react';
import { BenefitSlide } from '../types/retreat';

interface BenefitsSliderProps {
  benefits: BenefitSlide[];
  onOpenBooking: () => void;
}

export const BenefitsSlider: React.FC<BenefitsSliderProps> = ({ benefits, onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto advance slider
  useEffect(() => {
    if (isPaused || benefits.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, benefits.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-6 h-6 text-[#E3A387]" />;
      case 'volume':
        return <Volume2 className="w-6 h-6 text-[#E3A387]" />;
      case 'leaf':
        return <Leaf className="w-6 h-6 text-[#A2B19F]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#E3A387]" />;
      case 'moon':
        return <Moon className="w-6 h-6 text-[#C6D4E1]" />;
      case 'sun':
        return <Sun className="w-6 h-6 text-[#E3A387]" />;
      default:
        return <Compass className="w-6 h-6 text-[#A2B19F]" />;
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="benefits-slider"
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-[#1C281F] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#3E5242]/70 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#C67856]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#3F523E]/20 blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2D3E31] relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#293A2C] text-[#E3A387] text-xs uppercase tracking-[0.2em] font-medium border border-[#3B4E3E] mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Retreat Transformation &amp; Value</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF7F0]">
              Why Experience Shunya Sync?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
              Tangible shifts in nervous system health, inner silence, and life perspective.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#28382B] hover:bg-[#344838] border border-[#3E5242] text-stone-200 flex items-center justify-center transition active:scale-95 shadow-sm"
              aria-label="Previous Benefit"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#A2B19F] px-2">
              {currentIndex + 1} / {benefits.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#28382B] hover:bg-[#344838] border border-[#3E5242] text-stone-200 flex items-center justify-center transition active:scale-95 shadow-sm"
              aria-label="Next Benefit"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Active Slide Feature Card */}
            <div className="lg:col-span-8 space-y-4 transition-all duration-500">
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#28382B] text-[#C67856] text-xs font-semibold uppercase tracking-wider border border-[#3E5242]">
                {benefits[currentIndex]?.badge || 'Key Benefit'}
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {benefits[currentIndex]?.title}
              </h3>
              <p className="text-sm sm:text-base font-serif-display italic text-[#E3A387]">
                {benefits[currentIndex]?.subtitle}
              </p>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-light">
                {benefits[currentIndex]?.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C67856] hover:bg-[#B36544] text-white transition shadow-md active:scale-95"
                >
                  Reserve Your Spot
                </button>
                <a
                  href="#packages"
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-[#3E5242] text-stone-200 hover:bg-[#28382B] transition"
                >
                  Compare Retreats
                </a>
              </div>
            </div>

            {/* Thumbnail / Visual Icon Box */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-[#28382B] to-[#152018] border border-[#3E5242] shadow-xl text-center flex flex-col items-center justify-center space-y-3 transform transition hover:scale-105 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
                  {getIcon(benefits[currentIndex]?.iconName || 'leaf')}
                </div>
                <h4 className="font-serif-display text-lg font-bold text-stone-100">
                  {benefits[currentIndex]?.badge}
                </h4>
                <p className="text-xs text-stone-400">
                  Integrated into both 4D/3N &amp; 5D/4N journeys
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {benefits.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#C67856]' : 'w-2 bg-[#3E5242] hover:bg-[#57725D]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
