// Vercel Serverless API Function: Listener Heartbeat
const VALID_ENVS = new Set(['bus', 'salon', 'rain', 'morning']);

// Server-side in-memory fallback store when Upstash credentials are not set
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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { listenerId, environmentId, previousEnvironmentId } = body;

    // Validation
    if (!listenerId || typeof listenerId !== 'string' || listenerId.length < 8 || listenerId.length > 128) {
      return res.status(400).json({ error: 'Invalid listenerId' });
    }

    if (!environmentId || !VALID_ENVS.has(environmentId)) {
      return res.status(400).json({ error: 'Invalid environmentId' });
    }

    const now = Date.now();
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      // Upstash Redis REST Pipeline execution
      const commands = [];

      // Remove from previous environment if user switched environments
      if (previousEnvironmentId && VALID_ENVS.has(previousEnvironmentId) && previousEnvironmentId !== environmentId) {
        commands.push(['ZREM', `vibe:listeners:${previousEnvironmentId}`, listenerId]);
      }

      // Add/Update score (timestamp) in current environment ZSET
      commands.push(['ZADD', `vibe:listeners:${environmentId}`, now, listenerId]);

      // Cleanup stale listeners older than 45 seconds (45000 ms)
      const cutoff = now - 45000;
      commands.push(['ZREMRANGEBYSCORE', `vibe:listeners:${environmentId}`, 0, cutoff]);

      await fetch(`${redisUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commands)
      });
    } else {
      // In-Memory Fallback
      if (previousEnvironmentId && VALID_ENVS.has(previousEnvironmentId) && previousEnvironmentId !== environmentId) {
        const prevSet = memoryStore.get(previousEnvironmentId);
        if (prevSet) prevSet.delete(listenerId);
      }

      let envMap = memoryStore.get(environmentId);
      if (!envMap) {
        envMap = new Map();
        memoryStore.set(environmentId, envMap);
      }

      // Store/update timestamp
      envMap.set(listenerId, now);

      // Cleanup stale entries > 45s
      const cutoff = now - 45000;
      for (const [id, time] of envMap.entries()) {
        if (time < cutoff) {
          envMap.delete(id);
        }
      }
    }

    return res.status(200).json({ success: true, timestamp: now });
  } catch (error) {
    console.error('Heartbeat Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
