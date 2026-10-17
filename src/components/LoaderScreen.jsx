import React, { useEffect, useState } from 'react';

/**
 * Generates coordinate string for a 5-pointed SVG star polygon
 */
function generateStarPoints(cx, cy, outerR, innerR) {
  const points = [];
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(' ');
}

export const LoaderScreen = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. DRANGO appears and glows once over ~1.6s
    // 2. Fade out smoothly after the glow
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    // 3. Remove from DOM after smooth 700ms transition
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinished) onFinished();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  if (!isVisible) return null;

  // 8 stars evenly distributed along circular orbit
  const STAR_COUNT = 8;
  const RADIUS = 92;
  const CX = 120;
  const CY = 120;

  const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / STAR_COUNT;
    const x = CX + RADIUS * Math.cos(angle);
    const y = CY + RADIUS * Math.sin(angle);
    const size = i % 2 === 0 ? 8.5 : 6;
    return { x, y, size, key: i };
  });

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-amber-50 select-none overflow-hidden transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes drangoSingleGlow {
          0% {
            opacity: 0;
            transform: scale(0.90);
            filter: drop-shadow(0 0 0 rgba(245, 206, 98, 0));
          }
          35% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 12px rgba(245, 206, 98, 0.4));
          }
          65% {
            opacity: 1;
            transform: scale(1.05);
            filter: drop-shadow(0 0 35px rgba(255, 220, 100, 1)) drop-shadow(0 0 70px rgba(245, 206, 98, 0.85)) drop-shadow(0 0 110px rgba(212, 175, 55, 0.6));
          }
          88% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(245, 206, 98, 0.55)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.35));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 18px rgba(245, 206, 98, 0.5)) drop-shadow(0 0 35px rgba(212, 175, 55, 0.3));
          }
        }

        .animate-drango-glow-once {
          animation: drangoSingleGlow 1.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Pure black backdrop with soft ambient radial gold aura */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      {/* Center Animated Loader: DRANGO inside rotating star circle */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-drango-glow-once">
        
        {/* Circular Orbit & Rotating Stars */}
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
        >
          <defs>
            <radialGradient id="loaderStarGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#F9D874" />
              <stop offset="85%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6812" />
            </radialGradient>
            <filter id="starGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer subtle glow orbit */}
          <circle
            cx={CX}
            cy={CY}
            r="108"
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="1"
          />

          {/* Star Orbit Circular Ring Track */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="rgba(212, 175, 55, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Inner decorative border ring */}
          <circle
            cx={CX}
            cy={CY}
            r="76"
            fill="none"
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth="1"
          />

          {/* Rotating group with stars revolving around center */}
          <g
            className="animate-spin"
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animationDuration: '6s',
              animationTimingFunction: 'linear',
            }}
          >
            {stars.map((s) => (
              <polygon
                key={s.key}
                points={generateStarPoints(s.x, s.y, s.size, s.size * 0.45)}
                fill="url(#loaderStarGold)"
                filter="url(#starGlowFilter)"
              />
            ))}
          </g>

          {/* Center Brand Text - Rendered inside SVG for 100% Guaranteed Visibility */}
          <g className="select-none pointer-events-none">
            <text
              x={CX}
              y={CY - 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#loaderStarGold)"
              fontFamily="'Poppins', sans-serif"
              fontWeight="900"
              fontSize="28"
              letterSpacing="0.22em"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(249, 216, 116, 0.9))',
              }}
            >
              DRANGO
            </text>
            <text
              x={CX}
              y={CY + 18}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFF0BA"
              fontFamily="'Poppins', sans-serif"
              fontWeight="600"
              fontSize="7.5"
              letterSpacing="0.32em"
              opacity="0.85"
            >
              AUTOMOTIVE CUSTOMS
            </text>
          </g>
        </svg>
      </div>

      {/* Subtle Bottom Glow Line */}
      <div className="mt-8 flex flex-col items-center gap-2 relative z-10 opacity-80">
        <div className="w-24 sm:w-32 h-0.5 rounded-full bg-gold-gradient shadow-gold-sm animate-pulse" />
      </div>
    </div>
  );
};
