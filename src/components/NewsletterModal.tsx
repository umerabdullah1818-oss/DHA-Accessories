import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Coupon code DHA10 unlocked.', 'success');
  };

  return (
    <section className="py-14 bg-slate-900 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Subscribe for Exclusive VIP Accessories Deals
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-lg mx-auto">
          Get secret discount promo codes, new gadget arrivals, and flash sale alerts straight to your inbox.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Thank you! Use promo code <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-xs ml-1 font-extrabold">DHA10</span> for 10% off at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
