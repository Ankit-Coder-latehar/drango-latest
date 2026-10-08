import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, Phone, Sparkles } from 'lucide-react';

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
    }
  }, [product]);

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

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

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
            
            {/* Visual Column with Gallery */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-maharaja-950 border border-gold/30 h-72 min-h-[260px] flex items-center justify-center">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase shadow">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Thumbnails row if multiple images exist */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                        activeImage === imgUrl
                          ? 'border-gold-bright ring-2 ring-gold/50 scale-105'
                          : 'border-gold/20 hover:border-gold/60 opacity-70 hover:opacity-100'
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
                  <span className="font-royal text-3xl font-black text-gold-gradient">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-amber-200/40 line-through">
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
                    href={`https://wa.me/919876543210?text=Hello%20Drango!%20I%20want%20to%20order%20${quantity}x%20${encodeURIComponent(product.name)}%20(${formatPrice(product.price * quantity)})`}
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
