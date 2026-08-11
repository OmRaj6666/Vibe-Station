// Vercel Serverless API Function: Get Active Listener Counts
const ENVS = ['bus', 'salon', 'rain', 'morning'];

const memoryStore = globalThis.__vibe_memory_store || new Map();
if (!globalThis.__vibe_memory_store) {
  globalThis.__vibe_memory_store = memoryStore;
}

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
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    const counts = {
      bus: 0,
      salon: 0,
      rain: 0,
      morning: 0
    };

    if (redisUrl && redisToken) {
      // Execute Redis Pipeline
      const commands = [];
      ENVS.forEach(envId => {
        const key = `vibe:listeners:${envId}`;
        commands.push(['ZREMRANGEBYSCORE', key, 0, cutoff]);
        commands.push(['ZCARD', key]);
      });

      const response = await fetch(`${redisUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commands)
      });

      const results = await response.json();

      if (Array.isArray(results)) {
        ENVS.forEach((envId, index) => {
          // ZCARD result is at (index * 2) + 1
          const zcardResult = results[index * 2 + 1];
          counts[envId] = (zcardResult && typeof zcardResult.result === 'number') ? Math.max(0, zcardResult.result) : 0;
        });
      }
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
    console.error('Fetch Listeners Count Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
