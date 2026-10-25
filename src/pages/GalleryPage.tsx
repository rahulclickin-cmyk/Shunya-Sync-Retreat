import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { SiteConfig } from '../types/retreat';

interface GalleryPageProps {
  config?: SiteConfig;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ config, onOpenBooking }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const fallbackImages = [
    {
      url: 'https://www.shunyasync.com/images/DSC05470.JPG',
      title: 'Sunrise River & Mountain Shala',
      desc: 'Wooden timber deck overlooking the pristine river valley and morning mountain mist.'
    },
    {
      url: 'https://www.shunyasync.com/images/C9738T01.JPG',
      title: 'Sound Alchemy Healing Space',
      desc: 'Sacred space tuned for authentic 7-metal Tibetan bowls and deep meditative frequencies.'
    },
    {
      url: 'https://www.shunyasync.com/images/satvik.JPG',
      title: 'Sattvic Nourishment Dining',
      desc: 'Fresh farm-to-table vegetarian feast prepared mindfully with pure mountain water.'
    },
    {
      url: 'https://www.shunyasync.com/images/DSC05503.JPG',
      title: 'Morning Asana & Breathwork Shala',
      desc: 'Open-air wooden hall for dynamic movement, pranayama, and holistic realignment.'
    },
    {
      url: 'https://www.shunyasync.com/images/DSC05962.JPG',
      title: 'Sacred River Ganga Sunset',
      desc: 'Peaceful riverside meditation and grounding along the serene riverbanks of Rishikesh.'
    },
    {
      url: 'https://www.shunyasync.com/images/DSC05738.JPG',
      title: 'Evening Community Sharing Circle',
      desc: 'Safe and compassionate circle under the evening sky for connection, reflection, and release.'
    }
  ];

  const displayImages = config?.galleryImages && config.galleryImages.length > 0
    ? config.galleryImages.map((g) => ({ url: g.url, title: g.title, desc: g.caption || '' }))
    : fallbackImages;

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C67856] bg-[#F7EFE9] px-3.5 py-1.5 rounded-full border border-[#E9D9CF]">
          Visual Retreat Tour
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          A Glimpse into Life at Shunya Sync
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          Surrounded by pristine nature in India, our retreat properties offer a silent haven far from urban commotion.
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
            <img src={selectedImg} alt="Retreat Expanded View" className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-xl" />
          </div>
        </div>
      )}

      <div className="text-center pt-6">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#223326] hover:bg-[#152218] text-white transition shadow-lg active:scale-95"
        >
          Book Your Stay at the Retreat
        </button>
      </div>
    </div>
  );
};
