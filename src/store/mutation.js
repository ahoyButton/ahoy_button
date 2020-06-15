const mutations = {
    addOrder(state, item) {
        state.playList.push(item)
    },
    removeOrder(state, index) {
        state.playList.splice(index, 1)
    },
    cleanAllItems(state) {
        state.playList = []
    },
    openPlayListDialog(state) {
        state.showPlayListDialog = true
    },
    closePlayListDialog(state) {
        state.showPlayListDialog = false
    }
}

export default mutations
