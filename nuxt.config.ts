import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },
  dir: {
    public: '../public',
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  srcDir: 'src',
  ssr: false,
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
})
