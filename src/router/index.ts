import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '@/views/Shop.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Account from '@/views/Account.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import Cart from '@/views/Cart.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/products/:id',
        name: "ProductDetails",
        component: ProductDetails
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
