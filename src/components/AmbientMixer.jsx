import React, { useState } from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Sliders, X, Volume2, Music, CloudRain, Zap, Check } from 'lucide-react';

export default function AmbientMixer({ isOpen, onClose }) {
  const [master, setMaster] = useState(0.85);
  const [music, setMusic] = useState(0.8);
  const [ambient, setAmbient] = useState(0.5);
  const [sfx, setSfx] = useState(0.7);

  if (!isOpen) return null;

  const handleMaster = (e) => {
    const v = parseFloat(e.target.value);
    setMaster(v);
    audioEngine.setVolumes({ master: v });
  };

  const handleMusic = (e) => {
    const v = parseFloat(e.target.value);
    setMusic(v);
    audioEngine.setVolumes({ music: v });
  };

  const handleAmbient = (e) => {
    const v = parseFloat(e.target.value);
    setAmbient(v);
    audioEngine.setVolumes({ ambient: v });
  };

  const handleSfx = (e) => {
    const v = parseFloat(e.target.value);
    setSfx(v);
    audioEngine.setVolumes({ sfx: v });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-[Outfit]">
                Ambient Sound Mixer
              </h3>
              <p className="text-xs text-neutral-400">Balance music & background audio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-pill text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Sliders */}
        <div className="space-y-5 mb-6">
          {/* Master Volume */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2 text-white">
              <span className="flex items-center gap-1.5"><Volume2 className="w-4 h-4 text-amber-400" /> Master Volume</span>
              <span>{Math.round(master * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={master}
              onChange={handleMaster}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Music Volume */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2 text-white">
              <span className="flex items-center gap-1.5"><Music className="w-4 h-4 text-orange-400" /> Bollywood Music</span>
              <span>{Math.round(music * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={music}
              onChange={handleMusic}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Environment Ambience Volume */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2 text-white">
              <span className="flex items-center gap-1.5"><CloudRain className="w-4 h-4 text-cyan-400" /> Environment Ambience</span>
              <span>{Math.round(ambient * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ambient}
              onChange={handleAmbient}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Soundboard SFX Volume */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2 text-white">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-pink-400" /> Soundboard SFX</span>
              <span>{Math.round(sfx * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sfx}
              onChange={handleSfx}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Done button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl glow-btn text-black font-bold text-sm flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Apply & Close Mixer
        </button>
      </div>
    </div>
  );
}
