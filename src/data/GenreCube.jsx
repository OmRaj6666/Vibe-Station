import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Sparkles } from 'lucide-react';

export default function GenreCube({ genres, activeGenre, onSelectGenre, accentColor }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-6">
      {genres.map((genre) => {
        const isSelected = activeGenre === genre;
        return (
          <motion.button
            key={genre}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectGenre(genre)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 backdrop-blur-xl shadow-lg ${
              isSelected
                ? 'bg-slate-900/90 text-white border-amber-400 shadow-amber-500/30'
                : 'glass-pill border-white/15 text-neutral-300 hover:text-white hover:border-white/30'
            }`}
            style={{
              borderColor: isSelected ? accentColor : undefined,
              boxShadow: isSelected ? `0 0 20px ${accentColor}55` : undefined
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: isSelected ? accentColor : '#9ca3af' }} />
            <span>{genre}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
