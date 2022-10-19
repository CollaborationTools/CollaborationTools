import path from 'path'

import { defineNuxtConfig } from 'nuxt'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
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
  experimental: {
    reactivityTransform: true,
  },
  imports: {
    dirs: ['composables', 'composables/*/index.ts'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/svg',
    'unplugin-icons/nuxt',
    '@pinia/nuxt',
  ],
  srcDir: 'src',
  ssr: false,
  tailwindcss: {
    configPath: './tailwind.config.ts',
    viewer: false,
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: ['unplugin-icons/types/vue'],
      },
    },
  },
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
      }),
      Icons(),
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        'public/': `${path.resolve(__dirname, 'public')}/`,
      },
    },
  },
})
