import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Imports
import 'typeface-roboto/index.css' // Roboto

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
