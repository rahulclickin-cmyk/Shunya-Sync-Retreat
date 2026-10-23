import React, { useState } from 'react';
import { MessageCircle, X, Minus, ChevronUp, Send, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  phone: string;
  brandName: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phone, brandName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userMessage, setUserMessage] = useState(
    `Namaste Anmol & Komal! I would like to inquire about the upcoming retreat cohorts at ${brandName}.`
  );

  const cleanDigits = phone.replace(/[^0-9]/g, '');
  const chatUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(userMessage.trim())}`;

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* 1. Minimized Docked State (keeps input state preserved) */}
      {isOpen && isMinimized && (
        <div
          onClick={handleRestore}
          className="mb-3 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition-all duration-200 group text-xs text-[#1F2E23] animate-in fade-in slide-in-from-bottom-2"
          title="Click to expand chat (your message is saved)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
          <span className="font-medium text-stone-700 group-hover:text-black">
            WhatsApp Inquiry with Hosts
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
            Draft saved
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRestore();
            }}
            className="p-1 hover:bg-stone-200 rounded-full text-stone-500 transition"
            title="Expand chat"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="p-1 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition"
            title="Close chat completely"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Full Active Popover Bubble */}
      {isOpen && !isMinimized && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-white p-4 shadow-2xl border border-stone-200 animate-in fade-in slide-in-from-bottom-3 duration-300 flex flex-col space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-500/40 bg-emerald-50 shrink-0">
                  <img
                    src="/assets/aistudio/founder_anmol_khatri.jpg"
                    alt="Anmol & Komal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1F2E23] flex items-center gap-1">
                  <span>Anmol &amp; Komal</span>
                  <Sparkles className="w-3 h-3 text-[#C67856]" />
                </p>
                <p className="text-[10px] text-stone-500">{brandName} Retreat Hosts • Online</p>
              </div>
            </div>

            {/* Window Controls: Minimize & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                title="Minimize chat (keeps your draft)"
                aria-label="Minimize chat"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="rounded-xl bg-[#F0FDF4] p-3 text-xs text-stone-700 leading-relaxed border border-[#DCFCE7]">
            🙏 <strong>Namaste!</strong> Have questions about upcoming cohort dates, sattvic meals, or travel to the retreat? Chat directly with us on WhatsApp!
          </div>

          {/* User Input Field (State is kept even when minimized) */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 flex items-center justify-between">
              <span>Your Message / Query</span>
              <span className="font-normal text-stone-400 lowercase">editable</span>
            </label>
            <textarea
              rows={2}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your questions or dates..."
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 text-xs text-stone-800 focus:bg-white focus:border-[#25D366] focus:outline-none transition leading-relaxed resize-none"
            />
          </div>

          {/* Direct WhatsApp Call to Action */}
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider transition shadow-md hover:shadow-lg active:scale-98"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>

          <div className="flex items-center justify-between text-[10px] text-stone-400 px-1 pt-0.5">
            <span>Direct WhatsApp: +91 9259698064</span>
            <button
              onClick={handleMinimize}
              className="text-[#C67856] hover:underline"
            >
              Minimize
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Floating Trigger Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => {
            if (!isOpen) {
              handleOpen();
            } else if (isMinimized) {
              handleRestore();
            } else {
              handleMinimize();
            }
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ring-4 ring-white/80 cursor-pointer"
          title={`WhatsApp: ${phone} (Click to open/minimize chat)`}
          aria-label="Open WhatsApp chat with hosts"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] text-white font-bold items-center justify-center">
              1
            </span>
          </span>
          <MessageCircle className="w-7 h-7" />
        </button>

        {/* Hover Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-stone-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
          {isOpen && !isMinimized ? 'Click to minimize' : 'Chat on WhatsApp with Hosts'}
        </div>
      </div>
    </div>
  );
};
