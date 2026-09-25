import React from 'react';
import { Phone, Instagram, Heart, Calendar } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Footer({ onNavigateTreatments }) {
  return (
    <footer className="bg-linen-100 dark:bg-obsidian-pure border-t border-linen-300/80 dark:border-obsidian-border py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={imageManifest.logo.heartSeal}
            alt="Nailz by Jenna"
            className="w-9 h-9 rounded-full border border-blushGold object-cover"
          />
          <div>
            <span className="font-serif text-lg font-bold text-obsidian dark:text-linen-50">Nailz by Jenna</span>
            <span className="block text-[10px] font-mono text-blushGold uppercase">Roseville, CA</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-mono text-obsidian/70 dark:text-linen-300">
          <button onClick={onNavigateTreatments} className="hover:text-blushGold transition-colors">
            TREATMENTS
          </button>
          <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blushGold transition-colors">
            INSTAGRAM
          </a>
          <a href={"tel:" + BUSINESS_INFO.phoneRaw} className="hover:text-blushGold transition-colors">
            (916) 850-9262
          </a>
          <a href="#/admin" className="opacity-50 hover:opacity-100">
            ADMIN
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] font-mono text-obsidian/50 dark:text-linen-500">
          © {new Date().getFullYear()} Nailz by Jenna LLC
        </p>

      </div>
    </footer>
  );
}