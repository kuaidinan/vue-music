import 'babel-polyfill'
import Vue from 'vue'
import router from './router/index.js'
import App from './App'

import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
