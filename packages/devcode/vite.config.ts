import { defineConfig } from 'vite'
import myPlugin from './plugins'
import codePlugin from './plugins/code'

export default defineConfig({
  plugins: [
    codePlugin(),
    myPlugin(),

  ],
  // clearScreen: false,
  // esbuild: false,
  build: {
    minify: false,
  },
})
