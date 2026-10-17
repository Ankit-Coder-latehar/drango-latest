import React from 'react';
import { CARS_DATA } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export const CategorySection = ({ selectedCarId, onSelectCar }) => {
  // Show only 6 cars as requested
  const displayedCars = CARS_DATA.slice(0, 6);

  return (
    <section id="categories" className="py-10 sm:py-16 bg-gradient-to-b from-maharaja-950 via-maharaja-900/90 to-maharaja-950 relative overflow-hidden">

      {/* Subtle Royal Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/5 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,17,32,0.18)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Section Title */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 text-center relative z-10">
        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold-bright tracking-wider uppercase drop-shadow-md">
          Choose Vehicle
        </h2>
        <div className="w-16 sm:w-20 h-0.5 bg-gold-gradient mx-auto mt-3 rounded-full shadow-gold-sm"></div>
      </div>

      {/* 3D Cars Grid: Exactly 6 Cars, 3 Columns on desktop, 2 on mobile, ZERO BORDERS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-10">
          {displayedCars.map((car) => {
            const isSelected = selectedCarId === car.id;
            const isDimmed = Boolean(selectedCarId) && !isSelected;
            return (
              <div
                key={car.id}
                onClick={() => {
                  onSelectCar(car.id);
                  const productsEl = document.getElementById('products');
                  if (productsEl) {
                    productsEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group cursor-pointer flex flex-col items-center justify-center transition-all duration-300 relative select-none ${
                  isSelected
                    ? 'opacity-100 scale-105 z-20'
                    : isDimmed
                      ? 'opacity-45 hover:opacity-95 hover:scale-100'
                      : 'opacity-100 hover:scale-105'
                }`}
                title={car.name}
              >
                {/* 3D Car Visual Container - Strictly NO borders */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-visible">

                  {/* Subtle Background Glow behind car on hover / selected */}
                  <div
                    className={`absolute inset-0 pointer-events-none rounded-full transition-all duration-500 blur-2xl ${
                      isSelected
                        ? 'bg-gold/30 scale-100 opacity-100'
                        : isDimmed
                          ? 'opacity-0'
                          : 'bg-gold/10 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-105'
                    }`}
                  ></div>

                  {/* Active Selected Pill Badge */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-30 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-gradient text-maharaja-950 font-black text-[10px] sm:text-xs shadow-gold-sm animate-fadeIn tracking-wider">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  {/* White Dim Overlay for unselected cars */}
                  {isDimmed && (
                    <div className="absolute inset-0 bg-white/20 rounded-3xl pointer-events-none z-20 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] transition-opacity duration-300 group-hover:bg-white/5"></div>
                  )}

                  {/* 3D Car Image with radial edge feathering (Zero box borders or edges) */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className={`w-full h-full object-contain object-center transition-all duration-500 ease-out relative z-10 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_98%)] ${
                      isSelected
                        ? 'drop-shadow-[0_10px_25px_rgba(212,175,55,0.35)]'
                        : isDimmed
                          ? 'brightness-110 contrast-90 group-hover:-translate-y-1'
                          : 'group-hover:-translate-y-2 group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Car Title Underneath Matching Reference Image */}
                <div className="mt-2 sm:mt-3 text-center">
                  <h3
                    className={`font-royal font-bold text-sm sm:text-base md:text-lg tracking-wide transition-colors duration-300 ${
                      isSelected
                        ? 'text-gold-bright drop-shadow-sm font-extrabold'
                        : isDimmed
                          ? 'text-white/60 group-hover:text-white'
                          : 'text-gray-200 group-hover:text-gold-bright'
                    }`}
                  >
                    {car.name}
                  </h3>

                  {/* Active Gold Indicator Dash */}
                  <div
                    className={`h-0.5 mx-auto mt-1.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-10 bg-gold-gradient shadow-gold-sm opacity-100'
                        : 'w-0 bg-gold-bright/60 opacity-0 group-hover:w-6 group-hover:opacity-75'
                    }`}
                  ></div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

