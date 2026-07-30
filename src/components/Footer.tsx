import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { Logo } from './Logo';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategoryId } = useStore();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-sm">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Lahore & DHA Delivery</h4>
              <p className="text-xs text-slate-400">COD in Lahore & DHA (Flat Rs. 200)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Quality Checked</h4>
              <p className="text-xs text-slate-400">Inspected prior to dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Support</h4>
              <p className="text-xs text-slate-400">WhatsApp support 10am - 10pm</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Warranty</h4>
              <p className="text-xs text-slate-400">Hassle-free exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
            <Logo size="md" showTagline={true} />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Pakistan’s premier online gadget shop for high-performance wireless headphones, 20,000mAh power banks, 65W GaN fast chargers, and MagSafe glass cases with 100% Cash on Delivery.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/923260606619"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              title="Facebook"
            >
              <span className="font-bold text-xs">fb</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              title="Instagram"
            >
              <span className="font-bold text-xs">ig</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Quick Links</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setActivePage('home')} className="hover:text-blue-400 transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('shop')} className="hover:text-blue-400 transition-colors">
                Shop All Products
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('about')} className="hover:text-blue-400 transition-colors">
                About Jadugar Accessories
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('faq')} className="hover:text-blue-400 transition-colors">
                FAQs & Shipping
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('contact')} className="hover:text-blue-400 transition-colors">
                Contact & Support
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('admin')} className="text-blue-400 font-bold hover:underline">
                Admin Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Top Categories</h3>
          <ul className="space-y-2.5 text-xs">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setActivePage('shop', { categoryId: cat.id });
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Address */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Store Location</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Shop #14, Mobile Market, Hall Road, Lahore, Pakistan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <a href="tel:+923260606619" className="hover:text-blue-300 transition-colors">
                Call: +92 300 1234567
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="https://wa.me/923260606619?text=Salam%20Jadugar%20Accessories" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">
                WhatsApp: +92 300 1234567
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <span>sales@jadugaraccessories.pk</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Jadugar Accessories Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => setActivePage('policy')} className="hover:text-slate-300">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('policy')} className="hover:text-slate-300">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
