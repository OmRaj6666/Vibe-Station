import React from 'react';
import Soundboard from './Soundboard';
import InteractiveCanvas from './InteractiveCanvas';
import { ChevronLeft, ChevronRight, RefreshCw, Radio, Sparkles, Youtube } from 'lucide-react';

export default function EnvironmentView({ 
  env, 
  songsPlayedCount, 
  currentSceneIndex, 
  onChangeScene,
  onOpenPlaylist
}) {
  const scenes = env.scenes;
  const currentScene = scenes[currentSceneIndex] || scenes[0];

  const songsUntilNextScene = 5 - (songsPlayedCount % 5);

  const handleNextScene = () => {
    const nextIdx = (currentSceneIndex + 1) % scenes.length;
    onChangeScene(nextIdx);
  };

  const handlePrevScene = () => {
    const prevIdx = (currentSceneIndex - 1 + scenes.length) % scenes.length;
    onChangeScene(prevIdx);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-4 md:p-8 pt-24 pb-32 select-none">
      {/* Background Image Scene Layer with Smooth Crossfade */}
      {scenes.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentSceneIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${scene.image})` }}
        />
      ))}

      {/* Interactive Canvas Hotspots (hornokplease.xyz interactive objects) */}
      <InteractiveCanvas
        hotspots={currentScene.hotspots}
        envId={env.id}
      />

      {/* Atmospheric Vignette & Color Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 pointer-events-none" />
      <div className={`absolute inset-0 bg-gradient-to-br ${env.gradient} opacity-40 pointer-events-none`} />

      {/* Rain Effect Animation for Bus and Rain environments */}
      {(env.id === 'rain' || env.id === 'bus') && (
        <div className="rain-animation" />
      )}

      {/* Light Mote animation for Morning & Salon */}
      {(env.id === 'morning' || env.id === 'salon') && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-amber-300/40 float-mote absolute top-3/4 left-1/4" />
          <div className="w-3 h-3 rounded-full bg-amber-400/30 float-mote absolute top-2/3 left-2/3 delay-1000" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50 float-mote absolute top-1/2 left-1/2 delay-500" />
        </div>
      )}

      {/* Top Banner: Environment Title & Scene Controls */}
      <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{env.name}</span>
            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
            <span>BOLLYWOOD AMBIENT</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit] tracking-tight text-glow">
            {currentScene.title}
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-medium">
            {currentScene.subtitle}
          </p>
        </div>

        {/* Scene Rotator Control & Indicators */}
        <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-4 border border-white/15">
          <button
            onClick={onOpenPlaylist}
            className="px-3.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30"
          >
            <Youtube className="w-4 h-4" />
            YouTube Playlist
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevScene}
              className="p-1.5 rounded-lg glass-pill text-neutral-300 hover:text-white"
              title="Previous Background Scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextScene}
              className="p-1.5 rounded-lg glass-pill text-neutral-300 hover:text-white"
              title="Next Background Scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scene Dots */}
          <div className="flex items-center gap-1.5">
            {scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onChangeScene(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSceneIndex
                    ? 'w-6 bg-amber-400 shadow-md shadow-amber-400/50'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                title={`Scene ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-right pl-2 border-l border-white/15 hidden md:block">
            <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Auto Scene Change</span>
            <span className="text-xs text-amber-300 font-extrabold flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              After {songsUntilNextScene} {songsUntilNextScene === 1 ? 'song' : 'songs'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Interactive Soundboard Overlay */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex justify-end">
        <div className="w-full sm:w-auto sm:min-w-[340px]">
          <Soundboard soundItems={env.soundboard} />
        </div>
      </div>
    </div>
  );
}
