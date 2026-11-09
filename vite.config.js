import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { parseYouTubeFeed } from './api/_parser.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'dev-api-shorts',
      configureServer(server) {
        server.middlewares.use('/api/shorts', async (req, res) => {
          try {
            const feedRes = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UC9eK_GJDUAqx0YEtqQoJ0vw', {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            const xml = await feedRes.text();
            const list = parseYouTubeFeed(xml);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: list.length, shorts: list }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      }
    }
  ],
})
