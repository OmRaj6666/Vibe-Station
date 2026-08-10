import React, { useState, useEffect } from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Volume2, Wind, Activity, Zap, Scissors, CloudRain, Radio, RotateCw, Coffee, Droplets, Bell, Feather, Music, Sun, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Volume2, Wind, Activity, Zap, Scissors, CloudRain, Radio, RotateCw, Coffee, Droplets, Bell, Feather, Music, Sun
};

export default function InteractiveCanvas({ hotspots, envId, onTriggerHotspot }) {
  const [activeRipple, setActiveRipple] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleHotspotClick = (hs, e) => {
    e.stopPropagation();
    
    // Play SFX
    audioEngine.playSFX(hs.synthType);

    // Trigger visual ripple
    setActiveRipple({ id: hs.id, x: hs.x, y: hs.y });
    setToastMessage(`🔊 Triggered ${hs.label} (${hs.actionDesc})`);

    if (onTriggerHotspot) {
      onTriggerHotspot(hs);
    }

    setTimeout(() => {
      setActiveRipple(null);
    }, 600);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Toast Notification for Hotspot Action */}
      {toastMessage && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/90 text-amber-300 text-xs md:text-sm font-bold border border-amber-500/40 shadow-2xl backdrop-blur-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Hotspot Markers (hornokplease.xyz style) */}
      {hotspots && hotspots.map((hs) => {
        const IconComp = ICON_MAP[hs.icon] || Volume2;
        const isRippling = activeRipple && activeRipple.id === hs.id;

        return (
          <div
            key={hs.id}
            onClick={(e) => handleHotspotClick(hs, e)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
          >
            {/* Glowing Pulse Rings */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-10 h-10 rounded-full bg-amber-400/30 animate-ping" />
              <span className="absolute w-12 h-12 rounded-full border border-amber-400/50 group-hover:scale-125 transition-transform duration-300" />

              {/* Hotspot Icon Button */}
              <div className={`w-10 h-10 rounded-2xl glass-panel flex items-center justify-center border shadow-xl transition-all duration-300 ${
                isRippling
                  ? 'bg-amber-400 text-black scale-125 border-amber-300'
                  : 'bg-black/60 text-amber-300 border-amber-400/40 group-hover:bg-amber-500 group-hover:text-black group-hover:scale-110'
              }`}>
                <IconComp className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Hover Tooltip Label */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-xl bg-black/90 border border-white/20 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-2xl backdrop-blur-md">
              <span className="text-amber-400">{hs.label}</span>
              <span className="block text-[10px] text-neutral-400 font-normal">{hs.actionDesc}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
