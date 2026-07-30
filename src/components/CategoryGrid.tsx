import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import {
  Smartphone,
  Headphones,
  Zap,
  Cable,
  BatteryCharging,
  Watch,
  ShieldCheck,
  Camera,
  Volume2,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Cable: <Cable className="w-6 h-6" />,
  BatteryCharging: <BatteryCharging className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Volume2: <Volume2 className="w-6 h-6" />,
};

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategoryId, setActivePage, selectedCategoryId } = useStore();

  const handleCategoryClick = (catId: any) => {
    setSelectedCategoryId(catId);
    setActivePage('shop', { categoryId: catId });
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      {/* Category Pills Strip */}
      <div className="bg-white border-y border-slate-200 px-4 sm:px-8 py-4 flex gap-3 overflow-x-auto no-scrollbar shadow-sm">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`flex-none px-6 py-2 text-xs font-bold rounded-full transition-all ${
            selectedCategoryId === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Accessories
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`flex-none px-6 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
              selectedCategoryId === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{cat.name}</span>
            <span className="text-[10px] opacity-75">({cat.itemCount})</span>
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Browse Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryId('all');
              setActivePage('shop');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-5 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              id={`cat-card-${cat.id}`}
            >
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  {iconMap[cat.iconName] || <Smartphone className="w-6 h-6" />}
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {cat.itemCount}+ Items
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-black text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
