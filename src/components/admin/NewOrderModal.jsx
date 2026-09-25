import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, Sparkles, Check } from '../common/Icons';
import { salonStore } from '../../services/salonStore';

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [discipline, setDiscipline] = useState('Aprés Gel-X Extensions');
  const [shape, setShape] = useState('Almond');
  const [length, setLength] = useState('Medium');
  const [artTier, setArtTier] = useState('Tier 1: Minimalist Chrome / French');
  const [date, setDate] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('2:00 PM');
  const [price, setPrice] = useState(95);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newOrder = salonStore.createOrder({
      name: name.trim(),
      phone: phone.trim() || '(916) 000-0000',
      email: '',
      instagram: instagram.trim() ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : '@walkin',
      discipline,
      service: `${discipline} (${shape} ${length})`,
      shape,
      length,
      artTier,
      date,
      timeSlot,
      estimatedTotal: Number(price),
      depositStatus: 'paid',
      status: 'confirmed'
    });

    if (onCreated) onCreated(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-obsidian-card border-2 border-linen-300 dark:border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blushGold" />
            <h2 className="font-serif text-xl font-bold text-obsidian dark:text-linen-50">
              Log Walk-In or DM Booking
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-obsidian/40 hover:text-obsidian rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Client Name *</label>
              <input
                type="text"
                required
                placeholder="Client Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Phone</label>
              <input
                type="text"
                placeholder="(916) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Instagram Handle</label>
              <input
                type="text"
                placeholder="@client"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Service Specialty</label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              >
                <option value="Aprés Gel-X Extensions">Aprés Gel-X Extensions</option>
                <option value="Luminary Structured Gel">Luminary Structured Gel</option>
                <option value="Permanent Jewelry Bar">Permanent Jewelry Bar</option>
                <option value="Safe Soak-Off & Recovery">Safe Soak-Off & Recovery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Shape</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              >
                <option value="Almond">Almond</option>
                <option value="Coffin">Coffin</option>
                <option value="Square">Square</option>
                <option value="Stiletto">Stiletto</option>
                <option value="Round">Round</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              >
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">Time Slot</label>
              <input
                type="text"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-linen-200 dark:border-obsidian-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-linen-300 text-xs font-semibold text-obsidian dark:text-linen-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Add to Books
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
