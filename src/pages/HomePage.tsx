import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { FlashSale } from '../components/FlashSale';
import { ProductCard } from '../components/ProductCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { PromoBanner } from '../components/PromoBanner';
import { NewsletterSection } from '../components/NewsletterModal';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Zap, Award, Flame } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, loadingProducts, setActivePage } = useStore();
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new' | 'featured'>('bestsellers');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'new') return p.isNew;
    return p.isFeatured;
  }).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Flash Sale Countdown Section */}
      <FlashSale />

      {/* Best Sellers & Tabbed Showcase */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Top Rated Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Trending Mobile Accessories
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  activeTab === 'bestsellers'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> Best Sellers
              </button>

              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  activeTab === 'new'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> New Arrivals
              </button>

              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  activeTab === 'featured'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Featured
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {loadingProducts ? (
            <div className="py-12 text-center text-slate-500 text-xs font-bold animate-pulse">
              Loading latest products from Jadugar Accessories catalog...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No products found in this collection.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => setActivePage('shop')}
              className="bg-white hover:bg-blue-50 text-blue-600 font-extrabold px-8 py-3.5 rounded-2xl border border-blue-200 shadow-sm transition-all text-xs inline-flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Entire Catalog ({products.length} Items)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Promotional BOGO Banner */}
      <PromoBanner />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};
