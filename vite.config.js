import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page build so both index.html and pokedex.html are emitted
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        pokedex: resolve(__dirname, 'pokedex.html'),
      },
    },
  },
});
