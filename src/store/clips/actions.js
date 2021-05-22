import { getClip } from '../../services/twitchServices'
import { Clip, ClipStatus } from '../../models/Clip'

export const actions = {
    async addClip({ rootGetters, commit, state, getters }, clipUrl) {
        function getVideoIdFromUrl (url) {
            // First method
            // https://www.twitch.tv/twitch/clip/RudeMiniatureHabaneroGrammarKing?filter=clips&range=7d&sort=time
            let _
            let id = null
            try {
                id = url.split('/clip/')[1]
                id = id.split('?')[0]
            } catch {}

            if (!id) {
                try {
                    id = url.split('clips.twitch.tv/')[1]
                    id = id.split('?')[0]
                } catch {}
            }

            if (id) {
                return id
            } else {
                throw Error("URL not recognized")
            }
        }

        const clipId = getVideoIdFromUrl(clipUrl)
        const token = rootGetters['settings/getToken']

        const clipData = await getClip(token, process.env.VUE_APP_CLIENT_ID, clipId)
        clipData['data'][0].uniqueId = state.clipList.length

        const clip = new Clip({ data: clipData['data'][0] })
        const index = getters.getClipIndexByField('url', clip.url);
        if (index === -1) {
            commit('ADD_TO_CLIP_LIST', clip)
        }
    },
    async addClipToQueue({ commit, dispatch }, clip) {
        commit('ADD_TO_QUEUE', clip);
        console.log(clip);
        dispatch('updateClipField', {clipUniqueId: clip.uniqueId, field: 'status', value: ClipStatus.QUEUED});
    },
    async removeClipFromQueueByUniqueId({ commit, getters, dispatch }, uniqueId) {
        const index = getters.getClipIndexByFieldInQueue('uniqueId', uniqueId);
        if (index >= 0) {
            commit('REMOVE_CLIP_FROM_QUEUE', index);
            dispatch('updateClipField', {clipUniqueId: uniqueId, field: 'status', value: ClipStatus.NOT_STARTED});
        }
    },
    async popClipFromQueue({ commit }) {
        commit('REMOVE_CLIP_FROM_QUEUE', 0)
    },
    async removeClipByIndex({ commit, getters }, clipIndex) {
        if (getters.getClipList.length > clipIndex) {
            const clip = getters.getClipList[clipIndex]
            // if (clip.status === ClipStatus.NOT_STARTED) {
            commit('REMOVE_CLIP_FROM_LIST', clipIndex)
            // }
        }
    },
    async updateClipField({ commit, getters }, {clipUniqueId, field, value}) {
        const index = getters.getClipIndexByField('uniqueId', clipUniqueId);
        if (index >= 0) {
            const clip = getters.getClipList[index]
            clip[field] = value
            commit('UPDATE_CLIP', clip)
        }
    },
    async removeClipByUniqueId({ dispatch, getters }, clipUniqueId) {
        const index = getters.getClipIndexByField('uniqueId', clipUniqueId);
        if (index >= 0) {
            dispatch('removeClipByIndex', index)
        }
    },
    async setCurrentDl({commit}, value) {
        commit('SET_CURRENT_DL', value)
    }
}
  