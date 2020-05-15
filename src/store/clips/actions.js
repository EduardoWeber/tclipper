import { getClip } from '../../services/twitchServices'
import { Clip } from '../../models/Clip'

export const actions = {
    async addClip({ rootGetters, commit }, clipUrl) {
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
        console.log(clipData['data'][0])
        const clip = new Clip({ data: clipData['data'][0] })
        commit('ADD_TO_CLIP_LIST', clip)
    }
}
  