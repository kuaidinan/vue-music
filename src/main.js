import 'babel-polyfill'
import Vue from 'vue'
import router from './router/index.js'
import App from './App'
import VueLazyLoad from 'vue-lazyload'

import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
