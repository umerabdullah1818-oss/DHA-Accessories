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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dark Header Background with Upward Arch (Matching Red Line) */}
      <div className="relative bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 pt-28 pb-56 sm:pb-72 lg:pb-80 overflow-hidden">
        {/* Subtle glow effects */}
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-500/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-brand-600/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-100 tracking-tight leading-tight">
              Premium <span className="heading-gradient">Mobile</span> Accessories
              <br />for Every Need
            </h1>
            <p className="mt-5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Browse through our collection of {products.length}+ items available with Cash on Delivery across Pakistan.
            </p>
          </div>
        </div>

        {/* Upward Arch Curve Background SVG (Light Color) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg 
            className="w-full h-32 sm:h-48 lg:h-64 text-slate-50 pointer-events-none block" 
            viewBox="0 0 1440 200" 
            fill="currentColor" 
            preserveAspectRatio="none"
          >
            {/* This path creates a white dome that arches upwards in the center */}
            <path d="M0,200 L0,150 Q720,20 1440,150 L1440,200 Z" />
          </svg>
        </div>
      </div>

      {/* Bento Card Container — Overlapping the arch boundary */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-48 sm:-mt-56 lg:-mt-72 mb-12">
        <div className="bg-[#1c3545]/70 backdrop-blur-md border border-white/[0.08] rounded-[2rem] p-5 sm:p-8 shadow-2xl shadow-black/40">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 — Large Left (row-span-2) */}
            <div 
              onClick={() => setSelectedCategoryId('earphones')}
              className="row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[#2a4a5a]/80 to-[#1a3040]/80 border border-white/[0.06] flex flex-col hover:border-white/15 transition-all shadow-xl"
            >
              <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full shadow-lg">Earphones & ANC</span>
              <img src={CATEGORIES[1].image} alt="Earphones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Card 2 — Top Middle */}
            <div 
              onClick={() => setSelectedCategoryId('chargers')}
              className="rounded-2xl overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[#2a4a5a]/80 to-[#1a3040]/80 border border-white/[0.06] hover:border-white/15 transition-all shadow-xl"
            >
              <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full shadow-lg">Chargers</span>
              <img src={CATEGORIES[2].image} alt="Chargers" className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Card 3 — Top Right */}
            <div 
              onClick={() => setSelectedCategoryId('mobile-covers')}
              className="rounded-2xl overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[#2a4a5a]/80 to-[#1a3040]/80 border border-white/[0.06] hover:border-white/15 transition-all shadow-xl"
            >
              <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full shadow-lg">Mobile Covers</span>
              <img src={CATEGORIES[0].image} alt="Covers" className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Card 4 — Bottom Middle */}
            <div 
              onClick={() => setSelectedCategoryId('power-banks')}
              className="rounded-2xl overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[#2a4a5a]/80 to-[#1a3040]/80 border border-white/[0.06] hover:border-white/15 transition-all shadow-xl"
            >
              <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full shadow-lg">Power Banks</span>
              <img src={CATEGORIES[4].image} alt="Power Banks" className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Card 5 — Bottom Right */}
            <div 
              onClick={() => setSelectedCategoryId('smart-watches')}
              className="rounded-2xl overflow-hidden relative group cursor-pointer bg-gradient-to-br from-[#2a4a5a]/80 to-[#1a3040]/80 border border-white/[0.06] hover:border-white/15 transition-all shadow-xl"
            >
              <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full shadow-lg">Smart Watches</span>
              <img src={CATEGORIES[5].image} alt="Smart Watches" className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mt-12">

        {/* Filter & Search Controls Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 bg-white border border-slate-200 shadow-sm rounded-3xl p-5 lg:sticky lg:top-24 relative z-20">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center justify-between w-full pb-4 border-b border-slate-100 lg:cursor-default"
            >
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <Filter className="w-4 h-4 text-emerald-500" />
                <span>Filters</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 lg:hidden transition-transform duration-300 ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <div className={`space-y-6 overflow-hidden transition-all duration-300 ${mobileFiltersOpen ? 'max-h-[1000px] opacity-100 mt-5' : 'max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100 lg:mt-5'}`}>
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.itemCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Price Max Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Max Price</label>
                  <span className="font-extrabold text-emerald-600">{formatPrice(priceMax)}</span>
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
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="group-hover:text-slate-900 transition-colors">In Stock Only</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="group-hover:text-slate-900 transition-colors">On Sale / Discounted</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content Products Grid */}
          <div className="lg:col-span-9 space-y-6 pb-32">
            {/* Top Toolbar */}
            <div className="flex gap-4 items-center justify-between bg-white border border-slate-200 shadow-sm p-4 rounded-3xl">

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 font-medium rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 text-xs font-bold animate-pulse">
                Fetching catalog items from Firestore...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <PackageX className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any active mobile accessories matching your exact filters. Try clearing your filters or search term.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-md mt-2"
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
