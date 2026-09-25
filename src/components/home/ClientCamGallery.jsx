import React from 'react';
import { imageManifest } from '../../data/imageManifest';
import { Instagram, Heart } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ClientCamGallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-linen-50 dark:bg-obsidian relative bg-polka-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
            // 03 CLIENT CAM &amp; REAL SETS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50">
            Fresh Off <span className="italic font-normal text-blushGold">The Nail Desk.</span>
          </h2>
          <p className="text-base text-obsidian/70 dark:text-linen-300 font-light">
            Real client snapshots direct from Jenna Soule\'s salon suite camera roll. No filters, no stock models—just immaculate nail architecture.
          </p>
        </div>

        {/* Polaroid Style Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {imageManifest.clientCam.map((item, index) => (
            <div
              key={index}
              className={`card-thick card-thick-hover bg-white dark:bg-obsidian-card p-4 pb-6 transform transition-all duration-300 ${
                index === 0 ? 'md:-rotate-2' : index === 1 ? 'md:rotate-0 md:-translate-y-3' : 'md:rotate-2'
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-linen-200 dark:bg-obsidian-subtle mb-4">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-center px-2">
                <p className="font-serif text-sm font-semibold text-obsidian dark:text-linen-100">
                  {item.caption}
                </p>
                <p className="text-[11px] font-mono text-blushGold-dark dark:text-blushGold mt-1">
                  @nailz.byjenna // Roseville, CA
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Banner */}
        <div className="mt-14 text-center">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-linen-200 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border text-obsidian dark:text-white hover:bg-linen-300 transition-colors text-sm font-medium"
          >
            <Instagram className="w-5 h-5 text-pink-500" />
            <span>Follow Jenna on Instagram: <strong className="text-blushGold">{BUSINESS_INFO.instagram}</strong></span>
            <span className="font-mono text-xs">↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}