import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, clearWishlist, setActivePage } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Saved Favorites
            </span>
            <h1 className="text-3xl font-black text-white mt-1">My Wishlist</h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <Heart className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save your favorite phone covers, earbuds, and fast chargers by tapping the heart icon on any product.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
