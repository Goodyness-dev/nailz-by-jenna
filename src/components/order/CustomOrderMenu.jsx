import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, Check, X, Calendar, Clock, 
  Phone, Mail, User, Instagram, Camera, Upload, 
  ChevronRight, ChevronLeft, ShieldCheck, Tag, 
  AlertCircle, CheckCircle2, ArrowRight, Loader2, Gem, Scissors
} from '../common/Icons';
import { salonStore } from '../../services/salonStore';
import { BUSINESS_INFO } from '../../data/businessData';

const DISCIPLINES = [
  {
    id: 'gel_x',
    name: 'Aprés Gel-X Extensions',
    badge: 'Signature Specialist',
    description: 'Full cover soft-gel system tailored to your natural cuticle curve. Zero dust, zero odor, 4+ weeks retention.',
    basePrice: 85,
    duration: '1h 45m',
    image: '/images/gel-x-extensions.jpg'
  },
  {
    id: 'structured_gel',
    name: 'Luminary Structured Gel',
    badge: 'Natural Nail Health',
    description: 'Multi-flex builder gel overlay reinforcing your natural nails. Promotes natural length without harsh acrylic damage.',
    basePrice: 65,
    duration: '1h 30m',
    image: '/images/polaroid-set-2.jpg'
  },
  {
    id: 'permanent_jewelry',
    name: 'Permanent Jewelry Bar',
    badge: 'Micro-Welded 14k',
    description: 'Claspless, micro-welded 14k gold-filled and 925 sterling silver custom-fit bracelets, anklets, and charms.',
    basePrice: 65,
    duration: '30m',
    image: '/images/permanent-jewelry.jpg'
  },
  {
    id: 'repair_removal',
    name: 'Safe Soak-Off & IBX Repair',
    badge: 'Restorative Care',
    description: 'Gentle e-file debulk and foil soak-off. Finished with IBX keratin deep penetrating strengthener.',
    basePrice: 35,
    duration: '45m',
    image: '/images/polaroid-set-1.jpg'
  }
];

const NAIL_LENGTHS = [
  { id: 'short', name: 'Short (Natural Active)', extra: 0, desc: 'Finger-tip length, functional & sleek' },
  { id: 'medium', name: 'Medium (Most Requested)', extra: 10, desc: '1/2 inch extension, balanced beauty' },
  { id: 'long', name: 'Long (Dramatic Statement)', extra: 20, desc: '3/4 inch extension, editorial elegance' },
  { id: 'xl', name: 'XL / Sculpted Coffin', extra: 35, desc: 'Maximum length, sculpted apex' }
];

const NAIL_SHAPES = [
  { id: 'almond', name: 'Almond', desc: 'Softly tapered feminine curve' },
  { id: 'coffin', name: 'Coffin / Ballerina', desc: 'Edgy taper with square blunt tip' },
  { id: 'square', name: 'Square', desc: 'Crisp parallel edges with sharp corners' },
  { id: 'stiletto', name: 'Stiletto', desc: 'Dramatic pointed apex' },
  { id: 'round', name: 'Round', desc: 'Classic natural perimeter' }
];

const JEWELRY_METALS = [
  { id: 'gold_filled', name: '14k Gold Filled', price: 65, desc: 'Long-lasting heirloom luster, tarnish resistant' },
  { id: 'sterling_silver', name: '925 Sterling Silver', price: 55, desc: 'Brilliant cool silver tone, waterproof' }
];

const JEWELRY_ITEMS = [
  { id: 'bracelet', name: 'Custom Bracelet', extra: 0 },
  { id: 'anklet', name: 'Custom Anklet', extra: 15 },
  { id: 'ring', name: 'Micro-Welded Ring', extra: -25 }
];

