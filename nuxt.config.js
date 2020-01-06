const environment = process.env.NODE_ENV || 'development'
const env = require(`./env.${environment}.js`)

export default {
  env,
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
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
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    }],
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
  modules: ['@nuxtjs/pwa', '@nuxtjs/style-resources'],
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
    extend (config, ctx) {},

    transpile: [/^vue-awesome/],
  },
}
