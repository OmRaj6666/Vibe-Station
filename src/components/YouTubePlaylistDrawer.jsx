import React, { useState } from 'react';
import { Youtube, Play, Plus, X, Search, Check, Disc, Music } from 'lucide-react';

export default function YouTubePlaylistDrawer({ 
  isOpen, 
  onClose, 
  youtubeTracks, 
  currentVideoId, 
  onSelectTrack, 
  onAddCustomVideo 
}) {
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState('');

  if (!isOpen) return null;

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Extract YouTube Video ID from various URL formats
    let videoId = customInput.trim();
    const match = customInput.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    }

    if (videoId.length < 5) {
      setInputError('Invalid YouTube URL or Video ID');
      return;
    }

    setInputError('');
    onAddCustomVideo(videoId);
    setCustomInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-[Outfit]">
                YouTube Music Playlist
              </h3>
              <p className="text-xs text-neutral-400">Curated Bollywood tracks & custom URLs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-pill text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom YouTube URL Input */}
        <form onSubmit={handleAddCustom} className="mt-4 mb-4 shrink-0">
          <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
            Add Custom YouTube Video / Playlist URL:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg shadow-red-600/30"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {inputError && <p className="text-xs text-red-400 mt-1 font-medium">{inputError}</p>}
        </form>

        {/* Tracks List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {youtubeTracks.map((track, idx) => {
            const isPlaying = track.id === currentVideoId;

            return (
              <div
                key={track.id + idx}
                onClick={() => onSelectTrack(track)}
                className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 transition-all duration-200 ${
                  isPlaying
                    ? 'bg-red-500/20 border-red-500/50 text-white shadow-lg shadow-red-500/20'
                    : 'glass-pill border-white/10 text-neutral-300 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                    <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Disc className="w-6 h-6 text-red-400 animate-spin-slow" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs md:text-sm font-bold text-white truncate font-[Outfit]">
                      {track.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate flex items-center gap-1 mt-0.5">
                      <Youtube className="w-3 h-3 text-red-400" />
                      {track.channel}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isPlaying ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-red-500 text-white flex items-center gap-1 shadow-md">
                      Playing
                    </span>
                  ) : (
                    <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-neutral-300 hover:text-white">
                      <Play className="w-4 h-4 ml-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
