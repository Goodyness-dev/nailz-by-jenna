import React, { useState } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { Calendar, Sparkles, ChevronRight } from '../common/Icons';

export default function ServicesSection({ onOpenWizard }) {
  const categories = [
    'All Treatments',
    'Gel-X Extensions',
    'Structured Gel',
    'Custom Nail Art',
    'Permanent Jewelry',
    'Removals & Care'
  ];

  const [activeCategory, setActiveCategory] = useState('All Treatments');

  const filteredServices = activeCategory === 'All Treatments'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-28 bg-linen-50 dark:bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
            // 01 THE SERVICE CATALOG
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50">
            Artistry &amp; Precision for <span className="italic font-normal text-blushGold">Every Nail.</span>
          </h2>
          <p className="text-base text-obsidian/70 dark:text-linen-300 font-sans font-light">
            Every appointment begins with meticulous Russian e-file cuticle care and ends with long-lasting, picture-perfect results. Tiered pricing tailored to your custom style.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-obsidian dark:bg-blushGold text-white dark:text-obsidian border-obsidian dark:border-blushGold shadow-md'
                  : 'bg-linen-200/80 dark:bg-obsidian-card text-obsidian/70 dark:text-linen-300 border-linen-300 dark:border-obsidian-border hover:bg-linen-300/80 dark:hover:bg-obsidian-cardHover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-thick card-thick-hover bg-linen-100/90 dark:bg-obsidian-card p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge: Category & Price */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-linen-200 dark:bg-obsidian-subtle text-obsidian/60 dark:text-linen-400">
                    {service.subType}
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-obsidian dark:text-linen-50">
                      {service.price}
                    </span>
                    <span className="block text-[11px] text-obsidian/50 dark:text-linen-400 font-mono">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-xl font-bold text-obsidian dark:text-linen-50 mb-3 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-obsidian/75 dark:text-linen-300/90 leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>

              {/* Tags & Action Button */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-blushGold/10 dark:bg-blushGold/15 text-blushGold-dark dark:text-blushGold font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-linen-300/80 dark:border-obsidian-border">
                  <a
                    href={BUSINESS_INFO.acuityBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs sm:text-sm font-semibold text-center hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <span>Book on Acuity</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                  <button
                    onClick={() => onOpenWizard(service.category, service.title)}
                    className="py-3 px-4 rounded-xl bg-linen-200 dark:bg-obsidian-subtle text-obsidian dark:text-linen-100 text-xs sm:text-sm font-medium hover:bg-linen-300 dark:hover:bg-obsidian-border transition-colors"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acuity Direct Full Menu Banner */}
        <div className="mt-14 card-thick bg-gradient-to-r from-linen-200 via-linen-100 to-linen-200 dark:from-obsidian-card dark:via-obsidian-cardHover dark:to-obsidian-card p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-obsidian dark:text-linen-50">
              Ready to create your dream set?
            </h3>
            <p className="text-sm md:text-base text-obsidian/75 dark:text-linen-300 font-light max-w-xl">
              Select your favorite service, choose your add-on art or jewelry stack, and view real-time live availability on Jenna Soule\'s Acuity calendar.
            </p>
          </div>
          <a
            href={BUSINESS_INFO.acuityBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-semibold tracking-wide shadow-xl hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-5 h-5 text-blushGold dark:text-obsidian" />
            <span>Open Acuity Scheduler</span>
          </a>
        </div>

      </div>
    </section>
  );
}