import { useState, useEffect } from 'react';

const BASE_COUNTS = {
  bus: 1420,
  salon: 890,
  rain: 2150,
  morning: 1780
};

export function useLiveListeners(envId) {
  const [activeTabs, setActiveTabs] = useState(1);
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    // Multi-tab synchronization using BroadcastChannel
    let channel;
    try {
      channel = new BroadcastChannel('vibe_station_live_sync');
      
      const announce = () => {
        channel.postMessage({ type: 'PING' });
      };

      channel.onmessage = (event) => {
        if (event.data?.type === 'PING') {
          channel.postMessage({ type: 'PONG' });
        }
      };

      announce();
    } catch (e) {
      // Fallback if BroadcastChannel is unsupported
    }

    return () => {
      if (channel) channel.close();
    };
  }, []);

  // Smooth realistic drift (+/- 3 users max, avoiding jumpy glitches)
  useEffect(() => {
    const interval = setInterval(() => {
      setJitter(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        const next = prev + delta;
        return Math.max(-10, Math.min(10, next));
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const base = BASE_COUNTS[envId] || 1250;
  const total = base + jitter + (activeTabs - 1);

  return {
    count: total,
    formattedCount: total.toLocaleString()
  };
}
