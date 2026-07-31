import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { Logo } from './Logo';
import { STORE_CONFIG } from '../config/storeConfig';
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
    <footer className="bg-brand-900 border-t border-brand-800 text-brand-200 text-sm">
      {/* Trust Badges Bar */}
      <div className="border-b border-brand-800 bg-brand-800/40">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-100">Lahore & DHA Delivery</h4>
              <p className="text-xs text-brand-200/80">COD in Lahore & DHA (Flat Rs. 200)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-100">100% Quality Checked</h4>
              <p className="text-xs text-brand-200/80">Inspected prior to dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-100">Instant Support</h4>
              <p className="text-xs text-brand-200/80">WhatsApp support 10am - 10pm</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-100">7-Day Warranty</h4>
              <p className="text-xs text-brand-200/80">Hassle-free exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-brand-100 p-3 rounded-2xl inline-block shadow-md">
            <Logo size="md" showTagline={true} />
          </div>

          <p className="text-xs text-brand-200 leading-relaxed max-w-sm">
            Pakistan’s premier online gadget shop for high-performance wireless headphones, 20,000mAh power banks, 65W GaN fast chargers, and MagSafe glass cases with 100% Cash on Delivery.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={STORE_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-100 border border-brand-500/30 flex items-center justify-center hover:bg-brand-600 transition-all"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-100 border border-brand-500/30 flex items-center justify-center hover:bg-brand-600 transition-all"
              title="Facebook"
            >
              <span className="font-bold text-xs">fb</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-100 border border-brand-500/30 flex items-center justify-center hover:bg-brand-600 transition-all"
              title="Instagram"
            >
              <span className="font-bold text-xs">ig</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-brand-100 font-bold text-sm mb-4 tracking-wide uppercase">Quick Links</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setActivePage('home')} className="hover:text-brand-200 transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('shop')} className="hover:text-brand-200 transition-colors">
                Shop All Products
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('about')} className="hover:text-brand-200 transition-colors">
                About {STORE_CONFIG.storeName}
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('faq')} className="hover:text-brand-200 transition-colors">
                FAQs & Shipping
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('contact')} className="hover:text-brand-200 transition-colors">
                Contact & Support
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('admin')} className="text-brand-200 font-bold hover:underline">
                Admin Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-brand-100 font-bold text-sm mb-4 tracking-wide uppercase">Top Categories</h3>
          <ul className="space-y-2.5 text-xs">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setActivePage('shop', { categoryId: cat.id });
                  }}
                  className="hover:text-brand-200 transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Address */}
        <div>
          <h3 className="text-brand-100 font-bold text-sm mb-4 tracking-wide uppercase">Store Location</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>{STORE_CONFIG.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-500 shrink-0" />
              <a href={STORE_CONFIG.getTelUrl()} className="hover:text-brand-200 transition-colors">
                Call: {STORE_CONFIG.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-brand-500 shrink-0" />
              <a href={STORE_CONFIG.getWhatsAppUrl()} target="_blank" rel="noreferrer" className="hover:text-brand-200 transition-colors">
                WhatsApp: {STORE_CONFIG.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-500 shrink-0" />
              <span>{STORE_CONFIG.email}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-brand-800 bg-brand-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-brand-200">© {new Date().getFullYear()} {STORE_CONFIG.storeName} Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-brand-500">
            <button onClick={() => setActivePage('policy')} className="hover:text-brand-200">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('policy')} className="hover:text-brand-200">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
