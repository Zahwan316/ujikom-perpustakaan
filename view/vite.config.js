import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import commonjs from 'vite-plugin-commonjs';


// ----------------------------------------------------------------------

export default defineConfig({
  /* optimizeDeps: {
    exclude: ['node_modules'],
  }, */
  build: {
    rollupOptions: {
     
    },
    chunkSizeWarningLimit: 10000,
    outDir: 'dist',
  },
  plugins: [
    react(),
    //nodePolyfills()
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
     /*  {
        '@': path.resolve(__dirname, './src/node_modules'),
        'src': path.resolve(__dirname, './src'),
        //'@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
        '@mui/material': path.resolve(__dirname, './node_modules/@mui/material'),
        '@emotion/styled': path.resolve(__dirname, './node_modules/@emotion/styled'),
        //'@mui/material': 'node_modules/@mui/material',
      }, */
    ],
     
     
    
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
