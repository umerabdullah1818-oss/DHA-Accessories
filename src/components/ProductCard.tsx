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
      className="group relative bg-white rounded-3xl p-4 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-slate-100 text-slate-900 h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div
        onClick={() => setActivePage('product-detail', { productId: product.id })}
        className="relative aspect-square overflow-hidden bg-slate-100 rounded-2xl mb-3 cursor-pointer group-hover:bg-slate-200/50 transition-colors flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Top Seller
            </span>
          )}
          {product.isNew && (
            <span className="bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
              New Arrival
            </span>
          )}
        </div>

        {/* Top Right Action Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isCompared
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-blue-600'
            }`}
            title="Compare Specs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 text-slate-600 hover:bg-white hover:text-emerald-600 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.inStock && product.stockCount <= 15 && (
          <div className="absolute bottom-2 left-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold py-0.5 px-2 rounded backdrop-blur-sm text-center shadow">
            Only {product.stockCount} left in stock!
          </div>
        )}
      </div>

      {/* Details Body */}
      <div className="flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Name */}
          <h3
            onClick={() => setActivePage('product-detail', { productId: product.id })}
            className="font-bold text-sm text-slate-900 hover:text-blue-600 line-clamp-2 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
            {product.brand} • {product.warranty}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
