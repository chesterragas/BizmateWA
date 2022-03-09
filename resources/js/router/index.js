import { createRouter, createWebHistory } from "vue-router";
import HomeMap from '../components/HomeMap'
const routes = [
    {
        path: '/homemap',
        name: 'homemap',
        component: HomeMap,
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
