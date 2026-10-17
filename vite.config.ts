import { defineConfig } from 'vite'
export default defineConfig({ build:{minify:'terser',terserOptions:{compress:{passes:2}}},test:{environment:'node'} })
