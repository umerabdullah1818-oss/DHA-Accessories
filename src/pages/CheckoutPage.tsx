import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  Building2,
  Phone,
  MapPin,
  User,
} from 'lucide-react';

const PAKISTAN_CITIES = [
  'Lahore - DHA (Phases 1-9)',
  'Lahore - Gulberg / Model Town',
  'Lahore - Johar Town / Wapda Town',
  'Lahore - Cantt / Askari',
  'Lahore - Mall Road / Hall Road',
  'Lahore - Iqbal Town / Samanabad',
  'Lahore - Other Area',
];

export const CheckoutPage: React.FC = () => {
  const { cart, createOrder, setActivePage, formatPrice, showToast } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore - DHA (Phases 1-9)');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal === 0 ? 0 : 200;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      showToast('Please complete all required customer information', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    try {
      const orderPayload: any = {
        customerName,
        phoneNumber: phone,
        whatsappNumber: sameWhatsapp ? phone : whatsapp || phone,
        address,
        city,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        subtotal,
        discount: 0,
        shippingFee,
        total: grandTotal,
        paymentMethod,
      };
      
      if (orderNotes.trim()) {
        orderPayload.notes = orderNotes.trim();
      }

      const newOrder = await createOrder(orderPayload);

      // Construct WhatsApp Message
      const orderDetails = `*New Order - Jadugar Accessories*
      
*Customer:* ${customerName}
*Phone:* ${phone}
*Address:* ${address}, ${city}
${orderNotes ? `*Notes:* ${orderNotes}\n` : ''}
*Items:*
${cart.map(item => `- ${item.quantity}x ${item.product.name} (Rs. ${item.product.price})`).join('\n')}

*Subtotal:* Rs. ${subtotal}
*Shipping:* Rs. ${shippingFee}
*Total Amount:* Rs. ${grandTotal}
*Payment Method:* Cash on Delivery`;

      const whatsappUrl = `https://wa.me/923260606619?text=${encodeURIComponent(orderDetails)}`;
      
      showToast(`Order #${newOrder.id} placed successfully! Redirecting to WhatsApp...`, 'success');
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Navigate to success page
      setActivePage('order_success', { order: newOrder });
    } catch (err: any) {
      showToast(err?.message || 'Failed to place order', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white mb-2">No items to checkout</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Fast Checkout
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Order & Delivery Information</h1>
          <p className="text-xs text-slate-400 mt-1">
            Cash on Delivery available exclusively in Lahore & DHA. Flat shipping fee of Rs. 200.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer Details Form - 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                Customer & Shipping Address
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mobile Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* WhatsApp checkbox */}
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={sameWhatsapp}
                  onChange={(e) => setSameWhatsapp(e.target.checked)}
                  className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <span>WhatsApp number is same as mobile phone</span>
              </label>

              {!sameWhatsapp && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500"
                  />
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Complete Delivery Address (House/Shop #, Street, Area){' '}
                  <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. House #45, Street 3, Main Market Gulberg III, Lahore"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Special Instructions / Nearest Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliver near Allied Bank branch, call before coming"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-extrabold text-white text-base">Select Payment Method</h3>

              <div className="grid grid-cols-1 gap-4">
                <label
                  className="p-4 rounded-2xl border transition-all flex items-start gap-3 bg-emerald-500/10 border-emerald-500 text-white cursor-default"
                >
                  <input
                    type="radio"
                    name="pm"
                    checked={true}
                    readOnly
                    className="mt-1 text-emerald-500"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Cash on Delivery (COD)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Pay in cash when rider delivers parcel to your door.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Column - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-extrabold text-white text-base">Your Order Items</h3>

              <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto pr-1 space-y-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded-lg border border-slate-800 bg-slate-950"
                      />
                      <div>
                        <p className="font-semibold text-white truncate max-w-[160px]">
                          {item.product.name}
                        </p>
                        <p className="text-slate-400 text-[10px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-emerald-400">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-400">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black py-4 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Confirm & Send Order via WhatsApp (COD)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
