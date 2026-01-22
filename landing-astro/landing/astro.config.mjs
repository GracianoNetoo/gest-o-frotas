// astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node'; // ou vercel/netlify

export default defineConfig({
  output: 'server', // Essencial para SSR e proteção de rotas
  integrations: [vue()],
  adapter: node({
    mode: 'standalone',
  }),
});