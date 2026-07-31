import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    q: 'Where do you deliver and how does Cash on Delivery (COD) work?',
    a: 'We deliver exclusively within DHA and Lahore. Simply add your items to cart, click Checkout, and enter your Lahore/DHA address. Our rider delivers the parcel to your doorstep where you pay cash directly upon delivery.',
  },
  {
    q: 'What are your delivery charges?',
    a: 'We charge a flat shipping fee of Rs. 200 on every order regardless of cart total. There is no free shipping tier.',
  },
  {
    q: 'How long will delivery take for my order in DHA or Lahore?',
    a: 'Orders placed before 4:00 PM are dispatched same-day or within 24 to 48 hours across all sectors of DHA and areas of Lahore.',
  },
  {
    q: 'What is your 7-Day Replacement & Warranty Policy?',
    a: 'If you receive a defective item or wrong cover model, simply message us on WhatsApp within 7 days. We will dispatch a replacement parcel right away without any hassle.',
  },
  {
    q: 'How can I make sure a mobile cover or screen protector fits my exact phone?',
    a: 'Each product listing clearly specifies the exact phone model (e.g. iPhone 15 Pro Max, Samsung S24 Ultra, Redmi Note 13 Pro). If you are unsure about your exact model name, send a quick screenshot or photo to our WhatsApp support team (0300-4257683) and we will check for you!',
  },
  {
    q: 'Are your fast chargers safe for my phone battery?',
    a: 'Yes! Our 65W GaN chargers and PD cables support intelligent power negotiation (Power Delivery 3.0 / QuickCharge 4.0 / SuperVOOC) which automatically matches your device battery safety standards to prevent overheating.',
  },
  {
    q: 'Can I order directly on WhatsApp without filling out website forms?',
    a: 'Absolutely! You can click the "Order via WhatsApp" button on any product page or send a message directly to 0300-4257683 with the item picture and your address.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Got Questions?
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about placing orders, shipping, and warranty at Mobile Accessories DHA.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:text-emerald-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-3">
          <h3 className="font-extrabold text-white text-base">Still have questions?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our customer service reps are active on WhatsApp from 10:00 AM to 10:00 PM every day.
          </p>
          <a
            href="https://wa.me/923004257683?text=Salam%20Mobile%20Accessories%20DHA,%20I%20have%20a%20question"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Support on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
