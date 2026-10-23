import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Copy, 
  Check, 
  Music, 
  Shirt, 
  MapPin, 
  Compass, 
  Lightbulb,
  Share2
} from 'lucide-react';

export default function ThemeStudio({ eventPlan, onRegenerate }) {
  const [copiedHex, setCopiedHex] = useState(null);
  const theme = eventPlan?.theme || {};
  const palette = theme?.colorPalette || [];

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Theme Summary Header */}
      <div className="glass-panel rounded-2xl p-6 lg:p-8 relative overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-card to-card">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span>AI Conceptual Architecture</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif-display">
              {theme.name || "Bespoke Royal Aesthetic"}
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
              {theme.vibe || "Atmospheric, refined, and meticulously tailored for celebratory excellence."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const summary = `${eventPlan.title} - ${theme.name}\nTheme: ${theme.vibe}\nDecor: ${theme.decorStyle}`;
                navigator.clipboard.writeText(summary);
                alert("Theme details copied to clipboard!");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Share Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* Color Palette Swatches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Signature Color Palette</h3>
              <p className="text-xs text-slate-400">Curated chromatic balance. Click any swatch to copy HEX.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {palette.length} Primary Harmonizers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {palette.map((color, index) => (
            <div
              key={index}
              onClick={() => handleCopyHex(color.hex)}
              className="group glass-card glass-card-hover rounded-xl p-3.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div 
                className="w-full h-20 rounded-lg shadow-inner relative transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-2 right-2 p-1.5 rounded-md bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedHex === color.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 truncate">{color.name}</span>
                  <span className="text-[10px] font-mono text-purple-300/80 uppercase">{color.hex}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {color.role || "Accent accentuation"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aesthetic Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Decor & Scenography */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Decor & Scenography</h4>
              <p className="text-xs text-slate-400">Spatial spatial layout</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
            {theme.decorStyle || "Cascading floral installations, warm amber filament bulbs, and textured drapery."}
          </p>
        </div>

        {/* Sonic Atmosphere & Playlist */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Sonic Atmosphere</h4>
              <p className="text-xs text-slate-400">Audio vibe & progression</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
            {theme.musicAtmosphere || "Curated acoustic cadence building into high-vibrancy celebratory sets."}
          </p>
        </div>

        {/* Guest Dress Code */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Guest Dress Code</h4>
              <p className="text-xs text-slate-400">Styling & attire directive</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
            {theme.dressCodePrompt || "Black-Tie with rich jewel-toned accessories and elegant formal footwear."}
          </p>
        </div>
      </div>

      {/* Pro Tips Section */}
      <div className="glass-card rounded-2xl p-5 border border-purple-500/20 bg-purple-950/20 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h5 className="text-sm font-bold text-purple-200">Director's Production Tip</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ensure lighting dimmers are calibrated to match the color temperature of your champagne swatches ({palette[1]?.hex || '#FDE68A'}) during dinner hour for seamless photo captures.
          </p>
        </div>
      </div>
    </div>
  );
}
