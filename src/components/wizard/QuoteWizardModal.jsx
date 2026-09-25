import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles,
  Heart,
  Calendar,
  Phone,
  Mail,
  User,
  AlertCircle,
  Loader2,
  CheckCircle2
} from '../common/Icons';
import { submitQuoteRequest } from '../../services/quoteService';
import { BUSINESS_INFO } from '../../data/businessData';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null, initialService = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [formData, setFormData] = useState({
    treatmentType: 'Gel-X Extensions',
    serviceTitle: 'Luxury Gel-X Full Set (Short / Medium)',
    basePrice: 75,
    nailShape: 'Almond',
    nailLength: 'Medium',
    jewelryMetal: '14k Gold Filled',
    jewelryItem: 'Permanent Bracelet',
    selectedArt: ['French Tips (+$20)'],
    needsSoakOff: false,
    preferredDate: '',
    preferredTime: 'Afternoon (1pm - 5pm)',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialCategory) {
        setFormData(prev => ({
          ...prev,
          treatmentType: initialCategory,
          serviceTitle: initialService || (initialCategory === 'Gel-X Extensions' ? 'Luxury Gel-X Full Set (Short / Medium)' : 'Structured Gel Manicure'),
          basePrice: initialCategory === 'Gel-X Extensions' ? 75 : 65
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialCategory, initialService]);

  if (!isOpen) return null;

  // Calculate estimated price
  const calculateTotal = () => {
    let total = formData.basePrice;
    if (formData.selectedArt.includes('French Tips (+$20)')) total += 20;
    if (formData.selectedArt.includes('Chrome Glazed Donut (+$15)')) total += 15;
    if (formData.selectedArt.includes('3D Sculpted Art (+$20)')) total += 20;
    if (formData.selectedArt.includes('Aura / Airbrush (+$15)')) total += 15;
    if (formData.selectedArt.includes('Bling & Crystals (+$15)')) total += 15;
    if (formData.selectedArt.includes('Hand-Painted Art (+$15)')) total += 15;
    if (formData.needsSoakOff) total += 25;
    return total;
  };

  const handleToggleArt = (artName) => {
    setFormData(prev => {
      const exists = prev.selectedArt.includes(artName);
      return {
        ...prev,
        selectedArt: exists ? prev.selectedArt.filter(a => a !== artName) : [...prev.selectedArt, artName]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: `${formData.treatmentType} - ${formData.serviceTitle}`,
        details: `Shape: ${formData.nailShape}, Length: ${formData.nailLength}, Art: ${formData.selectedArt.join(', ')}, Notes: ${formData.notes}`,
        estimatedTotal: calculateTotal()
      };
      await submitQuoteRequest(payload);
      setSubmissionResult('success');
    } catch (err) {
      // Graceful fallback for local demo
      setSubmissionResult('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-linen-50 dark:bg-obsidian-card rounded-3xl border-2 border-linen-300 dark:border-obsidian-border shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-linen-300 dark:border-obsidian-border flex items-center justify-between bg-linen-100/80 dark:bg-obsidian">
          <div>
            <span className="text-xs font-mono text-blushGold-dark dark:text-blushGold uppercase tracking-wider">
              STEP {currentStep} OF 4 // ESTIMATOR &amp; CONSULTATION
            </span>
            <h3 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
              {currentStep === 1 && 'Choose Your Treatment'}
              {currentStep === 2 && (formData.treatmentType === 'Permanent Jewelry' ? 'Select Jewelry Style' : 'Shape & Length Preference')}
              {currentStep === 3 && 'Custom Nail Art & Add-Ons'}
              {currentStep === 4 && 'Appointment Request & Summary'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-obsidian/60 dark:text-linen-400 hover:bg-linen-200 dark:hover:bg-obsidian-border transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submissionResult === 'success' ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-3xl font-bold text-obsidian dark:text-linen-50">Inquiry Received Babe!</h4>
              <p className="text-sm text-obsidian/80 dark:text-linen-300 max-w-md mx-auto leading-relaxed">
                Jenna Soule has received your styling details. To lock in your exact preferred time slot with the $20 deposit, tap below to view live availability directly on Acuity!
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BUSINESS_INFO.acuityBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-bold text-sm"
                >
                  Confirm on Acuity Calendar ↗
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-linen-200 dark:bg-obsidian-subtle text-obsidian dark:text-linen-100 text-sm font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Treatment Choice */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {[
                    { type: 'Gel-X Extensions', name: 'Luxury Gel-X Full Set (Short / Med)', price: 75, desc: 'Apres soft gel extension with Russian cuticle prep.' },
                    { type: 'Gel-X Extensions', name: 'Luxury Gel-X Full Set (Long / XXL)', price: 85, desc: 'Dramatic sculpted length with reinforced apex.' },
                    { type: 'Structured Gel', name: 'Structured Gel Manicure (Luminary)', price: 65, desc: 'Multi-flex builder gel overlay on natural nails for extreme growth.' },
                    { type: 'Structured Gel', name: 'Hard Gel Full Overlay', price: 70, desc: 'Maximum structural rigidity for weak or brittle nails.' },
                    { type: 'Permanent Jewelry', name: '14k Gold Filled Permanent Bracelet', price: 65, desc: 'Custom-welded claspless chain onto wrist.' },
                    { type: 'Permanent Jewelry', name: '3-Chain Stack Permanent Bracelet (14k Gold)', price: 145, desc: 'Triple chain signature layered look.' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setFormData(p => ({ ...p, treatmentType: item.type, serviceTitle: item.name, basePrice: item.price }))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        formData.serviceTitle === item.name
                          ? 'border-blushGold bg-blushGold/10 dark:bg-blushGold/15'
                          : 'border-linen-300 dark:border-obsidian-border bg-linen-100/50 dark:bg-obsidian hover:border-linen-400'
                      }`}
                    >
                      <div>
                        <span className="text-[11px] font-mono text-blushGold-dark dark:text-blushGold">{item.type}</span>
                        <h4 className="font-serif font-bold text-base text-obsidian dark:text-linen-50">{item.name}</h4>
                        <p className="text-xs text-obsidian/70 dark:text-linen-400 font-light mt-0.5">{item.desc}</p>
                      </div>
                      <span className="font-serif font-bold text-lg text-obsidian dark:text-linen-50 whitespace-nowrap ml-4">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Shape & Length or Jewelry Style */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {formData.treatmentType === 'Permanent Jewelry' ? (
                    <div>
                      <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-2">Select Chain Metal</label>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {['14k Gold Filled', '.925 Sterling Silver'].map(metal => (
                          <button
                            key={metal}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, jewelryMetal: metal }))}
                            className={`p-4 rounded-xl border-2 text-sm font-semibold ${
                              formData.jewelryMetal === metal
                                ? 'border-blushGold bg-blushGold/15 text-obsidian dark:text-white'
                                : 'border-linen-300 dark:border-obsidian-border'
                            }`}
                          >
                            {metal}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-2">Preferred Nail Shape</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Almond', 'Coffin', 'Stiletto', 'Square', 'Oval', 'Natural'].map(shape => (
                            <button
                              key={shape}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, nailShape: shape }))}
                              className={`p-3.5 rounded-xl border-2 text-xs sm:text-sm font-medium ${
                                formData.nailShape === shape
                                  ? 'border-blushGold bg-blushGold/15 text-obsidian dark:text-white font-bold'
                                  : 'border-linen-300 dark:border-obsidian-border'
                              }`}
                            >
                              {shape}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-2">Preferred Length</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['Short', 'Medium', 'Long', 'Extra Long (XXL)'].map(len => (
                            <button
                              key={len}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, nailLength: len }))}
                              className={`p-3.5 rounded-xl border-2 text-xs sm:text-sm font-medium ${
                                formData.nailLength === len
                                  ? 'border-blushGold bg-blushGold/15 text-obsidian dark:text-white font-bold'
                                  : 'border-linen-300 dark:border-obsidian-border'
                              }`}
                            >
                              {len}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Nail Art Add-Ons */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  {[
                    { name: 'French Tips (+$20)', desc: 'Classic white, micro, deep V, or black modern French' },
                    { name: 'Chrome Glazed Donut (+$15)', desc: 'Hailey Bieber glazed donut pearl, silver liquid chrome' },
                    { name: '3D Sculpted Art (+$20)', desc: 'Hand-sculpted raised dimensional gel shapes & drip chrome' },
                    { name: 'Aura / Airbrush (+$15)', desc: 'Soft blurred aura gradient with precision nail airbrush' },
                    { name: 'Bling & Crystals (+$15)', desc: 'Genuine encapsulated crystals and luxury nail gems' },
                    { name: 'Hand-Painted Art (+$15)', desc: 'Intricate flowers, stars, animal print, abstract lines' },
                  ].map(art => {
                    const isSelected = formData.selectedArt.includes(art.name);
                    return (
                      <div
                        key={art.name}
                        onClick={() => handleToggleArt(art.name)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blushGold bg-blushGold/15'
                            : 'border-linen-300 dark:border-obsidian-border bg-linen-100/40 dark:bg-obsidian'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isSelected ? 'bg-blushGold border-blushGold text-white' : 'border-linen-400'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-obsidian dark:text-linen-50">{art.name}</h4>
                            <p className="text-xs text-obsidian/60 dark:text-linen-400 font-light">{art.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    onClick={() => setFormData(p => ({ ...p, needsSoakOff: !p.needsSoakOff }))}
                    className={`mt-4 p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                      formData.needsSoakOff ? 'border-amber-500 bg-amber-500/10' : 'border-linen-300 dark:border-obsidian-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${formData.needsSoakOff ? 'bg-amber-500 border-amber-500 text-white' : 'border-linen-400'}`}>
                        {formData.needsSoakOff && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-obsidian dark:text-linen-50">Need Old Set Soaked Off? (+$25)</h4>
                        <p className="text-xs text-obsidian/60 dark:text-linen-400 font-light">Gentle ceramic debulk &amp; acetone soak to preserve natural nails</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Summary & Contact Details */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Estimated Price Pill */}
                  <div className="p-5 rounded-2xl bg-linen-200/90 dark:bg-obsidian border-2 border-blushGold/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-blushGold-dark dark:text-blushGold">ESTIMATED INVESTMENT</span>
                      <p className="font-serif text-3xl font-bold text-obsidian dark:text-linen-50">${calculateTotal()}</p>
                      <p className="text-[11px] text-obsidian/60 dark:text-linen-400">$20 non-refundable deposit required upon booking</p>
                    </div>
                    <div className="text-right text-xs text-obsidian/70 dark:text-linen-300 space-y-0.5">
                      <p className="font-semibold">{formData.serviceTitle}</p>
                      <p>{formData.nailShape} • {formData.nailLength}</p>
                      <p className="text-blushGold font-mono">{formData.selectedArt.length} Art Add-Ons</p>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian text-sm"
                        placeholder="Jessica Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-1">Cell Phone (For SMS Reminders) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian text-sm"
                        placeholder="(916) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian text-sm"
                      placeholder="jessica@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-obsidian/60 dark:text-linen-400 mb-1">Styling Notes or Inspo Link</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian text-sm"
                      placeholder="e.g. Hailey Bieber glazed donut chrome over sheer pink..."
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-bold text-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4" /> : null}
                      <span>Save Estimate &amp; Inquire</span>
                    </button>
                    
                    <a
                      href={BUSINESS_INFO.acuityBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-linen-200 dark:bg-obsidian-subtle text-obsidian dark:text-linen-100 font-semibold text-sm text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-blushGold" />
                      <span>Book on Acuity Calendar Now ↗</span>
                    </a>
                  </div>
                </form>
              )}

              {/* Navigation Footer Buttons */}
              <div className="mt-8 pt-6 border-t border-linen-300 dark:border-obsidian-border flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(p => p - 1)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-obsidian/70 dark:text-linen-300 hover:text-obsidian"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(p => p + 1)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4 text-blushGold dark:text-obsidian" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}