const ART_TIERS = [
  {
    id: 'tier_0',
    title: 'Tier 0: Pure Clean Gloss',
    price: 0,
    desc: 'Solid gel color, sheer milky nude, or high-gloss protective topcoat.',
    examples: 'Solid tones, milky white, clean girl nude'
  },
  {
    id: 'tier_1',
    title: 'Tier 1: Minimalist Chic',
    price: 15,
    desc: 'Delicate accents, micro-french, or iridescent chrome glaze.',
    examples: 'French tips, glazed donut chrome, micro dots, 2 accent nails'
  },
  {
    id: 'tier_2',
    title: 'Tier 2: Signature Trendy Art',
    price: 30,
    desc: 'Advanced techniques, dimension, and customized creative accents on all 10 nails.',
    examples: 'Velvet cateye, blooming gel roses, aura airbrush, tortoiseshell'
  },
  {
    id: 'tier_3',
    title: 'Tier 3: Complex 3D & Embellished',
    price: 45,
    desc: 'Full luxury set with sculpted 3D textures, chrome drips, or crystal charms.',
    examples: '3D jelly droplets, chrome swirls, Swarovski crystals, character art'
  }
];

const TIME_SLOTS = [
  '9:00 AM (Morning Glow)',
  '11:30 AM (Midday)',
  '2:00 PM (Afternoon)',
  '4:30 PM (Late Afternoon)',
  '6:30 PM (Evening Special)'
];

