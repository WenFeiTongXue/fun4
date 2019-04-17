import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 引入APlayer
import APlayer from '@moefe/vue-aplayer';

Vue.config.productionTip = false
Vue.prototype.axios=axios
axios.default.withCwithCredentials=true;
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(ElementUI);
//配置APlayer
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
