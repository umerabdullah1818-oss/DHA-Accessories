import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { Logo } from './Logo';
import {
  Wand2,
  Smartphone,
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Menu,
  X,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  User,
  ExternalLink,
} from 'lucide-react';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    compareList,
    activePage,
    setActivePage,
    setSelectedCategoryId,
    products,
    setIsCartOpen,
    setIsCompareModalOpen,
    formatPrice,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Filter search results dynamically
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  const handleCategorySelect = (catId: any) => {
    setSelectedCategoryId(catId);
    setActivePage('shop', { categoryId: catId });
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm text-slate-800 transition-all">
      {/* Top Announcement Bar - Rich Royal Blue to Cyan */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white text-[11px] py-1.5 px-4 font-bold tracking-widest uppercase shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap mx-auto md:mx-0">
            <span>✨ Cash on Delivery Available in DHA & Lahore — Flat Shipping Rs. 200 ✨</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] font-semibold">
            <a
              href="tel:+923001234567"
              className="flex items-center gap-1.5 hover:text-blue-100 transition-colors"
              title="Click to Call (+92 300 1234567)"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call: +92 300 1234567</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://wa.me/923001234567?text=Hello%20Jadugar%20Accessories,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-100 transition-colors"
              title="Open WhatsApp Business Chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <span className="text-white/40">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 hover:text-blue-100 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Custom Reference Logo Component */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none"
            id="brand-logo"
          >
            <Logo size="md" showTagline={true} />
          </button>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden lg:block flex-1 max-w-md relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search covers, earbuds, power banks, chargers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-slate-100/80 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                id="navbar-search-input"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-100 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-2.5 bg-blue-50/50 border-b border-blue-100 text-xs font-bold text-blue-900 flex justify-between">
                  <span>Top Matches ({searchResults.length})</span>
                  <span className="text-[10px] text-blue-600 font-normal">Click to open</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setActivePage('product-detail', { productId: product.id });
                        setIsSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-blue-50/60 transition-colors text-left group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span>{product.categoryName}</span>
                          <span className="text-blue-600 font-extrabold">{formatPrice(product.price)}</span>
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all hidden sm:flex items-center gap-1.5"
              title="Compare Products"
              id="nav-compare-btn"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-1.5"
              title="Wishlist"
              id="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all font-bold text-xs sm:text-sm"
              id="nav-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">
                {cartSubtotal > 0 ? formatPrice(cartSubtotal) : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-blue-50 rounded-xl"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 lg:hidden relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Desktop Main Navigation Links Bar */}
        <nav className="hidden lg:flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-sm font-semibold">
          <div className="flex items-center gap-6">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg border border-blue-200/80 transition-colors"
              >
                <span>Browse Categories</span>
                <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-blue-100 rounded-2xl shadow-2xl p-2 z-50 divide-y divide-slate-100">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-blue-50/80 rounded-xl text-left transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">{cat.name}</p>
                        <p className="text-[10px] text-slate-500">{cat.itemCount}+ Items available</p>
                      </div>
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-blue-600 transition-colors ${activePage === 'home' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-blue-600 transition-colors ${activePage === 'shop' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              All Products
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-blue-600 transition-colors ${activePage === 'about' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`hover:text-blue-600 transition-colors ${activePage === 'faq' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-blue-600 transition-colors ${activePage === 'contact' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              Contact Us
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 7-Day Replacement Warranty
            </span>
            <span className="font-medium text-slate-600">📍 Lahore & DHA COD</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-blue-100 px-4 py-4 space-y-3 font-semibold shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-800"
          >
            Shop All Accessories
          </button>
          
          <div className="py-2">
            <p className="text-xs uppercase text-slate-400 font-extrabold tracking-wider px-3 mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="text-left text-xs p-2 rounded-lg bg-blue-50/60 hover:bg-blue-100 text-slate-700 font-medium"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-800"
          >
            About Jadugar Accessories
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-800"
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-800"
          >
            Contact & Support
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="block w-full text-left py-2 px-3 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200"
          >
            Store Admin Dashboard
          </button>

          <a
            href="https://wa.me/923001234567?text=Hello%20Jadugar%20Accessories"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 rounded-xl w-full shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp (0300-1234567)
          </a>
        </div>
      )}
    </header>
  );
};

