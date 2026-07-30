import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, SlidersHorizontal, Trash2, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductComparisonModal: React.FC = () => {
  const {
    compareList,
    isCompareModalOpen,
    setIsCompareModalOpen,
    products,
    toggleCompare,
    clearCompare,
    addToCart,
    formatPrice,
  } = useStore();

  if (!isCompareModalOpen) return null;

  const compareProducts = products.filter((p) => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-400" />
            <h2 className="font-extrabold text-white text-base">Product Comparison Matrix</h2>
            <span className="text-xs text-slate-400">({compareProducts.length} items)</span>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Content */}
        <div className="p-6 overflow-x-auto flex-1">
          {compareProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <SlidersHorizontal className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-white font-bold text-base">No Products Selected for Comparison</p>
              <p className="text-xs max-w-sm mx-auto">
                Click the compare icon on any product card to compare specs, prices, and features side-by-side.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-950 border-b border-slate-800 text-xs text-slate-400 w-1/4">
                    Features
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="p-3 bg-slate-950 border-b border-slate-800 text-center relative">
                      <button
                        onClick={() => toggleCompare(product.id)}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl mx-auto border border-slate-800 bg-slate-900 mb-2"
                      />
                      <h4 className="font-bold text-xs text-white line-clamp-2">{product.name}</h4>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                <tr>
                  <td className="p-3 font-semibold text-slate-400">Price</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center font-extrabold text-emerald-400 text-sm">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Category</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-slate-300">
                      {p.categoryName}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Brand</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-blue-400">
                      {p.brand}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Rating</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-amber-400 font-bold">
                      ⭐ {p.rating} ({p.reviewCount} reviews)
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Warranty</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-slate-300">
                      {p.warranty}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Stock Availability</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-emerald-400 font-semibold">
                      {p.inStock ? `In Stock (${p.stockCount})` : 'Out of Stock'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-slate-400">Action</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};
