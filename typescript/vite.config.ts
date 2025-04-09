import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/index.html') // or your entry file
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'] // Add this line
  },
  server: {
    port: 3000,
  },
})