import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    isQuickViewOpen,
    closeQuickView,
    addToCart,
    setActivePage,
    formatPrice,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const mainImage = selectedImg || quickViewProduct.image;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Mobile Accessories DHA!\nI want to order:\n*${quickViewProduct.name}*\nQuantity: ${quantity}\nPrice: ${formatPrice(quickViewProduct.price * quantity)}\n\nPlease guide me with Cash on Delivery.`
    );
    window.open(`https://wa.me/923004257683?text=${text}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    closeQuickView();
    setActivePage('checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-slate-950/80 text-slate-400 hover:text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="md:w-1/2 p-6 bg-slate-950 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-4">
              <img src={mainImage} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>

            {quickViewProduct.galleryImages.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[quickViewProduct.image, ...quickViewProduct.galleryImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      mainImage === img ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & CTA */}
          <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
                {quickViewProduct.categoryName}
              </span>

              <h2 className="text-xl font-extrabold text-white mt-1 leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 my-3">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-slate-500 font-normal">({quickViewProduct.reviewCount} Reviews)</span>
                </div>
                <span className="text-slate-700">|</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({quickViewProduct.stockCount} available)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                <span className="text-2xl font-black text-white">{formatPrice(quickViewProduct.price)}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                {quickViewProduct.originalPrice && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save {formatPrice(quickViewProduct.originalPrice - quickViewProduct.price)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Specs */}
              <div className="space-y-1.5 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Specs:</p>
                {quickViewProduct.specifications.slice(0, 3).map((spec, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-semibold text-slate-200">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-400">Quantity:</span>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockCount, q + 1))}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  Buy Now (COD)
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                Direct Order on WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
