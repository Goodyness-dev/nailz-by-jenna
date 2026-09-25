import React from 'react';
import { imageManifest } from '../../data/imageManifest';
import { Instagram } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ClientCamGallery() {
  return (
    <section id="gallery" className="py-20 md:py-24 bg-linen-100 dark:bg-obsidian-card relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase mb-1">
              // CLIENT CAM
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50">
              Fresh Off <span className="italic font-normal text-blushGold">The Desk.</span>
            </h2>
          </div>
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-pink-600 dark:text-pink-400 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>@nailz.byjenna ↗</span>
          </a>
        </div>

        {/* 3 Polaroid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {imageManifest.clientCam.map((item, index) => (
            <div
              key={index}
              className="card-thick bg-white dark:bg-obsidian p-3 pb-5 rounded-2xl shadow-md hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-linen-200 dark:bg-obsidian-subtle mb-3">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-serif text-xs font-bold text-obsidian dark:text-linen-100 text-center">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}