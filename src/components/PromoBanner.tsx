import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { setActivePage, setSelectedCategoryId } = useStore();

  const handleClaim = () => {
    setSelectedCategoryId('mobile-covers');
    setActivePage('shop', { categoryId: 'mobile-covers' });
  };

  return (
    <section className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-600 p-8 sm:p-12 shadow-2xl border border-blue-400/30">
          {/* Animated Glow Elements */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Tag className="w-3.5 h-3.5" /> Special BOGO Deal of the Week
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Buy Any 2 Mobile Covers & Get 9H Glass Protector at 50% Off!
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                Combine your choice of MagSafe clear case, armor shockproof cover, or silicone soft case with our premium 9H Japanese AGC tempered glass. Auto-applied at checkout!
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={handleClaim}
                className="bg-white hover:bg-slate-100 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl transition-all text-sm flex items-center gap-2 hover:scale-105 shrink-0"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
