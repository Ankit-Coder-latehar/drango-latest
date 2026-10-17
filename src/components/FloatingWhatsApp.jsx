import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919779443821?text=Hello%20Drango!%20I%20am%20interested%20in%20customizing%20my%20Thar%20ROXX."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-3"
      title="Chat with Royal Mod Specialist on WhatsApp"
    >
      <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-maharaja-950/90 text-gold-bright text-xs font-bold border border-gold/40 shadow-royal opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur">
        Need Thar ROXX Consultation?
      </span>
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-2xl border-2 border-gold-bright hover:scale-110 transition-all duration-300 relative">
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gold-gradient text-maharaja-950 text-[8px] sm:text-[9px] font-black flex items-center justify-center animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gold-gradient text-maharaja-950 text-[8px] sm:text-[9px] font-black flex items-center justify-center">
          👑
        </span>
      </div>
    </a>
  );
};
