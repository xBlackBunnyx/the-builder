/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import ButtonSettler from './components/ButtonComponent.vue'


// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

// Styles
import 'unfonts.css'
import '@/assets/css/fonts.css'

//Routes
import router from './router.js'


const app = createApp(App)

registerPlugins(app)

// Here we should only import  the global components, if it's not global, we should import it locally
app.component("button-setler", ButtonSettler);

app.use(router)
app.use(vuetify).mount('#app')

