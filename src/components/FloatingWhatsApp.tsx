import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phone: string;
  brandName: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phone, brandName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cleanDigits = phone.replace(/[^0-9]/g, '');
  const chatUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
    `Hello ${brandName}! I want to inquire about your upcoming retreat cohorts.`
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-stone-200 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <div>
                <p className="text-xs font-bold text-[#1F2E23]">Anmol &amp; Komal</p>
                <p className="text-[10px] text-stone-500">{brandName} Retreat Hosts</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-3 rounded-xl bg-[#F0FDF4] p-3 text-xs text-stone-700 leading-relaxed border border-[#DCFCE7]">
            🙏 <strong>Namaste!</strong> Have questions about our upcoming cohort dates, sattvic meals, or travel to the retreat? Chat directly with us on WhatsApp!
          </div>

          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider transition shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          onContextMenu={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ring-4 ring-white/80"
          title="Direct WhatsApp: +91 9259698064"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] text-white font-bold items-center justify-center">
              1
            </span>
          </span>
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Hover Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-stone-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
          Chat on WhatsApp with Hosts
        </div>
      </div>
    </div>
  );
};
