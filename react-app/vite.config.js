import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 상대 경로 → Vercel(루트)과 GitHub Pages(하위 경로) 모두에서 동작
  base: './',
  plugins: [react()],
})
