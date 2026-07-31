import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addContactMessage, showToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Please fill out name, phone number, and message', 'error');
      return;
    }

    addContactMessage({
      name,
      phone,
      email,
      subject,
      message,
    });

    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    showToast('Your message has been received! We will call/WhatsApp you shortly.', 'success');
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Salam Jadugar Accessories!\nName: ${name || 'Customer'}\nSubject: ${subject}\nMessage: ${message}`
    );
    window.open(`https://wa.me/923260606619?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dark Header Background with Upward Arch */}
      <div className="relative bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 pt-28 pb-56 sm:pb-72 lg:pb-80 overflow-hidden">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-500/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-brand-600/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-100 tracking-tight leading-tight">
            Contact <span className="heading-gradient-light">Mobile Accessories DHA</span>
          </h1>

          <p className="mt-5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have a question about phone model compatibility, delivery status, or bulk wholesale inquiries? We are here to help!
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

      {/* Grid Container — Overlapping the arch boundary */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-48 sm:-mt-56 lg:-mt-72 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Side - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 space-y-6 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-4">Store Contact Details</h3>

              <div className="space-y-6 text-sm">
                <a
                  href="https://wa.me/923260606619?text=Salam%20Jadugar%20Accessories,%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 group block p-2 -ml-2 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">WhatsApp Official Support</h4>
                    <p className="text-slate-500 font-medium">0300-1234567 (Click to chat)</p>
                  </div>
                </a>

                <a
                  href="tel:+923260606619"
                  className="flex items-start gap-4 group block p-2 -ml-2 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Direct Phone Call</h4>
                    <p className="text-slate-500 font-medium">+92 300 1234567 (Click to call)</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-2 -ml-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Inquiries</h4>
                    <p className="text-slate-500 font-medium">sales@jadugaraccessories.pk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-2 -ml-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Main Outlets</h4>
                    <p className="text-slate-500 font-medium">Shop #14, Mobile Market, Hall Road, Lahore</p>
                    <p className="text-slate-500 font-medium">Saddar Mobile Market, Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Representation Box */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 text-center shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
              <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-500">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 mx-auto text-emerald-500 animate-bounce" />
                  <p className="text-sm font-bold text-slate-900">Hall Road Mobile Market, Lahore</p>
                  <p className="text-xs text-slate-500 font-medium">Central Dispatch Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side - 7 Columns */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-8 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-extrabold text-slate-900 text-2xl border-b border-slate-100 pb-4">Send Us a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="usman@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  >
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Compatibility">Product Compatibility</option>
                    <option value="Bulk Wholesale Order">Bulk Wholesale Order</option>
                    <option value="Warranty Claim">Warranty Claim / Return</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what accessory or phone model you need help with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