// Generate next 10 operating days (Tue–Sat only)
function getNextAvailableDates() {
  const dates = [];
  const now = new Date();
  let current = new Date(now);
  current.setDate(current.getDate() + 1); // Start tomorrow

  while (dates.length < 8) {
    const day = current.getDay(); // 0 is Sun, 1 is Mon
    if (day !== 0 && day !== 1) {
      const formatted = current.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      dates.push(formatted);
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function CustomOrderMenu({ 
  initialDiscipline = 'gel_x', 
  initialService = null,
  onClose,
  isModal = false 
}) {
  const [step, setStep] = useState(1);
  const [availableDates] = useState(getNextAvailableDates);

  // Form State
  const [selectedDiscipline, setSelectedDiscipline] = useState(() => {
    if (initialDiscipline === 'Permanent Jewelry' || initialDiscipline === 'permanent_jewelry') return 'permanent_jewelry';
    if (initialDiscipline === 'Structured Gel' || initialDiscipline === 'structured_gel') return 'structured_gel';
    if (initialDiscipline === 'Safe Soak-Off' || initialDiscipline === 'repair_removal') return 'repair_removal';
    return 'gel_x';
  });

  const [selectedLength, setSelectedLength] = useState('medium');
  const [selectedShape, setSelectedShape] = useState('almond');
  
  const [selectedMetal, setSelectedMetal] = useState('gold_filled');
  const [selectedJewelryItem, setSelectedJewelryItem] = useState('bracelet');
  const [addJewelryCharm, setAddJewelryCharm] = useState(false);

  const [selectedArtTier, setSelectedArtTier] = useState('tier_1');
  const [needsSoakOff, setNeedsSoakOff] = useState(false);
  const [cuticleCare, setCuticleCare] = useState(false);

  const [inspoImage, setInspoImage] = useState(null);
  const [inspoImageName, setInspoImageName] = useState('');

  const [selectedDate, setSelectedDate] = useState(availableDates[0] || 'Tomorrow');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientInstagram, setClientInstagram] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [formError, setFormError] = useState('');

  // Calculate Live Total
  const calculateTotal = () => {
    let total = 0;
    const disc = DISCIPLINES.find(d => d.id === selectedDiscipline) || DISCIPLINES[0];

    if (selectedDiscipline === 'permanent_jewelry') {
      const metal = JEWELRY_METALS.find(m => m.id === selectedMetal);
      const item = JEWELRY_ITEMS.find(i => i.id === selectedJewelryItem);
      total += (metal ? metal.price : 65);
      total += (item ? item.extra : 0);
      if (addJewelryCharm) total += 15;
    } else if (selectedDiscipline === 'repair_removal') {
      total += disc.basePrice;
    } else {
      // Nails (Gel-X or Structured Gel)
      total += disc.basePrice;
      const len = NAIL_LENGTHS.find(l => l.id === selectedLength);
      if (len) total += len.extra;

      const art = ART_TIERS.find(a => a.id === selectedArtTier);
      if (art) total += art.price;

      if (needsSoakOff) total += 25;
      if (cuticleCare) total += 15;
    }

    return total;
  };

  const currentTotal = calculateTotal();
  const depositAmount = 20;

  // Handle Photo Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInspoImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInspoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError('Please provide your name and phone number to secure your reservation.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const disc = DISCIPLINES.find(d => d.id === selectedDiscipline) || DISCIPLINES[0];
    const len = NAIL_LENGTHS.find(l => l.id === selectedLength);
    const art = ART_TIERS.find(a => a.id === selectedArtTier);

    const orderPayload = {
      name: clientName.trim(),
      phone: clientPhone.trim(),
      email: clientEmail.trim(),
      instagram: clientInstagram.trim() ? (clientInstagram.startsWith('@') ? clientInstagram : `@${clientInstagram}`) : '@client',
      discipline: disc.name,
      service: selectedDiscipline === 'permanent_jewelry' 
        ? `Permanent Jewelry: ${selectedMetal === 'gold_filled' ? '14k Gold Filled' : 'Sterling Silver'} ${selectedJewelryItem}`
        : `${disc.name} (${len?.name || 'Standard'})`,
      shape: selectedDiscipline === 'permanent_jewelry' ? 'N/A' : selectedShape,
      length: selectedDiscipline === 'permanent_jewelry' ? 'Custom Fit' : len?.name,
      artTier: selectedDiscipline === 'permanent_jewelry' ? 'Charms & Links' : art?.title,
      selectedArt: selectedDiscipline === 'permanent_jewelry' 
        ? (addJewelryCharm ? ['Freshwater Charm (+$15)'] : [])
        : [art?.title, needsSoakOff ? 'Soak-Off Removal' : null, cuticleCare ? 'Cuticle Care' : null].filter(Boolean),
      needsSoakOff,
      date: selectedDate,
      timeSlot: selectedTime,
      notes: clientNotes.trim(),
      inspoImage: inspoImage || (selectedDiscipline === 'permanent_jewelry' ? '/images/permanent-jewelry.jpg' : '/images/polaroid-set-1.jpg'),
      estimatedTotal: currentTotal,
      depositAmount: 20,
      depositStatus: 'paid' // Simulated confirmed reservation
    };

    try {
      const created = salonStore.createOrder(orderPayload);
      setSubmittedOrder(created);
    } catch (err) {
      console.error(err);
      setFormError('Unable to place reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendar = () => {
    if (!submittedOrder) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Nailz by Jenna - ${submittedOrder.service}`,
      `DESCRIPTION:Studio appointment with Jenna Soule\\nLocation: ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city}\\nTotal: $${submittedOrder.estimatedTotal}`,
      `LOCATION:${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `nailz-by-jenna-${submittedOrder.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SUCCESS SCREEN
  if (submittedOrder) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-white dark:bg-obsidian-card rounded-3xl border-2 border-linen-300 dark:border-obsidian-border shadow-2xl text-center space-y-8 my-8 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-blushGold-dark dark:text-blushGold font-bold block">
            // RESERVATION CONFIRMED
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50">
            You're on Jenna's Books!
          </h2>
          <p className="text-sm text-obsidian/70 dark:text-linen-300 max-w-md mx-auto">
            Thank you, <span className="font-semibold text-obsidian dark:text-linen-50">{submittedOrder.name}</span>. Your custom set request and studio slot have been locked.
          </p>
        </div>

        {/* RECEIPT SUMMARY TICKET */}
        <div className="p-6 rounded-2xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border text-left space-y-4">
          <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
            <div>
              <span className="text-[11px] text-obsidian/50 dark:text-linen-400 uppercase font-mono block">Order Reference</span>
              <span className="font-mono font-bold text-base text-blushGold-dark dark:text-blushGold">{submittedOrder.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-obsidian/50 dark:text-linen-400 uppercase font-mono block">Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Slot Reserved
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-obsidian/50 dark:text-linen-400 block">Service</span>
              <span className="font-bold text-obsidian dark:text-linen-100">{submittedOrder.service}</span>
            </div>
            <div>
              <span className="text-obsidian/50 dark:text-linen-400 block">Date & Time</span>
              <span className="font-bold text-obsidian dark:text-linen-100">{submittedOrder.date} at {submittedOrder.timeSlot}</span>
            </div>
            <div>
              <span className="text-obsidian/50 dark:text-linen-400 block">Shape & Length</span>
              <span className="font-semibold text-obsidian dark:text-linen-200">{submittedOrder.shape} // {submittedOrder.length}</span>
            </div>
            <div>
              <span className="text-obsidian/50 dark:text-linen-400 block">Art Level</span>
              <span className="font-semibold text-obsidian dark:text-linen-200">{submittedOrder.artTier}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-linen-200 dark:border-obsidian-border flex items-center justify-between">
            <div>
              <span className="text-xs text-obsidian/60 dark:text-linen-400 block">$20 Deposit Locked</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Applied to final balance</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-obsidian/50 dark:text-linen-400 block">Est. Balance Due at Studio</span>
              <span className="font-serif font-bold text-xl text-obsidian dark:text-linen-50">
                ${submittedOrder.estimatedTotal - 20}.00
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleDownloadCalendar}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-obsidian dark:bg-linen-100 text-white dark:text-obsidian font-semibold text-xs tracking-wider uppercase transition hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Add to Calendar (.ics)</span>
          </button>

          <a
            href={BUSINESS_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-linen-200 dark:bg-obsidian-subtle text-obsidian dark:text-linen-50 font-semibold text-xs tracking-wider uppercase transition hover:bg-blushGold hover:text-white flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>DM Jenna Inspo (@nailz.byjenna)</span>
          </a>
        </div>

        <div className="pt-4 border-t border-linen-200 dark:border-obsidian-border">
          <p className="text-xs text-obsidian/50 dark:text-linen-400">
            Studio Location: <span className="font-semibold text-obsidian dark:text-linen-200">{BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}</span>
            <br />Questions or need to reschedule? Call/Text <a href="tel:9168509262" className="underline font-bold text-blushGold-dark dark:text-blushGold">(916) 850-9262</a>
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="mt-4 text-xs font-semibold text-blushGold-dark dark:text-blushGold hover:underline"
            >
              ← Back to Studio Page
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${isModal ? 'p-4 sm:p-8' : 'px-4 sm:px-6 py-10'}`}>
      {/* HEADER */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-blushGold/50" />
          <span className="text-xs font-mono uppercase tracking-widest text-blushGold-dark dark:text-blushGold font-bold">
            // BESPOKE STUDIO APPOINTMENTS
          </span>
          <span className="w-8 h-px bg-blushGold/50" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-obsidian dark:text-linen-50">
          Order Your Custom Set
        </h1>
        <p className="text-xs sm:text-sm text-obsidian/60 dark:text-linen-400 max-w-xl mx-auto">
          Configure your desired soft-gel architecture, custom nail art tier, or permanent jewelry chain. Direct studio booking with zero external redirects.
        </p>

        {/* STEP PROGRESS INDICATOR */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 max-w-md mx-auto">
          {[
            { num: 1, label: 'Discipline' },
            { num: 2, label: 'Architecture' },
            { num: 3, label: 'Art & Inspo' },
            { num: 4, label: 'Date & Details' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => step > s.num && setStep(s.num)}
              className={`flex items-center gap-1.5 text-xs font-medium transition ${
                step === s.num
                  ? 'text-blushGold-dark dark:text-blushGold font-bold'
                  : step > s.num
                  ? 'text-obsidian dark:text-linen-200 cursor-pointer'
                  : 'text-obsidian/40 dark:text-linen-500 cursor-not-allowed'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === s.num
                  ? 'bg-blushGold text-white shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-linen-200 dark:bg-obsidian-subtle text-obsidian/40'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT / MAIN CONFIGURATOR (2 COLS) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: DISCIPLINE */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
                <h3 className="font-serif text-lg font-bold text-obsidian dark:text-linen-100 flex items-center gap-2">
                  <span>1. Choose Treatment Specialty</span>
                </h3>
                <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DISCIPLINES.map(item => {
                  const isSelected = selectedDiscipline === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedDiscipline(item.id)}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-blushGold bg-blushGold/5 dark:bg-blushGold/10 shadow-md ring-2 ring-blushGold/20'
                          : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card hover:border-blushGold/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blushGold text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-linen-200 dark:bg-obsidian-subtle text-obsidian/70 dark:text-linen-300 font-semibold inline-block">
                          {item.badge}
                        </span>
                        <h4 className="font-serif text-base font-bold text-obsidian dark:text-linen-50">
                          {item.name}
                        </h4>
                        <p className="text-xs text-obsidian/60 dark:text-linen-400 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-linen-100 dark:border-obsidian-border/50 flex items-center justify-between text-xs">
                        <span className="text-obsidian/50 dark:text-linen-400 font-mono">{item.duration}</span>
                        <span className="font-bold text-obsidian dark:text-linen-50 font-serif text-sm">
                          From ${item.basePrice}.00
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider transition hover:scale-105 flex items-center gap-2"
                >
                  <span>Next: Configure Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ARCHITECTURE (LENGTH & SHAPE OR JEWELRY METAL) */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
                <h3 className="font-serif text-lg font-bold text-obsidian dark:text-linen-100">
                  {selectedDiscipline === 'permanent_jewelry' ? '2. Metal & Placement Options' : '2. Shape & Length Architecture'}
                </h3>
                <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">Step 2 of 4</span>
              </div>

              {selectedDiscipline === 'permanent_jewelry' ? (
                <div className="space-y-6">
                  {/* Metal Choice */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                      Select Precious Metal
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {JEWELRY_METALS.map(m => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMetal(m.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                            selectedMetal === m.id
                              ? 'border-blushGold bg-blushGold/10 ring-2 ring-blushGold/20'
                              : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-obsidian dark:text-linen-50">{m.name}</span>
                            <span className="font-serif font-bold text-blushGold-dark dark:text-blushGold">${m.price}.00</span>
                          </div>
                          <p className="text-xs text-obsidian/60 dark:text-linen-400">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Item placement */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                      Placement Item
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {JEWELRY_ITEMS.map(i => (
                        <button
                          key={i.id}
                          type="button"
                          onClick={() => setSelectedJewelryItem(i.id)}
                          className={`p-3 rounded-xl border text-center transition ${
                            selectedJewelryItem === i.id
                              ? 'border-blushGold bg-blushGold text-white font-bold'
                              : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-200'
                          }`}
                        >
                          <span className="text-xs block">{i.name}</span>
                          {i.extra !== 0 && (
                            <span className="text-[10px] opacity-80 font-mono">
                              {i.extra > 0 ? `+$${i.extra}` : `-$${Math.abs(i.extra)}`}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add Charm Toggle */}
                  <label className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addJewelryCharm}
                      onChange={(e) => setAddJewelryCharm(e.target.checked)}
                      className="w-4 h-4 rounded text-blushGold focus:ring-blushGold"
                    />
                    <div>
                      <span className="text-xs font-bold text-obsidian dark:text-linen-50 block">Add Freshwater Pearl or Gem Charm (+$15)</span>
                      <span className="text-[11px] text-obsidian/50 dark:text-linen-400 block">Hand-wired micro-accent welded seamlessly onto your chain.</span>
                    </div>
                  </label>
                </div>
              ) : selectedDiscipline === 'repair_removal' ? (
                <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border space-y-3">
                  <h4 className="text-sm font-bold text-obsidian dark:text-linen-50">Natural Nail Health & Reset</h4>
                  <p className="text-xs text-obsidian/60 dark:text-linen-400">
                    This treatment does not require length or shape configuration. Jenna will gently remove previous enhancement and apply keratin deep bonding.
                  </p>
                </div>
              ) : (
                /* NAIL LENGTH & SHAPE */
                <div className="space-y-6">
                  {/* Length */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                      1. Select Extension Length
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {NAIL_LENGTHS.map(len => (
                        <div
                          key={len.id}
                          onClick={() => setSelectedLength(len.id)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                            selectedLength === len.id
                              ? 'border-blushGold bg-blushGold/10 ring-2 ring-blushGold/20'
                              : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs text-obsidian dark:text-linen-50 block">{len.name}</span>
                            <span className="text-[11px] text-obsidian/50 dark:text-linen-400 block">{len.desc}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-blushGold-dark dark:text-blushGold">
                            {len.extra === 0 ? 'Included' : `+$${len.extra}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shape */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                      2. Select Perimeter Shape
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {NAIL_SHAPES.map(shp => (
                        <button
                          key={shp.id}
                          type="button"
                          onClick={() => setSelectedShape(shp.name)}
                          className={`p-3 rounded-xl border text-left transition ${
                            selectedShape === shp.name
                              ? 'border-blushGold bg-blushGold text-white font-bold shadow-xs'
                              : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-obsidian dark:text-linen-200'
                          }`}
                        >
                          <span className="text-xs font-bold block">{shp.name}</span>
                          <span className="text-[10px] opacity-70 block truncate">{shp.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full border border-linen-300 dark:border-obsidian-border text-xs font-semibold text-obsidian dark:text-linen-300 transition hover:bg-linen-100"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider transition hover:scale-105 flex items-center gap-2"
                >
                  <span>Next: Nail Art & Inspo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: NAIL ART TIER & INSPO PHOTO */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
                <h3 className="font-serif text-lg font-bold text-obsidian dark:text-linen-100">
                  3. Nail Art Level & Custom Inspo
                </h3>
                <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">Step 3 of 4</span>
              </div>

              {/* Art Tiers */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                  Select Custom Design Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ART_TIERS.map(tier => (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedArtTier(tier.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                        selectedArtTier === tier.id
                          ? 'border-blushGold bg-blushGold/10 ring-2 ring-blushGold/20'
                          : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-obsidian dark:text-linen-50">{tier.title}</span>
                          <span className="text-xs font-mono font-bold text-blushGold-dark dark:text-blushGold">
                            {tier.price === 0 ? 'Included' : `+$${tier.price}`}
                          </span>
                        </div>
                        <p className="text-xs text-obsidian/70 dark:text-linen-300 mb-2">{tier.desc}</p>
                      </div>
                      <span className="text-[10px] text-obsidian/50 dark:text-linen-400 italic block">
                        Ex: {tier.examples}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons Checklist */}
              <div className="p-4 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                  Optional Studio Add-Ons
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsSoakOff}
                      onChange={(e) => setNeedsSoakOff(e.target.checked)}
                      className="w-4 h-4 rounded text-blushGold focus:ring-blushGold"
                    />
                    <span className="text-obsidian dark:text-linen-200">Safe Soak-Off Removal (+$25)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cuticleCare}
                      onChange={(e) => setCuticleCare(e.target.checked)}
                      className="w-4 h-4 rounded text-blushGold focus:ring-blushGold"
                    />
                    <span className="text-obsidian dark:text-linen-200">Deep Cuticle Therapy & Hot Towel (+$15)</span>
                  </label>
                </div>
              </div>

              {/* Inspo Photo Upload Box */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-linen-300 dark:border-obsidian-border bg-linen-50/50 dark:bg-obsidian-pure space-y-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blushGold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-obsidian dark:text-linen-100">
                    Upload Your Nail Inspo (Optional)
                  </span>
                </div>
                <p className="text-xs text-obsidian/60 dark:text-linen-400">
                  Have a Pinterest design or Instagram screenshot? Upload it here so Jenna can prepare the exact polishes, chrome powders, or charms.
                </p>

                {inspoImage ? (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border">
                    <img 
                      src={inspoImage} 
                      alt="Nail Inspo Preview" 
                      className="w-16 h-16 rounded-lg object-cover border border-linen-300 shadow-xs"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <span className="font-semibold text-obsidian dark:text-linen-100 block truncate">
                        {inspoImageName || 'Nail Inspo Screenshot'}
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Photo attached for Jenna
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInspoImage(null);
                        setInspoImageName('');
                      }}
                      className="p-1.5 text-obsidian/40 hover:text-red-500 rounded-lg text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border border-linen-300 dark:border-obsidian-border rounded-xl bg-white dark:bg-obsidian-card cursor-pointer hover:border-blushGold transition group">
                    <Upload className="w-6 h-6 text-blushGold group-hover:scale-110 transition mb-2" />
                    <span className="text-xs font-semibold text-obsidian dark:text-linen-200">
                      Click to upload photo or screenshot
                    </span>
                    <span className="text-[11px] text-obsidian/40 dark:text-linen-500 mt-0.5">
                      PNG, JPG, WEBP up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-full border border-linen-300 dark:border-obsidian-border text-xs font-semibold text-obsidian dark:text-linen-300 transition hover:bg-linen-100"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider transition hover:scale-105 flex items-center gap-2"
                >
                  <span>Next: Schedule & Reserve</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DATE, TIME & CLIENT DETAILS */}
          {step === 4 && (
            <form onSubmit={handleSubmitOrder} className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
                <h3 className="font-serif text-lg font-bold text-obsidian dark:text-linen-100">
                  4. Select Studio Slot & Contact Info
                </h3>
                <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">Step 4 of 4</span>
              </div>

              {/* Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                  Select Date (Tue – Sat)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDates.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition ${
                        selectedDate === d
                          ? 'border-blushGold bg-blushGold text-white font-bold shadow-xs'
                          : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-obsidian dark:text-linen-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-obsidian/70 dark:text-linen-300 block">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                        selectedTime === t
                          ? 'border-blushGold bg-blushGold/10 ring-2 ring-blushGold/20 font-bold text-obsidian dark:text-linen-50'
                          : 'border-linen-200 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-obsidian/70 dark:text-linen-300'
                      }`}
                    >
                      <span>{t}</span>
                      {selectedTime === t && <Check className="w-3.5 h-3.5 text-blushGold" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info Fields */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chloe Miller"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">
                      Mobile Phone (for SMS Confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(916) 000-0000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="chloe@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">
                      Instagram Handle (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="@chloemnails"
                      value={clientInstagram}
                      onChange={(e) => setClientInstagram(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-obsidian/70 dark:text-linen-300">
                    Special Requests, Allergies or Nail Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Previous acrylic damage, preference for square cuticles..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
                  />
                </div>
              </div>

              {/* Policy Checkbox */}
              <div className="p-4 rounded-2xl bg-linen-100 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="w-4 h-4 rounded mt-0.5 text-blushGold focus:ring-blushGold"
                  />
                  <span className="text-xs text-obsidian/80 dark:text-linen-300">
                    I understand that a <strong className="text-obsidian dark:text-linen-100">$20 non-refundable deposit</strong> is required to lock my studio slot and will be credited toward my final appointment total. I also agree to the solo-guest policy and 24-hour cancellation terms.
                  </span>
                </label>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-full border border-linen-300 dark:border-obsidian-border text-xs font-semibold text-obsidian dark:text-linen-300 transition hover:bg-linen-100"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider transition hover:scale-105 shadow-xl flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Locking Your Slot...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm & Reserve (${depositAmount} Deposit)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* RIGHT: LIVE ESTIMATE & STUDIO SUMMARY STICKY SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-obsidian-card border-2 border-linen-300 dark:border-obsidian-border shadow-xl space-y-6">
            
            <div className="border-b border-linen-200 dark:border-obsidian-border pb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-blushGold-dark dark:text-blushGold font-bold block mb-1">
                // LIVE ORDER BREAKDOWN
              </span>
              <h4 className="font-serif text-lg font-bold text-obsidian dark:text-linen-50">
                Your Studio Selection
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-obsidian/60 dark:text-linen-400">Treatment</span>
                <span className="font-bold text-obsidian dark:text-linen-100 text-right truncate max-w-[160px]">
                  {DISCIPLINES.find(d => d.id === selectedDiscipline)?.name}
                </span>
              </div>

              {selectedDiscipline !== 'permanent_jewelry' && selectedDiscipline !== 'repair_removal' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-obsidian/60 dark:text-linen-400">Shape</span>
                    <span className="font-semibold text-obsidian dark:text-linen-200">{selectedShape}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-obsidian/60 dark:text-linen-400">Length</span>
                    <span className="font-semibold text-obsidian dark:text-linen-200">
                      {NAIL_LENGTHS.find(l => l.id === selectedLength)?.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-obsidian/60 dark:text-linen-400">Art Tier</span>
                    <span className="font-semibold text-obsidian dark:text-linen-200">
                      {ART_TIERS.find(a => a.id === selectedArtTier)?.title.split(':')[0]}
                    </span>
                  </div>
                </>
              )}

              {selectedDiscipline === 'permanent_jewelry' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-obsidian/60 dark:text-linen-400">Precious Metal</span>
                    <span className="font-semibold text-obsidian dark:text-linen-200">
                      {selectedMetal === 'gold_filled' ? '14k Gold Filled' : 'Sterling Silver'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-obsidian/60 dark:text-linen-400">Item</span>
                    <span className="font-semibold text-obsidian dark:text-linen-200 capitalize">{selectedJewelryItem}</span>
                  </div>
                </>
              )}

              {inspoImage && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-obsidian/60 dark:text-linen-400">Inspo Photo</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Attached ✓</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-obsidian/60 dark:text-linen-400">Slot</span>
                <span className="font-semibold text-obsidian dark:text-linen-200">{selectedDate}</span>
              </div>
            </div>

            {/* FINANCIAL TOTAL */}
            <div className="pt-4 border-t border-linen-200 dark:border-obsidian-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-obsidian/60 dark:text-linen-400">Estimated Total</span>
                <span className="font-serif font-bold text-lg text-obsidian dark:text-linen-50">
                  ${currentTotal}.00
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-blushGold-dark dark:text-blushGold">
                <span>Deposit Required to Hold</span>
                <span className="font-mono font-bold">${depositAmount}.00</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-obsidian/50 dark:text-linen-400 pt-1 border-t border-linen-100 dark:border-obsidian-border/50">
                <span>Balance Due at Appointment</span>
                <span className="font-mono">${currentTotal - depositAmount}.00</span>
              </div>
            </div>

            {/* ARTIST GUARANTEE */}
            <div className="p-3.5 rounded-2xl bg-linen-50 dark:bg-obsidian-pure border border-linen-200 dark:border-obsidian-border flex items-start gap-3">
              <img
                src="/images/jenna-portrait.jpg"
                alt="Jenna Soule"
                className="w-10 h-10 rounded-full object-cover border border-blushGold/50 shrink-0"
              />
              <div className="text-[11px] space-y-0.5">
                <span className="font-bold text-obsidian dark:text-linen-100 block">Jenna Soule</span>
                <span className="text-obsidian/60 dark:text-linen-400 block">Licensed Tech & Certified Welder</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium block">4+ Years • 100% Retention Focus</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
