import { YOUTUBE_API_KEY, ENV_YOUTUBE_PLAYLISTS } from '../config/youtube';

// Secure HTML entity decoder (DOM XSS safe using DOMParser)
const decodeHTMLEntities = (text) => {
  if (!text) return '';
  try {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent || text;
  } catch (e) {
    return text;
  }
};

// Batch validate YouTube video IDs to filter out non-embeddable or private videos
export const filterEmbeddableTracks = async (tracks) => {
  if (!YOUTUBE_API_KEY || !tracks || tracks.length === 0) return tracks;
  try {
    const videoIds = tracks.map(t => t.videoId).filter(Boolean).slice(0, 50).join(',');
    if (!videoIds) return tracks;

    const url = `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) return tracks;

    const validVideoIds = new Set(
      data.items
        .filter(item => item.status && item.status.embeddable === true && item.status.privacyStatus === 'public')
        .map(item => item.id)
    );

    return tracks.filter(t => validVideoIds.has(t.videoId));
  } catch (error) {
    console.warn('Error validating video embeddability:', error);
    return tracks;
  }
};

// Search YouTube Data API v3 for 90s Bollywood songs with embed validation
export const searchYouTubeTracks = async (query, maxResults = 50) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API Key is missing. Please set VITE_YOUTUBE_API_KEY in environment variables.');
      return [];
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.warn('YouTube API warning or empty response:', data);
      return [];
    }

    const rawTracks = data.items.map((item, idx) => {
      const titleClean = decodeHTMLEntities(item.snippet.title);
      const channelClean = decodeHTMLEntities(item.snippet.channelTitle);
      const thumbnail = item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url;

      return {
        id: `yt-${item.id.videoId}-${idx}`,
        videoId: item.id.videoId,
        title: titleClean,
        movie: '90s Collection',
        artist: channelClean,
        genre: '90s HITS',
        duration: '4:20',
        cover: thumbnail
      };
    });

    return await filterEmbeddableTracks(rawTracks);
  } catch (error) {
    console.error('Error fetching from YouTube Data API v3:', error);
    return [];
  }
};

// Fetch YouTube Music playlist items by Playlist ID with embed validation
export const fetchPlaylistItems = async (playlistId, maxResults = 50) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API Key is missing. Please set VITE_YOUTUBE_API_KEY in environment variables.');
      return [];
    }
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.warn('YouTube Playlist API error or empty response:', data);
      return [];
    }

    const rawTracks = data.items
      .filter(item => item.snippet && item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
      .map((item, idx) => {
        const titleClean = decodeHTMLEntities(item.snippet.title);
        const channelClean = decodeHTMLEntities(item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle || '90s Bollywood');
        const videoId = item.snippet.resourceId?.videoId;
        const thumbnail = item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url;

        return {
          id: `yt-pl-${videoId}-${idx}`,
          videoId: videoId,
          title: titleClean,
          movie: '90s Bollywood Playlist',
          artist: channelClean,
          genre: '90s BOLLYWOOD',
          duration: '4:15',
          cover: thumbnail
        };
      });

    return await filterEmbeddableTracks(rawTracks);
  } catch (error) {
    console.error('Error fetching YouTube playlist items:', error);
    return [];
  }
};

// Fetch 50 live YouTube tracks per environment (2 to 3 hour playlists)
export const fetchEnvironmentYouTubeTracks = async (envId) => {
  if (!YOUTUBE_API_KEY) return [];

  if (envId === 'bus') {
    const playlistId = ENV_YOUTUBE_PLAYLISTS.bus;
    const items = await fetchPlaylistItems(playlistId, 50);
    if (items && items.length > 0) return items;
  } else if (envId === 'salon') {
    const items = await searchYouTubeTracks('90s Bollywood Barber Saloon Hits Alka Yagnik Kumar Sanu Udit Narayan', 50);
    if (items && items.length > 0) return items;
  } else if (envId === 'rain') {
    const items = await searchYouTubeTracks('Monsoon Rain Songs 90s Bollywood Hits Tip Tip Barsa Taal Barsaat', 50);
    if (items && items.length > 0) return items;
  } else if (envId === 'morning') {
    const items = await searchYouTubeTracks('Morning Time Bhajans Gulshan Kumar Hariharan Anuradha Paudwal Shiv Bhajan', 50);
    if (items && items.length > 0) return items;
  }
  return [];
};
