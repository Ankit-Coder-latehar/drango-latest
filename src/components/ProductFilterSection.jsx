import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const ProductFilterSection = ({
  selectedCarId,
  onClearSelectedCar,
  onAddToCart,
  onOpenQuickView,
  productsList = [],
  isWixLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // When a category car is selected, switch to 'vehicle' so products for that vehicle are shown
  useEffect(() => {
    if (selectedCarId) {
      setActiveCategory('vehicle');
    } else {
      setActiveCategory('all');
    }
  }, [selectedCarId]);

  const allAvailableProducts = useMemo(() => {
    return Array.isArray(productsList) ? productsList : [];
  }, [productsList]);

  // Filter products: either All Products or Products for your vehicle
  const filteredProducts = useMemo(() => {
    if (!allAvailableProducts || allAvailableProducts.length === 0) return [];

    if (activeCategory === 'vehicle' && selectedCarId) {
      const filtered = allAvailableProducts.filter((product) => {
        if (product.carId === 'all') return true;
        if (product.carId === selectedCarId) return true;

        const combined = `${product.name || ''} ${product.description || ''} ${product.compatibility || ''} ${product.slug || ''}`.toLowerCase();

        if (selectedCarId === 'thar-roxx') {
          return combined.includes('roxx') || combined.includes('thar');
        }
        if (selectedCarId === 'thar-3d') {
          return combined.includes('3 door') || combined.includes('3door') || combined.includes('thar');
        }
        if (selectedCarId === 'jimny') {
          return combined.includes('jimny');
        }
        if (selectedCarId === 'hilux') {
          return combined.includes('hilux');
        }
        if (selectedCarId === 'fortuner') {
          return combined.includes('fortuner');
        }
        if (selectedCarId === 'scorpio-n') {
          return combined.includes('scorpio');
        }
        if (selectedCarId === 'dmax') {
          return combined.includes('d-max') || combined.includes('dmax');
        }
        if (selectedCarId === 'wrangler') {
          return combined.includes('wrangler');
        }
        if (selectedCarId === 'thar-crde') {
          return combined.includes('crde');
        }

        return false;
      });

      return filtered;
    }

    return allAvailableProducts;
  }, [allAvailableProducts, activeCategory, selectedCarId]);

  // Reset carousel scroll on filter change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setActiveIndex(0);
  }, [activeCategory, selectedCarId]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    if (!firstChild) return;
    const cardWidth = firstChild.offsetWidth + 16; // 16px is gap-4
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), filteredProducts.length - 1));
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 290;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 290;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 290;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filterOptions = useMemo(() => {
    const opts = [{ id: 'all', label: 'All Products' }];
    if (selectedCarId) {
      opts.push({ id: 'vehicle', label: 'Products for your vehicle' });
    }
    return opts;
  }, [selectedCarId]);

  return (
    <section id="products" className="py-8 sm:py-12 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* All Products and Our Limited Products Filter */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 flex-wrap">
          {filterOptions.map((opt) => {
            const isActive = activeCategory === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.id === 'all') {
                    setActiveCategory('all');
                    if (onClearSelectedCar) {
                      onClearSelectedCar();
                    }
                  } else {
                    setActiveCategory(opt.id);
                  }
                }}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-gold-gradient text-maharaja-950 font-black shadow-gold-glow scale-105'
                    : 'glass-maharaja text-amber-100/80 hover:text-gold-bright hover:border-gold/50'
                }`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile-only Carousel Header with Swipe Hint & Navigation Controls */}
        {filteredProducts.length > 1 && (
          <div className="flex sm:hidden items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-200/90 font-royal bg-maharaja-900/90 px-2.5 py-1 rounded-md border border-gold/25 shadow-sm">
                <span className="text-gold-bright">{activeIndex + 1}</span> / {filteredProducts.length}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/70 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                Swipe to view
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={activeIndex === 0}
                aria-label="Previous product"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? 'bg-maharaja-900/40 text-amber-100/30 border border-gold/10 cursor-not-allowed'
                    : 'glass-maharaja text-gold-bright border border-gold/40 hover:bg-gold-gradient hover:text-maharaja-950 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={activeIndex >= filteredProducts.length - 1}
                aria-label="Next product"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeIndex >= filteredProducts.length - 1
                    ? 'bg-maharaja-900/40 text-amber-100/30 border border-gold/10 cursor-not-allowed'
                    : 'glass-maharaja text-gold-bright border border-gold/40 hover:bg-gold-gradient hover:text-maharaja-950 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {isWixLoading && filteredProducts.length === 0 ? (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x scrollbar-none pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-[78vw] max-w-[290px] sm:w-auto flex-shrink-0 glass-maharaja-card rounded h-80 animate-pulse border border-gold/20 flex flex-col justify-between p-5"
              >
                <div className="w-full h-44 bg-maharaja-900/60 rounded mb-3"></div>
                <div className="h-4 bg-gold/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gold/20 rounded w-1/3 mb-4"></div>
                <div className="h-9 bg-gold/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 glass-maharaja rounded border border-gold/20 p-8 max-w-md mx-auto">
            <p className="text-sm text-amber-200/70 mb-3">No specific products found for this vehicle.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                if (onClearSelectedCar) {
                  onClearSelectedCar();
                }
              }}
              className="px-4 py-2 rounded-lg bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow-gold-sm hover:brightness-110 transition-all"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            {/* Products Container: Carousel on mobile (phone), responsive grid on desktop */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-none pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
            >
              {filteredProducts.map((product) => {
                return (
                  <div
                    key={product.id}
                    onClick={() => onOpenQuickView && onOpenQuickView(product)}
                    className="w-[78vw] max-w-[290px] sm:w-auto flex-shrink-0 sm:flex-shrink snap-start sm:snap-align-none glass-maharaja-card rounded overflow-hidden flex flex-col group relative cursor-pointer hover:border-gold/60 hover:shadow-gold-sm transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-52 overflow-hidden bg-maharaja-950">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/80 via-transparent to-transparent"></div>

                      {/* Badge */}
                      {product.badge && !product.badge.toLowerCase().includes('wix') && (
                        <div className="absolute top-3 left-3 z-10">
                          {product.badge.toLowerCase().includes('new') ? (
                            <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-green-500 text-black shadow-md">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-maharaja-900/90 text-gold-bright border border-gold/40 shadow">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Product Details - Title, Price & View Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Product Title */}
                        <h4 className="font-royal text-sm sm:text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-3 min-h-[2.5rem]">
                          {product.name}
                        </h4>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="font-royal text-base sm:text-lg font-light text-amber-100">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-amber-200/50 line-through font-light">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView && onOpenQuickView(product);
                        }}
                        className="w-full py-2.5 px-3 rounded text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-sm bg-gold-gradient text-maharaja-950 hover:shadow-gold-sm hover:brightness-110 active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Mobile-only Pagination Indicators */}
            {filteredProducts.length > 1 && (
              <div className="flex sm:hidden items-center justify-center mt-4">
                {filteredProducts.length <= 8 ? (
                  <div className="flex items-center gap-1.5">
                    {filteredProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          activeIndex === idx
                            ? 'w-6 h-1.5 bg-gold-gradient shadow-gold-sm'
                            : 'w-1.5 h-1.5 bg-amber-100/25 hover:bg-amber-100/50'
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-36 h-1 bg-maharaja-900 rounded-full overflow-hidden border border-gold/20">
                    <div
                      className="h-full bg-gold-gradient transition-all duration-300"
                      style={{
                        width: `${((activeIndex + 1) / filteredProducts.length) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
