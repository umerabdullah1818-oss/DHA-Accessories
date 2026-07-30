import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, BatteryCharging, Zap, Radio, Sparkles, ShieldCheck, ArrowRight, Volume2, Cpu, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnimatedGearShowcase: React.FC = () => {
  const { setActivePage, setSelectedCategoryId } = useStore();
  const [activeTab, setActiveTab] = useState<'headphones' | 'powerbank'>('headphones');
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Animate battery level fluctuation for realistic power bank feel
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev >= 99 ? 85 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryGo = (catId: string) => {
    setSelectedCategoryId(catId);
    setActivePage('shop', { categoryId: catId });
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50/80 via-white to-blue-100/60 rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-xl shadow-blue-500/5 relative overflow-hidden">
      {/* Background Decorative Ripples */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tab Switcher */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3 relative z-10 border-b border-blue-100 pb-4">
        <div className="flex items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('headphones')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'headphones'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Wireless Headphones</span>
          </button>
          <button
            onClick={() => setActiveTab('powerbank')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'powerbank'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            <span>Power Banks</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Featured Accessories 2026
        </span>
      </div>

      {/* Main Animated Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px] relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'headphones' ? (
            <motion.div
              key="headphones-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-lg text-blue-700 text-xs font-bold">
                  <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>Hybrid ANC & Low-Latency Gaming</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Studio Wireless Headphones <br />
                  <span className="text-blue-600 font-extrabold">Deep Bass & Hi-Res Sound</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Immerse in ultra-clear acoustics with 40mm titanium drivers, 50-hour battery stamina, and soft protein memory ear cushions.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">50H Battery</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Spatial Audio</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Type-C Fast</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => handleCategoryGo('audio-gadgets')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 group"
                  >
                    <span>Explore Headphones</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-4 py-3 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-blue-600 animate-bounce' : 'text-slate-400'}`} />
                    <span>{isPlayingAudio ? 'Sound On' : 'Mute Wave'}</span>
                  </button>
                </div>
              </div>

              {/* Right Visual Animation Stage */}
              <div className="lg:col-span-6 relative flex items-center justify-center py-6">
                {/* Soundwaves Ripple Animation */}
                {isPlayingAudio && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-56 h-56 rounded-full border-2 border-blue-400/40"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                      className="w-72 h-72 rounded-full border-2 border-cyan-400/30"
                    />
                  </div>
                )}

                {/* Animated Floating Headphones Vector */}
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-3xl p-6 shadow-2xl border border-blue-200/90 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <Headphones className="w-32 h-32 sm:w-40 sm:h-40 text-blue-600 stroke-[1.5]" />
                    {/* Glowing LED status on earcup */}
                    <div className="absolute bottom-6 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                    <div className="absolute bottom-6 right-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  </div>

                  {/* Equalizer Frequency Visualizer */}
                  <div className="flex items-end gap-1.5 h-8 mt-2">
                    {[40, 75, 100, 60, 90, 50, 85, 30, 95, 65].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isPlayingAudio ? [`${h}%`, `${100 - h}%`, `${h}%`] : '20%' }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                    Hi-Res Audio 24bit/96kHz
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="powerbank-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-lg text-amber-800 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-current animate-bounce" />
                  <span>22.5W & 65W PD Turbo Fast Charging</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  20,000mAh Power Banks <br />
                  <span className="text-blue-600 font-extrabold">Digital LED Power Readout</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Never run out of juice. Charge up to 3 devices simultaneously with intelligent temperature safety monitoring and aircraft-approved lithium polymer cells.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Dual USB-C PD</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Smart Protection</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Slim Flight Safe</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => handleCategoryGo('power-banks')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 group"
                  >
                    <span>View Power Banks</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-800 font-bold">
                    <Zap className="w-4 h-4 text-amber-500 fill-current" />
                    <span>0 to 60% in 30 Mins</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Animation Stage */}
              <div className="lg:col-span-6 relative flex items-center justify-center py-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-64 h-72 sm:w-72 sm:h-80 bg-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-blue-600 flex flex-col justify-between text-white"
                >
                  {/* Digital LED Display Header */}
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400 fill-current animate-pulse" />
                      <span className="text-xs font-extrabold text-blue-400">FAST CHARGE</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-cyan-400 font-mono tracking-wider">
                        {batteryLevel}%
                      </span>
                    </div>
                  </div>

                  {/* Charging Flow Animation */}
                  <div className="my-auto space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span>Total Output</span>
                      <span className="text-emerald-400 font-bold">22.5W Max</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full"
                        style={{ width: `${batteryLevel}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-800/80 p-2 rounded-xl text-center border border-slate-700/50">
                        <p className="text-slate-400">USB-C PD</p>
                        <p className="font-bold text-white">Active (Output)</p>
                      </div>
                      <div className="bg-slate-800/80 p-2 rounded-xl text-center border border-slate-700/50">
                        <p className="text-slate-400">Temp Monitor</p>
                        <p className="font-bold text-emerald-400">32°C Safe</p>
                      </div>
                    </div>
                  </div>

                  {/* Dual Port Visual Base */}
                  <div className="flex justify-around items-center pt-2 border-t border-slate-800">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-2.5 bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <span className="text-[9px] text-slate-400 mt-1">Type-C 1</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-2.5 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      <span className="text-[9px] text-slate-400 mt-1">Type-C 2</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      <span className="text-[9px] text-slate-400 mt-1">USB-A QC</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
