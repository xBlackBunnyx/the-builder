import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes.js";
import mitt from "mitt";
import vuetify from "./plugins/vuetify.js";

// CSS
import "./assets/css/fonts.css";

// Componentes globales
import DailyButton from "./components/DailyButtonComponent.vue";
import SearchBar from "./components/SearchBar.vue";
import ItemSelector from "./components/ItemSelector.vue";
import RuneSelector from "./components/RuneSelector.vue";
import BuildScore from "./components/BuildScore.vue";

const app = createApp(App);
const emitter = mitt();

app.component("button-daily", DailyButton);
app.component("search-bar", SearchBar);
app.component("item-selector", ItemSelector);
app.component("rune-selector", RuneSelector);
app.component("build-score", BuildScore);

app.use(router);
app.use(vuetify);

app.config.globalProperties.emitter = emitter;
app.provide("emitter", emitter);

app.mount('#app')

