import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import DedicatedEnv from './pages/DedicatedEnv';
import { useAudioPlayer } from './hooks/useAudioPlayer';

export default function App() {
  const audioState = useAudioPlayer();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'dedicated'

  const {
    activeEnv,
    activeEnvId,
    loadEnvironmentPlaylist
  } = audioState;

  // Handle environment selection (opens dedicated environment page without auto-play)
  const handleSelectEnv = (envId) => {
    loadEnvironmentPlaylist(envId, false);
    setCurrentPage('dedicated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Triggered when scrolling between 100vh sections on Home page (preloads playlist without auto-play)
  const handleSectionScroll = (envId) => {
    if (currentPage === 'home' && envId !== activeEnvId) {
      loadEnvironmentPlaylist(envId, false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-[Plus_Jakarta_Sans] select-none">
      {/* Active YouTube IFrame Player Container (renders translucent iframe so YouTube plays audio smoothly) */}
      <div
        className="fixed top-0 left-0 w-48 h-48 pointer-events-none overflow-hidden"
        style={{ opacity: 0.01, zIndex: -50 }}
      >
        <div id="youtube-player-element" className="w-full h-full" />
      </div>

      {/* Header Bar */}
      <Header
        activeEnvId={currentPage === 'dedicated' ? activeEnvId : null}
        onSelectEnv={handleSelectEnv}
        onGoHome={handleGoHome}
      />

      {/* Main Page View: Home 100vh Scroll Experience OR Dedicated Environment Page */}
      {currentPage === 'home' ? (
        <Home
          onSelectEnv={handleSelectEnv}
          activeEnvId={activeEnvId}
          onSectionScroll={handleSectionScroll}
        />
      ) : (
        <DedicatedEnv
          env={activeEnv}
          audioState={audioState}
          onSelectEnv={handleSelectEnv}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
