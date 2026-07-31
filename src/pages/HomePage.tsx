import React from 'react';
import { Hero } from '../components/Hero';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';

const FEATURED_CATEGORIES = [
  {
    id: 'earphones',
    title: 'Earphones & Headsets',
    subtitle: 'Premium quality at the best price',
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    size: 'large', // spans 2 cols
  },
  {
    id: 'chargers',
    title: 'Fast Chargers & Adapters',
    subtitle: 'Up to 65W GaN Technology',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    size: 'normal',
  },
  {
    id: 'mobile-covers',
    title: 'Luxury Mobile Covers',
    subtitle: 'Shockproof & Stylish Protection',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-700',
    size: 'normal',
  },
  {
    id: 'power-banks',
    title: 'Power Banks',
    subtitle: '20,000mAh | 22.5W Fast Charge',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    size: 'normal',
  },
  {
    id: 'smart-watches',
    title: 'Smart Watches',
    subtitle: 'AMOLED | Bluetooth Calling',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    size: 'large',
  },
  {
    id: 'bluetooth-speakers',
    title: 'Bluetooth Speakers',
    subtitle: 'RGB Party & Portable Bass',
    gradient: 'from-pink-600 via-rose-500 to-orange-500',
    size: 'normal',
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ahmed Khan",
    location: "Lahore",
    text: "Ordered a 65W GaN charger and received it the very next day. Original quality and excellent packaging. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Sara Ali",
    location: "Karachi",
    text: "The ANC earbuds I bought from Mobile Accessories DHA are amazing. Bass is punchy and the battery lasts forever. Best price I found online.",
    rating: 5
  },
  {
    id: 3,
    name: "Usman Tariq",
    location: "Islamabad",
    text: "Excellent customer service. They guided me properly about the power bank compatibility with my phone. Will shop again.",
    rating: 5
  },
  {
    id: 4,
    name: "Bilal",
    location: "Faisalabad",
    text: "Covers are very premium. Delivery was fast via CallCourier. Very trustworthy store for mobile accessories.",
    rating: 4
  }
];

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategoryId, products } = useStore();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryId(catId as any);
    setActivePage('shop');
  };

  // Find the matching category data for images
  const getCategoryImage = (id: string) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat?.image || '';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="bg-[#0A0A0A] text-white">
        <Hero />
      </div>

      {/* Categories Section */}
      <section className="relative py-20 bg-slate-50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900"
            >
              Shop by <span className="heading-gradient-dark">Category</span>
            </motion.h2>
          </div>

          {/* Category Cards - Row by Row */}
          <div className="space-y-5">
            {/* Row 1: Large LEFT (Earphones) + Small RIGHT (Chargers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[FEATURED_CATEGORIES[0], FEATURED_CATEGORIES[1]].map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 ${
                    cat.size === 'large' ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-100`} />
                  <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8">
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-lg">{cat.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm mt-1.5 font-medium">{cat.subtitle}</p>
                      <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-white/30 transition-all">
                        View Products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 relative">
                      <img src={getCategoryImage(cat.id)} alt={cat.title} className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500" />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2: Small LEFT (Covers) + Large RIGHT (Power Banks) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[FEATURED_CATEGORIES[2], FEATURED_CATEGORIES[3]].map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 ${
                    i === 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-100`} />
                  <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8">
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-lg">{cat.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm mt-1.5 font-medium">{cat.subtitle}</p>
                      <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-white/30 transition-all">
                        View Products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 relative">
                      <img src={getCategoryImage(cat.id)} alt={cat.title} className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500" />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 3: Large LEFT (Smart Watches) + Small RIGHT (Speakers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[FEATURED_CATEGORIES[4], FEATURED_CATEGORIES[5]].map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 ${
                    i === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-100`} />
                  <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8">
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-lg">{cat.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm mt-1.5 font-medium">{cat.subtitle}</p>
                      <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-white/30 transition-all">
                        View Products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 relative">
                      <img src={getCategoryImage(cat.id)} alt={cat.title} className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500" />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setActivePage('shop')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 border border-slate-800 text-white font-bold text-sm hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-24 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900"
              >
                Featured <span className="heading-gradient-dark">Products</span>
              </motion.h2>
            </div>
            
            <button
              onClick={() => setActivePage('shop')}
              className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              See All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white"
            >
              Trusted by <span className="heading-gradient-light">Thousands</span>
            </motion.h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here is what our community of tech enthusiasts has to say.</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar pt-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="snap-center shrink-0 w-[85vw] sm:w-[360px] relative"
              >
                {/* Glowing Border Effect (Static) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-emerald-400 to-cyan-500 rounded-3xl blur-md opacity-20" />
                
                {/* Glassmorphic Card */}
                <div className="relative h-full bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                  <div className="absolute top-6 right-6 text-slate-700/40">
                    <Quote className="w-10 h-10 rotate-180" />
                  </div>
                  
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, index) => (
                        <Star key={index} className="w-5 h-5 fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, index) => (
                        <Star key={index} className="w-5 h-5 fill-slate-700 text-slate-700" />
                      ))}
                    </div>
                    
                    <p className="text-slate-200 font-medium leading-relaxed mb-8 relative z-10 text-sm sm:text-base">
                      "{review.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 p-[2px]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{review.name}</h4>
                      <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{review.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </div>
      </section>

      {/* Beautiful Promo Banner */}
      <section className="py-12 bg-slate-50 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 shadow-2xl shadow-purple-500/20"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 gap-10">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-md">
                  Upgrade Your Setup <br/>
                  <span className="heading-gradient-light">Save up to 50%</span>
                </h2>
                <p className="text-white/90 font-medium text-sm sm:text-base mb-8 max-w-md mx-auto md:mx-0">
                  Get the best deals on premium audio gear, ultra-fast GaN chargers, and smart wearables. Don't miss out!
                </p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="bg-white text-purple-700 hover:bg-slate-50 font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 transition-all inline-flex items-center gap-2"
                >
                  Shop The Sale <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 relative w-full max-w-md">
                {/* Floating Elements for Banner */}
                <div className="relative aspect-square">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full" />
                  
                  {/* Images of products */}
                  <motion.img 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    src={CATEGORIES[1].image} // Earphones
                    alt="Promo Item" 
                    className="absolute top-[10%] left-[10%] w-2/3 h-2/3 object-cover rounded-3xl shadow-2xl border-4 border-white/10 rotate-[-10deg]"
                  />
                  <motion.img 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    src={CATEGORIES[5].image} // Watch
                    alt="Promo Item 2" 
                    className="absolute bottom-[5%] right-[5%] w-1/2 h-1/2 object-cover rounded-3xl shadow-2xl border-4 border-white/10 rotate-[15deg]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
