import { defineConfig } from 'vite';
export default defineConfig({
  // …
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
});
