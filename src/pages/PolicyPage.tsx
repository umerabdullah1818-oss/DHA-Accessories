import React from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Legal & Terms
          </span>
          <h1 className="text-3xl font-black text-white mt-1">
            Store Policies & Terms of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Jadugar Accessories - Committed to transparency across Pakistan.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-400" /> 1. Shipping & Cash on Delivery Policy
            </h2>
            <p>
              We deliver orders exclusively in DHA and Lahore. A fixed shipping fee of Rs. 200 applies to every order (there is no free shipping tier). Cash on Delivery is available on all orders. Dispatch takes place within 24 hours of confirmation.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-400" /> 2. 7-Day Exchange & Return Policy
            </h2>
            <p>
              We provide a 7-day checked warranty on all mobile accessories. If you receive a damaged product, incorrect model case, or defective charger, notify our support team on WhatsApp (0300-1234567) within 7 days of receiving your parcel. We will arrange a free replacement item or full refund.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" /> 3. Privacy & Customer Protection
            </h2>
            <p>
              Your personal data (Name, Phone number, Delivery Address) is exclusively used to process your order delivery and send parcel status updates via SMS or WhatsApp. We never sell or distribute your private information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> 4. Pricing & Product Specifications
            </h2>
            <p>
              All product prices are quoted in Pakistani Rupees (PKR) inclusive of standard retail taxes. We reserve the right to adjust promo discounts or stock availability based on wholesale supply changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
