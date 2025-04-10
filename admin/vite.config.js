import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '@': '/src'
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: '@import "@/styles/variables.scss";'
//       }
//     }
//   },
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//     rollupOptions: {
//       input: {
//         main: '/src/main.jsx',
//         admin: '/src/admin.jsx'
//       }
//     }
  }
})
