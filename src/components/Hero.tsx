import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Smartphone,
  Headphones,
  Zap,
  BatteryCharging,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  Truck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24 border-b border-slate-800 flex items-center min-h-[85vh]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-slate-950/70 z-0" />

      {/* Ambient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Jadugar Accessories & Gadget Hub</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl"
        >
          Upgrade Your Mobile Life with <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-sm">
            Premium Accessories
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Original wireless headphones, high-capacity power banks, fast chargers, and luxury glass covers with 100% Cash on Delivery in Lahore & DHA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <button
            onClick={() => setActivePage('shop')}
            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-sm flex items-center justify-center gap-2 hover:scale-105"
            id="hero-shop-now-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Shop Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/923001234567?text=Salam%20Jadugar%20Accessories,%20I%20want%20to%20order%20accessories"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all text-sm hover:scale-105"
            id="hero-whatsapp-btn"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp Order (0300-1234567)</span>
          </a>
        </motion.div>

        {/* Floating Stats below */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 max-w-3xl w-full"
        >
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
            <p className="font-black text-cyan-400 text-xl sm:text-3xl">50,000+</p>
            <p className="text-[11px] sm:text-sm text-slate-300 font-medium mt-1">Delivered Orders</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
            <p className="font-black text-cyan-400 text-xl sm:text-3xl">100% COD</p>
            <p className="text-[11px] sm:text-sm text-slate-300 font-medium mt-1">Lahore & DHA</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
            <p className="font-black text-cyan-400 text-xl sm:text-3xl">Rs. 200</p>
            <p className="text-[11px] sm:text-sm text-slate-300 font-medium mt-1">Flat Shipping</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
