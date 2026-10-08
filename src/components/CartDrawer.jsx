import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = '👑 *NEW ORDER COMMISSION - DRANGO CUSTOMS*%0A%0A';
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*%0A   Qty: ${item.quantity} | Price: ${formatPrice(item.product.price * item.quantity)}%0A`;
    });
    message += `%0A*TOTAL AMOUNT:* ${formatPrice(subtotal)}%0A%0APlease confirm fitment compatibility and delivery timeline for my Thar ROXX.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-maharaja border-l border-gold/40 shadow-royal flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-gradient text-maharaja-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-royal text-lg font-bold text-amber-50">
                  Royal Custom Cart
                </h3>
                <span className="text-xs text-gold">
                  {items.length} {items.length === 1 ? 'Product' : 'Products'} Selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gold-bright hover:bg-maharaja-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl">👑</span>
                <h4 className="font-royal text-xl font-bold text-gold-bright mt-4 mb-2">
                  Your Royal Cart is Empty
                </h4>
                <p className="text-xs text-amber-200/70 max-w-xs mx-auto mb-6">
                  Select your favorite Thar ROXX Maharaja components to begin your transformation.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase tracking-wider"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-maharaja-900/80 border border-gold/30 flex gap-4 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gold/30 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-royal text-xs font-bold text-amber-50 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-black text-gold-gradient my-1">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-gold/30 bg-maharaja-950 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-gold hover:bg-maharaja-800 text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs text-amber-100 font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-gold hover:bg-maharaja-800 text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-amber-200/50 hover:text-rose-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gold/20 bg-maharaja-950/95 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-amber-200/70">
                  <span>Shipping & Fitment Support</span>
                  <span className="text-green-400 font-semibold">Complimentary Across India</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-maharaja-800">
                  <span className="font-royal text-base font-bold text-amber-100">Subtotal</span>
                  <span className="font-royal text-2xl font-black text-gold-gradient">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 rounded-xl bg-gold-gradient text-maharaja-950 font-black text-xs sm:text-sm tracking-wider uppercase hover:shadow-gold-glow transition-all flex items-center justify-center gap-2"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-amber-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
                <span>Direct Factory Fitment Guarantee & 3-Year Warranty</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
