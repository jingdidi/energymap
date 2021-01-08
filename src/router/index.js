import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      name: 'home',
      component: () => import("@/views/home"),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import("@/views/list"),
    },
  ]
})