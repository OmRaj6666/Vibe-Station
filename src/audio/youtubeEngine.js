// YouTube IFrame Player API Controller for Vibe Station

class YouTubeEngine {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.currentVideoId = null;
    this.currentTrackInfo = {
      title: 'Bollywood Vibe Stream',
      channel: 'Vibe Station',
      thumbnail: '',
      duration: 0
    };
    this.isPlaying = false;
    this.onStateChange = null;
    this.onTimeUpdate = null;
    this.onError = null;
    this.timeUpdateInterval = null;
  }

  init(containerId = 'youtube-player-element') {
    const el = document.getElementById(containerId);
    if (!el) {
      setTimeout(() => this.init(containerId), 300);
      return;
    }

    if (window.YT && window.YT.Player) {
      this.createPlayer(containerId);
      return;
    }

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    window.onYouTubeIframeAPIReady = () => {
      this.createPlayer(containerId);
    };
  }

  createPlayer(containerId) {
    if (this.player) return;
    const el = document.getElementById(containerId);
    if (!el) return;

    try {
      this.player = new window.YT.Player(containerId, {
        height: '200',
        width: '200',
        videoId: this.currentVideoId || 'i1IsLVz6T9Q',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            this.isReady = true;
            if (this.player && typeof this.player.unMute === 'function') {
              this.player.unMute();
              this.player.setVolume(100);
            }
            if (this.currentVideoId) {
              this.loadVideo(this.currentVideoId);
            }
          },
          onStateChange: (event) => {
            this.handlePlayerStateChange(event.data);
          },
          onError: (err) => {
            console.warn('YouTube Player error code:', err ? err.data : err);
            this.isPlaying = false;
            this.stopTimer();
            if (this.onError) {
              this.onError({ errorCode: err ? err.data : null });
            }
          }
        }
      });
    } catch (e) {
      console.warn('Failed to construct YT.Player:', e);
    }
  }

  loadVideo(videoId) {
    this.currentVideoId = videoId;
    if (this.isReady && this.player && typeof this.player.loadVideoById === 'function') {
      try {
        this.player.unMute();
        this.player.setVolume(100);
        this.player.loadVideoById(videoId);
        this.player.playVideo();
        this.isPlaying = true;
        this.startTimer();
      } catch(e) {
        console.warn('Error loading YouTube video:', e);
      }
    }
  }

  play() {
    if (this.isReady && this.player && typeof this.player.playVideo === 'function') {
      try {
        this.player.unMute();
        this.player.setVolume(100);
        this.player.playVideo();
        this.isPlaying = true;
        this.startTimer();
      } catch(e){}
    }
  }

  pause() {
    if (this.isReady && this.player && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
        this.isPlaying = false;
        this.stopTimer();
      } catch(e){}
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seekTo(seconds) {
    if (this.isReady && this.player && typeof this.player.seekTo === 'function') {
      try {
        this.player.seekTo(seconds, true);
      } catch(e){}
    }
  }

  setVolume(volumePercent) {
    if (this.isReady && this.player && typeof this.player.setVolume === 'function') {
      try {
        const vol = Math.round(volumePercent * 100);
        if (vol > 0) {
          this.player.unMute();
        }
        this.player.setVolume(vol);
      } catch(e){}
    }
  }

  startTimer() {
    this.stopTimer();
    this.timeUpdateInterval = setInterval(() => {
      if (this.isReady && this.player && typeof this.player.getCurrentTime === 'function') {
        try {
          const currentTime = this.player.getCurrentTime() || 0;
          const duration = this.player.getDuration() || 0;
          const percent = duration > 0 ? (currentTime / duration) * 100 : 0;
          
          if (this.onTimeUpdate) {
            this.onTimeUpdate({ currentTime, duration, percent });
          }
        } catch(e){}
      }
    }, 500);
  }

  stopTimer() {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
  }

  handlePlayerStateChange(stateCode) {
    if (stateCode === 1) {
      this.isPlaying = true;
      this.startTimer();
      if (this.player && typeof this.player.getVideoData === 'function') {
        try {
          const data = this.player.getVideoData();
          this.currentTrackInfo = {
            title: data.title || 'YouTube Bollywood Track',
            channel: data.author || 'YouTube Music',
            thumbnail: `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`,
            duration: this.player.getDuration() || 0
          };
        } catch(e){}
      }
    } else if (stateCode === 2 || stateCode === 0) {
      this.isPlaying = false;
      this.stopTimer();
    }

    if (this.onStateChange) {
      this.onStateChange({ isPlaying: this.isPlaying, trackInfo: this.currentTrackInfo, stateCode });
    }
  }
}

export const youtubeEngine = new YouTubeEngine();
