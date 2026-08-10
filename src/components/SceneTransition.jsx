import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneTransition({ scenes, currentSceneIndex }) {
  const currentScene = scenes[currentSceneIndex] || scenes[0];

  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentScene.image})` }}
        />
      </AnimatePresence>

      {/* Atmospheric Vignette & Color Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />
    </div>
  );
}
