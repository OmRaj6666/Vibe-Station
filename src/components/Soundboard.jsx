import React, { useState } from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Volume2, Wind, Activity, Zap, Scissors, CloudRain, Radio, RotateCw, Coffee, Droplets, Bell, Feather, Music } from 'lucide-react';

const ICON_MAP = {
  Volume2: Volume2,
  Wind: Wind,
  Activity: Activity,
  Zap: Zap,
  Scissors: Scissors,
  CloudRain: CloudRain,
  Radio: Radio,
  RotateCw: RotateCw,
  Coffee: Coffee,
  Droplets: Droplets,
  Bell: Bell,
  Feather: Feather,
  Music: Music
};

export default function Soundboard({ soundItems }) {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePlaySFX = (item) => {
    setActiveBtn(item.id);
    audioEngine.playSFX(item.synthType);
    setTimeout(() => {
      setActiveBtn(null);
    }, 400);
  };

  return (
    <div className="glass-panel p-4 md:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 font-[Outfit] flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Interactive Soundboard
        </h4>
        <span className="text-[11px] text-neutral-400 font-medium">Tap to trigger SFX</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {soundItems.map((item) => {
          const IconComp = ICON_MAP[item.icon] || Volume2;
          const isActive = activeBtn === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handlePlaySFX(item)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-black border-amber-400 scale-95 shadow-lg shadow-amber-500/40 font-bold'
                  : 'glass-pill text-white hover:border-amber-400/50 hover:bg-white/10'
              }`}
            >
              <IconComp className={`w-5 h-5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
              <span className="text-xs font-semibold">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
