import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer({ onSelectEnv, onHoverEnv, compact = false }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const soundWorlds = [
    {
      id: 'bus',
      name: 'BUS',
      subtitle: 'Late-night highways · distant headlights',
      color: '#38bdf8',
      hoverLabel: 'ENTER BUS',
      gradient: 'from-sky-500/10 via-transparent to-transparent'
    },
    {
      id: 'salon',
      name: 'SALON',
      subtitle: 'Warm lights & old mirrors · quiet conversations',
      color: '#f59e0b',
      hoverLabel: 'ENTER SALON',
      gradient: 'from-amber-500/10 via-transparent to-transparent'
    },
    {
      id: 'rain',
      name: 'RAIN',
      subtitle: 'Heavy rain · wet streets · warm chai',
      color: '#06b6d4',
      hoverLabel: 'ENTER RAIN',
      gradient: 'from-cyan-500/10 via-transparent to-transparent'
    },
    {
      id: 'morning',
      name: 'MORNING',
      subtitle: 'First light · open windows · soft melodies',
      color: '#f97316',
      hoverLabel: 'ENTER MORNING',
      gradient: 'from-orange-500/10 via-transparent to-transparent'
    }
  ];

  // Compact Minimal Micro-Footer for Dedicated Environment View (Without Pills)
  if (compact) {
    return (
      <footer className="relative w-full py-4 px-4 md:px-8 text-neutral-400 select-none z-30">
        <div className="max-w-7xl mx-auto glass-panel px-6 py-2.5 rounded-full border border-white/15 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs bg-slate-950/80 shadow-2xl">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-black text-white font-[Outfit] tracking-wider text-sm">VIBE STATION</span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-amber-300 font-semibold text-xs hidden sm:inline font-mono">"Where places become music."</span>
          </div>

          {/* Creator Credits */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <a
              href="https://www.linkedin.com/in/om-raj-vit/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-200 hover:text-white cursor-pointer transition-colors"
            >
              © Om Raj
            </a>
            <span className="text-neutral-600">•</span>
            <span>
              ✦ Inspired by{' '}
              <a
                href="https://www.linkedin.com/in/raj-ujjwal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 font-bold hover:underline cursor-pointer hover:text-amber-200"
              >
                Ujjwal Raj
              </a>
            </span>
          </div>
        </div>
      </footer>
    );
  }

  // Full Standard Footer for Homepage
  return (
    <footer className="relative w-full bg-slate-950 border-t border-white/10 pt-20 pb-12 px-6 md:px-12 text-neutral-400 select-none overflow-hidden">
      {/* Glow Ambient Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid: Brand Identity & Sound Worlds Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            {/* Equalizer Soundwave Glass Badge Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3.5 group cursor-pointer select-none">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500 via-amber-400 to-orange-500 opacity-60 group-hover:opacity-100 blur-md transition duration-500 group-hover:scale-110" />
                
                <div className="relative w-11 h-11 rounded-2xl bg-slate-950/90 border border-white/20 flex items-center justify-center p-2 backdrop-blur-2xl shadow-2xl">
                  {/* Live Pulsing Equalizer Bars */}
                  <div className="flex items-end gap-0.5 h-5">
                    <span className="w-1 bg-sky-400 rounded-full animate-bounce h-full" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3/4" style={{ animationDelay: '0.3s' }} />
                    <span className="w-1 bg-orange-400 rounded-full animate-bounce h-full" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-1/2" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-black tracking-[0.15em] font-[Outfit] text-white">
                    VIBE
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-black text-xs font-black tracking-widest uppercase shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                    STATION
                  </span>
                </div>
              </div>
            </div>

            <p className="text-base font-semibold bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent inline-block font-mono">
              "Where places become music."
            </p>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              An immersive 4-world music experience designed with smooth scroll-based audio/visual crossfading, rotating vinyl centerpieces, and continuous ambient playlists.
            </p>
          </div>

          {/* High-End Sound Worlds Section (Awwwards Design Spec Layout) */}
          <div className="lg:col-span-7">
            {/* Yellow Circle Icon + SOUND ENVIRONMENTS + EXPLORE → */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/20">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  SOUND ENVIRONMENTS
                </h4>
              </div>

              <button
                onClick={() => onSelectEnv('bus')}
                className="text-xs font-extrabold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Recommended Final Structure Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {soundWorlds.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectEnv(item.id)}
                  onMouseEnter={() => onHoverEnv && onHoverEnv(item.hoverLabel)}
                  onMouseLeave={() => onHoverEnv && onHoverEnv(null)}
                  className="group relative cursor-pointer glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[96px] bg-slate-950/80 shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Top Header: Hollow Circle Dot + White Title */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full border border-white/40 group-hover:border-amber-400 inline-block transition-colors" />
                      <h5 className="text-xs font-extrabold text-white tracking-wider group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </h5>
                    </div>

                    {/* Environment Identity Dot */}
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-150 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* Description: Muted Gray Typography */}
                  <p className="relative z-10 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-300 transition-colors pl-4 leading-relaxed">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* High-End Bottom Bar: Glass Pill Container */}
        <div className="mt-8 glass-panel p-4 md:p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-medium shadow-2xl backdrop-blur-2xl">
          {/* Creator Credits Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/om-raj-vit/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-200 font-bold transition-all hover:text-white hover:border-amber-400/40 cursor-pointer"
            >
              © Om Raj
            </a>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300 font-semibold">
              ✦ Inspired by the design work of{' '}
              <a
                href="https://www.linkedin.com/in/raj-ujjwal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 font-bold hover:underline cursor-pointer transition-colors hover:text-amber-200"
              >
                Ujjwal Raj
              </a>
            </span>
          </div>

          {/* Authentic Live Stream Status Badge */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold shadow-lg shadow-emerald-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Live Stream</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 text-xs font-extrabold transition-all border border-white/15 shadow-xl"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
