import React, { useState, useEffect, useMemo } from 'react';
import { Eye } from 'lucide-react';

export const ProductFilterSection = ({
  selectedCarId,
  onAddToCart,
  onOpenQuickView,
  productsList = [],
  isWixLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  // Filter products: either All Products or Product for your vehicle
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
      opts.push({ id: 'vehicle', label: 'Product for your vehicle' });
    }
    return opts;
  }, [selectedCarId]);

  return (
    <section id="products" className="py-8 sm:py-12 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* All Products and Our Limited Products Filter */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 flex-wrap">
          {filterOptions.map((opt) => {
            const isActive = activeCategory === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
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

        {/* Loading Skeletons */}
        {isWixLoading && filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="glass-maharaja-card rounded h-80 animate-pulse border border-gold/20 flex flex-col justify-between p-5"
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
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 rounded-lg bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow-gold-sm hover:brightness-110 transition-all"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  onClick={() => onOpenQuickView && onOpenQuickView(product)}
                  className="glass-maharaja-card rounded overflow-hidden flex flex-col group relative cursor-pointer hover:border-gold/60 hover:shadow-gold-sm transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-56 sm:h-52 overflow-hidden bg-maharaja-950">
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
                      <h4 className="font-royal text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-3">
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
                      className="w-full py-2.5 px-3 rounded text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-sm bg-gold-gradient text-maharaja-950 hover:shadow-gold-sm hover:brightness-110"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
