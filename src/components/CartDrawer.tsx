import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Tag,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setActivePage,
    formatPrice,
    showToast,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal === 0 ? 0 : 200;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'JADUGAR10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setAppliedPromo('JADUGAR10 (10% Off)');
      showToast('Promo code JADUGAR10 applied! Saved 10%', 'success');
    } else if (code === 'FREESHIP') {
      setDiscountAmount(shippingFee);
      setAppliedPromo('FREESHIP (Free Shipping)');
      showToast('Free shipping coupon applied!', 'success');
    } else {
      showToast('Invalid promo code. Try "JADUGAR10" or "FREESHIP"', 'error');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) - ${formatPrice(i.product.price * i.quantity)}`)
      .join('\n');

    const message = encodeURIComponent(
      `*New Order Request - Jadugar Accessories*\n\n*Cart Items:*\n${itemsList}\n\nSubtotal: ${formatPrice(
        subtotal
      )}\nDiscount: ${formatPrice(discountAmount)}\nShipping: ${
        shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)
      }\n*Total PKR: ${formatPrice(finalTotal)}*\n\nPlease confirm my Cash on Delivery order.`
    );

    window.open(`https://wa.me/923260606619?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="font-extrabold text-white text-base">Your Shopping Cart</h2>
              <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-4 text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-base mb-1">Your Cart is Empty</h3>
                <p className="text-xs mb-6 max-w-xs">
                  Browse our high-quality covers, 65W fast chargers, and TWS earbuds.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-lg shadow-blue-500/20"
                >
                  Explore Products Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-3 flex gap-3 group">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-800 bg-slate-950 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs text-slate-100 truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.product.categoryName}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs text-emerald-400">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity control */}
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              {/* Promo code input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. JADUGAR10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-100 uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl text-slate-200 border border-slate-700"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Applied: {appliedPromo}
                </div>
              )}

              {/* Subtotal calculations */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-200">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee (Lahore & DHA)</span>
                  <span className="font-semibold text-slate-200">
                    {formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-400">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('checkout');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>Proceed to Checkout (COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order Directly via WhatsApp
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Cash on Delivery available in Lahore & DHA</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
