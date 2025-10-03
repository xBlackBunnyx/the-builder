import Vue from 'vue'
import Router from 'vue-router'
import Home from './Pages/Home.vue'
import { components } from 'vuetify/dist/vuetify.js'
import DailyBuild from './Pages/DailyBuild.vue'
import path from 'path'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/DailyBuild',
            name: 'dailybuild',
            component: () => import( './Pages/DailyBuild.vue')
        },
        {
            path: '/BuildCreator',
            name: 'buildcreator',
            component: () => import('./Pages/BuildCreator.vue')
        }
    ]
})
