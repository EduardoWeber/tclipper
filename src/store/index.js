import Vue from 'vue'
import Vuex from 'vuex'
import { Settings } from  './settings/index'
import { Clips } from  './clips/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: Settings,
    clips: Clips
  }
})
