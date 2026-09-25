import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Sun, Moon, Sparkles } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Navbar({ darkMode, onToggleDarkMode, onOpenWizard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Treatments', href: '#services' },
    { label: 'Meet Jenna', href: '#about' },
    { label: 'Client Cam', href: '#gallery' },
    { label: 'Policies', href: '#policies' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Hours & Map', href: '#location' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linen-50/90 dark:bg-obsidian/90 backdrop-blur-md border-b border-linen-300/80 dark:border-obsidian-border transition-colors duration-200">
      
      {/* Top Banner Promo */}
      <div className="bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blushGold dark:text-obsidian" />
        <span>Welcome Babe! Take $15 Off Your First Full Set with Jenna Soule in Roseville</span>
        <a href={BUSINESS_INFO.acuityBookingUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold ml-1">
          Claim Slot ↗
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blushGold shadow-md bg-linen-100 dark:bg-obsidian-card">
              <img
                src={imageManifest.logo.heartSeal}
                alt="Nailz by Jenna"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-obsidian dark:text-linen-50 block leading-tight">
                Nailz by Jenna
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blushGold-dark dark:text-blushGold block">
                ROSEVILLE • 1-ON-1 SUITE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-obsidian/80 dark:text-linen-200 hover:text-blushGold-dark dark:hover:text-blushGold transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-full bg-linen-200 dark:bg-obsidian-card text-obsidian dark:text-linen-100 hover:bg-linen-300 dark:hover:bg-obsidian-border transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-obsidian" />}
            </button>

            {/* Quick Phone Call (Desktop & Tablet) */}
            <a
              href={"tel:" + BUSINESS_INFO.phoneRaw}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border text-obsidian dark:text-linen-100 text-xs font-semibold hover:bg-linen-200 dark:hover:bg-obsidian-card transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blushGold" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Direct Acuity Booking Button */}
            <a
              href={BUSINESS_INFO.acuityBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-4 h-4 text-blushGold dark:text-obsidian" />
              <span>Book Online ↗</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl lg:hidden text-obsidian dark:text-linen-100 hover:bg-linen-200 dark:hover:bg-obsidian-card"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-linen-50 dark:bg-obsidian border-b border-linen-300 dark:border-obsidian-border px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-obsidian dark:text-linen-100 hover:bg-linen-200 dark:hover:bg-obsidian-card"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-linen-300 dark:border-obsidian-border space-y-2">
            <a
              href={BUSINESS_INFO.acuityBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-semibold text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blushGold dark:text-obsidian" />
              <span>Book Appointment on Acuity ↗</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="w-full py-3 px-4 rounded-xl bg-linen-200 dark:bg-obsidian-card text-obsidian dark:text-linen-100 font-medium text-center"
            >
              Interactive Price Estimator
            </button>
            <a
              href={"tel:" + BUSINESS_INFO.phoneRaw}
              className="w-full py-2.5 px-4 rounded-xl border border-linen-300 dark:border-obsidian-border text-obsidian dark:text-linen-100 text-center block text-sm font-semibold"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      )}

    </nav>
  );
}