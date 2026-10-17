import React, { useRef, useState } from 'react';
import { INSTAGRAM_REELS } from '../data/mockData';
import { Play } from 'lucide-react';

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay prevented:', err));
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (reel.url) {
      window.open(reel.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl w-full aspect-[9/16] bg-black border border-gold/30 hover:border-gold hover:shadow-gold-glow transition-all duration-300 shadow-royal cursor-pointer group select-none"
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Floating play indicator that smoothly fades out when playing on hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
          isPlaying ? 'opacity-0' : 'opacity-85 group-hover:opacity-100'
        }`}
      >
        <div className="w-12 h-12 rounded-full glass-maharaja-card border border-gold/50 flex items-center justify-center text-gold-bright shadow-gold-sm backdrop-blur-sm">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export const InstagramSection = () => {
  return (
    <section id="instagram" className="py-10 sm:py-14 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Reels - Plays Instantly on Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_REELS.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

      </div>
    </section>
  );
};
