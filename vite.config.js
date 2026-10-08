import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createClient, ApiKeyStrategy } from '@wix/sdk'
import { products } from '@wix/stores'
import fs from 'fs'
import path from 'path'

function wixProxyPlugin() {
  return {
    name: 'wix-products-api',
    configureServer(server) {
      server.middlewares.use('/api/wix-products', async (req, res) => {
        try {
          const env = loadEnv('development', process.cwd());
          const apiKey = env.VITE_WIX_API_KEY;
          const siteId = env.VITE_WIX_SITE_ID || '48175f20-74b6-489d-a9c4-c1379039422d';

          if (apiKey && siteId) {
            const client = createClient({
              modules: { products },
              auth: ApiKeyStrategy({ apiKey, siteId }),
            });
            const data = await client.products.queryProducts().limit(100).find();
            if (data.items && data.items.length > 0) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ items: data.items, totalCount: data.totalCount }));
              return;
            }
          }
        } catch (e) {
          console.warn('[vite-wix-api] Live fetch fallback:', e.message);
        }

        try {
          const snapshotPath = path.resolve(process.cwd(), 'src/data/wixProductsSnapshot.json');
          if (fs.existsSync(snapshotPath)) {
            const content = fs.readFileSync(snapshotPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ transformedItems: JSON.parse(content) }));
            return;
          }
        } catch (e) {}

        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed to load products' }));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wixProxyPlugin()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
