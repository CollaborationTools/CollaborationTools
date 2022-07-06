import path from 'path'

import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },
  dir: {
    public: '../public',
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vueuse/nuxt'],
  srcDir: 'src',
  ssr: false,
  tailwindcss: {
    configPath: './tailwind.config.ts',
    viewer: false,
  },
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [eslintPlugin(), svgLoader()],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        'public/': `${path.resolve(__dirname, 'public')}/`,
      },
    },
  },
})
