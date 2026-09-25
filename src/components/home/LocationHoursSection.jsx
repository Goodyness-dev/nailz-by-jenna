import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { MapPin, Clock, Phone, ExternalLink, Instagram, Calendar } from '../common/Icons';

export default function LocationHoursSection() {
  const currentDayIndex = new Date().getDay();
  // Sunday is 0, Monday is 1, Tuesday is 2...
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[currentDayIndex];
  const todaySchedule = BUSINESS_INFO.hours.find(h => h.day === todayName);
  const isOpenToday = todaySchedule && todaySchedule.open !== 'Closed';

  return (
    <section id="location" className="py-20 md:py-28 bg-linen-100 dark:bg-obsidian-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
            // 06 VISIT THE SUITE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50">
            Hours &amp; <span className="italic font-normal text-blushGold">Location.</span>
          </h2>
          <p className="text-base text-obsidian/70 dark:text-linen-300 font-light">
            Conveniently located on Pleasant Grove Blvd in Roseville, serving clients across Roseville, Rocklin, Lincoln, and Sacramento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact, Address & Live Hours Badge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Pill */}
            <div className="card-thick bg-linen-50 dark:bg-obsidian p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-obsidian/60 dark:text-linen-400 uppercase tracking-wider">
                  TODAY\'S SCHEDULE
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isOpenToday
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isOpenToday ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  {isOpenToday ? 'Open Today' : 'Closed Today'}
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-obsidian dark:text-linen-50">{todayName}</p>
                <p className="font-serif text-2xl font-bold text-blushGold-dark dark:text-blushGold">
                  {todaySchedule ? (todaySchedule.open === 'Closed' ? 'Closed' : `${todaySchedule.open} – ${todaySchedule.close}`) : 'Closed'}
                </p>
              </div>

              <div className="pt-3 border-t border-linen-300 dark:border-obsidian-border text-xs text-obsidian/70 dark:text-linen-400">
                <span>By appointment only to maintain a quiet, relaxing suite atmosphere.</span>
              </div>
            </div>

            {/* Address & Direct Dial */}
            <div className="card-thick bg-linen-50 dark:bg-obsidian p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blushGold/20 flex items-center justify-center flex-shrink-0 text-blushGold mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian dark:text-linen-50 text-sm">Suite Address</h4>
                  <p className="text-sm text-obsidian/80 dark:text-linen-300 mt-0.5">{BUSINESS_INFO.address.street}</p>
                  <p className="text-xs text-obsidian/60 dark:text-linen-400">{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}</p>
                  <a
                    href={BUSINESS_INFO.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blushGold-dark dark:text-blushGold font-medium hover:underline mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-linen-300 dark:border-obsidian-border">
                <div className="w-10 h-10 rounded-xl bg-blushGold/20 flex items-center justify-center flex-shrink-0 text-blushGold mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian dark:text-linen-50 text-sm">Direct Phone / Text</h4>
                  <a
                    href={"tel:" + BUSINESS_INFO.phoneRaw}
                    className="text-sm font-semibold text-obsidian dark:text-linen-50 hover:text-blushGold transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">Call or text Jenna directly with styling questions</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-linen-300 dark:border-obsidian-border">
                <div className="w-10 h-10 rounded-xl bg-blushGold/20 flex items-center justify-center flex-shrink-0 text-blushGold mt-1">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian dark:text-linen-50 text-sm">Instagram</h4>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                  >
                    {BUSINESS_INFO.instagram}
                  </a>
                  <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">DM booking inquiries or tag your fresh sets</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Full Weekly Hours Table & Acuity Quick Book */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card-thick bg-linen-50 dark:bg-obsidian p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-obsidian dark:text-linen-50 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blushGold" />
                <span>Weekly Salon Operating Hours</span>
              </h3>

              <div className="divide-y divide-linen-300/70 dark:divide-obsidian-border">
                {BUSINESS_INFO.hours.map((h, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-sm">
                    <span className={`font-medium ${h.day === todayName ? 'text-blushGold-dark dark:text-blushGold font-bold' : 'text-obsidian dark:text-linen-200'}`}>
                      {h.day} {h.day === todayName && <span className="text-[11px] font-mono ml-1.5 px-2 py-0.5 rounded bg-blushGold/20">TODAY</span>}
                    </span>
                    <span className={`font-mono text-xs sm:text-sm ${h.open === 'Closed' ? 'text-obsidian/40 dark:text-linen-500' : 'text-obsidian/80 dark:text-linen-300'}`}>
                      {h.open === 'Closed' ? 'Closed' : `${h.open} - ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-linen-300 dark:border-obsidian-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-obsidian dark:text-linen-50 text-base">Book Your Roseville Slot</p>
                  <p className="text-xs text-obsidian/70 dark:text-linen-400">Deposits securely handled online via Acuity &amp; Stripe.</p>
                </div>
                <a
                  href={BUSINESS_INFO.acuityBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-blushGold dark:text-obsidian" />
                  <span>Choose Time Slot</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="card-thick overflow-hidden bg-linen-50 dark:bg-obsidian aspect-[16/9] w-full">
              <iframe
                title="Nailz by Jenna Roseville Map"
                src={BUSINESS_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}