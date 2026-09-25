import React from 'react';
import { Phone, Calendar, Sparkles, Star, ChevronRight, Heart } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-polka-subtle">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-linen-50/70 via-transparent to-linen-100/90 dark:from-obsidian-pure/80 dark:to-obsidian pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge: Special New Client Offer */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blushGold/15 border border-blushGold/40 dark:bg-blushGold/20 dark:border-blushGold/50 text-blushGold-dark dark:text-blushGold font-medium text-xs sm:text-sm tracking-wide">
              <Sparkles className="w-4 h-4 text-blushGold animate-pulse" />
              <span>{BUSINESS_INFO.specialOffer.badge}</span>
              <span className="hidden sm:inline text-obsidian/40 dark:text-white/40">•</span>
              <span className="hidden sm:inline text-obsidian/80 dark:text-linen-100">Roseville, CA</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-obsidian dark:text-linen-50 leading-[1.12]">
              Luxury Gel-X, Structured Gel &amp; <span className="italic font-normal text-blushGold">Permanent Jewelry.</span>
            </h1>

            {/* Subhead / Bio Snippet */}
            <p className="text-base sm:text-lg text-obsidian/80 dark:text-linen-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Welcome to <span className="font-semibold text-obsidian dark:text-white">Nailz by Jenna</span>, an intimate 1-on-1 private salon suite led by licensed nail technician <span className="font-semibold text-obsidian dark:text-white">Jenna Soule</span>. Delivering flawless Apres Gel-X architecture, Luminary builder overlays, and custom micro-welded 14k gold chains in Roseville, CA.
            </p>

            {/* Key Service Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                '// 01 LUXURY GEL-X EXTENSIONS',
                '// 02 LUMINARY STRUCTURED GEL',
                '// 03 CUSTOM 3D ART & CHROME',
                '// 04 14K PERMANENT JEWELRY'
              ].map((tag, i) => (
                <span key={i} className="text-xs font-mono tracking-wider px-3 py-1.5 rounded-lg bg-linen-200/70 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border text-obsidian/70 dark:text-linen-300">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Primary Direct Acuity Link */}
              <a
                href={BUSINESS_INFO.acuityBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-semibold text-base tracking-wide shadow-xl hover:bg-obsidian/90 dark:hover:bg-blushGold-hover transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-5 h-5 text-blushGold dark:text-obsidian group-hover:scale-110 transition-transform" />
                <span>Book Appointment Online</span>
                <span className="text-xs opacity-75 font-mono">↗</span>
              </a>

              {/* Secondary Interactive Quote & Consult Modal */}
              <button
                onClick={() => onOpenWizard()}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-linen-200/80 dark:bg-obsidian-card border-2 border-linen-300 dark:border-obsidian-border text-obsidian dark:text-white font-medium text-base hover:bg-linen-300/80 dark:hover:bg-obsidian-cardHover transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Interactive Price Estimator</span>
                <ChevronRight className="w-4 h-4 text-blushGold" />
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-obsidian/70 dark:text-linen-300">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" filled={true} />
                  ))}
                </div>
                <span className="font-semibold text-obsidian dark:text-white">5.0 Star Rating</span>
              </div>
              <span className="text-linen-400 dark:text-obsidian-border">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Private 1-on-1 Suite</span>
              </div>
              <span className="text-linen-400 dark:text-obsidian-border">•</span>
              <span>4+ Years Experience</span>
            </div>

          </div>

          {/* Right Column: Visual Composition with Jenna's Portrait & Seals */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Architectural Card */}
              <div className="card-thick overflow-hidden bg-linen-50 dark:bg-obsidian-card p-4 relative group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-linen-200 dark:bg-obsidian-subtle">
                  <img
                    src={imageManifest.hero.poster}
                    alt={imageManifest.hero.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                  
                  {/* Floating Jenna Soule Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-linen-50/90 dark:bg-obsidian/90 border border-white/20 dark:border-white/10 flex items-center gap-3">
                    <img
                      src={imageManifest.artist.portrait}
                      alt={imageManifest.artist.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blushGold"
                    />
                    <div>
                      <p className="font-serif font-bold text-obsidian dark:text-linen-50 text-sm">{BUSINESS_INFO.artist.name}</p>
                      <p className="text-xs text-blushGold-dark dark:text-blushGold font-medium">Licensed Nail Tech &amp; Jewelry Artist</p>
                    </div>
                  </div>
                </div>

                {/* Floating Heart Seal Badge */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full shadow-2xl p-1 bg-linen-50 dark:bg-obsidian-card border-2 border-blushGold/50 hidden sm:block animate-bounce duration-1000">
                  <img
                    src={imageManifest.logo.heartSeal}
                    alt="Nailz by Jenna Seal"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Quick Info Box underneath */}
              <div className="mt-4 p-4 rounded-2xl bg-linen-200/90 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="text-obsidian/60 dark:text-linen-400 font-mono">// STUDIO LOCATION</p>
                  <p className="font-semibold text-obsidian dark:text-white">{BUSINESS_INFO.address.street}</p>
                </div>
                <a
                  href={"tel:" + BUSINESS_INFO.phoneRaw}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian dark:bg-linen-100 text-white dark:text-obsidian font-medium hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}