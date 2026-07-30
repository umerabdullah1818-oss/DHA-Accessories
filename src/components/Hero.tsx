import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Zap,
  ShieldCheck,
  Headphones,
  BatteryCharging,
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Wifi,
  Cable,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_SLIDES = [
  {
    image: '/img1.png',
    badges: [
      { label: 'Charging', value: '65W GaN Fast', icon: Zap, color: 'cyan', position: 'top-left' },
      { label: 'Protection', value: 'Multi-Layer Glass', icon: ShieldCheck, color: 'emerald', position: 'bottom-left' },
      { label: 'Audio', value: 'Hi-Res ANC', icon: Headphones, color: 'purple', position: 'top-right' },
      { label: 'Power', value: '20,000 mAh', icon: BatteryCharging, color: 'blue', position: 'bottom-right' },
    ],
  },
  {
    image: '/img2.png',
    badges: [
      { label: 'Display', value: 'Tempered Glass', icon: Smartphone, color: 'rose', position: 'top-left' },
      { label: 'Wireless', value: 'Bluetooth 5.3', icon: Wifi, color: 'amber', position: 'bottom-left' },
      { label: 'Build', value: 'Premium Finish', icon: Sparkles, color: 'violet', position: 'top-right' },
      { label: 'Connect', value: 'Type-C Fast', icon: Cable, color: 'teal', position: 'bottom-right' },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400' },
};

const badgePositions: Record<string, { className: string; animation: number[] }> = {
  'top-left': { className: 'left-0 lg:left-4 top-[8%]', animation: [0, -8, 0] },
  'bottom-left': { className: 'left-4 lg:left-10 bottom-[8%]', animation: [0, 8, 0] },
  'top-right': { className: 'right-0 lg:right-4 top-[12%]', animation: [0, -6, 0] },
  'bottom-right': { className: 'right-4 lg:right-10 bottom-[12%]', animation: [0, 8, 0] },
};

export const Hero: React.FC = () => {
  const { setActivePage } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] min-h-screen flex items-center pt-36 pb-12">
      {/* Perspective Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(800px) rotateX(60deg) scale(2) translateY(-20px)',
          transformOrigin: 'top center'
        }}
      />

      {/* Central Glow - shifted right behind the image */}
      <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-purple-600/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* LEFT SIDE — Text Content */}
        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0 pt-8 lg:pt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-white tracking-tight leading-[1.12]"
          >
            Upgrade Your Mobile Life with Premium Accessories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 text-slate-300 text-sm sm:text-base max-w-md mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Original wireless headphones, high-capacity power banks, fast chargers, and luxury glass covers with 100% Cash on Delivery in Lahore & DHA.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button 
              onClick={() => setActivePage('shop')} 
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#007BFF] to-[#00C6FF] text-white font-bold text-sm hover:scale-[1.02] transition-transform flex items-center gap-2 shadow-[0_0_25px_rgba(0,198,255,0.35)]"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActivePage('about')} 
              className="px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white font-bold text-sm hover:bg-white/15 transition-colors flex items-center gap-2"
            >
              Learn More <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>

          {/* Slide Indicators */}
          <div className="mt-8 flex gap-2 justify-center lg:justify-start">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide 
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-400' 
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — Product Image Carousel with Floating Badges */}
        <div className="relative flex items-center justify-center py-8 lg:py-0 min-h-[350px] sm:min-h-[420px] pt-8 lg:pt-4">

          {/* Dynamic Floating Badges */}
          <AnimatePresence mode="wait">
            {slide.badges.map((badge) => {
              const pos = badgePositions[badge.position];
              const colors = colorMap[badge.color];
              const Icon = badge.icon;
              return (
                <motion.div
                  key={`${currentSlide}-${badge.position}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: pos.animation }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    y: { repeat: Infinity, duration: 3.5 + Math.random(), ease: "easeInOut" }
                  }}
                  className={`absolute ${pos.className} bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2.5 text-white shadow-2xl z-20`}
                >
                  <div className={`w-7 h-7 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                  </div>
                  <div className="text-left leading-tight hidden sm:block pr-1">
                    <span className="text-slate-400 block text-[9px]">{badge.label}</span>
                    <strong className="text-xs">{badge.value}</strong>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Auto-Rotating Product Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={slide.image}
                alt="Premium Accessory"
                className="absolute inset-0 m-auto w-full h-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] object-contain z-10 drop-shadow-[0_0_60px_rgba(6,182,212,0.25)]"
                style={{ filter: 'contrast(1.1)' }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
