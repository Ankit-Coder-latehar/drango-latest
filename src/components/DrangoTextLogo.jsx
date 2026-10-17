import React from 'react';

/**
 * Pure Vector DRANGO Logo matching the custom automotive geometric typography:
 * - Signature split-stem 'D' with center block
 * - Chamfered loop 'R' with diagonal leg
 * - Triangular open-crossbar chevron 'A'
 * - Geometric angled 'N'
 * - Chamfered inward crossbar 'G'
 * - Stadium squircle 'O'
 * 
 * 100% transparent vector with NO background box or borders.
 */
export const DrangoTextLogo = ({ className = "w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[700px] h-auto" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 660 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible filter drop-shadow-[0_0_12px_rgba(249,216,116,0.65)] drop-shadow-[0_0_28px_rgba(212,175,55,0.35)]"
      >
        <defs>
          {/* Royal Metallic Gold Gradient */}
          <linearGradient id="drangoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF0BA" />
            <stop offset="55%" stopColor="#F5CE62" />
            <stop offset="85%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9B7817" />
          </linearGradient>

          {/* Golden edge stroke gradient for extra depth */}
          <linearGradient id="drangoStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F9D874" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B08820" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Group with evenodd fill rule for clean cutouts */}
        <g fill="url(#drangoGoldGrad)" stroke="url(#drangoStrokeGrad)" strokeWidth="0.75" fillRule="evenodd">
          {/* LETTER D - Refined with balanced stencil cut and center block */}
          <path d="M 24 10 H 76 A 28 28 0 0 1 104 38 V 62 A 28 28 0 0 1 76 90 H 24 A 14 14 0 0 1 10 76 V 65 H 24 V 72 A 4 4 0 0 0 28 76 H 72 A 16 16 0 0 0 88 60 V 40 A 16 16 0 0 0 72 24 H 28 A 4 4 0 0 0 24 28 V 35 H 10 V 24 A 14 14 0 0 1 24 10 Z M 10 43 H 24 V 57 H 10 Z" />

          {/* LETTER R */}
          <path d="M 120 10 H 178 L 202 34 V 48 A 8 8 0 0 1 194 56 H 176 L 212 90 H 192 L 158 56 H 136 V 90 H 120 Z M 136 24 H 172 L 186 38 V 42 H 136 Z" />

          {/* LETTER A - Refined sleek open-crossbar chevron with uniform leg width */}
          <path d="M 276 10 H 284 L 334 90 H 312 L 280 24 L 248 90 H 226 Z" />

          {/* LETTER N */}
          <path d="M 348 10 H 370 L 418 68 V 10 H 434 V 90 H 412 L 364 32 V 90 H 348 Z" />

          {/* LETTER G */}
          <path d="M 536 22 A 16 16 0 0 0 520 10 H 474 A 24 24 0 0 0 450 34 V 66 A 24 24 0 0 0 474 90 H 520 A 20 20 0 0 0 540 70 V 52 H 496 L 508 64 H 524 V 68 A 8 8 0 0 1 516 76 H 476 A 12 12 0 0 1 464 64 V 36 A 12 12 0 0 1 476 24 H 516 A 8 8 0 0 1 524 32 H 540 A 16 16 0 0 0 536 22 Z" />

          {/* LETTER O */}
          <path d="M 574 10 H 624 A 24 24 0 0 1 648 34 V 66 A 24 24 0 0 1 624 90 H 574 A 24 24 0 0 1 550 66 V 34 A 24 24 0 0 1 574 10 Z M 574 24 A 12 12 0 0 0 562 36 V 64 A 12 12 0 0 0 574 76 H 624 A 12 12 0 0 0 636 64 V 36 A 12 12 0 0 0 624 24 Z" />
        </g>
      </svg>
      <span className="sr-only">DRANGO</span>
    </div>
  );
};
