/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
// import 'font-awesome/css/font-awesome.min.css'
// import 'vuetify/styles'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa4'

//We can create our custom theme here

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// export default createVuetify({
//   theme: {
//     defaultTheme: 'system',
//   },
// })

const customTheme = {
  dark: true,
  colors:{
    background: "#01243A", 
    surface: "#01243A",
    primary: "#02D1DD",
    "primary-darken-1":"#02D1DD",
    secondary: "#BF913B",
    "secondary-darken-1": "#BF913B",
    error: "#BF3B70", 
    info: "#ece9ddff",
    success: "#4ED592",
    warning: "#663A1B",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes:{
      customTheme,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})