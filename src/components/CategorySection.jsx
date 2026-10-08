import React from 'react';
import { CARS_DATA } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export const CategorySection = ({ selectedCarId, onSelectCar }) => {
  return (
    <section id="categories" className="py-8 sm:py-12 bg-gradient-to-b from-maharaja-950 via-maharaja-900/90 to-maharaja-950 relative overflow-hidden">
      
      {/* Subtle Royal Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,17,32,0.2)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Section Title */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-5 sm:mb-8 text-center relative z-10">
        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold-bright tracking-wider uppercase drop-shadow-md">
          Choose Category
        </h2>
        <div className="w-12 sm:w-16 h-0.5 bg-gold-gradient mx-auto mt-2 rounded-full shadow-gold-sm"></div>
      </div>

      {/* 3D Cars Grid (3x3 matching user reference) - Smaller, Compact & Elegant */}
      <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {CARS_DATA.map((car) => {
            const isSelected = selectedCarId === car.id;
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
                className={`group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 relative aspect-[16/11] flex items-center justify-center p-1 sm:p-1.5 ${
                  isSelected
                    ? 'border-2 border-gold-bright shadow-gold-glow bg-maharaja-800/80 -translate-y-1 ring-2 ring-gold/40'
                    : 'glass-maharaja-card border border-gold/20 hover:border-gold/70 hover:shadow-gold-sm hover:-translate-y-1'
                }`}
                title={car.name}
              >
                {/* Active Indicator Seal */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-30 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-gradient text-maharaja-950 font-black text-[10px] shadow-md animate-fadeIn tracking-wider">
                    <CheckCircle2 className="w-3 h-3 fill-current" />
                    <span>SELECTED</span>
                  </div>
                )}

                {/* Artistic Golden Splash Aura Behind 3D Vehicle */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-gold/15 via-maharaja-600/25 to-amber-400/15 blur-xl group-hover:scale-115 transition-transform duration-500"></div>
                </div>

                {/* 3D Car Image - Compact & Crisp */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover object-center rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out relative z-10"
                  loading="lazy"
                />

                {/* Subtle Inner Border */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none ring-1 ring-inset ring-gold/15 group-hover:ring-gold/30 transition-all z-20"></div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
