import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  SlidersHorizontal,
  Check,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openQuickView,
    setActivePage,
    formatPrice,
  } = useStore();

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setActivePage('checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl p-5 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 text-slate-900 h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div
        onClick={() => setActivePage('product-detail', { productId: product.id })}
        className="relative aspect-square overflow-hidden bg-slate-50/50 rounded-2xl mb-4 cursor-pointer group-hover:bg-slate-100/50 transition-colors flex items-center justify-center border border-slate-100/50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Hot
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Top Right Action Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-slate-200/50 hover:scale-110 ${
              isSaved
                ? 'bg-rose-50 text-rose-500 border-rose-200'
                : 'bg-white/90 text-slate-500 hover:bg-rose-50 hover:text-rose-500'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-slate-200/50 hover:scale-110 ${
              isCompared
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-white/90 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
            }`}
            title="Compare Specs"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-9 h-9 rounded-xl bg-white/90 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-slate-200/50 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.inStock && product.stockCount <= 15 && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-amber-200 text-amber-700 text-xs font-bold py-1.5 px-3 rounded-xl text-center shadow-sm">
            Only {product.stockCount} left in stock!
          </div>
        )}
      </div>

      {/* Details Body */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-amber-600">{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <h3
            onClick={() => setActivePage('product-detail', { productId: product.id })}
            className="font-bold text-base text-slate-900 hover:text-blue-600 line-clamp-2 cursor-pointer transition-colors leading-snug mb-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-black text-slate-900 leading-none">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-12 h-12 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-colors shadow-md hover:shadow-blue-500/25 shrink-0 group/btn relative overflow-hidden"
            title="Add to Cart"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-y-[100%] group-hover/btn:translate-y-[-100%] transition-transform duration-500" />
            <ShoppingBag className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
