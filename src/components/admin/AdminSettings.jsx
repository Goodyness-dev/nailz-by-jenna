import React, { useState } from 'react';
import { Settings, Clock, ShieldCheck, Heart, Save, Check } from '../common/Icons';

export default function AdminSettings() {
  const [depositAmount, setDepositAmount] = useState(20);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6 animate-fadeIn">
      <div>
        <h2 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
          Studio Policies & Hours
        </h2>
        <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">
          Configure operating hours, deposit terms, and guest policies for Nailz by Jenna LLC.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border shadow-xs space-y-6">
        
        {/* Deposit Setting */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-obsidian dark:text-linen-100 block">
            Non-Refundable Deposit Requirement ($)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full max-w-xs px-3.5 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
          />
          <p className="text-[11px] text-obsidian/50 dark:text-linen-400">
            Current studio policy: $20 held to secure spot, credited directly to final balance.
          </p>
        </div>

        {/* Operating Hours Overview */}
        <div className="space-y-3 pt-4 border-t border-linen-200 dark:border-obsidian-border">
          <label className="text-xs font-bold text-obsidian dark:text-linen-100 block">
            Studio Operating Schedule
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border">
              <span className="font-bold text-obsidian dark:text-linen-100 block">Tuesday – Saturday</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">9:00 AM – 7:00 PM</span>
            </div>
            <div className="p-3 rounded-xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border">
              <span className="font-bold text-obsidian dark:text-linen-100 block">Sunday & Monday</span>
              <span className="text-obsidian/50 dark:text-linen-400">Closed (Studio Reset)</span>
            </div>
          </div>
        </div>

        {/* Studio Guidelines Check */}
        <div className="space-y-2 pt-4 border-t border-linen-200 dark:border-obsidian-border text-xs">
          <span className="font-bold text-obsidian dark:text-linen-100 block">Enforced Studio Terms</span>
          <ul className="space-y-1.5 text-obsidian/70 dark:text-linen-300 text-[11px]">
            <li>• Solo Client Policy: No extra guests or children permitted in suite 130.</li>
            <li>• 5-Minute Grace Period: $5 late fee applies after 5 minutes.</li>
            <li>• 24-Hour Notice: Cancellations under 24 hours forfeit the deposit.</li>
          </ul>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved Policies!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
