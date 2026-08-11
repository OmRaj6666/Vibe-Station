import { Redis } from '@upstash/redis';

const ENVS = ['bus', 'salon', 'rain', 'morning'];

const memoryStore = globalThis.__vibe_memory_store || new Map();
if (!globalThis.__vibe_memory_store) {
  globalThis.__vibe_memory_store = memoryStore;
}

const getRedisClient = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (e) {
      console.warn('Failed to initialize Upstash Redis client:', e.message);
    }
  }
  return null;
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const now = Date.now();
    const cutoff = now - 45000;
    const redis = getRedisClient();

    const counts = {
      bus: 0,
      salon: 0,
      rain: 0,
      morning: 0
    };

    if (redis) {
      // Clean up stale entries and fetch ZCARD count for each environment
      await Promise.all(
        ENVS.map(async (envId) => {
          const key = `vibe:listeners:${envId}`;
          await redis.zremrangebyscore(key, 0, cutoff);
          const count = await redis.zcard(key);
          counts[envId] = typeof count === 'number' ? Math.max(0, count) : 0;
        })
      );
    } else {
      // In-Memory Fallback
      ENVS.forEach(envId => {
        const envMap = memoryStore.get(envId);
        if (!envMap) {
          counts[envId] = 0;
          return;
        }

        let activeCount = 0;
        for (const [id, time] of envMap.entries()) {
          if (time < cutoff) {
            envMap.delete(id);
          } else {
            activeCount++;
          }
        }
        counts[envId] = activeCount;
      });
    }

    const total = Object.values(counts).reduce((acc, val) => acc + val, 0);

    return res.status(200).json({
      counts,
      total,
      timestamp: now
    });
  } catch (error) {
    console.error('Count API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
