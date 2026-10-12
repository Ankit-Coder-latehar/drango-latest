import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Shield,
  Gem,
  Star,
  ShoppingBag,
  Check,
  ArrowLeft,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';

export const ProductsCatalogPage = ({
  productsList = [],
  onAddToCart,
  onOpenProduct,
  onBackToHome,
  isWixLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeVehicle, setActiveVehicle] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItemMap, setAddedItemMap] = useState({});

  const allAvailableProducts = useMemo(() => {
    return Array.isArray(productsList) ? productsList : [];
  }, [productsList]);

  // Filter and sort catalog
  const filteredCatalog = useMemo(() => {
    return allAvailableProducts
      .filter((p) => {
        // Category filter
        const matchCategory =
          activeCategory === 'all' || p.category === activeCategory;

        // Vehicle filter
        const matchVehicle =
          activeVehicle === 'all' ||
          p.carId === activeVehicle ||
          p.carId === 'all' ||
          (activeVehicle === 'thar-roxx' &&
            (p.compatibility?.toLowerCase().includes('roxx') ||
              p.name?.toLowerCase().includes('roxx'))) ||
          (activeVehicle === 'thar-3d' &&
            (p.compatibility?.toLowerCase().includes('thar') ||
              p.name?.toLowerCase().includes('thar')));

        // Search filter
        const query = searchQuery.trim().toLowerCase();
        const matchSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          (p.compatibility && p.compatibility.toLowerCase().includes(query));

        return matchCategory && matchVehicle && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [allAvailableProducts, activeCategory, activeVehicle, searchQuery, sortBy]);

  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveVehicle('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-maharaja-950 text-amber-50 min-h-screen pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl glass-maharaja text-amber-100 hover:text-gold-bright hover:border-gold transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-amber-200/60">
            <span
              onClick={onBackToHome}
              className="cursor-pointer hover:text-gold transition-colors"
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gold/40" />
            <span className="text-gold font-medium">Products Catalog</span>
          </div>
        </div>

        {/* Page Hero Banner */}
        <div className="text-center mb-10 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/40 bg-maharaja-900/80 text-gold text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>BESPOKE MAHARAJA ACCESSORIES</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-bright tracking-tight mb-3">
            Drango Royal Collection
          </h1>
          <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Every modification is precision crafted to elevate your SUV with unmistakable road presence, luxury detailing, and OEM-spec fitment.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="glass-maharaja rounded-2xl border border-gold/30 p-4 sm:p-6 mb-10 space-y-4 shadow-royal">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Real-time Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (grille, mirror cover, console, antenna, cushion, cladding...)"
                className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-200/60 hover:text-amber-100 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Vehicle & Sort Filter Selectors */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  value={activeVehicle}
                  onChange={(e) => setActiveVehicle(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-gold-bright font-medium focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="all">Vehicle: All Models</option>
                  <option value="thar-roxx">Mahindra Thar ROXX</option>
                  <option value="thar-3d">Mahindra Thar (3-Door)</option>
                  <option value="scorpio-n">Mahindra Scorpio-N</option>
                  <option value="jimny">Suzuki Jimny</option>
                  <option value="hilux">Toyota Hilux</option>
                  <option value="fortuner">Toyota Fortuner</option>
                </select>
              </div>

              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-gold-bright font-medium focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-between pt-3 border-t border-gold/15 flex-wrap gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm font-black'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Products ({allAvailableProducts.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('external')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'external'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm font-black'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>External & Armour</span>
              </button>

              <button
                onClick={() => setActiveCategory('internal')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'internal'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm font-black'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Gem className="w-3.5 h-3.5" />
                <span>Internal & Cockpit</span>
              </button>
            </div>

            <div className="text-xs text-amber-200/60 font-medium">
              Showing <span className="text-gold font-bold">{filteredCatalog.length}</span> items
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isWixLoading && filteredCatalog.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="glass-maharaja-card rounded-2xl h-84 animate-pulse border border-gold/20 flex flex-col justify-between p-5"
              >
                <div className="w-full h-48 bg-maharaja-900/60 rounded-xl mb-4"></div>
                <div className="h-4 bg-gold/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gold/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredCatalog.length === 0 && !isWixLoading ? (
          <div className="text-center py-20 glass-maharaja rounded-3xl border border-gold/20 p-8 max-w-md mx-auto shadow-royal">
            <Filter className="w-10 h-10 text-gold/40 mx-auto mb-3" />
            <h3 className="font-royal text-xl font-bold text-amber-50 mb-2">
              No matching products found
            </h3>
            <p className="text-xs text-amber-200/70 mb-5">
              Try adjusting your search query or reset your filters to view all available products.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow-gold-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCatalog.map((item) => {
              const isItemAdded = addedItemMap[item.id];
              const discountPercent =
                item.originalPrice && item.originalPrice > item.price
                  ? Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) * 100
                    )
                  : 0;

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenProduct(item)}
                  className="glass-maharaja-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold-glow border border-gold/25"
                >
                  {/* Item Image */}
                  <div className="relative h-56 sm:h-52 overflow-hidden bg-maharaja-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/80 via-transparent to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-maharaja-900/90 text-gold-bright border border-gold/40 shadow">
                        {item.badge || 'DRANGO BESPOKE'}
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-600 text-white shadow w-fit">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Compatibility */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-1 text-gold-bright font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current text-gold" />
                          <span>{item.rating || 4.9}</span>
                          <span className="text-amber-200/50">({item.reviewsCount || 42})</span>
                        </div>
                        <span className="text-[10px] text-amber-200/70 truncate max-w-[130px]">
                          {item.compatibility}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-royal text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-2">
                        {item.name}
                      </h3>

                      {/* Color Options Preview */}
                      {item.colors && item.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="text-[10px] text-amber-200/50 uppercase tracking-wider">
                            Colors:
                          </span>
                          <div className="flex items-center gap-1">
                            {item.colors.slice(0, 4).map((c, i) => (
                              <span
                                key={i}
                                title={c.name}
                                className="w-3 h-3 rounded-full border border-gold/40 shadow-sm"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                            {item.colors.length > 4 && (
                              <span className="text-[10px] text-amber-200/60 font-semibold">
                                +{item.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Specs snippet */}
                      {item.specs && item.specs.length > 0 && (
                        <ul className="text-[11px] text-amber-200/70 space-y-1 mb-4">
                          {item.specs.slice(0, 2).map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 truncate">
                              <span className="w-1 h-1 rounded-full bg-gold shrink-0"></span>
                              <span className="truncate">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Price and Action Buttons */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-royal text-lg font-black text-gold-gradient">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-amber-200/40 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProduct(item);
                          }}
                          className="py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border border-gold/50 text-gold hover:border-gold hover:bg-gold hover:text-maharaja-950 transition-all text-center"
                        >
                          Details
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                            isItemAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-sm hover:brightness-110'
                          }`}
                        >
                          {isItemAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add</span>
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
        )}

      </div>
    </div>
  );
};
