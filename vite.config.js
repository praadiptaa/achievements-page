import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'http://localhost/wordpress',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json')
      }
    }
  }
})
