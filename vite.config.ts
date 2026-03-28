import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { PRODUCT_DATA, COUPONS } from './api/_constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-mock',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/config') {

            if (req.method === 'GET') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ price: PRODUCT_DATA.price }));
              return;
            }

            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const { code } = JSON.parse(body);
                  const found = COUPONS.find((c) => c.code.toUpperCase() === code?.toUpperCase());
                  res.setHeader('Content-Type', 'application/json');
                  
                  if (found) {
                    const publicCoupon = { ...found };
                    // @ts-expect-error - any type from JS
                    delete publicCoupon.owner;
                    res.end(JSON.stringify({ valid: true, coupon: publicCoupon }));
                  } else {
                    res.end(JSON.stringify({ valid: false }));
                  }
                } catch {
                  res.statusCode = 400;
                  res.end('Invalid JSON');
                }
              });
              return;
            }
          }
          next();
        });
      }
    }
  ],
})
