import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  PackageX,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    loadingProducts,
    selectedCategoryId,
    setSelectedCategoryId,
    filters,
    setFilters,
    resetFilters,
    formatPrice,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'latest' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategoryId !== 'all' && p.categoryId !== selectedCategoryId) return false;
        // Search filter
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        // Stock filter
        if (inStockOnly && !p.inStock) return false;
        // Sale filter
        if (onSaleOnly && !p.originalPrice) return false;
        // Price max
        if (p.price > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'latest') return b.isNew ? 1 : -1;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategoryId, searchQuery, selectedBrand, inStockOnly, onSaleOnly, priceMax, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategoryId('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setPriceMax(15000);
    setSortBy('featured');
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Jadugar Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            All Mobile Accessories
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse through our collection of {products.length}+ items available with Cash on Delivery across Pakistan.
          </p>
        </div>

        {/* Filter & Search Controls Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-extrabold text-white text-sm">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories ({products.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.itemCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-400">Max Price</label>
                <span className="font-extrabold text-emerald-400">{formatPrice(priceMax)}</span>
              </div>
              <input
                type="range"
                min={300}
                max={15000}
                step={100}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <span>In Stock Only</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <span>On Sale / Discounted</span>
              </label>
            </div>
          </div>

          {/* Main Content Products Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-3xl">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  Showing <strong className="text-white">{filteredProducts.length}</strong> items
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="latest">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loadingProducts ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs font-bold animate-pulse">
                Fetching catalog items from Firestore...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Products Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  We couldn't find any active mobile accessories matching your exact filters. Try clearing your filters or search term.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
