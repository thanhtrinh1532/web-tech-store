import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      overlay: true
    },
    proxy: {
      '/api': 'http://localhost:5000' // Đổi 5173 thành port backend của bạn nếu khác
    }
  }
})