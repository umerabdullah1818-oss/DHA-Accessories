import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Heart,
  SlidersHorizontal,
  Plus,
  Minus,
  Share2,
  ChevronRight,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    recentlyViewed,
    setActivePage,
    formatPrice,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');

  // Customer review submit form state
  const [newReviewer, setNewReviewer] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  const currentMainImg = activeImage || product.image;
  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Salam Mobile Accessories DHA!\nI want to order:\n*${product.name}*\nQuantity: ${quantity}\nPrice: ${formatPrice(
        product.price * quantity
      )}\n\nPlease dispatch via Cash on Delivery.`
    );
    window.open(`https://wa.me/923004257683?text=${text}`, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newComment) {
      showToast('Please fill out name and review comment', 'error');
      return;
    }
    const rev = {
      id: `rev-${Date.now()}`,
      userName: newReviewer,
      city: newCity || 'Pakistan',
      rating: newRating,
      comment: newComment,
      date: 'Just now',
    };
    setUserReviews([rev, ...userReviews]);
    setNewReviewer('');
    setNewCity('');
    setNewComment('');
    showToast('Thank you! Your review has been submitted.', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const recentlyViewedProducts = products
    .filter((p) => recentlyViewed.includes(p.id) && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          <button onClick={() => setActivePage('home')} className="hover:text-blue-400">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setActivePage('shop')} className="hover:text-blue-400">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => setActivePage('shop', { categoryId: product.categoryId })}
            className="hover:text-blue-400"
          >
            {product.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-12">
          {/* Gallery - 6 Columns */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
              <img
                src={currentMainImg}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[product.image, ...product.galleryImages].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-950 ${
                    currentMainImg === img ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info - 6 Columns */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
                  {product.categoryName} • {product.brand}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isCompared
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Compare Specs"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 bg-slate-950 text-slate-400 border border-slate-800 rounded-xl hover:text-white"
                    title="Share Product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 my-3 flex-wrap text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} customer reviews)</span>
                </div>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>In Stock ({product.stockCount} available)</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl my-4 flex items-baseline gap-4">
                <span className="text-3xl font-black text-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    Save {formatPrice(product.originalPrice - product.price)} ({discountPercent}% OFF)
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-slate-800 text-slate-300 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="p-2 hover:bg-slate-800 text-slate-300 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="bg-slate-800 hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  Buy Now (COD)
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                Direct Order on WhatsApp (Fast Dispatch)
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details / Specs / Reviews */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-12">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`text-xs font-extrabold pb-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Description & Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-xs font-extrabold pb-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs font-extrabold pb-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({product.reviewCount + userReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-xs font-extrabold pb-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Shipping & Warranty
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <h4 className="font-bold text-white mb-1">Authentic Hardware Guaranteed</h4>
                    <p className="text-xs text-slate-400">
                      Sourced directly for top reliability with actual tested performance ratings.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <h4 className="font-bold text-white mb-1">Lahore & DHA Delivery</h4>
                    <p className="text-xs text-slate-400">
                      Dispatched directly via rider within 24 hours. Flat shipping fee of Rs. 200 applies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="divide-y divide-slate-800 text-xs max-w-2xl">
                {product.specifications.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-2.5">
                    <span className="font-semibold text-slate-400">{s.label}</span>
                    <span className="font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit review form */}
                <form onSubmit={handleAddReview} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 max-w-xl">
                  <h4 className="font-bold text-white text-sm">Write a Customer Review</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name..."
                      value={newReviewer}
                      onChange={(e) => setNewReviewer(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="City (e.g. Lahore)..."
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Rating:</span>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-amber-400 font-bold"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Write your experience with this gadget..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-xl text-xs flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>

                {/* User added reviews */}
                {userReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{rev.userName} ({rev.city})</span>
                      <span className="text-amber-400">⭐ {rev.rating}/5</span>
                    </div>
                    <p className="text-xs text-slate-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 text-xs text-slate-300">
                <p>🚚 <strong>Delivery Timeline & Coverage:</strong> 24 to 48 hours for Lahore & DHA. Flat shipping fee of Rs. 200 on every order.</p>
                <p>💵 <strong>Payment:</strong> Cash on Delivery (COD) or Optional Bank Transfer / EasyPaisa / JazzCash.</p>
                <p>🛡 <strong>Warranty:</strong> {product.warranty}. Exchange claims accepted within 7 days of parcel arrival.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-black text-white mb-6">Related Accessories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
