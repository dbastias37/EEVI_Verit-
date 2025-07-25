import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/index.tsx',
      output: {
        format: 'iife',
        entryFileNames: 'bundle.js',
        name: 'ChatWidget'
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
});
