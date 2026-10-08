import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Shield,
  Gem,
  Star,
  ShoppingBag,
  Check,
} from 'lucide-react';

export const ProductFilterSection = ({
  selectedCarId,
  onAddToCart,
  onOpenQuickView,
  productsList = [],
  isWixLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItemMap, setAddedItemMap] = useState({});

  // On clicking any category car, reset filter to 'all' so all products are reflected
  useEffect(() => {
    setActiveCategory('all');
  }, [selectedCarId]);

  const allAvailableProducts = useMemo(() => {
    return Array.isArray(productsList) ? productsList : [];
  }, [productsList]);

  // Filter products strictly by active category: all products, external, or internal
  const filteredProducts = useMemo(() => {
    if (!allAvailableProducts || allAvailableProducts.length === 0) return [];

    if (activeCategory === 'all') {
      return allAvailableProducts;
    }

    return allAvailableProducts.filter((product) => product.category === activeCategory);
  }, [allAvailableProducts, activeCategory]);

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

  const filterOptions = [
    { id: 'all', label: 'All Products', icon: Sparkles },
    { id: 'external', label: 'External', icon: Shield },
    { id: 'internal', label: 'Internal', icon: Gem },
  ];

  return (
    <section id="products" className="py-8 sm:py-12 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Only External, Internal, and All Products Filter */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 flex-wrap">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeCategory === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gold-gradient text-maharaja-950 font-black shadow-gold-glow scale-105'
                    : 'glass-maharaja text-amber-100/80 hover:text-gold-bright hover:border-gold/50'
                }`}
              >
                <Icon className="w-4 h-4" />
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
                className="glass-maharaja-card rounded-2xl h-80 animate-pulse border border-gold/20 flex flex-col justify-between p-5"
              >
                <div className="w-full h-44 bg-maharaja-900/60 rounded-xl mb-4"></div>
                <div className="h-4 bg-gold/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gold/10 rounded w-1/2 mb-4"></div>
                <div className="h-9 bg-gold/20 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 glass-maharaja rounded-2xl border border-gold/20 p-8 max-w-md mx-auto">
            <p className="text-sm text-amber-200/70">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedItemMap[product.id];

              return (
                <div
                  key={product.id}
                  className="glass-maharaja-card rounded-2xl overflow-hidden flex flex-col group relative"
                >
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
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Compatibility */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-1 text-gold-bright font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current text-gold" />
                          <span>{product.rating}</span>
                          <span className="text-amber-200/50">({product.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] text-amber-200/60 truncate max-w-[140px]">
                          {product.compatibility}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h4
                        onClick={() => onOpenQuickView && onOpenQuickView(product)}
                        className="font-royal text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 cursor-pointer mb-2"
                      >
                        {product.name}
                      </h4>

                      {/* Specs / Features snippet */}
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

                    {/* Price and Add to Cart Button */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-royal text-lg font-black text-gold-gradient">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-amber-200/40 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                          isAdded
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
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
