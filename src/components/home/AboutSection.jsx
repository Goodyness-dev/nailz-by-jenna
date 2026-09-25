import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';
import { Quote } from '../common/Icons';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-linen-50 dark:bg-obsidian relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Portrait with Heart Seal */}
          <div className="md:col-span-5 relative">
            <div className="card-thick bg-white dark:bg-obsidian-card p-3 max-w-sm mx-auto relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-linen-200">
                <img
                  src={imageManifest.artist.portrait}
                  alt={imageManifest.artist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full shadow-lg bg-white dark:bg-obsidian p-1 border border-blushGold">
                <img
                  src={imageManifest.logo.heartSeal}
                  alt="Seal"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Concise Bio */}
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
              // MEET JENNA SOULE
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50 leading-snug">
              Good vibes. Relaxed atmosphere.<br />
              <span className="italic font-normal text-blushGold">Nails you\'re obsessed with.</span>
            </h2>

            <blockquote className="p-4 rounded-xl bg-linen-200/60 dark:bg-obsidian-card border-l-2 border-blushGold text-obsidian/85 dark:text-linen-200 text-sm font-serif italic">
              "{BUSINESS_INFO.artist.quote}"
            </blockquote>

            <p className="text-sm text-obsidian/75 dark:text-linen-300 font-light leading-relaxed">
              With 4+ years behind the nail desk, licensed technician Jenna Soule created a peaceful private suite in Roseville dedicated to hospital-grade sanitation, meticulous Russian cuticle prep, and custom nail art that lasts 4+ weeks.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-obsidian/60 dark:text-linen-400">
              <span>// 1-ON-1 SUITE</span>
              <span>•</span>
              <span>AUTOCLAVE STERILIZED</span>
              <span>•</span>
              <span>CERTIFIED GEL-X</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}