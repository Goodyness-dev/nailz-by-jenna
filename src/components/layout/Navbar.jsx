import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Sun, Moon, Sparkles } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Navbar({ 
  darkMode, 
  onToggleDarkMode, 
  onNavigateHome, 
  onNavigateTreatments,
  onNavigateOrder 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linen-50/90 dark:bg-obsidian/90 backdrop-blur-md border-b border-linen-300/80 dark:border-obsidian-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Wordmark & Seal */}
          <button onClick={onNavigateHome} className="flex items-center gap-3 text-left group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-blushGold shadow-sm bg-linen-100">
              <img
                src={imageManifest.logo.heartSeal}
                alt="Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-obsidian dark:text-linen-50 block leading-tight">
                Nailz by Jenna
              </span>
              <span className="text-[10px] font-mono tracking-widest text-blushGold uppercase block">
                ROSEVILLE • SUITE 130
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateTreatments}
              className="text-xs font-mono uppercase tracking-wider text-obsidian/80 dark:text-linen-200 hover:text-blushGold transition-colors font-semibold"
            >
              Treatment Menu
            </button>
            <button
              onClick={onNavigateOrder}
              className="text-xs font-mono uppercase tracking-wider text-blushGold-dark dark:text-blushGold hover:underline transition-colors font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Custom Set</span>
            </button>
            <a
              href="#about"
              className="text-xs font-mono uppercase tracking-wider text-obsidian/80 dark:text-linen-200 hover:text-blushGold transition-colors"
            >
              Meet Jenna
            </a>
            <a
              href="#gallery"
              className="text-xs font-mono uppercase tracking-wider text-obsidian/80 dark:text-linen-200 hover:text-blushGold transition-colors"
            >
              Client Cam
            </a>
            <a
              href="#policies"
              className="text-xs font-mono uppercase tracking-wider text-obsidian/80 dark:text-linen-200 hover:text-blushGold transition-colors"
            >
              Guidelines
            </a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-obsidian dark:text-linen-100 hover:bg-linen-200 dark:hover:bg-obsidian-card"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onNavigateOrder}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-blushGold dark:text-obsidian" />
              <span>Order Now ✦</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-obsidian dark:text-linen-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-linen-50 dark:bg-obsidian border-b border-linen-300 p-4 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateOrder();
            }}
            className="block w-full text-center py-3 rounded-xl bg-blushGold text-obsidian font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            ✦ Order Custom Set Now
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateTreatments();
            }}
            className="block w-full text-left py-2 font-medium text-sm text-obsidian dark:text-white"
          >
            Treatment Catalog & Pricing
          </button>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2 font-medium text-sm text-obsidian dark:text-white"
          >
            Meet Jenna Soule
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2 font-medium text-sm text-obsidian dark:text-white"
          >
            Client Cam Polaroids
          </a>
          <a
            href="#policies"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2 font-medium text-sm text-obsidian dark:text-white"
          >
            Studio Guidelines & Hours
          </a>
          <div className="pt-2 border-t border-linen-200 dark:border-obsidian-border flex items-center justify-between text-xs font-mono">
            <a href="tel:9168509262" className="text-blushGold font-bold">
              (916) 850-9262
            </a>
            <a href="#/admin" className="text-obsidian/40 dark:text-linen-400">
              Admin Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
