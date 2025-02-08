import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/lib/util/colors'

import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: colors.indigo.darken4,
            secondary: "#4d4d4d",
            success: "#25c760",
            warning: "#ffc82e",
            error: "#ff4c29",
            delete: colors.red.darken4,
            iconic: colors.blue.darken1,
            sheet: '#FFFFFF' ,
            'surface-variant': colors.orange.darken3,
            'on-surface-variant': '#ffffff',
          },
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
