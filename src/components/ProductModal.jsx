import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, Phone, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : []);

  React.useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

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

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl glass-maharaja rounded-3xl border-2 border-gold/50 shadow-royal overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-maharaja-900/80 hover:bg-maharaja-800 text-gold-bright border border-gold/40 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visual Column with Carousel */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-maharaja-950 border border-gold/30 h-72 min-h-[260px] flex items-center justify-center select-none shadow-xl">
                {/* Horizontal Sliding Track */}
                <div 
                  className="flex w-full h-full transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                >
                  {galleryImages.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className="min-w-full w-full h-full shrink-0 relative flex items-center justify-center bg-maharaja-950 overflow-hidden"
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-125 pointer-events-none"
                      />
                      <img
                        src={imgUrl}
                        alt={`${product.name} slide ${idx + 1}`}
                        className="relative z-10 w-full h-full object-contain object-center p-2 select-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Left Carousel Arrow */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full glass-maharaja border border-gold/40 text-gold hover:text-maharaja-950 hover:bg-gold-gradient flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Right Carousel Arrow */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full glass-maharaja border border-gold/40 text-gold hover:text-maharaja-950 hover:bg-gold-gradient flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <div className="absolute top-3 left-3 pointer-events-none">
                  {product.badge && product.badge.toLowerCase().includes('new') ? (
                    <span className="px-3 py-1 rounded-full bg-green-500 text-black font-black text-xs uppercase shadow">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full glass-maharaja border border-gold/30 text-[10px] font-mono text-amber-200 shadow">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div 
                  className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-center"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-gold-bright ring-2 ring-gold/50 scale-105 opacity-100'
                          : 'border-gold/20 hover:border-gold/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-gold-bright" />
                  <span>{product.compatibility}</span>
                </div>

                <h3 className="font-royal text-2xl font-bold text-amber-50 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs mb-4">
                  <div className="flex items-center gap-1 text-gold-bright font-bold">
                    <Star className="w-4 h-4 fill-current text-gold" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-amber-200/50">|</span>
                  <span className="text-amber-200/70">{product.reviewsCount} Verified Customer Reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-royal text-xl sm:text-2xl font-light text-gold-gradient opacity-75">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-amber-200/40 line-through font-light">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-light mb-4">
                  {product.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 p-3 rounded-xl bg-maharaja-900/60 border border-gold/20 mb-4">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-wider block mb-1">
                    Royal Specifications & Craft:
                  </span>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-amber-100">
                      <Sparkles className="w-3 h-3 text-gold-bright shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-4 border-t border-maharaja-800">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center rounded-lg border border-gold/40 bg-maharaja-900 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-gold hover:bg-maharaja-800 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-bold text-amber-50">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 text-gold hover:bg-maharaja-800 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-gold-gradient text-maharaja-950 hover:shadow-gold-glow'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/919779443821?text=Hello%20Drango!%20I%20want%20to%20order%20${quantity}x%20${encodeURIComponent(product.name)}%20(${formatPrice(product.price * quantity)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-gold text-gold-bright hover:bg-maharaja-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
