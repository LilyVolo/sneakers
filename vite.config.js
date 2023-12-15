import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      '/api': {
        target: 'https://react-sneakers-node.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove "/gapi" prefix
      },
    },
  },
})
