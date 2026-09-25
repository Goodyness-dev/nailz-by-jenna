import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { Calendar, Phone, MapPin } from '../common/Icons';

export default function AmenitiesSection() {
  return (
    <section id="policies" className="py-20 md:py-24 bg-linen-50 dark:bg-obsidian relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Studio Guidelines */}
          <div className="card-thick bg-white dark:bg-obsidian-card p-6 sm:p-8 rounded-3xl space-y-4">
            <p className="text-xs font-mono text-blushGold-dark dark:text-blushGold uppercase tracking-wider">
              // STUDIO ETIQUETTE
            </p>
            <h3 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
              Booking Guidelines
            </h3>
            
            <ul className="space-y-3 text-xs sm:text-sm text-obsidian/80 dark:text-linen-300 font-light">
              <li className="flex items-start gap-2">
                <span className="font-mono text-blushGold font-bold">•</span>
                <span><strong>$20 Deposit:</strong> Non-refundable deposit secures your reservation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-blushGold font-bold">•</span>
                <span><strong>Solo Guests:</strong> Private suite setting—no extra guests or kids.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-blushGold font-bold">•</span>
                <span><strong>5-Min Grace:</strong> Please arrive on time ($5 late fee after 5 min).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-blushGold font-bold">•</span>
                <span><strong>Bare Nails:</strong> Arrive with clean bare nails unless soak-off is booked.</span>
              </li>
            </ul>
          </div>

          {/* Right: Roseville Suite & Hours */}
          <div className="card-thick bg-white dark:bg-obsidian-card p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-blushGold-dark dark:text-blushGold uppercase tracking-wider">
                // HOURS &amp; SUITE
              </p>
              <h3 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
                Roseville Location
              </h3>
              <p className="text-xs sm:text-sm text-obsidian/75 dark:text-linen-300 mt-2">
                {BUSINESS_INFO.address.formatted}
              </p>
              <p className="text-xs font-mono text-blushGold mt-1">
                Tuesday – Saturday: 9:00 AM – 7:00 PM (Closed Sun &amp; Mon)
              </p>
            </div>

            <div className="pt-4 border-t border-linen-300/80 dark:border-obsidian-border flex items-center justify-between gap-3">
              <a
                href={"tel:" + BUSINESS_INFO.phoneRaw}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-obsidian dark:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-blushGold" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={BUSINESS_INFO.acuityBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-semibold"
              >
                Schedule Online ↗
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}