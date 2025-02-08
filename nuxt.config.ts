import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
//import "@mdi/font/css/materialdesignicons.css";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },'@pinia/nuxt'
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules: {
    '/web/v1/**': {
        proxy: { to: "http://localhost:3000/local" },
    }
  }
})
