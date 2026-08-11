import { useState, useEffect, useRef } from 'react';

// Get or generate a persistent session listener ID
const getListenerId = () => {
  if (typeof window === 'undefined') return 'server-listener-id';
  try {
    let id = sessionStorage.getItem('vibe_listener_id');
    if (!id) {
      id = (typeof crypto !== 'undefined' && crypto.randomUUID) 
        ? crypto.randomUUID() 
        : `listener-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
      sessionStorage.setItem('vibe_listener_id', id);
    }
    return id;
  } catch (e) {
    return 'fallback-listener-id';
  }
};

const DEFAULT_COUNTS = {
  bus: 0,
  salon: 0,
  rain: 0,
  morning: 0
};

export function useLiveListeners(activeEnvId = null) {
  const [counts, setCounts] = useState(DEFAULT_COUNTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const prevEnvIdRef = useRef(null);
  const listenerIdRef = useRef(null);

  if (!listenerIdRef.current) {
    listenerIdRef.current = getListenerId();
  }

  // Fetch active listener counts from serverless API
  const fetchCounts = async () => {
    try {
      let response = await fetch('/api/listeners/count');
      if (!response.ok) {
        response = await fetch('/api/listeners');
      }
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data && data.counts && typeof data.counts === 'object') {
        const sanitized = {
          bus: typeof data.counts.bus === 'number' ? Math.max(0, data.counts.bus) : 0,
          salon: typeof data.counts.salon === 'number' ? Math.max(0, data.counts.salon) : 0,
          rain: typeof data.counts.rain === 'number' ? Math.max(0, data.counts.rain) : 0,
          morning: typeof data.counts.morning === 'number' ? Math.max(0, data.counts.morning) : 0,
        };
        setCounts(sanitized);
        setIsError(false);
      }
    } catch (err) {
      console.warn('Live listeners fetch error:', err.message);
      setIsError(true);
      // Keep last valid counts on error (graceful degradation)
    } finally {
      setIsLoading(false);
    }
  };

  // Send heartbeat to backend
  const sendHeartbeat = async (envId, prevEnvId) => {
    if (!envId) return;
    try {
      let res = await fetch('/api/listeners/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listenerId: listenerIdRef.current,
          environmentId: envId,
          previousEnvironmentId: prevEnvId || undefined
        })
      });
      if (!res.ok) {
        await fetch('/api/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            listenerId: listenerIdRef.current,
            environmentId: envId,
            previousEnvironmentId: prevEnvId || undefined
          })
        });
      }
    } catch (err) {
      console.warn('Live listener heartbeat failed:', err.message);
    }
  };

  // Heartbeat & environment switch management
  useEffect(() => {
    if (!activeEnvId) return;

    const currentEnv = activeEnvId;
    const previousEnv = prevEnvIdRef.current;

    // Send immediate heartbeat on mount or environment change
    sendHeartbeat(currentEnv, previousEnv);
    prevEnvIdRef.current = currentEnv;

    // 15s Heartbeat interval
    const heartbeatInterval = setInterval(() => {
      sendHeartbeat(currentEnv, null);
    }, 15000);

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [activeEnvId]);

  // Polling for live listener count updates every 12 seconds
  useEffect(() => {
    fetchCounts();

    const pollingInterval = setInterval(() => {
      fetchCounts();
    }, 12000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const countForActiveEnv = activeEnvId ? (counts[activeEnvId] || 0) : Object.values(counts).reduce((a, b) => a + b, 0);

  return {
    counts,
    currentCount: countForActiveEnv,
    formattedCount: countForActiveEnv.toLocaleString(),
    isLoading,
    isError,
    refetch: fetchCounts
  };
}
