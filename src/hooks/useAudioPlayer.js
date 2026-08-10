import { useState, useEffect, useRef } from 'react';
import { ENVIRONMENTS } from '../data/environments';
import { youtubeEngine } from '../audio/youtubeEngine';
import { fetchEnvironmentYouTubeTracks } from '../services/youtubeApi';

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEnvId, setActiveEnvId] = useState('bus');
  const [songCounter, setSongCounter] = useState(0);
  const [sceneIndices, setSceneIndices] = useState({
    bus: 0,
    salon: 0,
    rain: 0,
    morning: 0
  });

  const [playlist, setPlaylist] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.85);

  const activeEnv = ENVIRONMENTS.find(e => e.id === activeEnvId) || ENVIRONMENTS[0];
  const activeEnvIdRef = useRef(activeEnvId);
  activeEnvIdRef.current = activeEnvId;

  const handleNextTrackRef = useRef();

  const handleNextTrackAuto = () => {
    if (playlist.length === 0) return;

    let nextIdx = (trackIndex + 1) % playlist.length;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * playlist.length);
    }
    if (isRepeat) {
      nextIdx = trackIndex;
    }

    setTrackIndex(nextIdx);
    const nextTrack = playlist[nextIdx];

    // Change background scene on Next button click OR every 2 songs played automatically!
    const newCounter = songCounter + 1;
    setSongCounter(newCounter);

    setSceneIndices(prev => {
      const curScene = prev[activeEnvId] || 0;
      const nextScene = (curScene + 1) % activeEnv.scenes.length;
      return { ...prev, [activeEnvId]: nextScene };
    });

    playTrack(nextTrack, true);
  };

  handleNextTrackRef.current = handleNextTrackAuto;

  // Initialize YouTube IFrame Engine
  useEffect(() => {
    youtubeEngine.init('youtube-player-element');

    youtubeEngine.onTimeUpdate = ({ currentTime: cTime, duration: dur, percent }) => {
      setCurrentTime(cTime);
      setDuration(dur);
      setProgress(percent);
    };

    youtubeEngine.onStateChange = ({ isPlaying: playing, stateCode }) => {
      setIsPlaying(playing);
      // Automatically advance to next track when YouTube video ends!
      if (stateCode === 0 && handleNextTrackRef.current) {
        handleNextTrackRef.current();
      }
    };

    // Automatically skip to next track if YouTube player encounters unplayable/restricted video error
    youtubeEngine.onError = ({ errorCode }) => {
      console.warn('YouTube Player unplayable track error code:', errorCode, '-> Skipping to next track automatically!');
      if (handleNextTrackRef.current) {
        setTimeout(() => {
          handleNextTrackRef.current();
        }, 150);
      }
    };
  }, []);

  // Initialize active environment playlist on mount with 50 live YouTube API tracks
  useEffect(() => {
    const initPlaylist = async () => {
      const env = ENVIRONMENTS[0]; // BUS
      setPlaylist(env.playlist);
      const firstTrack = env.playlist[0];
      setCurrentTrack(firstTrack);
      if (firstTrack && firstTrack.videoId) {
        youtubeEngine.currentVideoId = firstTrack.videoId;
      }

      const liveItems = await fetchEnvironmentYouTubeTracks('bus');
      if (liveItems && liveItems.length > 0 && activeEnvIdRef.current === 'bus') {
        setPlaylist(liveItems);
        setCurrentTrack(liveItems[0]);
        if (liveItems[0].videoId) {
          youtubeEngine.currentVideoId = liveItems[0].videoId;
        }
      }
    };

    initPlaylist();
  }, []);

  // Dynamic Browser Tab Document Title Update
  useEffect(() => {
    if (currentTrack && isPlaying) {
      document.title = `▶ ${currentTrack.title} — VIBE STATION`;
    } else {
      document.title = `VIBE STATION | Where places become music.`;
    }
  }, [currentTrack, isPlaying]);

  // Load environment playlist with 50 live YouTube tracks & race-condition protection
  const loadEnvironmentPlaylist = async (envId, autoPlay = false) => {
    const env = ENVIRONMENTS.find(e => e.id === envId) || ENVIRONMENTS[0];
    setActiveEnvId(envId);
    setPlaylist(env.playlist);
    setTrackIndex(0);
    const firstTrack = env.playlist[0];
    setCurrentTrack(firstTrack);

    if (firstTrack) {
      playTrack(firstTrack, autoPlay);
    }

    // Fetch 50 live YouTube tracks for this environment
    const liveItems = await fetchEnvironmentYouTubeTracks(envId);
    // Strict race-condition check: only update if user is still on this environment!
    if (liveItems && liveItems.length > 0 && activeEnvIdRef.current === envId) {
      setPlaylist(liveItems);
      if (!isPlaying) {
        setCurrentTrack(liveItems[0]);
        if (liveItems[0].videoId) {
          youtubeEngine.currentVideoId = liveItems[0].videoId;
        }
      }
    }
  };

  // Play a track via YouTube Engine
  const playTrack = (track, autoPlay = false) => {
    setCurrentTrack(track);

    if (track && track.videoId) {
      if (autoPlay || isPlaying) {
        youtubeEngine.loadVideo(track.videoId);
      } else {
        youtubeEngine.currentVideoId = track.videoId;
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      youtubeEngine.pause();
    } else {
      if (currentTrack?.videoId) {
        youtubeEngine.loadVideo(currentTrack.videoId);
      }
    }
  };

  const handlePrevTrack = () => {
    if (playlist.length === 0) return;
    const prevIdx = (trackIndex - 1 + playlist.length) % playlist.length;
    setTrackIndex(prevIdx);
    const prevTrack = playlist[prevIdx];

    setSceneIndices(prev => {
      const curScene = prev[activeEnvId] || 0;
      const prevScene = (curScene - 1 + activeEnv.scenes.length) % activeEnv.scenes.length;
      return { ...prev, [activeEnvId]: prevScene };
    });

    playTrack(prevTrack, isPlaying);
  };

  const seek = (percent) => {
    if (duration > 0) {
      const targetSeconds = (percent / 100) * duration;
      youtubeEngine.seekTo(targetSeconds);
    }
  };

  const changeVolume = (newVol) => {
    setVolume(newVol);
    youtubeEngine.setVolume(newVol);
  };

  const filterByGenre = (genreName) => {
    const filtered = activeEnv.playlist.filter(t => t.genre === genreName);
    if (filtered.length > 0) {
      setPlaylist(filtered);
      setTrackIndex(0);
      playTrack(filtered[0], isPlaying);
    } else {
      setPlaylist(activeEnv.playlist);
    }
  };

  const playCustomTrack = (track) => {
    setPlaylist(prev => [track, ...prev.filter(t => t.id !== track.id)]);
    setTrackIndex(0);
    playTrack(track, true);
  };

  return {
    activeEnv,
    activeEnvId,
    currentTrack,
    isPlaying,
    playlist,
    trackIndex,
    progress,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
    volume,
    sceneIndex: sceneIndices[activeEnvId] || 0,
    songCounter,
    loadEnvironmentPlaylist,
    togglePlay,
    handleNextTrack: handleNextTrackAuto,
    handlePrevTrack,
    seek,
    changeVolume,
    toggleShuffle: () => setIsShuffle(!isShuffle),
    toggleRepeat: () => setIsRepeat(!isRepeat),
    filterByGenre,
    playCustomTrack,
    setSceneIndex: (idx) => setSceneIndices(prev => ({ ...prev, [activeEnvId]: idx }))
  };
}
