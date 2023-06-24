import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/scss/bootstrap.scss'
import 'animate.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import './assets/scss/style.scss'
import 'bootstrap'
import CoolLightBox from 'vue-cool-lightbox'
import VueScrollActive from 'vue-scrollactive'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueTypedJs from 'vue-typed-js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/icon.css';
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import IdentifyCode from './components/login/IdentifyCode'
Vue.component('s-identify', IdentifyCode)
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(CoolLightBox)
Vue.use(VueScrollActive)
Vue.use(VueTypedJs)
Vue.use(ElementUI)
Vue.use(VModal)
axios.defaults.withCredentials = true
axios.defaults.baseURL = ''
import Storage from 'vue-ls'
const storageOptions = {
  namespace: 'vue_',
  name: 'ls',
  storage: 'local'
}

new Vue({
  router,
  created() {
    AOS.init({
      duration: 800,
      once: true,
    })
  },
  render: h => h(App)
}).$mount('#app')
Vue.use(Storage, storageOptions)