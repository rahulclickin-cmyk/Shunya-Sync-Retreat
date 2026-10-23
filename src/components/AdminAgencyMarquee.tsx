import React from 'react';
import { Phone, ExternalLink, Sparkles } from 'lucide-react';

export const AdminAgencyMarquee: React.FC = () => {
  const marqueeText =
    "🚀 Powered by Clickin Digital Marketing Agency | Web Design • SEO • 24/7 WhatsApp AI Receptionists • Custom CRMs • AI Video Automation | 📞 Contact: +91 8882292448 | Let's automate your next business workflow!";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#120D08]/95 backdrop-blur-md border-t border-[#D4AF37]/30 text-stone-200 text-xs py-2 overflow-hidden shadow-2xl select-none">
      <div className="flex items-center">
        {/* Left Agency Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#1F1710] border-r border-[#3E2F23] text-[#D4AF37] font-semibold text-[11px] shrink-0 z-10 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#E5C158]" />
          <span>Agency Partner</span>
        </div>

        {/* Continuous Infinite Scrolling Track */}
        <div className="relative overflow-hidden w-full">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {/* Repeated 3 times for completely seamless infinite loop */}
            {[0, 1, 2, 3].map((key) => (
              <div key={key} className="flex items-center gap-8 shrink-0 px-4">
                <span className="font-medium text-[#E5C158] tracking-wide text-xs">
                  {marqueeText}
                </span>
                <a
                  href="https://wa.me/918882292448?text=Hello%20Clickin%20Digital%20Marketing%20Agency,%20I%20am%20interested%20in%20business%20automation%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#E5C158] border border-[#D4AF37]/40 text-[10px] font-bold uppercase transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp Agency</span>
                </a>
                <span className="text-stone-600">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
