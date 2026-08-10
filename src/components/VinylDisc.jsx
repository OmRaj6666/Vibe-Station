import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Music } from 'lucide-react';

export default function VinylDisc({ cover, isPlaying, accentColor }) {
  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Music-Reactive Glowing Backdrop Halo */}
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.08, 1] : 1,
          opacity: isPlaying ? [0.4, 0.7, 0.4] : 0.2
        }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full filter blur-2xl pointer-events-none"
        style={{ backgroundColor: accentColor || '#f59e0b' }}
      />

      {/* Outer Vinyl Record Disc */}
      <div
        className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-transform duration-700 ${
          isPlaying ? 'animate-spin-slow shadow-amber-500/20' : ''
        }`}
        style={{
          boxShadow: `0 0 40px rgba(0, 0, 0, 0.8), 0 0 30px ${accentColor}33`
        }}
      >
        {/* Vinyl Grooves Texture */}
        <div className="absolute inset-2 rounded-full border border-neutral-800/80 pointer-events-none" />
        <div className="absolute inset-5 rounded-full border border-neutral-800/60 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-neutral-800/40 pointer-events-none" />
        <div className="absolute inset-12 rounded-full border border-neutral-800/30 pointer-events-none" />

        {/* Center Album Artwork Label */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-neutral-900 shadow-inner flex items-center justify-center bg-slate-950">
          {cover ? (
            <img src={cover} alt="Vinyl Center" className="w-full h-full object-cover" />
          ) : (
            <Disc className="w-10 h-10 text-amber-400" />
          )}

          {/* Center Spindle Hole */}
          <div className="absolute w-4 h-4 rounded-full bg-slate-950 border-2 border-neutral-600 shadow-md" />
        </div>
      </div>
    </div>
  );
}
