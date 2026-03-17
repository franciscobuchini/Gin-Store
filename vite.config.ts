import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
            const PRODUCT_DATA = { price: 18500 };
            const COUPONS = [
              { code: 'GIN10', discount: 10, type: 'percentage' },
              { code: 'GIFT5000', discount: 5000, type: 'fixed' },
              { code: 'WELCOME', discount: 15, type: 'percentage' },
              { code: 'PROMO20', discount: 20, type: 'percentage' }
            ];

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
                  const found = COUPONS.find(c => c.code === code?.toUpperCase());
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(found ? { valid: true, coupon: found } : { valid: false }));
                } catch (e) {
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
