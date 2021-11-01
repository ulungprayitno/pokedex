import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import Detail from '../pages/detail.vue'
import Favourite from '../pages/favorite.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/pokemon/:name',
        name: 'Detail',
        component: Detail,
    },
    {
        path: '/favourite',
        name: 'Favourite',
        component: Favourite,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router