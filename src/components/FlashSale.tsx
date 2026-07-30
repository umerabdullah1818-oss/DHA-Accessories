import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Flame, Timer, ArrowRight } from 'lucide-react';

export const FlashSale: React.FC = () => {
  const { products, setActivePage } = useStore();

  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-emerald-900/40 border border-blue-500/30 rounded-3xl shadow-xl gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center animate-bounce">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">Flash Sale Deals</h2>
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Up to 40% Off
                </span>
              </div>
              <p className="text-xs text-slate-300">Limited quantity offer for Pakistani gadget lovers</p>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Ends in:</span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black">
              <div className="bg-slate-950 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <span className="text-slate-600">:</span>
              <div className="bg-slate-950 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <span className="text-slate-600">:</span>
              <div className="bg-slate-950 text-rose-400 border border-slate-800 px-3 py-1.5 rounded-xl">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
