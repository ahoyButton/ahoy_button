import {
    ADD_ORDER,
    REMOVE_ORDER,
    CLEAN_ALL_ITEMS,
    OPEN_PLAY_LIST_DIALOG,
    CLOSE_PLAY_LIST_DIALOG,
    MODIFY_VOLUME
} from './mutation-types'

const mutations = {
    [ADD_ORDER](state, item) {
        state.playList.push(item)
    },
    [REMOVE_ORDER](state, index) {
        state.playList.splice(index, 1)
    },
    [CLEAN_ALL_ITEMS](state) {
        state.playList = []
    },
    [OPEN_PLAY_LIST_DIALOG](state) {
        state.showPlayListDialog = true
    },
    [CLOSE_PLAY_LIST_DIALOG](state) {
        state.showPlayListDialog = false
    },
    [MODIFY_VOLUME](state, volume) {
        state.volume = volume
    }
}

export default mutations
