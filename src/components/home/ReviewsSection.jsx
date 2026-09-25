import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { Star, Quote, CheckCircle2 } from '../common/Icons';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-linen-50 dark:bg-obsidian relative bg-polka-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
            // 05 CLIENT TESTIMONIALS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50">
            Loved by Roseville\'s <span className="italic font-normal text-blushGold">Nail Lovers.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" filled={true} />
              ))}
            </div>
            <span className="font-bold text-obsidian dark:text-white text-base">5.0 Star Verified Rating</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {BUSINESS_INFO.reviews.map((review, i) => (
            <div
              key={i}
              className="card-thick card-thick-hover bg-linen-100/90 dark:bg-obsidian-card p-8 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-blushGold/20 absolute top-6 right-6 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(review.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4" filled={true} />
                  ))}
                </div>

                <p className="text-base text-obsidian/85 dark:text-linen-200 font-serif italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-linen-300/80 dark:border-obsidian-border text-xs">
                <div>
                  <p className="font-bold text-sm text-obsidian dark:text-linen-50">{review.author}</p>
                  <p className="text-obsidian/50 dark:text-linen-400 font-mono">{review.location}</p>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{review.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}