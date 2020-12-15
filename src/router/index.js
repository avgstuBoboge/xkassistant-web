import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'start-page',
            component: () => import('@/components/Pages/StartPage'),
            meta: {}
        },
        {
            path: '/main',
            name: 'main-page',
            component: () => import('@/components/Pages/MainPage'),
            meta: {}
        },
        {
            path: '/login',
            name: 'login-page',
            component: () => import('@/components/Pages/LoginPage'),
            meta: {}
        }

    ],
})
