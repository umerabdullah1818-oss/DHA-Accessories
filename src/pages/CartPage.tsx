import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setActivePage,
    formatPrice,
    showToast,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal === 0 ? 0 : 200;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'DHA10') {
      setDiscountAmount(Math.round(subtotal * 0.1));
      showToast('Promo code DHA10 applied! (10% Off)', 'success');
    } else if (code === 'FREESHIP') {
      setDiscountAmount(shippingFee);
      showToast('Free Shipping coupon applied!', 'success');
    } else {
      showToast('Invalid coupon code. Try "DHA10" or "FREESHIP"', 'error');
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const items = cart
      .map((i) => `• ${i.product.name} (x${i.quantity}) - ${formatPrice(i.product.price * i.quantity)}`)
      .join('\n');
    const msg = encodeURIComponent(
      `*Mobile Accessories DHA - Order Request*\n\n${items}\n\nSubtotal: ${formatPrice(
        subtotal
      )}\nShipping: ${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}\n*Total: ${formatPrice(
        grandTotal
      )}*\n\nPlease confirm Cash on Delivery dispatch.`
    );
    window.open(`https://wa.me/923004257683?text=${msg}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Your Shopping Cart is Empty</h1>
        <p className="text-xs max-w-sm mb-6">
          Looks like you haven't added any mobile accessories to your cart yet.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-2xl text-xs transition-all shadow-lg shadow-blue-600/20"
        >
          Browse Accessories Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Shopping Cart
            </span>
            <h1 className="text-3xl font-black text-white mt-1">Review Your Order</h1>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Item Table - 8 Columns */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl divide-y divide-slate-800/60">
              {cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-2xl border border-slate-800 bg-slate-950 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white truncate">{item.product.name}</h3>
                    <p className="text-xs text-slate-400">{item.product.categoryName} • {item.product.brand}</p>
                    <p className="text-xs font-extrabold text-emerald-400 mt-1">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-extrabold text-sm text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Delivery guaranteed across all Pakistan provinces</span>
              <button onClick={clearCart} className="text-rose-400 hover:underline">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary - 4 Columns */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 h-fit">
            <h3 className="font-extrabold text-white text-base">Order Summary</h3>

            {/* Coupon input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon (e.g. DHA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white uppercase"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2 rounded-xl text-white border border-slate-700"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Lahore & DHA Shipping</span>
                <span className="font-bold text-white">{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
                <span>Grand Total</span>
                <span className="text-emerald-400">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setActivePage('checkout')}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Direct Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
