import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  Star,
} from 'lucide-react';

export const FeaturedSlideshow = ({
  onAddToCart,
  onOpenQuickView,
  productsList = [],
}) => {
  const latestProducts = useMemo(() => {
    const list = Array.isArray(productsList) ? productsList : [];
    return list.slice(0, 6);
  }, [productsList]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Responsive visible slides count
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const total = latestProducts.length;
  const maxIndex = Math.max(0, total - slidesToShow);

  // Auto-scroll interval
  useEffect(() => {
    if (isPaused || total === 0 || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, total, maxIndex]);

  // Reset current index if window resize reduces maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  if (total === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section
      id="featured"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-maharaja-950 via-maharaja-900 to-maharaja-950 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Royal Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(110,17,32,0.3)_0%,rgba(14,2,4,0.95)_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-black text-gold-bright tracking-tight">
              Our Latest Products
            </h2>
            <p className="text-amber-200/80 text-xs sm:text-sm mt-1 max-w-xl font-light">
              Explore our newest bespoke modifications and custom accessories handcrafted for royalty.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-2.5 rounded-xl border border-gold/40 glass-maharaja text-gold-bright hover:bg-gold-gradient hover:text-maharaja-950 transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 sm:p-2.5 rounded-xl border border-gold/40 glass-maharaja text-gold-bright hover:bg-gold-gradient hover:text-maharaja-950 transition-all duration-300 shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window with Touch Swipe for Mobile & Tablet */}
        <div
          className="overflow-hidden -mx-2 sm:-mx-3 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {latestProducts.map((product) => {
              const isAdded = addedItemMap[product.id];

              return (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                >
                  <div className="glass-maharaja-card rounded-2xl overflow-hidden flex flex-col h-full border border-gold/30 hover:border-gold transition-all duration-300 group hover:-translate-y-1 hover:shadow-gold-glow">
                    {/* Product Image */}
                    <div
                      onClick={() => onOpenQuickView && onOpenQuickView(product)}
                      className="relative h-56 sm:h-52 overflow-hidden bg-maharaja-950 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/80 via-transparent to-transparent"></div>

                      {/* Floating New Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded bg-maharaja-900/90 text-gold-bright border border-gold/40 shadow">
                          LATEST
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h4
                          onClick={() => onOpenQuickView && onOpenQuickView(product)}
                          className="font-royal text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 cursor-pointer mb-2"
                        >
                          {product.name}
                        </h4>

                        {/* Specs */}
                        {product.specs && product.specs.length > 0 && (
                          <ul className="text-[11px] text-amber-200/70 space-y-1 mb-4">
                            {product.specs.slice(0, 2).map((spec, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 truncate">
                                <span className="w-1 h-1 rounded-full bg-gold shrink-0"></span>
                                <span className="truncate">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Price & Add to Cart Button */}
                      <div>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-royal text-base sm:text-lg font-light text-gold-gradient opacity-80">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-amber-200/40 line-through font-light">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-sm hover:brightness-110'
                            }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Added to Cart</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                    ? 'w-7 bg-gold-gradient shadow-gold-sm'
                    : 'w-2 bg-amber-100/30 hover:bg-amber-100/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
