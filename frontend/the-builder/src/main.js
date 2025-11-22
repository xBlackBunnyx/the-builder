/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import mitt from 'mitt'; // NEW

// Components
import App from './App.vue'
import DailyButton from './components/DailyButtonComponent.vue'
import SearchBar from './components/SearchBar.vue'
import ItemSelector from './components/ItemSelector.vue'
import RuneSelector from './components/RuneSelector.vue'
import BuildScore from './components/BuildScore.vue'

// Plugins
import { registerPlugins } from './plugins'
import vuetify from './plugins/vuetify'

// Styles
import 'unfonts.css'
import './assets/css/fonts.css'

//Routes
import router from './routes.js'

const emitter = mitt(); // NEW
const app = createApp(App)

registerPlugins(app)

// Global components
app.component("button-daily", DailyButton);
app.component("search-bar", SearchBar);
app.component("item-selector", ItemSelector);
app.component("rune-selector", RuneSelector);
app.component("build-score", BuildScore);

app.use(router)
app.use(vuetify)
app.config.globalProperties.emitter = emitter // NEW
app.mount('#app')

