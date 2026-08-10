import React, { useState } from 'react';
import { Clock, X, Check, Infinity, ShieldAlert } from 'lucide-react';

export default function SleepTimer({ isOpen, onClose, activeTimer, onSelectTimer }) {
  if (!isOpen) return null;

  const options = [
    { label: '3-5 Hours Non-Stop Mode', value: 'nonstop', desc: 'Infinite Bollywood playback for long study, chill or sleep sessions' },
    { label: '15 Minutes', value: 15, desc: 'Stop playback after 15 mins' },
    { label: '30 Minutes', value: 30, desc: 'Stop playback after 30 mins' },
    { label: '1 Hour', value: 60, desc: 'Stop playback after 1 hour' },
    { label: '3 Hours', value: 180, desc: 'Stop playback after 3 hours' },
    { label: 'Turn Off Timer', value: null, desc: 'Normal continuous play' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-[Outfit]">
                Playback & Sleep Timer
              </h3>
              <p className="text-xs text-neutral-400">Select non-stop session duration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-pill text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {options.map((opt) => {
            const isSelected = activeTimer === opt.value;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  onSelectTimer(opt.value);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                    : 'glass-pill border-white/10 text-white hover:border-white/30'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    {opt.value === 'nonstop' && <Infinity className="w-4 h-4 text-amber-400" />}
                    {opt.label}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{opt.desc}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-amber-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl glass-pill text-neutral-300 font-semibold text-sm hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
