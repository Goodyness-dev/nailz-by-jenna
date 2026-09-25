import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { AMENITIES_AVAILABLE } from '../../data/amenitiesData';
import { ShieldCheck, Clock, Check, Heart, Sparkles } from '../common/Icons';

export default function AmenitiesSection() {
  return (
    <section id="policies" className="py-20 md:py-28 bg-linen-100 dark:bg-obsidian-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Studio Booking Policies */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-blushGold-dark dark:text-blushGold uppercase">
              // 04 STUDIO ETIQUETTE &amp; POLICIES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-obsidian dark:text-linen-50">
              Booking Policy &amp; <span className="italic font-normal text-blushGold">Studio Guidelines.</span>
            </h2>
            <p className="text-base text-obsidian/70 dark:text-linen-300 font-light">
              To ensure a peaceful, high-standard experience for every guest, please review our simple policies before scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_INFO.policies.map((policy, i) => (
              <div
                key={i}
                className="card-thick bg-linen-50 dark:bg-obsidian p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-blushGold/15 text-blushGold-dark dark:text-blushGold font-medium">
                    {policy.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-obsidian dark:text-linen-50 mt-4 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-obsidian/75 dark:text-linen-300/90 leading-relaxed font-light">
                    {policy.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Before Your Appointment Guide */}
        <div className="p-8 md:p-12 rounded-3xl bg-linen-200/90 dark:bg-obsidian border-2 border-linen-300 dark:border-obsidian-border mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-obsidian dark:text-linen-50">
              Before Your Appointment
            </h3>
            <p className="text-sm text-obsidian/70 dark:text-linen-400 font-light mt-1">
              4 simple steps for the smoothest appointment and longest-lasting retention:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_INFO.preAppointmentSteps.map((step, i) => (
              <div key={i} className="p-5 rounded-2xl bg-linen-50 dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border">
                <span className="text-2xl font-serif font-bold text-blushGold">{step.number}</span>
                <h4 className="font-semibold text-sm text-obsidian dark:text-linen-50 mt-2 mb-1.5">{step.title}</h4>
                <p className="text-xs text-obsidian/70 dark:text-linen-400 font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Studio Amenities */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-obsidian dark:text-linen-50">
              The Private Suite Experience
            </h3>
            <p className="text-sm text-obsidian/70 dark:text-linen-400 font-light">
              Elevated touches designed for total relaxation and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES_AVAILABLE.map((amenity, i) => (
              <div key={i} className="p-5 rounded-2xl bg-linen-50/80 dark:bg-obsidian border border-linen-300 dark:border-obsidian-border flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blushGold/15 flex items-center justify-center flex-shrink-0 text-blushGold mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-obsidian dark:text-linen-50">{amenity.name}</h4>
                  <p className="text-xs text-obsidian/70 dark:text-linen-400 font-light mt-1">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}