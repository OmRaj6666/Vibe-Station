import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const devApiPlugin = () => ({
  name: 'dev-api-middleware',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/heartbeat')) {
        try {
          const { default: handler } = await import('./api/heartbeat.js');
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            req.body = body;
            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            await handler(req, res);
          });
          return;
        } catch (e) {
          console.error('Dev API Error (heartbeat):', e);
        }
      } else if (req.url.startsWith('/api/listeners')) {
        try {
          const { default: handler } = await import('./api/listeners.js');
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };
          await handler(req, res);
          return;
        } catch (e) {
          console.error('Dev API Error (listeners):', e);
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
