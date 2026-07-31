// Store configuration for Mobile Accessories DHA
// Update your contact numbers, WhatsApp, address, and delivery settings here.

export const STORE_CONFIG = {
  storeName: 'Mobile Accessories DHA',
  // WhatsApp raw number without leading '+' or spaces (e.g., 923004257683)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '923004257683',
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || '0300-4257683',
  
  // Phone call number for tel: links
  phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '+923004257683',
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '+92 300 4257683',
  
  // Contact & Location
  email: 'sales@jadugaraccessories.pk',
  address: 'Shop #14, Mobile Market, Hall Road, Lahore, Pakistan',
  cityCoverage: 'Lahore & DHA',
  shippingFee: 200,

  // Helper function to build WhatsApp click URLs with custom pre-filled message
  getWhatsAppUrl: (message: string = 'Salam Mobile Accessories DHA, I have an inquiry') => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '923004257683';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  },

  // Helper function for phone call link
  getTelUrl: () => {
    const number = import.meta.env.VITE_PHONE_NUMBER || '+923004257683';
    return `tel:${number}`;
  }
};
