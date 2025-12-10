import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), 
        tr: resolve(__dirname, 'tr/index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
})
