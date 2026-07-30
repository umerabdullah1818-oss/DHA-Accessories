import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border-b border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Real Pakistani Shopper Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <Quote className="w-12 h-12 text-emerald-500/20 absolute top-6 right-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium italic">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <h4 className="font-extrabold text-white text-sm">{review.userName}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>📍 {review.city}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  </p>
                </div>

                <span className="text-xs text-slate-500 font-mono">{review.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <button
              onClick={handlePrev}
              className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
