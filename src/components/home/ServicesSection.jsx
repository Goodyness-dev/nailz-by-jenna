import React from 'react';
import { ChevronRight, Calendar, Sparkles } from '../common/Icons';

export default function ServicesSection({ onNavigateTreatments, onOpenOrder }) {
  const stacks = [
    {
      index: '01',
      category: 'GEL-X EXTENSIONS',
      disciplineId: 'gel_x',
      title: 'Sculpted Length. Zero Natural Nail Damage.',
      description: 'Authentic Aprés Gel-X soft gel extensions tailored to your apex. Lightweight, natural feel, and durable 4–5 week retention.',
      specs: 'Almond, Coffin, Stiletto, Square • From $85',
      image: '/images/gel-x-extensions.jpg',
      alt: 'Luxury Gel-X extensions set by Jenna'
    },
    {
      index: '02',
      category: 'STRUCTURED GEL',
      disciplineId: 'structured_gel',
      title: 'Luminary Multi-Flex. True Natural Nail Health.',
      description: 'Strengthens, protects, and grows your natural nails with a crystal-clear reinforced apex. Eliminates chipping and brittle breaks.',
      specs: 'Builder Overlay & Refill • From $65',
      image: '/images/polaroid-set-2.jpg',
      alt: 'Structured gel Luminary manicure by Jenna'
    },
    {
      index: '03',
      category: 'PERMANENT JEWELRY BAR',
      disciplineId: 'permanent_jewelry',
      title: 'Claspless 14k Gold & Sterling Silver Chains.',
      description: 'Custom-fitted delicate chains micro-welded seamlessly onto your wrist, ankle, or neck. Waterproof, hypoallergenic, and tarnish-free.',
      specs: 'Single Chains & 3-Stacks • From $65',
      image: '/images/permanent-jewelry.jpg',
      alt: 'Permanent jewelry welding on wrist by Jenna'
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
                    <button
                      onClick={() => onOpenOrder(card.disciplineId)}
                      className="px-5 py-2.5 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blushGold dark:text-obsidian" />
                      <span>Order This Set ↗</span>
                    </button>
                    <button
                      onClick={onNavigateTreatments}
                      className="text-xs font-semibold text-obsidian/70 dark:text-linen-300 hover:text-blushGold transition-colors"
                    >
                      Learn more
                    </button>
                  </div>
                </div>

                {/* Right: Tactile Image Card */}
                <div className="md:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-linen-300 dark:border-obsidian-border group aspect-[4/3]">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
