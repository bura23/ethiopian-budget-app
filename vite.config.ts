import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for deployment
  optimizeDeps: {
    exclude: [
      'chart.js',
      'react-chartjs-2',
      '@teamhanko/hanko-elements',
      '@teamhanko/hanko-frontend-sdk'
    ],
    include: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      'react-icons',
      'react-router-dom',
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // PHP development server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
