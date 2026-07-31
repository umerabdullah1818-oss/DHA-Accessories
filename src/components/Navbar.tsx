import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import {
  Home,
  ShoppingBag,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  Heart,
} from 'lucide-react';
import { PageView } from '../types';

const NAV_LINKS: { label: string; page: PageView; icon?: typeof Home }[] = [
  { label: 'Home', page: 'home', icon: Home },
  { label: 'Shop', page: 'shop' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    activePage,
    setActivePage,
    setIsCartOpen,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (label: string, page: PageView) => {
    if (label === 'Accessories') return false;
    if (label === 'Shop') return activePage === 'shop';
    return activePage === page;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-900/95 backdrop-blur-2xl border-b border-brand-800 shadow-2xl shadow-black/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="relative flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex flex-1 justify-start">
            <button
              onClick={() => handleNavClick('home')}
              className="shrink-0 focus:outline-none flex items-center gap-2"
              id="brand-logo"
            >
              <Logo variant="light" size="sm" showTagline={false} />
            </button>
          </div>

          {/* Center pill navigation — desktop (Absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <nav className="flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-brand-800/80 backdrop-blur-xl border border-brand-600/30 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.label, link.page);
              const Icon = link.icon;

              if (isActive) {
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.page)}
                    className="px-5 py-2 rounded-full text-[13px] font-bold bg-brand-600 text-brand-100 shadow-md flex items-center gap-2 transition-all hover:bg-brand-500"
                  >
                    {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                    {link.label}
                  </button>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className="px-5 py-2 rounded-full text-[13px] font-bold text-brand-200 hover:text-brand-100 hover:bg-brand-600/30 transition-colors"
                >
                  {link.label}
                </button>
              );
            })}
            </nav>
          </div>

          {/* Right actions: Only Cart & Mobile Menu */}
          <div className="flex flex-1 justify-end items-center gap-4 shrink-0">
            {/* Cart Button (Always visible) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand-800/80 hover:bg-brand-600 border border-brand-600/30 rounded-full text-brand-100 transition-all shadow-lg flex items-center justify-center gap-2 group"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-brand-100 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              ) : null}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-200 hover:text-brand-100 rounded-full hover:bg-brand-600/50 bg-brand-800/80 backdrop-blur-sm border border-brand-600/30"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-900 border-b border-brand-800 px-4 py-4 space-y-1 pointer-events-auto shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.label, link.page);
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-brand-100'
                    : 'text-brand-200 hover:bg-brand-800 hover:text-brand-100'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </button>
            );
          })}

          <div className="flex gap-2 pt-4 border-t border-brand-800 mt-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-brand-500 text-brand-100 shadow-lg hover:bg-brand-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Open Cart
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
