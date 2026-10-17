import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Gem,
  PackageCheck,
  Share2,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const ProductDetailPage = ({
  product,
  productsList = [],
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onBackToProducts,
  onBackToHome,
}) => {
  // Gallery state
  const galleryImages =
    product?.images && product.images.length > 0
      ? product.images
      : [product?.image || ''];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Carousel handlers
  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
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

  // Color selection state
  const availableColors = product?.colors && product.colors.length > 0
    ? product.colors
    : [
        { name: 'Maharaja Gold', hex: '#D4AF37' },
        { name: 'Piano Glossy Black', hex: '#111111' },
        { name: 'Silver Chrome', hex: '#C0C0C0' },
      ];

  const [selectedColor, setSelectedColor] = useState(availableColors[0]?.name || 'Standard');

  // Version / variant selection state
  const availableVersions = product?.versions || [];
  const [selectedVersion, setSelectedVersion] = useState(
    availableVersions[0]?.name || ''
  );

  // Car type selection state
  const availableCarTypes = product?.carTypes || [];
  const [selectedCarType, setSelectedCarType] = useState(
    availableCarTypes[0] || ''
  );

  // Reset local state when product changes
  useEffect(() => {
    if (!product) return;
    setActiveImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('Maharaja Gold');
    }
    if (product.versions && product.versions.length > 0) {
      setSelectedVersion(product.versions[0].name);
    } else {
      setSelectedVersion('');
    }
    if (product.carTypes && product.carTypes.length > 0) {
      setSelectedCarType(product.carTypes[0]);
    } else {
      setSelectedCarType('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-maharaja-950 text-amber-50 flex items-center justify-center p-6 pt-28">
        <div className="text-center glass-maharaja p-8 rounded-3xl border border-gold/30 max-w-md">
          <p className="text-lg text-amber-200/80 mb-4">No product selected.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onBackToProducts}
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow-gold-sm"
            >
              Browse Products
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-2.5 rounded-xl glass-maharaja border border-gold/30 text-amber-100 hover:text-gold text-xs uppercase font-bold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj.name);
    if (colorObj.image) {
      const idx = galleryImages.indexOf(colorObj.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  };

  const handleVersionSelect = (verObj) => {
    setSelectedVersion(verObj.name);
    if (verObj.image) {
      const idx = galleryImages.indexOf(verObj.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedColor,
      selectedVersion: selectedVersion || undefined,
      selectedCarType: selectedCarType || undefined,
    };
    for (let i = 0; i < quantity; i++) {
      onAddToCart(itemToAdd);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    const itemToAdd = {
      ...product,
      selectedColor,
      selectedVersion: selectedVersion || undefined,
      selectedCarType: selectedCarType || undefined,
    };
    if (onBuyNow) {
      onBuyNow(itemToAdd, quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(itemToAdd);
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products
  const relatedProducts = productsList
    .filter((p) => p.id !== product.id && (p.category === product.category || p.carId === product.carId))
    .slice(0, 4);

  return (
    <div className="bg-maharaja-950 text-amber-50 min-h-screen pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gold/15">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToProducts}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl glass-maharaja text-amber-100 hover:text-gold-bright hover:border-gold transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
            <button
              onClick={onBackToHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-amber-200/60 hover:text-gold transition-colors"
            >
              Home
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-200/60">
            <span
              onClick={onBackToHome}
              className="cursor-pointer hover:text-gold transition-colors"
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gold/40" />
            <span
              onClick={onBackToProducts}
              className="cursor-pointer hover:text-gold transition-colors"
            >
              Products
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gold/40" />
            <span className="text-gold font-medium truncate max-w-[180px] sm:max-w-[260px]">
              {product.name}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN PRODUCT DETAIL CONTAINER */}
        {/* ======================================================== */}
        <div className="glass-maharaja rounded-2xl sm:rounded-3xl border border-gold/30 p-4 sm:p-7 lg:p-10 mb-12 sm:mb-20 shadow-royal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
            
            {/* ----------------- LEFT: IMAGE GALLERY ----------------- */}
            <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
              
              {/* Main Active Image Showcase with Sliding Carousel */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-maharaja-900 border border-gold/40 aspect-[4/3] sm:aspect-square max-h-[380px] sm:max-h-none flex items-center justify-center group shadow-2xl select-none"
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
                      className="min-w-full w-full h-full shrink-0 relative flex items-center justify-center bg-maharaja-950"
                    >
                      <img
                        src={img}
                        alt={`${product.name} - slide ${idx + 1}`}
                        className="w-full h-full object-cover object-center select-none"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/70 via-transparent to-transparent pointer-events-none"></div>

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

                {/* Badges on Main Image */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                  {product.badge && product.badge.toLowerCase().includes('new') ? (
                    <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-green-500 text-black shadow-md flex items-center justify-center">
                      <span>{product.badge}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-maharaja-950" />
                      <span>{product.badge || 'OFFICIAL DRANGO'}</span>
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow w-fit">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Quick Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  title="Share product"
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-maharaja border border-gold/30 flex items-center justify-center text-amber-200 hover:text-gold hover:border-gold transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

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
                      className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'w-14 h-14 sm:w-16 sm:h-16 border-gold-bright shadow-gold-glow scale-105 opacity-100 ring-2 ring-gold/50'
                          : 'w-11 h-11 sm:w-14 sm:h-14 border-gold/20 hover:border-gold/60 opacity-60 hover:opacity-100'
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

            {/* ----------------- RIGHT: PRODUCT SPECS & PURCHASE ----------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                

                {/* Product Title */}
                <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-50 mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-maharaja-900/90 border border-gold/25 shadow-inner">
                  <span className="font-royal text-xl sm:text-2xl font-light text-gold-gradient opacity-75 tracking-normal">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-amber-200/40 line-through font-light">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-amber-200/70 ml-auto self-center font-light">
                    All Taxes Included • Express Shipping
                  </span>
                </div>

                {/* ======================================================== */}
                {/* 1. COLOR SELECTION (Required by user) */}
                {/* ======================================================== */}
                {availableColors.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-maharaja-900/50 border border-gold/15">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gold-bright flex items-center gap-2">
                        <Gem className="w-3.5 h-3.5" />
                        <span>Select Color / Finish:</span>
                      </label>
                      <span className="text-xs font-bold text-amber-100 uppercase tracking-wide">
                        {selectedColor}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {availableColors.map((col, idx) => {
                        const isSelected = selectedColor === col.name;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleColorSelect(col)}
                            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'border-gold-bright bg-maharaja-800 text-gold-bright shadow-gold-sm scale-105'
                                : 'border-gold/20 bg-maharaja-900/80 text-amber-200/70 hover:border-gold/50'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-gold/40 shadow-sm shrink-0 flex items-center justify-center"
                              style={{ backgroundColor: col.hex }}
                            >
                              {isSelected && (
                                <Check className="w-2.5 h-2.5 text-maharaja-950 font-bold" />
                              )}
                            </span>
                            <span className="capitalize">{col.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* 2. DESIGN VERSION / THEME (If available) */}
                {/* ======================================================== */}
                {availableVersions.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-maharaja-900/50 border border-gold/15">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gold-bright flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Select Design Variant:</span>
                      </label>
                      <span className="text-xs font-bold text-amber-100 uppercase tracking-wide">
                        {selectedVersion}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {availableVersions.map((ver, idx) => {
                        const isSelected = selectedVersion === ver.name;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleVersionSelect(ver)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'border-gold-bright bg-gold-gradient text-maharaja-950 font-bold shadow-gold-sm'
                                : 'border-gold/20 bg-maharaja-900/80 text-amber-200/70 hover:border-gold/50'
                            }`}
                          >
                            {ver.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* 3. QUANTITY SELECTION */}
                {/* ======================================================== */}
                <div className="mb-6 p-4 rounded-2xl bg-maharaja-900/50 border border-gold/15">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gold-bright flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select Quantity:</span>
                    </label>
                    <span className="text-xs font-bold text-amber-100">
                      {quantity} {quantity === 1 ? 'Unit' : 'Units'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center border border-gold/40 rounded-xl bg-maharaja-900/90 px-3 py-1.5 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-gold-bright text-lg font-bold px-3 py-0.5 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-bold text-amber-50 min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-gold-bright text-lg font-bold px-3 py-0.5 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-amber-200/70">
                      Total: <span className="text-gold-bright font-semibold">{formatPrice(product.price * quantity)}</span>
                    </span>
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-bright mb-2">
                    Product Description
                  </h4>
                  <p className="text-sm text-amber-100/90 leading-relaxed font-light whitespace-pre-line">
                    {product.description}
                  </p>
                </div>


              </div>

              {/* Purchase Actions */}
              <div className="pt-6 border-t border-gold/20 space-y-4">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-glow hover:brightness-110'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added ({quantity} {quantity === 1 ? 'item' : 'items'}) to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Add to Cart • {formatPrice(product.price * quantity)}
                      </span>
                    </>
                  )}
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 border-2 border-gold text-gold-bright bg-maharaja-900/80 hover:bg-gold hover:text-maharaja-950 shadow-royal hover:shadow-gold-glow transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* RELATED / RECOMMENDED BESPOKE ACCESSORIES */}
        {/* ======================================================== */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-gold/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-gold-bright tracking-tight">
                  Frequently Paired With
                </h3>
                <p className="text-xs text-amber-200/60 mt-1">
                  Complete the royal aesthetic of your vehicle with these handcrafted accessories.
                </p>
              </div>

              <button
                onClick={onBackToProducts}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-bold uppercase tracking-wider"
              >
                <span>View All Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relItem) => (
                <div
                  key={relItem.id}
                  onClick={() => onSelectProduct(relItem)}
                  className="glass-maharaja-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-gold/25 hover:border-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow"
                >
                  <div className="relative h-44 overflow-hidden bg-maharaja-950">
                    <img
                      src={relItem.image}
                      alt={relItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-royal text-sm font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-2">
                        {relItem.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gold/15 mt-2">
                      <span className="font-royal text-sm sm:text-base font-light text-gold-gradient opacity-80">
                        {formatPrice(relItem.price)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold group-hover:underline">
                        View Product →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
