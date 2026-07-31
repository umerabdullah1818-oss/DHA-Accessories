import React from 'react';
import {
  Tag,
  ShieldCheck,
  Sparkles,
  Headphones,
  Truck,
  MessageCircle,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Tag className="w-6 h-6 text-emerald-400" />,
      title: 'Affordable Prices',
      description: 'Direct wholesale rates on high-end mobile covers & accessories without extra markup.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: 'Quality Products',
      description: 'Every single parcel is tested and inspected for quality before dispatching to your doorstep.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'Latest Accessories',
      description: 'Stock updated daily with MagSafe, GaN chargers, 9H privacy glass & trendiest gadget cases.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: 'Friendly Customer Support',
      description: 'Our team in Lahore & Karachi is always available to assist with product compatibility.',
    },
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Cash on Delivery',
      description: 'Pay comfortably when your parcel arrives in any city or village across Pakistan.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      title: 'Fast WhatsApp Response',
      description: 'Order directly or ask questions on WhatsApp with 1-click quick response.',
    },
  ];

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Why Shop With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Why Choose Mobile Accessories DHA?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            We bridge physical street market prices with modern online convenience in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl shadow-lg transition-all flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
