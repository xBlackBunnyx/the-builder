//Here are all the routes we need
import Home from "./components/Home/Home.vue";
import DailyBuild from "./components/DailyBuild/DailyBuild.vue";
import BuildCreator from "./components/BuildCreator/BuildCreator.vue";
import {createRouter, createWebHistory} from "vue-router";
import ItemSelectorTest from "./components/ItemSelectorTest.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {path:"/", component: Home},
        {path: "/dailybuild", component: DailyBuild, name: "DailyBuild"},
        {path: "/buildcreator", component: BuildCreator, name: "BuildCreator"},       
        {path: "/itemtest", component: ItemSelectorTest, name: "ItemTest"},    
    ],
});

export default router;
