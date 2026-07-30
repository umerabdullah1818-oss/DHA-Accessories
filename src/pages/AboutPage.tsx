import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Wand2,
  Smartphone,
  ShieldCheck,
  Award,
  Users,
  Building2,
  Sparkles,
  Truck,
  MessageCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Pakistan’s Street-To-Online Success Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Jadugar Accessories</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Founded with a passion for quality mobile gadgets, Jadugar Accessories brings the exact wholesale market prices of Hall Road Lahore directly to your phone screen with 100% Cash on Delivery in DHA & Lahore.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-white text-base">Uncompromised Quality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every cover, cable, and charger is tested in-house on actual devices to ensure fast charging protocols and exact cutouts.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-white text-base">Pakistan-Wide COD</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No online banking required. Pay cash directly to the courier rider when your parcel is delivered anywhere in Pakistan.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-white text-base">Instant WhatsApp Help</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have doubts about phone case compatibility? Send us a quick photo on WhatsApp (0300-1234567) for instant assistance.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              From Street Stalls to Pakistan’s Digital Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We started small, selling hand-checked mobile covers and fast charging cables directly to local customers on busy market streets. We realized that Pakistani mobile users deserved honest prices without paying inflated mall margins.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Today, Jadugar Accessories serves over 50,000 customers in Lahore, Karachi, Islamabad, Faisalabad, Multan, Peshawar, Quetta, and hundreds of small towns across the country.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-3xl font-black text-blue-400">50,000+</span>
              <p className="text-xs text-slate-400 mt-1">Parcels Delivered</p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-3xl font-black text-emerald-400">80+</span>
              <p className="text-xs text-slate-400 mt-1">Gadget Products</p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-3xl font-black text-amber-400">4.9 ⭐</span>
              <p className="text-xs text-slate-400 mt-1">Customer Rating</p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-3xl font-black text-purple-400">7-Day</span>
              <p className="text-xs text-slate-400 mt-1">Warranty Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
