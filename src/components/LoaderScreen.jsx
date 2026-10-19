import React, { useEffect, useState } from 'react';

/**
 * Clean & Minimal Brand Loader
 * Uses the exact typography from the header with an instant radiant gold glow,
 * transitioning smoothly into the home page.
 */
export const LoaderScreen = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Instant glow displays for 1s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1000);

    // 2. Smoothly complete transition into home page after 600ms fade
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinished) onFinished();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black select-none overflow-hidden transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        @keyframes instantGoldGlow {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: drop-shadow(0 0 0 rgba(249, 216, 116, 0));
          }
          20% {
            opacity: 1;
            transform: scale(1.02);
            filter: drop-shadow(0 0 35px rgba(255, 235, 150, 1)) drop-shadow(0 0 70px rgba(249, 216, 116, 0.85)) drop-shadow(0 0 110px rgba(212, 175, 55, 0.6));
          }
          60% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 25px rgba(249, 216, 116, 0.75)) drop-shadow(0 0 55px rgba(212, 175, 55, 0.45));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(249, 216, 116, 0.65)) drop-shadow(0 0 45px rgba(212, 175, 55, 0.4));
          }
        }

        .animate-instant-glow {
          animation: instantGoldGlow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Ambient center radial glow behind text */}
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gold/15 blur-[60px] pointer-events-none transition-opacity duration-700" />

      {/* Brand Logo - Compact, understated luxury brandmark */}
      <div className="relative z-10 animate-instant-glow text-center px-4">
        <span className="font-royal text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest text-gold-gradient uppercase select-none">
          DRANGO
        </span>
      </div>
    </div>
  );
};
