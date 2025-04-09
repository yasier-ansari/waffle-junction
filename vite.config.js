import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
    // ,
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.svg', 'robots.txt'],
    //   manifest: {
    //     name: 'Chef Order App',
    //     short_name: 'Orders',
    //     description: 'A cooking order dashboard for chefs',
    //     theme_color: '#ffffff',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       }
    //     ]
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ request }) => request.destination === 'document',
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'pages',
    //         },
    //       },
    //       {
    //         urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'assets',
    //         },
    //       }
    //     ]
    //   }
    // })
  ],
});
