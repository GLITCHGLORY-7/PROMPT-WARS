import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Settings2, 
  ChevronRight, 
  Key, 
  DollarSign, 
  Users, 
  Calendar, 
  Compass, 
  MapPin, 
  CheckCircle,
  Wand2
} from 'lucide-react';

const EVENT_PRESET_OPTIONS = [
  { id: 'wedding', label: 'Luxury Wedding Gala', desc: 'Bespoke elegance, royal palette & floral arches' },
  { id: 'birthday', label: 'Milestone Rooftop Soirée', desc: 'Chic cocktail celebration with live music' },
  { id: 'corporate', label: 'Apex Innovation Summit', desc: 'Executive keynote symposium & VIP networking' },
  { id: 'community', label: 'Eco Carnival & Festival', desc: 'Lively open-air cultural celebration' },
];

const VIBE_CHIPS = [
  'Opulent & Ethereal',
  'Minimalist Chic',
  'Cyberpunk Neon',
  'Romantic Vintage',
  'Bohemian Organic',
  'High-Energy Festival',
  'Corporate Prestigious'
];

export default function PlannerModal({
  isOpen,
  onClose,
  onGeneratePlan,
  isGenerating,
  currency,
  setCurrency,
  apiKey,
  setApiKey
}) {
  const [eventType, setEventType] = useState('wedding');
  const [guestCount, setGuestCount] = useState(150);
  const [budget, setBudget] = useState(75000);
  const [vibe, setVibe] = useState('Opulent & Ethereal');
  const [location, setLocation] = useState('Palace Ballroom / Waterfront Estate');
  const [notes, setNotes] = useState('Emphasis on candlelit ambient lighting and guest champagne reception.');
  const [showApiInput, setShowApiInput] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGeneratePlan({
      eventType,
      guestCount,
      budget,
      vibe,
      location,
      additionalNotes: notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel rounded-3xl p-6 lg:p-8 w-full max-w-2xl border border-purple-500/30 space-y-6 my-8 bg-[#0C0B17] relative">
        {/* Glow Element */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span>AI Celebration Architect</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight font-serif-display">
              Configure New Celebration Blueprint
            </h3>
            <p className="text-xs text-slate-400">
              Specify your event parameters. CelebrateAI will architect themes, budget splits, timelines & vendor checklists.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Event Archetype Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Event Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EVENT_PRESET_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setEventType(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    eventType === opt.id
                      ? 'bg-purple-900/30 border-purple-500/60 shadow-lg shadow-purple-600/20'
                      : 'bg-black/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scale & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Currency */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="₹">₹ INR (Rupees)</option>
                <option value="$">$ USD (Dollars)</option>
                <option value="€">€ EUR (Euros)</option>
                <option value="£">£ GBP (Pounds)</option>
                <option value="AED">AED (Dirhams)</option>
              </select>
            </div>

            {/* Total Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Total Budget
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Guest Count
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Vibe Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Atmospheric Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {VIBE_CHIPS.map((chip) => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => setVibe(chip)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    vibe === chip
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-black/30 text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Extra Directives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Preferred Venue Setting
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Heritage Fort, Beachfront Resort"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Bespoke Directive / Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Vegetarian feast, fireworks finale"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Optional Gemini API Key Drawer */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1.5 font-semibold"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{showApiInput ? 'Hide Gemini API Settings' : 'Custom Google Gemini API Key (Optional)'}</span>
            </button>

            {showApiInput && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <input
                  type="password"
                  placeholder="AIzaSy... (Leave blank to use built-in executive engine)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  If left blank, CelebrateAI automatically utilizes its high-fidelity algorithmic generative intelligence model with zero external dependencies.
                </p>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-4 h-4 animate-spin text-gold-light" />
                  <span>Synthesizing Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold-light" />
                  <span>Generate Event Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
