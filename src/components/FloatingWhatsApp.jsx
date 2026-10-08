import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20Drango!%20I%20am%20interested%20in%20customizing%20my%20Thar%20ROXX."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3"
      title="Chat with Royal Mod Specialist"
    >
      <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-maharaja-950/90 text-gold-bright text-xs font-bold border border-gold/40 shadow-royal opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur">
        Need Thar ROXX Consultation?
      </span>
      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-2xl border-2 border-gold-bright hover:scale-110 transition-all duration-300 relative">
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-gradient text-maharaja-950 text-[9px] font-black flex items-center justify-center animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-gradient text-maharaja-950 text-[9px] font-black flex items-center justify-center">
          👑
        </span>
      </div>
    </a>
  );
};
