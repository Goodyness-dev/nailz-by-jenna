import React from 'react';
import { ChevronRight, Calendar } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ServicesSection({ onNavigateTreatments }) {
  const stacks = [
    {
      index: '01',
      category: 'GEL-X EXTENSIONS',
      title: 'Sculpted Length. Zero Natural Nail Damage.',
      description: 'Authentic Aprés Gel-X soft gel extensions tailored to your apex. Lightweight, natural feel, and durable 4–5 week retention.',
      specs: 'Almond, Coffin, Stiletto, Square • From $75',
      image: '/images/gel-x-extensions.jpg',
      alt: 'Luxury Gel-X extensions set by Jenna',
      linkCategory: 'Gel-X Extensions'
    },
    {
      index: '02',
      category: 'STRUCTURED GEL',
      title: 'Luminary Multi-Flex. True Natural Nail Health.',
      description: 'Strengthens, protects, and grows your natural nails with a crystal-clear reinforced apex. Eliminates chipping and brittle breaks.',
      specs: 'Builder Overlay & Refill • From $65',
      image: '/images/polaroid-set-2.jpg',
      alt: 'Structured gel Luminary manicure by Jenna',
      linkCategory: 'Structured Gel'
    },
    {
      index: '03',
      category: 'PERMANENT JEWELRY BAR',
      title: 'Claspless 14k Gold & Sterling Silver Chains.',
      description: 'Custom-fitted delicate chains micro-welded seamlessly onto your wrist, ankle, or neck. Waterproof, hypoallergenic, and tarnish-free.',
      specs: 'Single Chains & 3-Stacks • From $65',
      image: '/images/permanent-jewelry.jpg',
      alt: 'Permanent jewelry welding on wrist by Jenna',
      linkCategory: 'Permanent Jewelry'
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-linen-100 dark:bg-obsidian-card relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase mb-2">
              // CORE SPECIALTIES
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-obsidian dark:text-linen-50">
              The signature <span className="italic font-normal text-blushGold">edit.</span>
            </h2>
          </div>
          <button
            onClick={onNavigateTreatments}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-obsidian dark:text-linen-100 hover:text-blushGold transition-colors"
          >
            <span>View all 14 treatments &amp; art</span>
            <ChevronRight className="w-4 h-4 text-blushGold" />
          </button>
        </div>

        {/* STACKING CARDS CONTAINER */}
        <div className="space-y-8 md:space-y-12">
          {stacks.map((card, i) => (
            <div
              key={card.index}
              style={{
                top: `${100 + i * 24}px`,
                zIndex: i + 10
              }}
              className="sticky card-thick bg-white dark:bg-obsidian border-2 border-[#E7DFD5] dark:border-obsidian-border p-6 sm:p-10 shadow-xl rounded-3xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left: Content */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blushGold/15 text-blushGold-dark dark:text-blushGold">
                      {card.index} // {card.category}
                    </span>
                    <span className="text-xs font-mono text-obsidian/50 dark:text-linen-400">
                      {card.specs}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian dark:text-linen-50 leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-obsidian/75 dark:text-linen-300 font-light leading-relaxed">
                    {card.description}
                  </p>

                  <div className="pt-2 flex items-center gap-4">
                    <a
                      href={BUSINESS_INFO.acuityBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot ↗</span>
                    </a>
                    <button
                      onClick={onNavigateTreatments}
                      className="text-xs font-semibold text-blushGold-dark dark:text-blushGold hover:underline flex items-center gap-1"
                    >
                      <span>Explore details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Tactile Visual */}
                <div className="md:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-linen-200 dark:bg-obsidian-subtle border border-linen-300 dark:border-obsidian-border">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Bottom Link */}
        <div className="mt-16 text-center">
          <button
            onClick={onNavigateTreatments}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linen-200 dark:bg-obsidian border border-linen-300 dark:border-obsidian-border text-obsidian dark:text-linen-100 font-semibold text-sm hover:bg-linen-300/80 transition-colors"
          >
            <span>Open Full Treatment Directory (French Tips, Chrome, 3D Art &amp; Stacks)</span>
            <span className="font-mono text-xs text-blushGold">↗</span>
          </button>
        </div>

      </div>
    </section>
  );
}