/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

// Components
import App from './App.vue'
import DailyButton from './components/DailyButtonComponent.vue'
import SearchBar from './components/SearchBar.vue'
import CreateBuildButton from './components/CreateBuildButtonComponent.vue'

// Plugins
import { registerPlugins } from './plugins'
import vuetify from './plugins/vuetify'

// Styles
import 'unfonts.css'
import './assets/css/fonts.css'

//Routes
import router from './routes.js'

const app = createApp(App)

registerPlugins(app)

// Here we should only import  the global components, if it's not global, we should import it locally
app.component("button-daily", DailyButton);
app.component("search-bar", SearchBar);
app.component("button-build", CreateBuildButton);

app.use(router)
app.use(vuetify)
app.mount('#app')

