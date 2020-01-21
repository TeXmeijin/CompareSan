import path from 'path'
import axios from 'axios'

import { Configuration } from '@nuxt/types'
const environment = process.env.NODE_ENV || 'development'
const env = require(`./env.${environment}.js`)

const config: Configuration = {
  env,
  mode: 'spa',
  srcDir: 'client/',
  generate: {
    routes () {
      return axios
        .get(
          'https://asia-northeast1-comparesan.cloudfunctions.net/getPublicComparesPathData'
        )
        .then((response: any) => {
          const articles = response.data
          return articles.map((article) => {
            return `/compares/${article.categoryId!}/${article.id}`
          })
        })
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '比較さん | 家電を自分で比較検討できるツール',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/globalComponents.js', '@/plugins/firebase/firebase.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~/assets/css/main.scss'],
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    optimizeCSS: true,
    extractCSS: true,

    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },

    babel: {
      presets ({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },

    transpile: [/^vue-awesome/],
  },

  ignore: ['functions/**/*.ts'],
}

export default config
