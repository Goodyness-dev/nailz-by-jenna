import React, { useState } from 'react';
import { SERVICES } from '../../data/servicesData';
import { ArrowLeft, Search, Calendar, ChevronRight, Sparkles } from '../common/Icons';

export default function AllServicesPage({ onOpenOrder, onBackToHome }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Gel-X Extensions', 'Structured Gel', 'Custom Nail Art', 'Permanent Jewelry', 'Removals & Care'];

  const filtered = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Breadcrumb */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-medium text-blushGold-dark dark:text-blushGold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Studio Overview</span>
        </button>

        <button
          onClick={() => onOpenOrder()}
          className="px-5 py-2.5 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Custom Order Builder ↗</span>
        </button>
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-mono text-blushGold-dark dark:text-blushGold uppercase tracking-widest">// FULL TREATMENT DIRECTORY</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-obsidian dark:text-linen-50 mt-2 mb-4">
          All Services &amp; <span className="italic font-normal text-blushGold">Pricing.</span>
        </h1>
        <p className="text-base text-obsidian/75 dark:text-linen-300 font-light">
          Complete transparent catalog of Jenna Soule's nail procedures, custom art options, and permanent jewelry welding in Roseville, CA. Direct ordering with zero external redirects.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-obsidian/40 dark:text-linen-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search treatments (e.g. Gel-X, Chrome, 14k gold)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-bold'
                  : 'bg-linen-200 dark:bg-obsidian-card text-obsidian/80 dark:text-linen-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => (
          <div key={s.id} className="card-thick bg-linen-100/90 dark:bg-obsidian-card p-6 flex flex-col justify-between rounded-3xl border-2 border-linen-200 dark:border-obsidian-border shadow-md">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-[11px] font-mono font-bold text-blushGold-dark dark:text-blushGold uppercase">{s.subType}</span>
                <span className="font-serif text-xl font-bold text-obsidian dark:text-linen-50">{s.price}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-obsidian dark:text-linen-50 mb-2">{s.title}</h3>
              <p className="text-xs text-obsidian/75 dark:text-linen-300 font-light leading-relaxed mb-4">{s.description}</p>
            </div>
            <div className="pt-4 border-t border-linen-300/80 dark:border-obsidian-border flex items-center gap-2">
              <button
                onClick={() => onOpenOrder(s.category, s.title)}
                className="w-full py-2.5 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Order / Reserve Set ↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
