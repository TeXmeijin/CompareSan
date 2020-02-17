import { Configuration } from '@nuxt/types'
import MarkdownClasses from './client/plugins/markdown/MarkdownClass'

const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  srcDir: 'client/',
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
  plugins: [
    '@/plugins/globalComponents.js',
    '@/plugins/firebase/firebase.ts',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    'vue-scrollto/nuxt',
    '@nuxtjs/markdownit',
  ],
  styleResources: {
    scss: ['~/assets/css/main.scss'],
  },
  markdownit: {
    injected: true,
    use: [['@toycode/markdown-it-class', MarkdownClasses]],
  },
  /*
   ** Build configuration
   */
  build: {
    plugins: [new HtmlWebpackPlugin()],
    /*
     ** You can extend webpack config here
     */
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

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
