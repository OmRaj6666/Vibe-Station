import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

export default function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev,
  progress,
  currentTime,
  duration,
  onSeek,
  volume,
  onChangeVolume,
  isShuffle,
  onToggleShuffle,
  isRepeat,
  onToggleRepeat,
  accentColor
}) {
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto apple-glass p-3.5 md:p-4 rounded-[32px] border border-white/20 shadow-2xl backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5 select-none bg-slate-950/80">
      {/* Left: Rotating Circular Vinyl Album Cover */}
      <div className="flex items-center gap-3.5 w-full md:w-auto">
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0 shadow-2xl group">
          {/* Rotating Cover Artwork */}
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-full object-cover rounded-full ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          />
          {/* Central Vinyl Hole */}
          <div className="w-3 h-3 rounded-full bg-slate-950 border border-white/50 absolute inset-0 m-auto z-10 shadow-inner" />
        </div>

        {/* Mobile View Title & Artist Info */}
        <div className="md:hidden flex-1 min-w-0">
          <h3 className="text-sm font-black text-white font-[Outfit] truncate">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-neutral-300 font-medium truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Center: Title, Artist, Progress Bar & Time */}
      <div className="flex-1 w-full min-w-0 flex flex-col justify-center">
        {/* Desktop View Title & Artist */}
        <div className="hidden md:flex items-center justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-black text-white font-[Outfit] truncate tracking-tight">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-neutral-300 font-medium truncate">
              {currentTrack.artist}
            </p>
          </div>

          <span className="text-[11px] font-mono text-neutral-300 font-bold flex-shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Progress Slider */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress || 0}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer focus:outline-none transition-all"
            style={{ accentColor: '#ffffff' }}
          />
        </div>

        {/* Mobile Time Indicator */}
        <div className="flex md:hidden justify-between text-[10px] font-mono text-neutral-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Controls: Shuffle, Prev, Play/Pause, Next, Repeat */}
      <div className="flex items-center justify-center gap-3 flex-shrink-0">
        {/* Shuffle Button */}
        <button
          onClick={onToggleShuffle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isShuffle
              ? 'bg-amber-400 text-black shadow-lg font-bold'
              : 'bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20'
          }`}
          title="Shuffle"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-200 hover:text-white transition-transform hover:scale-110 active:scale-90"
          title="Previous Track"
        >
          <SkipBack className="w-4 h-4 fill-current" />
        </button>

        {/* Play/Pause Center Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onTogglePlay}
          className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-2xl transition-all cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          )}
        </motion.button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-200 hover:text-white transition-transform hover:scale-110 active:scale-90"
          title="Next Track"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>

        {/* Repeat Button */}
        <button
          onClick={onToggleRepeat}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isRepeat
              ? 'bg-amber-400 text-black shadow-lg font-bold'
              : 'bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20'
          }`}
          title="Repeat"
        >
          <Repeat className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
