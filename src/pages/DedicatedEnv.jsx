import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneTransition from '../components/SceneTransition';
import AmbientParticles from '../components/AmbientParticles';
import ParallaxLayer from '../components/ParallaxLayer';
import MusicPlayer from '../components/MusicPlayer';
import Footer from '../components/Footer';
import { Volume2, Clock, VolumeX, Wind, Scissors, CloudRain, Zap, Bird, Sun, ChevronLeft } from 'lucide-react';

export default function DedicatedEnv({
  env,
  audioState,
  onHoverEnv,
  onSelectEnv,
  onGoHome
}) {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    handleNextTrack,
    handlePrevTrack,
    progress,
    currentTime,
    duration,
    seek,
    volume,
    changeVolume,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    sceneIndex
  } = audioState;

  const hornAudioRef = useRef(null);
  const scissorsAudioRef = useRef(null);
  const dryerAudioRef = useRef(null);
  const rainAudioRefs = useRef({});
  const morningAudioRefs = useRef({});
  const synthAudioCtxRef = useRef(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [activeSoundId, setActiveSoundId] = useState(null);

  // Real-time local clock (e.g. 11:43 am)
  const [timeString, setTimeString] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup all playing audio refs on unmount
  useEffect(() => {
    return () => {
      [hornAudioRef, scissorsAudioRef, dryerAudioRef].forEach(ref => {
        if (ref.current) ref.current.pause();
      });
      [...Object.values(rainAudioRefs.current), ...Object.values(morningAudioRefs.current)].forEach(audio => {
        if (audio) audio.pause();
      });
      if (synthAudioCtxRef.current) {
        synthAudioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Fluctuating live environment listener count simulation
  const [listenersCount, setListenersCount] = useState(() => {
    if (env.id === 'bus') return 332;
    if (env.id === 'salon') return 189;
    if (env.id === 'rain') return 412;
    return 275;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setListenersCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Stop all ambient/horn/scissors/dryer/rain/morning sound effects
  const stopAllSounds = () => {
    if (hornAudioRef.current) {
      hornAudioRef.current.pause();
      hornAudioRef.current.currentTime = 0;
    }
    if (scissorsAudioRef.current) {
      scissorsAudioRef.current.pause();
      scissorsAudioRef.current.currentTime = 0;
    }
    if (dryerAudioRef.current) {
      dryerAudioRef.current.pause();
      dryerAudioRef.current.currentTime = 0;
    }
    Object.values(rainAudioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    Object.values(morningAudioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    if (synthAudioCtxRef.current) {
      synthAudioCtxRef.current.close().catch(console.warn);
      synthAudioCtxRef.current = null;
    }
    setIsSoundPlaying(false);
    setActiveSoundId(null);
  };

  // Play rain track by index with sequential auto-advance
  const startRainTrack = (trackIndex) => {
    stopAllSounds();

    const rainTracks = [
      { id: 'rain_1', file: '/assets/rain_1.mp3' },
      { id: 'rain_2', file: '/assets/rain_2.mp3' },
      { id: 'rain_3', file: '/assets/rain_3.mp3' },
      { id: 'rain_4', file: '/assets/rain_4.mp3' },
    ];

    const trackInfo = rainTracks[trackIndex];
    if (!trackInfo) return;

    if (!rainAudioRefs.current[trackInfo.id]) {
      rainAudioRefs.current[trackInfo.id] = new Audio(trackInfo.file);
    }

    const audio = rainAudioRefs.current[trackInfo.id];
    audio.currentTime = 0;

    audio.onended = () => {
      const nextIndex = (trackIndex + 1) % rainTracks.length;
      startRainTrack(nextIndex);
    };

    audio.play().then(() => {
      setIsSoundPlaying(true);
      setActiveSoundId(trackInfo.id);
    }).catch(console.warn);
  };

  // Play morning track by index with sequential auto-advance
  const startMorningTrack = (trackIndex) => {
    stopAllSounds();

    const morningTracks = [
      { id: 'morning_1', file: '/assets/morning_1.mp3' },
      { id: 'morning_2', file: '/assets/morning_2.mp3' },
      { id: 'morning_3', file: '/assets/morning_3.mp3' },
      { id: 'morning_4', file: '/assets/morning_4.mp3' },
      { id: 'morning_5', file: '/assets/morning_5.mp3' },
    ];

    const trackInfo = morningTracks[trackIndex];
    if (!trackInfo) return;

    if (!morningAudioRefs.current[trackInfo.id]) {
      morningAudioRefs.current[trackInfo.id] = new Audio(trackInfo.file);
    }

    const audio = morningAudioRefs.current[trackInfo.id];
    audio.currentTime = 0;

    audio.onended = () => {
      const nextIndex = (trackIndex + 1) % morningTracks.length;
      startMorningTrack(nextIndex);
    };

    audio.play().then(() => {
      setIsSoundPlaying(true);
      setActiveSoundId(trackInfo.id);
    }).catch(console.warn);
  };

  // Start sound effect cleanly
  const startSoundEffect = (type, soundId) => {
    stopAllSounds();

    if (type === 'horn' || soundId === 'horn') {
      try {
        if (!hornAudioRef.current) {
          hornAudioRef.current = new Audio('/assets/truck_horn.mp3');
        }
        const audio = hornAudioRef.current;
        audio.onended = () => {
          setIsSoundPlaying(false);
          setActiveSoundId(null);
        };
        audio.currentTime = 0;
        audio.play().then(() => {
          setIsSoundPlaying(true);
          setActiveSoundId('horn');
        }).catch(console.warn);
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    if (soundId === 'scissors') {
      try {
        if (!scissorsAudioRef.current) {
          scissorsAudioRef.current = new Audio('/assets/scissors_cut.mp3');
        }
        if (!dryerAudioRef.current) {
          dryerAudioRef.current = new Audio('/assets/blow_dryer.mp3');
        }
        const scissors = scissorsAudioRef.current;
        const dryer = dryerAudioRef.current;

        scissors.currentTime = 0;
        dryer.currentTime = 0;

        scissors.onended = () => {
          dryer.play().then(() => {
            setIsSoundPlaying(true);
            setActiveSoundId('dryer');
          }).catch(console.warn);
        };

        dryer.onended = () => {
          setIsSoundPlaying(false);
          setActiveSoundId(null);
        };

        scissors.play().then(() => {
          setIsSoundPlaying(true);
          setActiveSoundId('scissors');
        }).catch(console.warn);
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    if (soundId === 'dryer') {
      try {
        if (!dryerAudioRef.current) {
          dryerAudioRef.current = new Audio('/assets/blow_dryer.mp3');
        }
        const audio = dryerAudioRef.current;
        audio.onended = () => {
          setIsSoundPlaying(false);
          setActiveSoundId(null);
        };
        audio.currentTime = 0;
        audio.play().then(() => {
          setIsSoundPlaying(true);
          setActiveSoundId('dryer');
        }).catch(console.warn);
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      synthAudioCtxRef.current = ctx;
      const now = ctx.currentTime;

      setIsSoundPlaying(true);
      setActiveSoundId(type);

      if (type === 'radio') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
        setTimeout(() => {
          setIsSoundPlaying(false);
          setActiveSoundId(null);
        }, 400);
      } else if (type === 'bell') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.50, now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
        setTimeout(() => {
          setIsSoundPlaying(false);
          setActiveSoundId(null);
        }, 1200);
      }
    } catch (e) {
      console.warn(e);
      setIsSoundPlaying(false);
      setActiveSoundId(null);
    }
  };

  // Direct Tap to Play / Tap to Pause toggle handler
  const handleSoundTap = (type, soundId, trackIndex) => {
    const effectiveId = soundId || type;

    if (isSoundPlaying && (activeSoundId === effectiveId || activeSoundId === type)) {
      stopAllSounds();
      return;
    }

    if (type === 'rain_track') {
      startRainTrack(trackIndex);
    } else if (type === 'morning_track') {
      startMorningTrack(trackIndex);
    } else {
      startSoundEffect(type, effectiveId);
    }
  };

  const currentScene = env.scenes[sceneIndex] || env.scenes[0];

  return (
    <div className="relative w-full min-h-screen md:h-screen bg-slate-950 text-white overflow-y-auto md:overflow-hidden flex flex-col justify-between select-none">
      {/* Automatic Per-Song Visual Scene Rotator Layer */}
      <ParallaxLayer depth={15} className="absolute inset-0">
        <SceneTransition
          scenes={env.scenes}
          currentSceneIndex={sceneIndex}
        />
      </ParallaxLayer>

      {/* Ambient Particle System Canvas */}
      <AmbientParticles envId={env.id} />

      {/* Color Accent Glow Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${env.gradient} opacity-40 pointer-events-none z-10`} />

      {/* Top Banner: Apple VisionOS Header Toolbar */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-16 md:pt-24 px-3 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left Side: Navigation & World Identity */}
        <div>
          <button
            onClick={onGoHome}
            className="apple-pill px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-wider text-neutral-200 hover:text-white mb-1 md:mb-2 flex items-center gap-1 transition-all cursor-pointer shadow-xl active:scale-95"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>BACK TO VIBE STATION</span>
          </button>

          <h2 className="text-2xl md:text-5xl font-black text-white font-[Outfit] tracking-tight text-glow">
            {env.name} WORLD
          </h2>
          <p className="text-[11px] md:text-sm text-amber-300 font-semibold mt-0.5">
            {currentScene.name} • <span className="text-neutral-300 font-normal">{currentScene.subtitle}</span>
          </p>
        </div>

        {/* Right Side: Pro Control Bar with Integrated Soundboard & Badges */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Real-time Clock Badge */}
          <div className="apple-pill px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-1.5 text-[11px] md:text-xs font-mono text-neutral-200 font-bold shadow-xl">
            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
            <span>{timeString || '11:43 am'}</span>
          </div>

          {/* Live Listener Count Badge */}
          <div className="apple-pill px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-[11px] md:text-xs text-neutral-200 font-bold shadow-xl">
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
            </span>
            <span>{listenersCount} {env.listenerLabel ? env.listenerLabel.replace(/^\d+\s*/, '') : 'live listeners'}</span>
          </div>

          {/* Integrated Apple Glass Soundboard Widget */}
          {env.id === 'salon' ? (
            <div className="flex items-center gap-2">
              {/* Button 1: Scissors Cut */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSoundTap('salon', 'scissors')}
                className={`apple-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white font-bold transition-all cursor-pointer shadow-xl ${
                  isSoundPlaying && activeSoundId === 'scissors'
                    ? 'border-amber-400 shadow-amber-500/30 bg-amber-400/20'
                    : 'border-white/20 hover:border-amber-400/60'
                }`}
              >
                <Scissors className={`w-3.5 h-3.5 ${isSoundPlaying && activeSoundId === 'scissors' ? 'text-amber-400 animate-spin-slow' : 'text-amber-400'}`} />
                <span className="text-[11px] md:text-xs font-bold">कैंची कट</span>
                <span className="text-[9px] text-amber-300">
                  {isSoundPlaying && activeSoundId === 'scissors' ? '(Playing...)' : '(1/2)'}
                </span>
              </motion.button>

              {/* Button 2: Blow Dryer */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSoundTap('salon', 'dryer')}
                className={`apple-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white font-bold transition-all cursor-pointer shadow-xl ${
                  isSoundPlaying && activeSoundId === 'dryer'
                    ? 'border-cyan-400 shadow-cyan-500/30 bg-cyan-400/20'
                    : 'border-white/20 hover:border-cyan-400/60'
                }`}
              >
                <Wind className={`w-3.5 h-3.5 ${isSoundPlaying && activeSoundId === 'dryer' ? 'text-cyan-400 animate-spin-slow' : 'text-cyan-400'}`} />
                <span className="text-[11px] md:text-xs font-bold">ब्लो ड्रायर</span>
                <span className="text-[9px] text-cyan-300">
                  {isSoundPlaying && activeSoundId === 'dryer' ? '(Playing...)' : '(2/2)'}
                </span>
              </motion.button>
            </div>
          ) : env.id === 'rain' ? (
            /* Rain 4-Track Soundboard Buttons */
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 md:gap-2 w-full sm:w-auto">
              {env.rainSounds && env.rainSounds.map((item, idx) => {
                const isActive = isSoundPlaying && activeSoundId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSoundTap('rain_track', item.id, idx)}
                    className={`apple-pill px-2.5 py-1.5 rounded-full flex items-center justify-center gap-1 text-white font-bold transition-all cursor-pointer shadow-xl ${
                      isActive
                        ? 'border-cyan-400 shadow-cyan-500/30 bg-cyan-400/20'
                        : 'border-white/20 hover:border-cyan-400/60'
                    }`}
                  >
                    {idx === 3 ? <Zap className="w-3 h-3 text-cyan-300" /> : <CloudRain className="w-3 h-3 text-cyan-300" />}
                    <span className="text-[10px] md:text-[11px] font-bold">{item.label}</span>
                    <span className="text-[8px] md:text-[9px] text-cyan-300">{isActive ? '• Playing' : `(${idx + 1}/4)`}</span>
                  </motion.button>
                );
              })}
            </div>
          ) : env.id === 'morning' ? (
            /* Morning 5-Track Soundboard Buttons */
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 md:gap-2 w-full sm:w-auto">
              {env.morningSounds && env.morningSounds.map((item, idx) => {
                const isActive = isSoundPlaying && activeSoundId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSoundTap('morning_track', item.id, idx)}
                    className={`apple-pill px-2.5 py-1.5 rounded-full flex items-center justify-center gap-1 text-white font-bold transition-all cursor-pointer shadow-xl ${
                      isActive
                        ? 'border-amber-400 shadow-amber-500/30 bg-amber-400/20'
                        : 'border-white/20 hover:border-amber-400/60'
                    }`}
                  >
                    {idx === 1 ? <Sun className="w-3 h-3 text-amber-300" /> : <Bird className="w-3 h-3 text-amber-300" />}
                    <span className="text-[10px] md:text-[11px] font-bold">{item.label}</span>
                    <span className="text-[8px] md:text-[9px] text-amber-300">{isActive ? '• Playing' : `(${idx + 1}/5)`}</span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            /* BUS World Pro Horn Sound Pill Button */
            env.soundBoxText && (
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSoundTap(env.soundType)}
                className={`apple-pill px-3.5 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-white font-bold transition-all cursor-pointer shadow-2xl group ${
                  isSoundPlaying
                    ? 'border-amber-400 shadow-amber-500/30 bg-amber-400/20'
                    : 'border-white/25 hover:border-amber-400/60'
                }`}
                title={isSoundPlaying ? "Tap to pause sound" : "Tap to play sound"}
              >
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSoundPlaying ? 'bg-amber-400 text-black' : 'bg-white/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-black'
                }`}>
                  {isSoundPlaying ? (
                    <VolumeX className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current animate-pulse" />
                  ) : (
                    <Volume2 className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                  )}
                </div>
                <div className="text-left">
                  <span className="block font-bold text-[11px] md:text-xs leading-tight">
                    {env.soundBoxText}
                  </span>
                  <span className="block text-[9px] md:text-[10px] text-amber-300 font-medium leading-tight">
                    {isSoundPlaying ? 'Playing... (Tap to pause)' : 'Tap to play'}
                  </span>
                </div>
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* Floating Bottom Dock Container: Fixed Apple Music Player + Micro Footer */}
      <div className="relative z-40 w-full pb-3 pt-6 md:pt-0 px-2 md:px-8 flex flex-col items-center gap-2 md:gap-3">
        {/* Docked Bottom Apple Music Player */}
        <div className="w-full max-w-4xl">
          <MusicPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onNext={handleNextTrack}
            onPrev={handlePrevTrack}
            progress={progress}
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
            volume={volume}
            onChangeVolume={changeVolume}
            isShuffle={isShuffle}
            onToggleShuffle={toggleShuffle}
            isRepeat={isRepeat}
            onToggleRepeat={toggleRepeat}
            accentColor={env.accentColor}
          />
        </div>

        {/* Minimal Micro Compact Glass Pill Footer */}
        <div className="w-full">
          <Footer onSelectEnv={onSelectEnv} onHoverEnv={onHoverEnv} compact={true} />
        </div>
      </div>
    </div>
  );
}
