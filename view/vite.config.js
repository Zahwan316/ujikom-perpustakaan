import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// ----------------------------------------------------------------------

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@mui/material'],
    },
  },
  plugins: [
    react(),
  
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
