import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/chat/bootstrap.jsx',
      name: 'EEVIChat',
      fileName: () => 'chat-widget.js',
      formats: ['iife'],
    },
    outDir: 'dist',
  },
});
