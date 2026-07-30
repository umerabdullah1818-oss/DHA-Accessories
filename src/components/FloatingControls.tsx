import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsAppBubble, setShowWhatsAppBubble] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Salam Jadugar Accessories! I have a question about mobile accessories or Cash on Delivery.'
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none items-end">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-11 h-11 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-xl flex items-center justify-center border border-slate-700 transition-all hover:scale-110"
            title="Back to top"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Widget - only show after scrolling */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto relative flex flex-row-reverse items-center gap-2"
          >
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_rgba(34,197,94,0.4)] border-4 border-white transition-transform hover:scale-110 group"
              title="Chat on WhatsApp"
              id="floating-whatsapp-btn"
            >
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-300 rounded-full border-2 border-slate-950 animate-ping" />
              <MessageCircle className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform" />
            </button>

            {/* Call Now Button */}
            <a
              href="tel:+923001234567"
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-110"
              title="Call Now (0300-1234567)"
              id="floating-call-btn"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Pop-up Greeting Bubble */}
            <AnimatePresence>
              {showWhatsAppBubble && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden sm:flex items-center gap-2 bg-slate-900/95 border border-emerald-500/40 text-white text-xs px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs mr-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span>Order or inquiry on WhatsApp!</span>
                  <button
                    onClick={() => setShowWhatsAppBubble(false)}
                    className="text-slate-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
