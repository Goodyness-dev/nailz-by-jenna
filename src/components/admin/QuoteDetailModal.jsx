import React, { useState } from 'react';
import { 
  X, Check, Phone, Mail, Instagram, Calendar, 
  Clock, Heart, Sparkles, Trash2, Save, ExternalLink
} from '../common/Icons';
import { salonStore } from '../../services/salonStore';

export default function QuoteDetailModal({ quote, isOpen, onClose, onUpdated }) {
  if (!isOpen || !quote) return null;

  const [status, setStatus] = useState(quote.status || 'pending');
  const [depositStatus, setDepositStatus] = useState(quote.depositStatus || 'pending');
  const [estimatedTotal, setEstimatedTotal] = useState(quote.estimatedTotal || 85);
  const [internalNotes, setInternalNotes] = useState(quote.internalNotes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    salonStore.updateOrder(quote.id, {
      status,
      depositStatus,
      estimatedTotal: Number(estimatedTotal),
      internalNotes
    });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    if (onUpdated) onUpdated();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this appointment?')) {
      salonStore.deleteOrder(quote.id);
      if (onUpdated) onUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-obsidian-card border-2 border-linen-300 dark:border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blushGold-dark dark:text-blushGold font-bold block">
              // APPOINTMENT DOSSIER
            </span>
            <h2 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
              {quote.name}
            </h2>
            <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">
              Ref: {quote.id} • Booked {quote.date} at {quote.timeSlot}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-obsidian/40 hover:text-obsidian dark:hover:text-linen-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CLIENT CONTACT ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`tel:${quote.phone}`}
            className="p-3 rounded-xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border flex items-center gap-2 text-xs font-semibold text-obsidian dark:text-linen-100 hover:border-blushGold transition"
          >
            <Phone className="w-3.5 h-3.5 text-blushGold" />
            <span className="truncate">{quote.phone || 'No phone'}</span>
          </a>

          <a
            href={`mailto:${quote.email}`}
            className="p-3 rounded-xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border flex items-center gap-2 text-xs font-semibold text-obsidian dark:text-linen-100 hover:border-blushGold transition"
          >
            <Mail className="w-3.5 h-3.5 text-blushGold" />
            <span className="truncate">{quote.email || 'No email'}</span>
          </a>

          <a
            href={`https://instagram.com/${(quote.instagram || '').replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border flex items-center gap-2 text-xs font-semibold text-blushGold-dark dark:text-blushGold hover:underline"
          >
            <Instagram className="w-3.5 h-3.5 text-blushGold" />
            <span className="truncate">{quote.instagram || '@client'}</span>
          </a>
        </div>

        {/* NAIL SPECS & INSPO PHOTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border space-y-2 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian/50 dark:text-linen-400 font-bold block">
              Service Specs
            </span>
            <div className="space-y-1">
              <span className="font-bold text-obsidian dark:text-linen-100 block">{quote.service}</span>
              <span className="text-obsidian/70 dark:text-linen-300 block">Shape: <strong>{quote.shape}</strong></span>
              <span className="text-obsidian/70 dark:text-linen-300 block">Length: <strong>{quote.length}</strong></span>
              <span className="text-obsidian/70 dark:text-linen-300 block">Art Level: <strong>{quote.artTier}</strong></span>
              {quote.notes && (
                <p className="pt-2 border-t border-linen-200 dark:border-obsidian-border text-[11px] text-obsidian/60 italic">
                  Client note: "{quote.notes}"
                </p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border space-y-2 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian/50 dark:text-linen-400 font-bold block">
              Uploaded Inspo Reference
            </span>
            {quote.inspoImage ? (
              <div className="flex items-center gap-3">
                <img
                  src={quote.inspoImage}
                  alt="Client Inspo"
                  className="w-20 h-20 rounded-xl object-cover border border-linen-300 shadow-sm"
                />
                <div className="text-[11px] text-obsidian/60 dark:text-linen-400">
                  <span>Photo attached by client during booking.</span>
                </div>
              </div>
            ) : (
              <span className="text-obsidian/40 italic text-xs">No image provided</span>
            )}
          </div>
        </div>

        {/* STATUS & PRICING CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Appointment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
            >
              <option value="pending">Pending Deposit</option>
              <option value="confirmed">Confirmed Slot</option>
              <option value="in_studio">In Studio (At Table)</option>
              <option value="completed">Completed Set</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Deposit Status</label>
            <select
              value={depositStatus}
              onChange={(e) => setDepositStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
            >
              <option value="paid">$20 Paid ✓</option>
              <option value="pending">Pending Deposit</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Total Price ($)</label>
            <input
              type="number"
              value={estimatedTotal}
              onChange={(e) => setEstimatedTotal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
            />
          </div>
        </div>

        {/* INTERNAL TECHNICIAN NOTES */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Jenna's Private Notes</label>
          <textarea
            rows={2}
            placeholder="e.g. Uses Aprés size 4 on index, sensitive cuticles..."
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-4 border-t border-linen-200 dark:border-obsidian-border flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Cancel Appointment</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-linen-300 text-xs font-semibold text-obsidian dark:text-linen-300"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Order</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
