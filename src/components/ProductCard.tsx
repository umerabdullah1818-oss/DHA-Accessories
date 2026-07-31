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
      className="group relative bg-brand-100 rounded-3xl p-5 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-brand-200 text-brand-900 h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div
        onClick={() => setActivePage('product-detail', { productId: product.id })}
        className="relative aspect-square overflow-hidden bg-brand-200/30 rounded-2xl mb-4 cursor-pointer group-hover:bg-brand-200/50 transition-colors flex items-center justify-center border border-brand-200/50"
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
            <span className="bg-brand-500 text-brand-100 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-brand-600 text-brand-100 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Hot
            </span>
          )}
          {product.isNew && (
            <span className="bg-brand-800 text-brand-100 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
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
            className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-brand-200/50 hover:scale-110 ${
              isSaved
                ? 'bg-brand-500/20 text-brand-600 border-brand-500/30'
                : 'bg-brand-100/90 text-brand-800 hover:bg-brand-500/20 hover:text-brand-600'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-brand-600' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-brand-200/50 hover:scale-110 ${
              isCompared
                ? 'bg-brand-800/20 text-brand-900 border-brand-800/30'
                : 'bg-brand-100/90 text-brand-800 hover:bg-brand-800/20 hover:text-brand-900'
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
            className="w-9 h-9 rounded-xl bg-brand-100/90 text-brand-800 hover:bg-brand-600/20 hover:text-brand-800 flex items-center justify-center backdrop-blur-md transition-all shadow-sm border border-brand-200/50 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.inStock && product.stockCount <= 15 && (
          <div className="absolute bottom-3 left-3 right-3 bg-brand-100/90 backdrop-blur-md border border-brand-500/30 text-brand-800 text-xs font-bold py-1.5 px-3 rounded-xl text-center shadow-sm">
            Only {product.stockCount} left in stock!
          </div>
        )}
      </div>

      {/* Details Body */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest group-hover:text-brand-800 transition-colors">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-brand-500 font-bold text-xs bg-brand-200/50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-brand-800">{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <h3
            onClick={() => setActivePage('product-detail', { productId: product.id })}
            className="font-bold text-base text-brand-900 hover:text-brand-600 line-clamp-2 cursor-pointer transition-colors leading-snug mb-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-4 border-t border-brand-200">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-brand-500 line-through font-semibold mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-black text-brand-900 leading-none">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-12 h-12 bg-brand-900 hover:bg-brand-500 text-brand-100 rounded-2xl flex items-center justify-center transition-colors shadow-md hover:shadow-brand-500/40 shrink-0 group/btn relative overflow-hidden"
            title="Add to Cart"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/0 via-brand-100/20 to-brand-100/0 translate-y-[100%] group-hover/btn:translate-y-[-100%] transition-transform duration-500" />
            <ShoppingBag className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
