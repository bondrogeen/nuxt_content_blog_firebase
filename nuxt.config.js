import colors from 'vuetify/es5/util/colors'
import ru from 'vuetify/es5/locale/ru'
import getRoutes from "./util/getRoutes";

export default {
  target: 'static',
  loading: {
    color: 'blue',
    height: '2px'
  },
  server: {
    host: '0.0.0.0', // default: localhost
    port: 3000
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.BLOG_TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.BLOG_DESCRIPTION || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/prism.js', mode: 'client' },
    '~/plugins/globalComp.js',
    '~/plugins/filters.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/firebase',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    "@nuxtjs/sitemap"
  ],
  sitemap: {
    hostname: process.env.BASE_URL, // https://www.yoursite.com
    routes() {
      return getRoutes();
    }
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/pwa'
  ],
  firebase: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    },
    lazy: false,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged',
        },
        ssr: {
          serverLogin: {
            sessionLifetime: 60 * 60 * 1000,
            loginDelay: 50
          }
        }
      },
      storage: true,
      database: true,
      analytics: true
    }
  },
  content: {
    markdown: {
      prism: {
        theme: false
      }
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { ru },
      current: 'ru'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#00aa4f',
          secondary: '#ff00ff',
          success: '#2649a0',
          info: '#ffaa2c',
          error: '#f83e70',
          accent: '#82B1FF',
          warning: '#FFC107'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    description: process.env.BLOG_DESCRIPTION,
    title: process.env.BLOG_TITLE,

    postsSize: process.env.BLOG_POSTS_SIZE
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: false
          }
        })
      }
    }
  }
}
