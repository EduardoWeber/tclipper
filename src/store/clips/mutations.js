import Vue from 'vue'

export const mutations = {
    ADD_TO_CLIP_LIST (state, clip) {
        state.clipList.unshift(clip)
    },
    REMOVE_CLIP_FROM_LIST (state, clipIndex) {
        state.clipList.splice(clipIndex, 1)
    },
    UPDATE_CLIP (state, clipUpdated) {
        for (let i = 0; i < state.clipList.length; i++) {
            const clip = state.clipList[i];
            if (clip.uniqueId === clipUpdated.uniqueId) {
                Vue.set(state.clipList, i, clipUpdated)
                break
            }
        }
    }
}