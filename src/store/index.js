import Vue from 'vue'
import Vuex from 'vuex'
import { Settings } from  './settings/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: Settings
  }
})
