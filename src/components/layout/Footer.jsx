import React from 'react';
import { Phone, MapPin, Instagram, Heart, Calendar } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Footer() {
  return (
    <footer className="bg-linen-200/90 dark:bg-obsidian-pure border-t border-linen-300 dark:border-obsidian-border pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={imageManifest.logo.heartSeal}
                alt="Nailz by Jenna"
                className="w-12 h-12 rounded-full border border-blushGold object-cover"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">Nailz by Jenna</span>
                <span className="block text-[11px] font-mono text-blushGold-dark dark:text-blushGold uppercase">Roseville Salon Suite</span>
              </div>
            </div>
            <p className="text-sm text-obsidian/75 dark:text-linen-300 font-light leading-relaxed max-w-sm">
              Luxury Gel-X extensions, Luminary structured gel manicures, bespoke hand-painted nail art, and permanent jewelry micro-welding by Jenna Soule in Roseville, CA.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-linen-100 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border flex items-center justify-center text-pink-600 dark:text-pink-400 hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={"tel:" + BUSINESS_INFO.phoneRaw}
                className="w-10 h-10 rounded-full bg-linen-100 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border flex items-center justify-center text-blushGold hover:scale-110 transition-transform"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-obsidian dark:text-linen-50 uppercase tracking-wider">Treatments</h4>
            <ul className="space-y-2 text-sm text-obsidian/70 dark:text-linen-300 font-light">
              <li><a href="#services" className="hover:text-blushGold transition-colors">Gel-X Extensions</a></li>
              <li><a href="#services" className="hover:text-blushGold transition-colors">Structured Gel</a></li>
              <li><a href="#services" className="hover:text-blushGold transition-colors">Custom Nail Art</a></li>
              <li><a href="#services" className="hover:text-blushGold transition-colors">Permanent Jewelry</a></li>
              <li><a href="#services" className="hover:text-blushGold transition-colors">Safe Soak-Off</a></li>
            </ul>
          </div>

          {/* Policies & Prep */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-obsidian dark:text-linen-50 uppercase tracking-wider">Studio Guidelines</h4>
            <ul className="space-y-2 text-sm text-obsidian/70 dark:text-linen-300 font-light">
              <li>$20 Non-refundable Deposit</li>
              <li>Solo Appointments (No extra guests)</li>
              <li>5-Minute Grace Period ($5 late fee)</li>
              <li>24-Hour Notice to Reschedule</li>
              <li>Arrive Bare-Nailed unless soak booked</li>
            </ul>
          </div>

          {/* Suite Location & Booking */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm text-obsidian dark:text-linen-50 uppercase tracking-wider">Bookings</h4>
            <p className="text-sm text-obsidian/80 dark:text-linen-300">
              {BUSINESS_INFO.address.formatted}
            </p>
            <a
              href={BUSINESS_INFO.acuityBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-4 h-4" />
              <span>Launch Acuity Portal ↗</span>
            </a>
            <div className="pt-2">
              <a href="#/admin" className="text-xs text-obsidian/50 dark:text-linen-500 hover:underline">
                Salon Admin Portal ↗
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-linen-300 dark:border-obsidian-border flex flex-col sm:flex-row items-center justify-between text-xs text-obsidian/60 dark:text-linen-400 gap-4">
          <p>© {new Date().getFullYear()} Nailz by Jenna LLC. All rights reserved. Roseville, California.</p>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-blushGold fill-blushGold" />
            <span>for Jenna Soule</span>
          </div>
        </div>

      </div>
    </footer>
  );
}