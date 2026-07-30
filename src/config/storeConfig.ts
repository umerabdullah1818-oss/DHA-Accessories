// Store configuration for Jadugar Accessories
// Update your contact numbers, WhatsApp, address, and delivery settings here.

export const STORE_CONFIG = {
  storeName: 'Jadugar Accessories',
  // WhatsApp raw number without leading '+' or spaces (e.g., 923260606619)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '923260606619',
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || '0300-1234567',
  
  // Phone call number for tel: links
  phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '+923260606619',
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY || '+92 300 1234567',
  
  // Contact & Location
  email: 'sales@jadugaraccessories.pk',
  address: 'Shop #14, Mobile Market, Hall Road, Lahore, Pakistan',
  cityCoverage: 'Lahore & DHA',
  shippingFee: 200,

  // Helper function to build WhatsApp click URLs with custom pre-filled message
  getWhatsAppUrl: (message: string = 'Salam Jadugar Accessories, I have an inquiry') => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '923260606619';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  },

  // Helper function for phone call link
  getTelUrl: () => {
    const number = import.meta.env.VITE_PHONE_NUMBER || '+923260606619';
    return `tel:${number}`;
  }
};
