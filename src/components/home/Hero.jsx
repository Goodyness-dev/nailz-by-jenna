import React from 'react';
import { Calendar, ChevronRight, Star, Sparkles } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenOrder, onNavigateTreatments }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-obsidian-pure text-linen-50">
      
      {/* Background Image with warm cinematic overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/images/hero-backdrop.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-pure via-obsidian/60 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-pure/80 via-transparent to-obsidian-pure/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        
        {/* Subtle Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-linen-100 text-xs tracking-widest font-mono uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blushGold" />
          <span>JENNA SOULE // ROSEVILLE, CA</span>
          <span className="opacity-40">•</span>
          <span className="text-blushGold">1-ON-1 PRIVATE SUITE</span>
        </div>

        {/* Minimalist Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
          Effortless sets.<br />
          <span className="italic font-normal text-blushGold">Detailed art.</span>
        </h1>

        {/* Concise 1-Line Subhead */}
        <p className="text-base sm:text-xl text-linen-200/90 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Luxury Gel-X extensions, Luminary structured manicures, and custom-welded 14k gold permanent jewelry crafted with precision.
        </p>

        {/* Action CTAs: Direct Custom Order trigger (No Acuity Redirect) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenOrder()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blushGold text-obsidian font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-blushGold-hover transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-obsidian group-hover:scale-110 transition-transform" />
            <span>Order Custom Set Now</span>
            <span className="font-mono text-xs opacity-75">✦</span>
          </button>

          <button
            onClick={onNavigateTreatments}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Treatment Menu</span>
            <ChevronRight className="w-4 h-4 text-blushGold" />
          </button>
        </div>

        {/* Bottom Minimalist Trust Line */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-linen-300/80 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-sans text-sm">★★★★★</span>
            <span className="text-white font-bold">5.0 RATING</span>
          </div>
          <span className="opacity-30">•</span>
          <span>4+ YEARS EXPERIENCE</span>
          <span className="opacity-30">•</span>
          <span className="text-blushGold font-semibold">$15 OFF NEW CLIENTS</span>
        </div>

      </div>

      {/* Gentle Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[11px] font-mono tracking-widest uppercase flex flex-col items-center gap-1 animate-pulse">
        <span>SCROLL</span>
        <span className="text-xs">↓</span>
      </div>

    </section>
  );
}
