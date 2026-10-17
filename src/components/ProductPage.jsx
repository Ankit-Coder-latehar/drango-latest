import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  Search,
  Sparkles,
  Shield,
  Gem,
  PackageCheck,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ProductPage = ({
  product,
  productsList = [],
  onAddToCart,
  onSelectProduct,
  onBackToHome,
}) => {
  // Current active product for details view
  const currentProduct = product || (productsList.length > 0 ? productsList[0] : null);

  const galleryImages = currentProduct?.images && currentProduct.images.length > 0
    ? currentProduct.images
    : (currentProduct?.image ? [currentProduct.image] : []);

  // Gallery active image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState({});

  // Carousel handlers
  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (galleryImages.length === 0) return;
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (galleryImages.length === 0) return;
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNextImage();
    } else if (diff < -45) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  // Catalog search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeVehicle, setActiveVehicle] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Update selected image when active product changes
  useEffect(() => {
    if (currentProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentProduct?.id]);

  const allAvailableProducts = useMemo(() => {
    return Array.isArray(productsList) ? productsList : [];
  }, [productsList]);

  // Filter and sort the full catalog
  const filteredCatalog = useMemo(() => {
    return allAvailableProducts
      .filter((p) => {
        // Category filter
        const matchCategory =
          activeCategory === 'all' ||
          (activeCategory === 'thar-roxx'
            ? p.carId === 'thar-roxx' ||
              p.carId === 'all' ||
              p.compatibility?.toLowerCase().includes('roxx') ||
              p.name?.toLowerCase().includes('roxx') ||
              p.slug?.toLowerCase().includes('roxx')
            : p.category === activeCategory);

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
        const matchSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategory && matchVehicle && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [allAvailableProducts, activeCategory, activeVehicle, searchQuery, sortBy]);

  const handleAddMainProduct = () => {
    if (!currentProduct) return;
    for (let i = 0; i < quantity; i++) {
      onAddToCart(currentProduct);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddCatalogItem = (item, e) => {
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

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-maharaja-950 text-amber-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-amber-200/80 mb-4">No product selected.</p>
          <button
            onClick={onBackToHome}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const discountPercent =
    currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price
      ? Math.round(
          ((currentProduct.originalPrice - currentProduct.price) /
            currentProduct.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="bg-maharaja-950 text-amber-50 min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-maharaja text-amber-100 hover:text-gold-bright hover:border-gold transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-amber-200/60 truncate">
            <span
              onClick={onBackToHome}
              className="cursor-pointer hover:text-gold transition-colors"
            >
              Home
            </span>
            <span>/</span>
            <span className="text-gold font-medium">Products</span>
            <span>/</span>
            <span className="text-amber-100 truncate max-w-[200px]">
              {currentProduct.name}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. FOCUSED PRODUCT DETAILS SHOWCASE */}
        {/* ======================================================== */}
        <div className="glass-maharaja rounded-3xl border border-gold/30 p-6 sm:p-10 mb-20 shadow-royal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Gallery Column */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Main Image Showcase with Sliding Carousel */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-maharaja-900 border border-gold/40 aspect-square w-full flex items-center justify-center group select-none shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Horizontal Sliding Track */}
                <div 
                  className="flex w-full h-full transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                >
                  {galleryImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="min-w-full w-full h-full shrink-0 relative flex items-center justify-center bg-maharaja-950 overflow-hidden"
                    >
                      {/* Ambient Blurred Background */}
                      <img
                        src={img}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none"
                      />

                      {/* Main Full Uncut Product Image */}
                      <img
                        src={img}
                        alt={`${currentProduct.name} - slide ${idx + 1}`}
                        className="relative z-10 w-full h-full object-contain object-center p-2 sm:p-4 select-none drop-shadow-xl"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Left Carousel Arrow Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-maharaja border border-gold/40 text-gold hover:text-maharaja-950 hover:bg-gold-gradient flex items-center justify-center shadow-royal transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/btn:-translate-x-0.5" />
                  </button>
                )}

                {/* Right Carousel Arrow Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-maharaja border border-gold/40 text-gold hover:text-maharaja-950 hover:bg-gold-gradient flex items-center justify-center shadow-royal transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                  {currentProduct.badge && currentProduct.badge.toLowerCase().includes('new') ? (
                    <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-green-500 text-black shadow-md">
                      {currentProduct.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 shadow-md">
                      {currentProduct.badge || 'OFFICIAL DRANGO'}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-700 text-white shadow w-fit">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Slide Counter on Image */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full glass-maharaja border border-gold/30 text-[11px] font-mono text-amber-200/90 shadow">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Carousel Track */}
              {galleryImages.length > 1 && (
                <div 
                  className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-1 scrollbar-none justify-center"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`relative w-16 h-16 sm:w-18 sm:h-18 aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-gold-bright shadow-gold-glow opacity-100 ring-2 ring-gold/50'
                          : 'border-gold/20 hover:border-gold/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain p-1 bg-maharaja-950"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>

                {/* Product Title */}
                <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-50 mb-4 leading-tight">
                  {currentProduct.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-maharaja-900/80 border border-gold/20">
                  <span className="font-royal text-xl sm:text-2xl font-light text-gold-gradient opacity-75">
                    {formatPrice(currentProduct.price)}
                  </span>
                  {currentProduct.originalPrice &&
                    currentProduct.originalPrice > currentProduct.price && (
                      <span className="text-sm text-amber-200/40 line-through font-light">
                        {formatPrice(currentProduct.originalPrice)}
                      </span>
                    )}
                  <span className="text-[11px] text-amber-200/60 ml-auto self-center">
                    All Taxes Included • Free Delivery over ₹20K
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-amber-100/90 leading-relaxed font-light mb-6">
                  {currentProduct.description}
                </p>


              </div>

              {/* Purchase Actions */}
              <div className="pt-6 border-t border-gold/20 space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-gold/40 rounded-xl bg-maharaja-900/90 px-3 py-1.5 shrink-0">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-gold-bright text-lg font-bold px-2 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-bold text-amber-50">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-gold-bright text-lg font-bold px-2 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddMainProduct}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-glow hover:brightness-110'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart ({quantity})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart • {formatPrice(currentProduct.price * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. "OUR PRODUCTS" COMPLETE CATALOG WITH SEARCH & FILTERS */}
        {/* ======================================================== */}
        <section id="catalog-section" className="pt-6">
          <div className="text-center mb-10">
            <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-bright tracking-tight mb-2">
              Our Products
            </h2>
            <p className="text-amber-200/70 text-xs sm:text-sm max-w-xl mx-auto font-light">
              Explore every handcrafted modification and custom accessory available for your SUV.
            </p>
          </div>

          {/* Search Bar & Filter Controls Bar */}
          <div className="glass-maharaja rounded-2xl border border-gold/30 p-4 sm:p-6 mb-10 space-y-4 shadow-md">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Real-time Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search all products (grille, console, cushion, rings, claddings...)"
                  className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              {/* Vehicle Filter Selector */}
              <div className="flex items-center gap-3">
                <select
                  value={activeVehicle}
                  onChange={(e) => setActiveVehicle(e.target.value)}
                  className="px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-gold-bright font-medium focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="all">Vehicle: All Models</option>
                  <option value="thar-roxx">Mahindra Thar ROXX</option>
                  <option value="thar-3d">Mahindra Thar (3-Door)</option>
                </select>

                {/* Sort Selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-maharaja-900/90 border border-gold/30 text-gold-bright font-medium focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>

            {/* Category Filter Tabs (All, External, Internal) */}
            <div className="flex items-center gap-2 pt-2 border-t border-gold/15 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Products ({allAvailableProducts.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('thar-roxx')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'thar-roxx'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm font-black'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Thar Roxx</span>
              </button>
            </div>
          </div>

          {/* Catalog Products Grid */}
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-16 glass-maharaja rounded-2xl border border-gold/20 p-8 max-w-md mx-auto">
              <p className="text-sm text-amber-200/70 mb-4">
                No products found matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveVehicle('all');
                }}
                className="px-5 py-2 rounded-xl bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCatalog.map((item) => {
                const isItemAdded = addedItemMap[item.id];
                const isCurrentActive = item.id === currentProduct.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                    className={`glass-maharaja-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                      isCurrentActive
                        ? 'border-2 border-gold-bright shadow-gold-glow'
                        : 'hover:border-gold'
                    }`}
                  >
                    {/* Item Image */}
                    <div className="relative h-52 overflow-hidden bg-maharaja-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/80 via-transparent to-transparent"></div>

                      {isCurrentActive && (
                        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-gold-gradient text-maharaja-950 font-black text-[10px] uppercase shadow">
                          NOW VIEWING
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h4 className="font-royal text-base font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-2">
                          {item.name}
                        </h4>

                        {/* Specs snippet */}
                        {item.specs && item.specs.length > 0 && (
                          <p className="text-[11px] text-amber-200/70 truncate mb-4">
                            • {item.specs[0]}
                          </p>
                        )}
                      </div>

                      {/* Price and Add to Cart */}
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
                              onSelectProduct(item);
                            }}
                            className="py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border border-gold/40 text-gold hover:border-gold hover:bg-maharaja-800 transition-all text-center"
                          >
                            Details
                          </button>

                          <button
                            onClick={(e) => handleAddCatalogItem(item, e)}
                            className={`py-2.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                              isItemAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-sm'
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
          )}
        </section>

      </div>
    </div>
  );
};
