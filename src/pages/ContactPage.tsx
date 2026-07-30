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
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Contact Jadugar Accessories
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Have a question about phone model compatibility, delivery status, or bulk wholesale inquiries? We are here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Side - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <h3 className="font-extrabold text-white text-base">Store Contact Details</h3>

              <div className="space-y-4 text-xs">
                <a
                  href="https://wa.me/923001234567?text=Salam%20Jadugar%20Accessories,%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 group block"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp Official Support</h4>
                    <p className="text-slate-400">0300-1234567 (Click to open chat)</p>
                  </div>
                </a>

                <a
                  href="tel:+923001234567"
                  className="flex items-start gap-3 group block"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Direct Phone Call</h4>
                    <p className="text-slate-400">+92 300 1234567 (Click to call dialer)</p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email Inquiries</h4>
                    <p className="text-slate-400">sales@jadugaraccessories.pk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Main Outlets</h4>
                    <p className="text-slate-400">Shop #14, Mobile Market, Hall Road, Lahore</p>
                    <p className="text-slate-400">Saddar Mobile Market, Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Representation Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-center space-y-3">
              <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500">
                <div className="space-y-1">
                  <MapPin className="w-8 h-8 mx-auto text-emerald-400 animate-bounce" />
                  <p className="text-xs font-bold text-white">Hall Road Mobile Market, Lahore</p>
                  <p className="text-[10px] text-slate-400">Central Dispatch Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side - 7 Columns */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-extrabold text-white text-lg">Send Us a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Phone / WhatsApp <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="usman@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Compatibility">Product Compatibility</option>
                    <option value="Bulk Wholesale Order">Bulk Wholesale Order</option>
                    <option value="Warranty Claim">Warranty Claim / Return</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Message Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what accessory or phone model you need help with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Send className="w-4 h-4" />
                  Send Web Message
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
