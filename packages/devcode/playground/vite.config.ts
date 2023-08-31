import { defineConfig } from 'vite'
import { DevCodePlugin } from '../'

export default defineConfig({
  plugins: [
    DevCodePlugin(),
    // myPlugin(),

  ],
  // clearScreen: false,
  // esbuild: false,
  build: {
    minify: false,
  },
})
