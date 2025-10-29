import Home from "./components/Home/Home.vue";
import DailyBuild from "./components/DailyBuild/DailyBuild.vue";
import BuildCreator from "./components/BuildCreator/BuildCreator.vue";
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {path:"/", component: Home},
        {path: "/dailybuild", component: DailyBuild, name: "DailyBuild"},
        {path: "/buildcreator", component: BuildCreator, name: "BuildCreator"},       
    ],
});

router.beforeEach((to, from, next) => {
    console.log("We are going from ", from.path, "to ", to.path)
    next()
})

export default router;
