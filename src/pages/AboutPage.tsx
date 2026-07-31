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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dark Header Background with Upward Arch */}
      <div className="relative bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 pt-28 pb-56 sm:pb-72 lg:pb-80 overflow-hidden">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-500/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-brand-600/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-100 tracking-tight leading-tight">
            About <span className="heading-gradient">Mobile Accessories DHA</span>
          </h1>

          <p className="mt-5 text-brand-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Founded with a passion for quality mobile gadgets, we bring exact wholesale market prices directly to your phone screen with 100% Cash on Delivery.
          </p>
        </div>

        {/* Upward Arch Curve Background SVG (Light Color) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg 
            className="w-full h-32 sm:h-48 lg:h-64 text-slate-50 pointer-events-none block" 
            viewBox="0 0 1440 200" 
            fill="currentColor" 
            preserveAspectRatio="none"
          >
            {/* Shallow white dome */}
            <path d="M0,200 L0,150 Q720,20 1440,150 L1440,200 Z" />
          </svg>
        </div>
      </div>

      {/* Mission & Vision Cards — Overlapping the arch boundary */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-48 sm:-mt-56 lg:-mt-72 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-3">Uncompromised Quality</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Every cover, cable, and charger is tested in-house on actual devices to ensure fast charging protocols and exact cutouts.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-3">Pakistan-Wide COD</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              No online banking required. Pay cash directly to the courier rider when your parcel is delivered anywhere in Pakistan.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-sm">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-3">Instant WhatsApp Help</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Have doubts about phone case compatibility? Send us a quick photo on WhatsApp for instant assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-xl shadow-slate-200/50">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              From Street Stalls to Pakistan’s Digital Marketplace
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              We started small, selling hand-checked mobile covers and fast charging cables directly to local customers on busy market streets. We realized that Pakistani mobile users deserved honest prices without paying inflated mall margins.
            </p>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              Today, Mobile Accessories DHA serves over 50,000 customers in Lahore, Karachi, Islamabad, Faisalabad, Multan, Peshawar, Quetta, and hundreds of small towns across the country.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="p-8 bg-slate-50 rounded-3xl text-center border border-slate-100 hover:shadow-lg transition-all">
              <span className="text-4xl font-black text-blue-600">50k+</span>
              <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wider">Parcels</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl text-center border border-slate-100 hover:shadow-lg transition-all">
              <span className="text-4xl font-black text-emerald-600">80+</span>
              <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wider">Products</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl text-center border border-slate-100 hover:shadow-lg transition-all">
              <span className="text-4xl font-black text-amber-500">4.9</span>
              <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wider">Rating</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl text-center border border-slate-100 hover:shadow-lg transition-all">
              <span className="text-4xl font-black text-purple-600">7-Day</span>
              <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wider">Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
