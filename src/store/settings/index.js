import { state } from './state.js'
import { actions } from './actions.js'
import { getters } from './getters.js'
import { mutations } from './mutations.js'

export const Settings = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}