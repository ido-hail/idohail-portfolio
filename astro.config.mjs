// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://idohail.com',
  output: 'static',
  trailingSlash: 'always',

  build: {
    format: 'directory',
    // Keep CSS as linked stylesheets rather than inlined <style> blocks,
    // so `style-src 'self'` is sufficient for the production CSP.
    inlineStylesheets: 'never',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});