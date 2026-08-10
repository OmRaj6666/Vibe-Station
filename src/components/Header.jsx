import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function Header({ 
  activeEnvId, 
  onSelectEnv, 
  onGoHome
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavItems = [
    { id: null, label: 'HOME', isHome: true },
    { id: 'bus', label: 'BUS' },
    { id: 'salon', label: 'SALON' },
    { id: 'rain', label: 'RAIN' },
    { id: 'morning', label: 'MORNING' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-3.5 px-1.5 sm:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto gap-1 sm:gap-3">
        {/* Equalizer Soundwave Glass Badge Logo */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-1 sm:gap-3 cursor-pointer group select-none apple-glass px-2 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-2xl backdrop-blur-3xl shrink-0 active:scale-95 transition-transform"
        >
          {/* Audio Wave Equalizer Animated Icon Box */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-sky-500 via-amber-400 to-orange-500 opacity-60 group-hover:opacity-100 blur-md transition duration-500 group-hover:scale-110" />
            
            <div className="relative w-5 h-5 sm:w-8 sm:h-8 rounded-xl bg-slate-950/90 border border-white/20 flex items-center justify-center p-1 backdrop-blur-2xl shadow-xl">
              {/* Live Pulsing Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-3 sm:h-4">
                <span className="w-0.5 bg-sky-400 rounded-full animate-bounce h-full" style={{ animationDelay: '0.1s' }} />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-3/4" style={{ animationDelay: '0.3s' }} />
                <span className="w-0.5 bg-orange-400 rounded-full animate-bounce h-full" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-cyan-400 rounded-full animate-bounce h-1/2" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <h1 className="text-xs sm:text-lg font-black tracking-wider font-[Outfit] text-white">
                VIBE
              </h1>
              <span className="hidden xs:inline-block px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-black text-[9px] sm:text-[10px] font-black tracking-wider uppercase shadow-md">
                STATION
              </span>
            </div>
          </div>
        </div>

        {/* VisionOS / Apple Glass Pill Navigation Bar - Perfect Mobile Fit */}
        <nav className="p-1 px-1.5 sm:px-2 rounded-full apple-glass border border-white/20 backdrop-blur-3xl shadow-2xl flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none max-w-full">
          {allNavItems.map((item) => {
            const isActive = activeEnvId === item.id;
            return (
              <button
                key={item.label}
                onClick={() => (item.isHome ? onGoHome() : onSelectEnv(item.id))}
                className={`relative px-1.5 xs:px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-black font-[Outfit] tracking-tight sm:tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer shrink-0 active:scale-95 ${
                  isActive ? 'text-black font-extrabold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-0.5 sm:gap-1">
                  {item.isHome && <Home className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />}
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
