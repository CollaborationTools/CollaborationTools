import path from 'path'

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
  srcDir: 'platform/framework',
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
      Icons({}),
      svgLoader(),
    ],
    resolve: {
      alias: {
        'core/': `${path.resolve(__dirname, 'platform/core')}/`,
        'services/': `${path.resolve(__dirname, 'platform/services')}/`,
        '@/': `${path.resolve(__dirname, 'platform/framework')}/`,
      },
    },
  },
})
