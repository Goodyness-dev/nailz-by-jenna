import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';
import { Quote, ShieldCheck, Heart, Sparkles, Check } from '../common/Icons';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-linen-100 dark:bg-obsidian-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Jenna Soule Arch Portrait */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="card-thick bg-linen-50 dark:bg-obsidian p-4 max-w-md mx-auto relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-linen-200 dark:bg-obsidian-subtle">
                <img
                  src={imageManifest.artist.portrait}
                  alt={imageManifest.artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="font-script text-3xl text-blushGold drop-shadow">Jenna Soule</p>
                  <p className="text-xs uppercase tracking-widest text-white/90 font-mono">Licensed Nail Technician</p>
                </div>
              </div>

              {/* Heart Seal Accent */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full shadow-xl bg-linen-50 dark:bg-obsidian p-1 border-2 border-blushGold hidden sm:block">
                <img
                  src={imageManifest.logo.heartSeal}
                  alt="Heart Seal"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Pillars */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
              // 02 MEET YOUR NAIL TECH
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50 leading-tight">
              A space where you can relax &amp; leave with nails you\'re <span className="italic font-normal text-blushGold">truly obsessed with.</span>
            </h2>

            <blockquote className="relative p-6 rounded-2xl bg-linen-200/80 dark:bg-obsidian border-l-4 border-blushGold text-obsidian/85 dark:text-linen-200 text-base sm:text-lg font-serif italic">
              <Quote className="w-8 h-8 text-blushGold/30 absolute top-4 right-4" />
              "{BUSINESS_INFO.artist.quote}"
            </blockquote>

            <div className="space-y-4 text-sm sm:text-base text-obsidian/80 dark:text-linen-300 font-light leading-relaxed">
              <p>
                With over <span className="font-semibold text-obsidian dark:text-white">4+ years behind the nail desk</span>, Jenna Soule has elevated the traditional salon visit into an intimate, high-vibe private suite experience in Roseville, California.
              </p>
              <p>
                Jenna specializes in luxury Aprés Gel-X extensions, multi-flex structured builder gel (Luminary), high-fashion 3D sculpted art, chrome finishes, and custom-welded 14k gold permanent jewelry.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: '1-on-1 Private Suite', desc: 'No rushed assembly lines or salon fumes; dedicated private care.' },
                { title: 'Autoclave Sanitation', desc: 'Medical-grade sterilization for metallic bits; single-use files only.' },
                { title: 'Russian Dry Manicure', desc: 'Flawless cuticle prep for zero lifting and 4-5 week retention.' },
                { title: 'Permanent Jewelry Bar', desc: '14k gold filled & .925 sterling silver custom micro-welded on-site.' },
              ].map((pillar, i) => (
                <div key={i} className="p-4 rounded-2xl bg-linen-200/60 dark:bg-obsidian border border-linen-300 dark:border-obsidian-border flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blushGold/20 flex items-center justify-center flex-shrink-0 text-blushGold mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-obsidian dark:text-white">{pillar.title}</h4>
                    <p className="text-xs text-obsidian/70 dark:text-linen-400 font-light mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}