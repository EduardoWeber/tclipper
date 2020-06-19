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
    async removeClipByIndex({ commit, getters }, clipIndex) {
        if (getters.getClipList.length > clipIndex) {
            const clip = getters.getClipList[clipIndex]
            // if (clip.status === ClipStatus.NOT_STARTED) {
            commit('REMOVE_CLIP_FROM_LIST', clipIndex)
            // }
        }
    },
    async updateProgressClip({ commit, getters }, {clipUniqueId, progress}) {
        const index = getters.getClipIndexByField('url', clip.url);
        if (index === -1) {
            const clip = getters.getClipList[index]
            clip.progress = progress
            commit('UPDATE_CLIP', clip)
        }
    },
    async updateStatusClip({ commit, getters }, {clipUniqueId, status}) {
        const index = getters.getClipIndexByField('url', clip.url);
        if (index === -1) {
            const clip = getters.getClipList[index]
            clip.status = status
            commit('UPDATE_CLIP', clip)
        }
    },
    async removeClipByUniqueId({ dispatch, getters }, clipUniqueId) {
        const index = getters.getClipIndexByField('uniqueId', clipUniqueId);
        if (index >= 0) {
            dispatch('removeClipByIndex', index)
        }
    }
}
  