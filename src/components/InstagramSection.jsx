import React from 'react';
import { INSTAGRAM_REELS } from '../data/mockData';

export const InstagramSection = () => {
  return (
    <section id="instagram" className="py-10 sm:py-14 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Only Show Clean Reels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_REELS.map((reel, index) => (
            <div
              key={reel.id}
              className="relative overflow-hidden rounded-2xl w-full h-[410px] sm:h-[440px] bg-black border border-gold/30 hover:border-gold transition-all duration-300 shadow-royal"
            >
              <iframe
                src={reel.embedUrl}
                className="absolute -top-[56px] left-0 w-full h-[620px] border-0"
                scrolling="no"
                allowtransparency="true"
                allow="encrypted-media; autoplay; clipboard-write"
                title={`Instagram Reel ${index + 1}`}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
