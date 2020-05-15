import { getToken } from '../../services/twitchServices'

export const actions = {
    async loadUserToken({ commit }){
        let token = await getToken(process.env.VUE_APP_CLIENT_ID, process.env.VUE_APP_CLIENT_SECRET)
        if (token['access_token']) {
            commit('UPDATE_TOKEN', token['access_token'])
        }
    }
}
  