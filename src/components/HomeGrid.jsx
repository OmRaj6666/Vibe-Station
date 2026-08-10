import React from 'react';
import { ENVIRONMENTS } from '../data/environments';
import { Play, Sparkles, Music, Sliders, Radio, Volume2, ShieldCheck, Heart } from 'lucide-react';

export default function HomeGrid({ onSelectEnv }) {
  return (
    <div className="min-h-screen pt-28 pb-36 px-4 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
      {/* Hero Header Badge & Title */}
      <div className="text-center max-w-3xl mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-semibold mb-6 shadow-lg shadow-amber-500/10">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>ALL FROM BOLLYWOOD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>LO-FI & AMBIENT EXPERIENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-[Outfit] text-white leading-tight mb-6">
          Tune Into Your <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent text-glow">
            Nostalgic Vibe Station
          </span>
        </h1>

        <p className="text-base md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto">
          Immerse yourself in authentic Indian atmospheres. Combine 3-5 hr non-stop Bollywood chill tracks with procedural rain, bus horns, vintage salon radios & morning bells.
        </p>
      </div>

      {/* 4 Environment Grid Cards (Page 1 layout as requested) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
        {ENVIRONMENTS.map((env) => {
          const mainScene = env.scenes[0];
          return (
            <div
              key={env.id}
              onClick={() => onSelectEnv(env.id)}
              className="group relative cursor-pointer glass-card p-6 md:p-8 flex flex-col justify-between min-h-[380px] overflow-hidden"
            >
              {/* Background Cover Image with Hover Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-60"
                style={{ backgroundImage: `url(${mainScene.image})` }}
              />

              {/* Gradient Overlay for Readability */}
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${env.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />

              {/* Card Top Details */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 border border-white/15 text-white backdrop-blur-md">
                  {env.playlist.length} Tracks • 3-5h Non-Stop
                </span>

                <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 shadow-xl">
                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                </div>
              </div>

              {/* Card Bottom Details */}
              <div className="relative z-10 pt-16">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{env.icon === 'Bus' ? '🚌' : env.icon === 'Scissors' ? '💈' : env.icon === 'CloudRain' ? '🌧️' : '🌅'}</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white font-[Outfit]">
                    {env.name}
                  </h3>
                </div>

                <p className="text-amber-300 font-semibold text-sm mb-3">
                  {env.subTitle}
                </p>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 line-clamp-2">
                  {env.tagline}
                </p>

                {/* Soundboard badges preview */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs text-neutral-400 font-medium">Sound SFX:</span>
                  {env.soundboard.map((item) => (
                    <span
                      key={item.id}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 text-neutral-200 backdrop-blur-sm border border-white/10"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Showcase Banner */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-10 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">3-5 Hour Non-Stop Music</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated Bollywood lo-fi, acoustic and classic hits played seamlessly without interruption.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Dynamic Scene Rotator</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Background automatically switches high-res scenes every 5 songs or on scroll.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Interactive Soundboard</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tap bus horns, scissor snipping, thunder, birds, temple bells and chai sips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
