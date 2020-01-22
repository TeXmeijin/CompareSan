import axios from 'axios'

import { Configuration } from '@nuxt/types'
import {
  GetMasterCategories,
  CompareCategory,
} from './client/assets/javascript/types/masterCategories'
import { CompareArticle } from './client/assets/javascript/types/articleTypes'

require('dotenv').config()
const {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  APPID,
  MESSAGINGSENDERID,
} = process.env as { [key: string]: string }

const config: Configuration = {
  env: {
    APIKEY,
    AUTHDOMAIN,
    DATABASEURL,
    PROJECTID,
    STORAGEBUCKET,
    APPID,
    MESSAGINGSENDERID,
  },
  mode: 'spa',
  srcDir: 'client/',
  generate: {
    routes () {
      return Promise.all([
        axios.get(
          'https://asia-northeast1-comparesan.cloudfunctions.net/getPublicComparesPathData'
        ),
        new Promise<{
          [key: string]: CompareCategory
        }>((resolve) => {
          resolve(GetMasterCategories())
        }),
      ]).then(([articleResponse, categories]) => {
        const articles = articleResponse.data as CompareArticle[]
        return articles
          .map((article) => {
            return `/compares/${article.categoryId!}/${article.id}`
          })
          .concat(
            Object.keys(categories).map((key) => {
              return `/post/${categories[key].id}`
            })
          )
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
