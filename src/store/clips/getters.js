
export const getters = {
    getClipList: (state) => {
        return state.clipList
    },
    getClipByUniqueId: (state) => (uniqueId) => {
        for (let i = 0; i < state.clipList.length; i++) {
            const clip = state.clipList[i];
            if (clip.uniqueId === uniqueId) {
                return clip
            }
        }
        return false
    }
}