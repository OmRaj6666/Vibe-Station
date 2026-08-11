import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ENVIRONMENTS } from '../data/environments';
import ParallaxLayer from '../components/ParallaxLayer';
import AmbientParticles from '../components/AmbientParticles';
import Footer from '../components/Footer';
import { Play, ArrowDown, ChevronRight } from 'lucide-react';

export default function Home({ 
  onSelectEnv, 
  onHoverEnv, 
  activeEnvId, 
  onSectionScroll 
}) {
  const sectionRefs = useRef([]);
  const [listenerCounts, setListenerCounts] = useState({
    bus: 1420,
    salon: 890,
    rain: 2150,
    morning: 1780
  });

  // Smooth real-time listener count simulation per environment
  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCounts(prev => ({
        bus: prev.bus + (Math.floor(Math.random() * 3) - 1),
        salon: prev.salon + (Math.floor(Math.random() * 3) - 1),
        rain: prev.rain + (Math.floor(Math.random() * 3) - 1),
        morning: prev.morning + (Math.floor(Math.random() * 3) - 1)
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver to detect current active section on scroll & trigger audio/visual crossfade
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const envId = entry.target.getAttribute('data-env-id');
          if (envId && onSectionScroll) {
            onSectionScroll(envId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [onSectionScroll]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-x-hidden select-none">
      {/* 4 Fullscreen World Sections */}
      {ENVIRONMENTS.map((env, index) => {
        const mainScene = env.scenes[0];

        return (
          <section
            key={env.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-env-id={env.id}
            className="relative w-full min-h-[100dvh] sm:h-screen snap-start overflow-hidden flex flex-col justify-between p-4 sm:p-12 pt-16 sm:pt-28 pb-8 sm:pb-12 select-none"
          >
            {/* Background Image Scene with Parallax */}
            <ParallaxLayer depth={20} className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-1000 transform scale-105"
                style={{ backgroundImage: `url(${mainScene.image})` }}
              />
            </ParallaxLayer>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70 z-0" />
            <div className={`absolute inset-0 bg-gradient-to-br ${env.gradient} opacity-50 z-0`} />

            {/* Ambient Particle System for Active World */}
            <AmbientParticles envId={env.id} />

            {/* World Header Info */}
            <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="apple-pill px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white backdrop-blur-md inline-block shadow-xl"
                  style={{ borderColor: `${env.accentColor}88` }}
                >
                  {env.identity}
                </motion.span>

                {/* Real-time Listener Status Badge */}
                <div className="apple-pill px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-200 font-bold shadow-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{(listenerCounts[env.id] || 1200).toLocaleString()} {env.listenerLabel ? env.listenerLabel.replace(/^\d+\s*/, '') : 'live listeners'}</span>
                </div>
              </div>

              {/* Scroll Down Indicator */}
              {index < 3 && (
                <div className="hidden md:flex items-center gap-2 text-xs font-bold text-neutral-300 animate-bounce">
                  <span>SCROLL FOR NEXT WORLD</span>
                  <ArrowDown className="w-4 h-4 text-amber-400" />
                </div>
              )}
            </div>

            {/* World Title & Tagline Content */}
            <div className="relative z-20 max-w-7xl mx-auto w-full py-4 sm:py-8 flex flex-col items-start justify-end gap-2 sm:gap-4 my-auto">
              <h2 className="text-4xl sm:text-8xl font-black text-white font-[Outfit] tracking-tight text-glow">
                {env.name}
              </h2>

              <p className="text-sm sm:text-2xl text-neutral-200 font-medium leading-relaxed max-w-2xl">
                {env.tagline}
              </p>

              {/* Enter Environment Dedicated Experience Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectEnv(env.id)}
                onMouseEnter={() => onHoverEnv && onHoverEnv(env.cursorLabel)}
                onMouseLeave={() => onHoverEnv && onHoverEnv(null)}
                className="mt-2 sm:mt-4 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-black font-extrabold text-xs sm:text-base tracking-wider uppercase flex items-center gap-2 sm:gap-3 shadow-2xl transition-all cursor-pointer bg-white active:scale-95"
                style={{
                  boxShadow: `0 0 30px rgba(255, 255, 255, 0.4)`
                }}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>{env.cursorLabel}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1" />
              </motion.button>
            </div>
          </section>
        );
      })}

      {/* Footer at bottom of homepage */}
      <Footer onSelectEnv={onSelectEnv} onHoverEnv={onHoverEnv} />
    </div>
  );
}
