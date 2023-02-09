// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {ColorThemePlugin} from 'vuestic-ui/src/services/ColorThemePlugin'
import store from '../store/index'
import router from '../router/index'
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'

import '../metrics'
import axios from 'axios'

const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://localhost:8097' : 'https://testvlatava-agent-tool.fit.dmall.com';

axios.defaults.baseURL = API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'text/plain' //  注意：设置很关键
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

Vue.prototype.$axios = axios

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(VueSweetalert2)
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)

Vue.use(ColorThemePlugin,
  {
    // Add or change theme colors here
    themes: {
      // primary: '#f06595',
      // blurple: '#7289DA',
    },
  })

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
