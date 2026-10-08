import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  Phone,
  Search,
  Sparkles,
  Shield,
  Gem,
  CheckCircle2,
  PackageCheck,
  Share2,
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

  // Gallery active image
  const [selectedImage, setSelectedImage] = useState(currentProduct?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState({});

  // Catalog search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeVehicle, setActiveVehicle] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Update selected image when active product changes
  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.image);
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

  const galleryImages = currentProduct.images && currentProduct.images.length > 0
    ? currentProduct.images
    : [currentProduct.image];

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
              {/* Main Image View */}
              <div className="relative rounded-2xl overflow-hidden bg-maharaja-900 border border-gold/40 aspect-[4/3] sm:aspect-square flex items-center justify-center group">
                <img
                  src={selectedImage || currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 shadow-md">
                    {currentProduct.badge || 'OFFICIAL DRANGO'}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-700 text-white shadow w-fit">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-gold-bright shadow-gold-glow scale-105'
                          : 'border-gold/20 hover:border-gold/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Rating & Compatibility */}
                <div className="flex items-center gap-3 text-xs mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-maharaja-800/80 border border-gold/30 text-gold-bright font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-gold" />
                    <span>{currentProduct.rating || 4.9}</span>
                    <span className="text-amber-200/50 font-normal">
                      ({currentProduct.reviewsCount || 42} Reviews)
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-maharaja-850/80 border border-gold/20 text-amber-200/80 text-[11px] font-semibold">
                    {currentProduct.compatibility || 'Drango Custom Fitment'}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-50 mb-4 leading-tight">
                  {currentProduct.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-maharaja-900/80 border border-gold/20">
                  <span className="font-royal text-3xl sm:text-4xl font-black text-gold-gradient">
                    {formatPrice(currentProduct.price)}
                  </span>
                  {currentProduct.originalPrice &&
                    currentProduct.originalPrice > currentProduct.price && (
                      <span className="text-base text-amber-200/40 line-through">
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

                {/* Specifications Bullets */}
                {currentProduct.specs && currentProduct.specs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-bright mb-3">
                      Key Highlights & Fitment
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentProduct.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-amber-100/80 p-2.5 rounded-xl bg-maharaja-900/50 border border-gold/10"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

                {/* Instant WhatsApp Order CTA */}
                <a
                  href={`https://wa.me/919779443821?text=Hello%20Drango!%20I%20want%20to%20order%20${encodeURIComponent(
                    currentProduct.name
                  )}%20(Qty:%20${quantity},%20Price:%20${formatPrice(
                    currentProduct.price * quantity
                  )})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-gold/40 text-gold hover:bg-maharaja-800 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </a>

                {/* Assurance Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 text-center">
                  <div className="p-2.5 rounded-xl bg-maharaja-900/60 border border-gold/15">
                    <ShieldCheck className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] text-amber-200/80 font-medium block">
                      100% Genuine Fitment
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-maharaja-900/60 border border-gold/15">
                    <Truck className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] text-amber-200/80 font-medium block">
                      Express Shipping
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-maharaja-900/60 border border-gold/15">
                    <PackageCheck className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] text-amber-200/80 font-medium block">
                      Royal Standards
                    </span>
                  </div>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/40 bg-maharaja-900/80 text-gold text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
              <span>EXPLORE ALL BESPOKE MODIFICATIONS</span>
            </div>
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
                onClick={() => setActiveCategory('external')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'external'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>External</span>
              </button>

              <button
                onClick={() => setActiveCategory('internal')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeCategory === 'internal'
                    ? 'bg-gold-gradient text-maharaja-950 shadow-gold-sm'
                    : 'glass-maharaja text-amber-100/70 hover:text-gold-bright hover:border-gold/40'
                }`}
              >
                <Gem className="w-3.5 h-3.5" />
                <span>Internal</span>
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
                        {/* Rating & Compatibility */}
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-1 text-gold-bright font-semibold">
                            <Star className="w-3.5 h-3.5 fill-current text-gold" />
                            <span>{item.rating || 4.9}</span>
                          </div>
                          <span className="text-[10px] text-amber-200/60 truncate max-w-[130px]">
                            {item.compatibility}
                          </span>
                        </div>

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
                            className={`py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
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
        </section>

      </div>
    </div>
  );
};
