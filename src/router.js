import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/test.vue'
import Test2 from './views/test2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'test',component: Test},
    {path: '/swipe',name: 'swipe',component: Test2},
  ]
})
