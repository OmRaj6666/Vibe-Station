import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Music, Play, Sparkles } from 'lucide-react';
import { searchYouTubeTracks } from '../services/youtubeApi';

export default function YouTubeSearchModal({ isOpen, onClose, onSelectTrack }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const searchResults = await searchYouTubeTracks(query);
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleQuickTagClick = async (tag) => {
    setQuery(tag);
    setIsSearching(true);
    const searchResults = await searchYouTubeTracks(tag);
    setResults(searchResults);
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-2xl apple-glass rounded-[32px] border border-white/20 bg-slate-950/90 p-6 shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-[Outfit]">
                  YouTube Data API Search
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Search any 90s Bollywood song, artist or playlist
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Search Form */}
          <form onSubmit={handleSearch} className="mt-4 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. Pehla Nasha, Saajan 90s, Tip Tip Barsa..."
              className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              autoFocus
            />
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-4" />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2.5 top-2 px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Trending:</span>
            {['Pehla Nasha', 'Tujhe Dekha Toh', 'Tip Tip Barsa', 'Ek Ladki Ko Dekha', 'Kumar Sanu 90s'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-neutral-300 hover:text-white font-medium transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="mt-5 max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {results.length > 0 ? (
              results.map((track) => (
                <motion.div
                  key={track.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    onSelectTrack(track);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-11 h-11 rounded-xl object-cover border border-white/20 shadow-md flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white font-[Outfit] truncate group-hover:text-amber-300 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all flex-shrink-0 ml-3">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </motion.div>
              ))
            ) : isSearching ? (
              <div className="py-12 text-center text-xs text-neutral-400 font-mono animate-pulse">
                Fetching 90s Bollywood tracks from YouTube Data API v3...
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-neutral-400 font-mono">
                Type a song name above or click a trending tag to search live YouTube API
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
