import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const devApiPlugin = () => ({
  name: 'dev-api-middleware',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const urlPath = req.url ? req.url.split('?')[0] : '';
      if (urlPath === '/api/listeners/heartbeat' || urlPath === '/api/heartbeat') {
        try {
          const { default: handler } = await import('./api/listeners/heartbeat.js');
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
      } else if (urlPath === '/api/listeners/count' || urlPath === '/api/listeners') {
        try {
          const { default: handler } = await import('./api/listeners/count.js');
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };
          await handler(req, res);
          return;
        } catch (e) {
          console.error('Dev API Error (listeners/count):', e);
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
