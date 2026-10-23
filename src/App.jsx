import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Palette, 
  DollarSign, 
  Clock, 
  Users, 
  UserCheck, 
  FileDown, 
  Wand2, 
  Menu, 
  X, 
  CheckCircle, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

import ThemeStudio from './components/ThemeStudio';
import BudgetEngine from './components/BudgetEngine';
import TimelineManager from './components/TimelineManager';
import VendorHub from './components/VendorHub';
import GuestRSVP from './components/GuestRSVP';
import PlannerModal from './components/PlannerModal';

import { generateCelebrationPlan } from './services/geminiService';
import { PRESET_EVENTS } from './data/presets';

export default function App() {
  const [activeTab, setActiveTab] = useState('theme'); // 'theme', 'budget', 'timeline', 'vendors', 'rsvp'
  const [currency, setCurrency] = useState('₹');
  const [apiKey, setApiKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [eventPlan, setEventPlan] = useState(null);

  // Initialize with premier wedding plan on startup
  useEffect(() => {
    handleInitDefault();
  }, []);

  const handleInitDefault = async () => {
    setIsGenerating(true);
    const initial = await generateCelebrationPlan({
      eventType: 'wedding',
      guestCount: 200,
      vibe: 'Opulent & Ethereal',
      budget: 1500000,
      currency: '₹',
      location: 'Grand Ballroom & Palace Gardens',
      additionalNotes: 'Champagne tower reception with midnight live saxophone solo.',
      apiKey: ''
    });
    setEventPlan(initial);
    setIsGenerating(false);
  };

  const handleGenerateNewPlan = async (params) => {
    setIsGenerating(true);
    try {
      const plan = await generateCelebrationPlan({
        ...params,
        currency,
        apiKey
      });
      setEventPlan(plan);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Error generating plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateBudgetBreakdown = (newBreakdown) => {
    setEventPlan(prev => ({
      ...prev,
      budgetBreakdown: newBreakdown
    }));
  };

  const handleUpdateTimeline = (newTimeline) => {
    setEventPlan(prev => ({
      ...prev,
      timeline: newTimeline
    }));
  };

  const handleUpdateVendors = (newVendors) => {
    setEventPlan(prev => ({
      ...prev,
      vendors: newVendors
    }));
  };

  const handleExportSummary = () => {
    window.print();
  };

  if (!eventPlan) {
    return (
      <div className="min-h-screen bg-[#07060B] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center animate-bounce">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">Initializing CelebrateAI Engine...</h2>
        <p className="text-xs text-slate-400">Synthesizing master celebration blueprints</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07060B] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/5 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-[1.5px] shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#0E0C1B] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-light" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-white font-serif-display">
                Celebrate<span className="text-purple-400">AI</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PRO COPILOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Intelligent Celebration & Event Engineering Platform</p>
          </div>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Currency Toggle */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-purple-500 font-mono"
            title="Switch display currency"
          >
            <option value="₹">₹ INR</option>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="£">£ GBP</option>
          </select>

          {/* Export Dossier */}
          <button
            onClick={handleExportSummary}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Brief</span>
          </button>

          {/* New Event Architect Modal Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Wand2 className="w-3.5 h-3.5 text-gold-light" />
            <span>New Blueprint</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Dynamic Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Master Blueprint</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              {eventPlan.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{eventPlan.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs">
              <span className="text-slate-400">Budget Limit: </span>
              <span className="font-mono font-bold text-purple-300">{currency} {Number(eventPlan.totalBudget).toLocaleString()}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs">
              <span className="text-slate-400">Capacity: </span>
              <span className="font-mono font-bold text-amber-300">{eventPlan.guestEstimate} Guests</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 border-b border-white/5 overflow-x-auto pb-2">
          {[
            { id: 'theme', label: '1. AI Theme & Concept', icon: Palette },
            { id: 'budget', label: '2. Dynamic Budget Matrix', icon: DollarSign },
            { id: 'timeline', label: '3. Countdown Timeline', icon: Clock },
            { id: 'vendors', label: '4. Vendor Coordination', icon: Users },
            { id: 'rsvp', label: '5. Guest Registry & RSVP', icon: UserCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab View Switcher */}
        <div className="pt-2">
          {activeTab === 'theme' && (
            <ThemeStudio 
              eventPlan={eventPlan} 
              onRegenerate={() => setIsModalOpen(true)} 
            />
          )}

          {activeTab === 'budget' && (
            <BudgetEngine 
              eventPlan={eventPlan} 
              onUpdateBudgetBreakdown={handleUpdateBudgetBreakdown}
              currency={currency}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineManager 
              eventPlan={eventPlan} 
              onUpdateTimeline={handleUpdateTimeline}
            />
          )}

          {activeTab === 'vendors' && (
            <VendorHub 
              eventPlan={eventPlan} 
              onUpdateVendors={handleUpdateVendors}
              currency={currency}
            />
          )}

          {activeTab === 'rsvp' && (
            <GuestRSVP 
              eventPlan={eventPlan}
              currency={currency}
            />
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-auto border-t border-white/5 py-6 px-4 lg:px-8 text-center text-xs text-slate-500 space-y-1">
        <p>Built with Google Antigravity for PromptWars Virtual Challenge 5 (Build with AI).</p>
        <p className="text-[11px] text-slate-600">Engineered with high-fidelity React, Tailwind CSS & Generative Intelligence.</p>
      </footer>

      {/* Blueprint Generator Modal */}
      <PlannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGeneratePlan={handleGenerateNewPlan}
        isGenerating={isGenerating}
        currency={currency}
        setCurrency={setCurrency}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    </div>
  );
}
