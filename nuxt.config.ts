import { generateModules, getMenuModules } from './utils';

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    apiSecret: process.env.VITE_SECRET_RUNTIME,
    public: {
      base_url_profile: process.env.VITE_S3_BASE_URL_PROFILE,
      menus: getMenuModules(),
    },
  },
  app: {},
  pages: true,
  css: [
    'bootstrap/scss/bootstrap.scss',
    'vuetify/lib/styles/main.sass',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'animate.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
  eslint: {
    lintOnStart: true,
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    'nuxt-lodash',
    '@nuxtjs/i18n',
    ...generateModules(),
  ],
  i18n: {
    locales: [
      {
        code: 'vi',
        file: 'vi.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'jp',
        file: 'jp.json',
      },
    ],
    lazy: true,
    langDir: 'language',
    defaultLocale: 'vi',
    strategy: 'no_prefix',
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },
});
