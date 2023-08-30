import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: "/home",
            component: () => import("../views/home/home.vue")
        },
        {
            path: "/favor",
            component: () => import("../views/favor/favor.vue")
        },
        {
            path: "/order",
            component: () => import("../views/order/order.vue")
        },
        {
            path: "/message",
            component: () => import("../views/message/message.vue"),
             meta: {
                tabbarShow: true
            }
        },
        {
            path: "/city",
            component: () => import("../views/city/city.vue"),
            // 用于隐藏tabbar 默认undefined转为false
            meta: {
                tabbarShow: true
            }
        },
        {
            path: "/search",
            component: () => import("../views/home/cpns/homeSearch.vue"),
            meta: {
                tabbarShow: true
            }
        },
        {
            path: "/detail/:id",
            component: () => import("../views/detail/detail.vue")
        }
    ]
})
export default router