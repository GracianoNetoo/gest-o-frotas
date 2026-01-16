import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite'; // Use este em vez de @astrojs/tailwind

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()], // O Tailwind v4 roda direto pelo Vite
  },
});