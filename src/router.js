import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/test.vue'
import Test2 from './views/test2.vue'
import Index from './components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index},
    {path: '/test',component: Test},
    {path: '/swipe',component: Test2},
  ]
})
