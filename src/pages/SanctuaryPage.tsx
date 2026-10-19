import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { SiteConfig } from '../types/retreat';

interface SanctuaryPageProps {
  config?: SiteConfig;
  onOpenBooking: () => void;
}

export const SanctuaryPage: React.FC<SanctuaryPageProps> = ({ config, onOpenBooking }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const fallbackImages = [
    {
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      title: 'Sunrise Open-Air Yoga Shala',
      desc: 'Wooden timber deck with 360-degree views of morning mountain fog and birdsong.'
    },
    {
      url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
      title: 'Sound Alchemy Healing Dome',
      desc: 'Acoustically tuned circular meditation dome housing authentic 7-metal Tibetan bowls.'
    },
    {
      url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      title: 'Sattvic Communal Dining Pavillion',
      desc: 'Farm-to-table vegetarian feast tables surrounded by aromatic herb gardens.'
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Eco-Luxury Nature Quarters',
      desc: 'Spacious stone and timber rooms equipped with organic cotton linens and peaceful balconies.'
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      title: 'Sacred Forest & River Trails',
      desc: 'Gentle canopy trails leading to cold mountain streams for barefoot grounding and silent reflection.'
    },
    {
      url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      title: 'Starlight Bonfire Hearth',
      desc: 'Evening gathering space under celestial constellations for music, laughter, and intention releases.'
    }
  ];

  const displayImages = config?.galleryImages && config.galleryImages.length > 0
    ? config.galleryImages.map((g) => ({ url: g.url, title: g.title, desc: g.caption || '' }))
    : fallbackImages;

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
          Visual Sanctuary Tour
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          A Glimpse into Life at Shunya Sync
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          Surrounded by pristine nature in India, our retreat properties offer silent sanctuary far from urban commotion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(item.url)}
            className="group rounded-3xl overflow-hidden bg-white border border-[#DFD7CA] shadow-md hover:shadow-2xl transition duration-500 cursor-pointer card-3d-tilt"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E3A387]">View High-Res</span>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-serif-display text-xl font-bold text-[#1F2E23]">{item.title}</h3>
              <p className="text-xs text-[#5B665D] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImg} alt="Sanctuary Expanded View" className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-xl" />
          </div>
        </div>
      )}

      <div className="text-center pt-6">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow-lg active:scale-95"
        >
          Book Your Stay in the Sanctuary
        </button>
      </div>
    </div>
  );
};
