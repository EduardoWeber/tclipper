
export const getters = {
    getClipList: (state) => {
        return state.clipList
    },
    getClipIndexByField: (state) => (field, value) => {
        for (let i = 0; i < state.clipList.length; i++) {
            const clip = state.clipList[i];
            if (clip[field] === value) {
                return i
            }
        }
        return -1
    },
    getCurrentDownloading: (state) => {
        return state.currentDownloading
    },
    getQueueList: (state) => {
        return state.queue
    },
    getClipIndexByFieldInQueue: (state) => (field, value) => {
        for (let i = 0; i < state.queue.length; i++) {
            const clip = state.queue[i];
            if (clip[field] === value) {
                return i
            }
        }
        return -1
    },
}