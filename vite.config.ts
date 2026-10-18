import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: { compress: { passes: 2 } },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three-globe') || id.includes('three')) return 'three'
          if (id.includes('@react-three')) return 'r3f'
          if (id.includes('react-router')) return 'router'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('react')) return 'react'
        }
      }
    },
    chunkSizeWarningLimit: 900
  },
  test: { environment: 'node' }
})
