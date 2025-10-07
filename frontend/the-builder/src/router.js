import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home/Home.vue"
import ContactUs from "@/components/Home/ContactUs.vue";
import DailyBuild from "./components/DailyBuild/DailyBuild.vue";
import path from "path";
import { components } from "vuetify/dist/vuetify.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {path:"/", component:Home},
        {path:"/contact", component:ContactUs}, 
        {path: "/dailybuild", component: DailyBuild}
    ],
});

export default router;
