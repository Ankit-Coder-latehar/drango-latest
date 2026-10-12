import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  Phone,
  Sparkles,
  Gem,
  CheckCircle2,
  PackageCheck,
  Share2,
  ChevronRight,
  Layers,
  Car,
} from 'lucide-react';

export const ProductDetailPage = ({
  product,
  productsList = [],
  onAddToCart,
  onSelectProduct,
  onBackToProducts,
  onBackToHome,
}) => {
  // Gallery state
  const galleryImages =
    product?.images && product.images.length > 0
      ? product.images
      : [product?.image || ''];

  const [selectedImage, setSelectedImage] = useState(product?.image || galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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
    const defaultImg = product.image || (product.images && product.images[0]) || '';
    setSelectedImage(defaultImg);
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
      setSelectedImage(colorObj.image);
    }
  };

  const handleVersionSelect = (verObj) => {
    setSelectedVersion(verObj.name);
    if (verObj.image) {
      setSelectedImage(verObj.image);
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // WhatsApp pre-filled text
  const waDetails = [
    `Product: ${product.name}`,
    selectedColor ? `Color: ${selectedColor}` : null,
    selectedVersion ? `Design: ${selectedVersion}` : null,
    selectedCarType ? `Fitment: ${selectedCarType}` : null,
    `Quantity: ${quantity}`,
    `Total Price: ${formatPrice(product.price * quantity)}`,
  ]
    .filter(Boolean)
    .join('%0A• ');

  const whatsappUrl = `https://wa.me/919779443821?text=Hello%20Drango!%20I%20would%20like%20to%20order:%0A•%20${waDetails}`;

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
              
              {/* Main Active Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-maharaja-900 border border-gold/40 aspect-[4/3] sm:aspect-square max-h-[380px] sm:max-h-none flex items-center justify-center group shadow-2xl">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Badges on Main Image */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-maharaja-950" />
                    <span>{product.badge || 'OFFICIAL DRANGO'}</span>
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow w-fit">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Quick Share Button */}
                <button
                  onClick={handleShare}
                  title="Share product"
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-maharaja border border-gold/30 flex items-center justify-center text-amber-200 hover:text-gold hover:border-gold transition-all"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
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

            {/* ----------------- RIGHT: PRODUCT SPECS & PURCHASE ----------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                
                {/* Rating & Compatibility Badges */}
                <div className="flex items-center gap-3 text-xs mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-maharaja-800/80 border border-gold/30 text-gold-bright font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-gold" />
                    <span>{product.rating || 4.9}</span>
                    <span className="text-amber-200/50 font-normal">
                      ({product.reviewsCount || 48} Reviews)
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-maharaja-850/80 border border-gold/20 text-amber-200/80 text-[11px] font-semibold flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-gold" />
                    <span>{product.compatibility || 'Drango Custom Fitment'}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase">
                    In Stock • Ready to Dispatch
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-50 mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-maharaja-900/90 border border-gold/25 shadow-inner">
                  <span className="font-royal text-3xl sm:text-4xl font-black text-gold-gradient">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-amber-200/40 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-amber-200/70 ml-auto self-center">
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
                {/* 3. FITMENT / CAR TYPE (If available) */}
                {/* ======================================================== */}
                {availableCarTypes.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-maharaja-900/50 border border-gold/15">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gold-bright flex items-center gap-2">
                        <Car className="w-3.5 h-3.5" />
                        <span>Vehicle Fitment Model:</span>
                      </label>
                      <span className="text-xs font-bold text-amber-100">
                        {selectedCarType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {availableCarTypes.map((carT, idx) => {
                        const isSelected = selectedCarType === carT;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedCarType(carT)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'border-gold-bright bg-maharaja-800 text-gold-bright font-bold'
                                : 'border-gold/20 bg-maharaja-900/80 text-amber-200/70 hover:border-gold/50'
                            }`}
                          >
                            {carT}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Full Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-bright mb-2">
                    Product Description
                  </h4>
                  <p className="text-sm text-amber-100/90 leading-relaxed font-light whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Bullets */}
                {product.specs && product.specs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-bright mb-3">
                      Key Highlights & Fitment
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-amber-100/85 p-2.5 rounded-xl bg-maharaja-900/60 border border-gold/10"
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
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between sm:justify-start border border-gold/40 rounded-xl bg-maharaja-900/90 px-3 py-2 sm:py-1.5 shrink-0">
                    <span className="sm:hidden text-xs text-amber-200/60 uppercase font-semibold">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-gold-bright text-lg font-bold px-2.5 py-0.5 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold text-amber-50">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-gold-bright text-lg font-bold px-2.5 py-0.5 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-5 sm:px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-glow hover:brightness-110'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added ({quantity} items) to Cart!</span>
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
                </div>

                {/* Instant WhatsApp Order CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-gold/50 text-gold hover:bg-gold hover:text-maharaja-950 transition-all flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </a>

                {/* Assurance Trust Badges */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-4 text-center">
                  <div className="p-2.5 rounded-xl bg-maharaja-900/60 border border-gold/15">
                    <ShieldCheck className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] text-amber-200/80 font-medium block">
                      100% OEM Fitment
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
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-1 text-gold-bright font-semibold">
                          <Star className="w-3 h-3 fill-current text-gold" />
                          <span>{relItem.rating || 4.9}</span>
                        </div>
                        <span className="text-[10px] text-amber-200/60 truncate max-w-[120px]">
                          {relItem.compatibility}
                        </span>
                      </div>

                      <h4 className="font-royal text-sm font-bold text-amber-50 group-hover:text-gold-bright transition-colors line-clamp-2 mb-2">
                        {relItem.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gold/15 mt-2">
                      <span className="font-royal text-base font-black text-gold-gradient">
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
