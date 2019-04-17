import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/test.vue'
import Test2 from './views/test2.vue'
import Aplayer from './components/aplayer.vue'
import Index from './views/index.vue'
import Search from './views/search.vue'
import myHeader from './components/header.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Index},
    {path: '/index',component: Index},
    {path: '/search/:s',component: Search,props:true},
    {path: '/test',component: Test},
    {path: '/swipe',component: Test2},
    {path: '/aplayer',component: Aplayer},
  ]
})
