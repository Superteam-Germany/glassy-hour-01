import prefetch from '@astrojs/prefetch';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  outDir: 'dist',
  integrations: [svelte(), tailwind(), prefetch()],
  adapter: vercel(),
});
