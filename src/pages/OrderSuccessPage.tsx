import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  MessageCircle,
  Truck,
  ArrowRight,
  Phone,
  Home,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, setActivePage, formatPrice } = useStore();

  if (!currentOrder) {
    return (
      <div className="min-h-[60vh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white mb-2">No Active Order Confirmation</h2>
        <button
          onClick={() => setActivePage('home')}
          className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  const handleSendWhatsAppConfirmation = () => {
    const itemsList = currentOrder.items
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) - ${formatPrice(i.product.price * i.quantity)}`)
      .join('\n');

    const text = encodeURIComponent(
      `*Order Confirmation - Jadugar Accessories*\n` +
        `Order ID: *${currentOrder.id}*\n` +
        `Customer: *${currentOrder.customerName}*\n` +
        `Phone: ${currentOrder.phone}\n` +
        `City: *${currentOrder.city}*\n` +
        `Address: ${currentOrder.address}\n\n` +
        `*Items Ordered:*\n${itemsList}\n\n` +
        `*Total Amount: ${formatPrice(currentOrder.totalAmount)} (COD)*\n\n` +
        `Please dispatch my parcel as soon as possible.`
    );

    window.open(`https://wa.me/923260606619?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6"
        >
          {/* Animated Green Badge */}
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Order Confirmed & Received!
            </span>
            <h1 className="text-3xl font-black text-white mt-1">Shukriya for Shopping!</h1>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              Your order <span className="font-mono text-white font-bold">{currentOrder.id}</span> has been logged. Our team will verify via call/WhatsApp before dispatching.
            </p>
          </div>

          {/* Quick Action: Send to WhatsApp */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl text-left space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <MessageCircle className="w-5 h-5" />
              <span>Speed up your dispatch via WhatsApp!</span>
            </div>
            <p className="text-xs text-slate-300">
              Click below to send your order details directly to our WhatsApp support team (0300-1234567).
            </p>
            <button
              onClick={handleSendWhatsAppConfirmation}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              Send Order Details to WhatsApp Now
            </button>
          </div>

          {/* Order Receipt Details */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Order ID:</span>
              <span className="font-mono font-bold text-white">{currentOrder.id}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Customer Name:</span>
              <span className="font-bold text-white">{currentOrder.customerName}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Delivery Address:</span>
              <span className="font-bold text-white max-w-xs text-right">{currentOrder.address}, {currentOrder.city}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Payment Method:</span>
              <span className="font-bold text-emerald-400 uppercase">Cash on Delivery</span>
            </div>

            <div className="pt-2">
              <p className="font-bold text-slate-300 mb-2">Items Ordered:</p>
              <div className="space-y-1.5">
                {currentOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-slate-400">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span className="text-white font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-800 text-sm font-black text-white">
              <span>Total Payable on Delivery:</span>
              <span className="text-emerald-400">{formatPrice(currentOrder.totalAmount)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActivePage('shop')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('home')}
              className="bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-xs"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
