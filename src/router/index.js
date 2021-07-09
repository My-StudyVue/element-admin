import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/articles/index'
  },
  {
    path: '/articles/index',
    name: 'list-article',
    component: () => import(/* webpackChunkName: "list" */ '../views/ListArticle.vue')
  },
  {
    path: '/articles/create',
    name: 'create-article',
    component: () => import(/* webpackChunkName: "article" */ '../views/CreateArticle.vue')
  },
  {
    path: '/articles/:id/edit',
    name: 'edit-article',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditArticle.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
