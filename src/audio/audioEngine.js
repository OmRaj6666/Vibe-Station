// Web Audio API & HTML5 Audio Engine for Vibe Station

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.musicAudio = new Audio();
    this.musicAudio.crossOrigin = "anonymous";
    
    this.currentTrack = null;
    this.playlist = [];
    this.trackIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    
    // Volumes (0 to 1)
    this.masterVolume = 0.85;
    this.musicVolume = 0.8;
    this.ambientVolume = 0.5;
    this.sfxVolume = 0.7;
    
    // Song counter for auto-changing background scene after 5 songs
    this.songsPlayedInEnv = 0;
    this.onSceneAutoChange = null;
    this.onTrackChange = null;
    this.onProgressUpdate = null;
    
    // Ambient Nodes
    this.activeNodes = {};
    
    this.setupListeners();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setupListeners() {
    this.musicAudio.addEventListener('ended', () => {
      this.handleTrackEnded();
    });

    this.musicAudio.addEventListener('timeupdate', () => {
      if (this.onProgressUpdate && this.musicAudio.duration) {
        const current = this.musicAudio.currentTime;
        const total = this.musicAudio.duration;
        const percent = (current / total) * 100;
        this.onProgressUpdate({ current, total, percent });
      }
    });

    this.musicAudio.addEventListener('error', (e) => {
      console.warn('Audio playback error fallback:', e);
    });
  }

  setPlaylist(tracks, startIndex = 0) {
    this.playlist = tracks;
    this.trackIndex = startIndex;
    if (tracks.length > 0) {
      this.loadTrack(tracks[startIndex]);
    }
  }

  loadTrack(track) {
    this.currentTrack = track;
    this.musicAudio.src = track.url;
    this.musicAudio.volume = this.masterVolume * this.musicVolume;
    if (this.onTrackChange) {
      this.onTrackChange(track, this.trackIndex, this.songsPlayedInEnv);
    }
  }

  play() {
    this.initContext();
    this.isPlaying = true;
    this.musicAudio.volume = this.isMuted ? 0 : this.masterVolume * this.musicVolume;
    this.musicAudio.play().catch(err => {
      console.log('Autoplay prevented or playback error:', err);
    });
  }

  pause() {
    this.isPlaying = false;
    this.musicAudio.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack() {
    if (this.playlist.length === 0) return;
    this.trackIndex = (this.trackIndex + 1) % this.playlist.length;
    this.songsPlayedInEnv += 1;
    
    // Check if 5 songs played in current environment
    if (this.songsPlayedInEnv % 5 === 0 && this.onSceneAutoChange) {
      this.onSceneAutoChange(this.songsPlayedInEnv);
    }
    
    this.loadTrack(this.playlist[this.trackIndex]);
    if (this.isPlaying) {
      this.play();
    }
  }

  prevTrack() {
    if (this.playlist.length === 0) return;
    this.trackIndex = (this.trackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadTrack(this.playlist[this.trackIndex]);
    if (this.isPlaying) {
      this.play();
    }
  }

  seek(percent) {
    if (this.musicAudio.duration) {
      this.musicAudio.currentTime = (percent / 100) * this.musicAudio.duration;
    }
  }

  handleTrackEnded() {
    this.nextTrack();
  }

  setVolumes({ master, music, ambient, sfx }) {
    if (master !== undefined) this.masterVolume = master;
    if (music !== undefined) this.musicVolume = music;
    if (ambient !== undefined) this.ambientVolume = ambient;
    if (sfx !== undefined) this.sfxVolume = sfx;
    
    this.musicAudio.volume = this.isMuted ? 0 : this.masterVolume * this.musicVolume;
    this.updateAmbientVolumes();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolumes({});
    return this.isMuted;
  }

  // --- Procedural Web Audio API Sound Synthesizer ---
  
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  startRainAmbience(level = 0.5) {
    this.initContext();
    this.stopAmbience('rain');
    if (level <= 0) return;

    try {
      const buffer = this.createNoiseBuffer();
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const biquadFilter = this.ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.value = 1000;

      const gainNode = this.ctx.createGain();
      gainNode.gain.value = level * this.ambientVolume * this.masterVolume * 0.4;

      whiteNoise.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      whiteNoise.start();
      this.activeNodes['rain'] = { source: whiteNoise, gain: gainNode, targetLevel: level };
    } catch (e) {
      console.warn('Rain audio error:', e);
    }
  }

  startEngineAmbience(level = 0.4) {
    this.initContext();
    this.stopAmbience('engine');
    if (level <= 0) return;

    try {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 55; // Low deep diesel hum

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 140;

      const gainNode = this.ctx.createGain();
      gainNode.gain.value = level * this.ambientVolume * this.masterVolume * 0.35;

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      this.activeNodes['engine'] = { source: osc, gain: gainNode, targetLevel: level };
    } catch (e) {
      console.warn('Engine audio error:', e);
    }
  }

  startFanAmbience(level = 0.3) {
    this.initContext();
    this.stopAmbience('fan');
    if (level <= 0) return;

    try {
      const buffer = this.createNoiseBuffer();
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 3;

      const gainNode = this.ctx.createGain();
      gainNode.gain.value = level * this.ambientVolume * this.masterVolume * 0.25;

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      noise.start();
      this.activeNodes['fan'] = { source: noise, gain: gainNode, targetLevel: level };
    } catch (e) {
      console.warn('Fan audio error:', e);
    }
  }

  startBirdsAmbience(level = 0.4) {
    this.initContext();
    this.stopAmbience('birds');
    if (level <= 0) return;

    // Periodic sparrow chirps
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        this.playSFX('birds');
      }
    }, 2500);

    this.activeNodes['birds'] = { interval, targetLevel: level };
  }

  stopAmbience(type) {
    if (this.activeNodes[type]) {
      const node = this.activeNodes[type];
      if (node.source) {
        try { node.source.stop(); } catch(e){}
      }
      if (node.interval) {
        clearInterval(node.interval);
      }
      delete this.activeNodes[type];
    }
  }

  stopAllAmbience() {
    Object.keys(this.activeNodes).forEach(type => this.stopAmbience(type));
  }

  updateAmbientVolumes() {
    Object.keys(this.activeNodes).forEach(type => {
      const node = this.activeNodes[type];
      if (node && node.gain) {
        node.gain.gain.value = this.isMuted ? 0 : node.targetLevel * this.ambientVolume * this.masterVolume * 0.35;
      }
    });
  }

  // --- Soundboard Interactive SFX Synthesizer ---
  
  playSFX(type) {
    this.initContext();
    if (this.isMuted) return;

    const vol = this.sfxVolume * this.masterVolume;
    const now = this.ctx.currentTime;

    switch (type) {
      case 'horn': {
        // Indian ST Bus dual horn tone
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.value = 370; // F#4
        osc2.frequency.value = 440; // A4

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4 * vol, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.85);
        osc2.stop(now + 0.85);
        break;
      }

      case 'scissors': {
        // Metallic scissor snip
        const buffer = this.createNoiseBuffer();
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 3500;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.5 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.1);
        break;
      }

      case 'spray': {
        // Water mist spray aerosol
        const buffer = this.createNoiseBuffer();
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        filter.Q.value = 1.5;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.4);
        break;
      }

      case 'thunder': {
        // Low thunder crash & rumble
        const buffer = this.createNoiseBuffer();
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + 1.8);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.7 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 2.2);
        break;
      }

      case 'chaiSip': {
        // Chai sip sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);

        gain.gain.setValueAtTime(0.2 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
        break;
      }

      case 'templeBell': {
        // High resonant bronze bell
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5 bell

        gain.gain.setValueAtTime(0.6 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.2);
        break;
      }

      case 'birds': {
        // Sparrow chirp frequency sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const startFreq = 2200 + Math.random() * 600;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.linearRampToValueAtTime(startFreq + 1000, now + 0.08);
        osc.frequency.linearRampToValueAtTime(startFreq - 400, now + 0.16);

        gain.gain.setValueAtTime(0.2 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case 'radioStatic': {
        // Radio frequency tuning squeak & noise
        const buffer = this.createNoiseBuffer();
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        noise.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.3);
        break;
      }

      default:
        break;
    }
  }
}

export const audioEngine = new AudioEngine();
