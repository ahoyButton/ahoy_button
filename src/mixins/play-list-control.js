import {CLEAN_ALL_ITEMS, CLOSE_PLAY_LIST_DIALOG} from "../store/mutation-types"

export default {
    data() {
        return {
            currentIndex: 0,
            isPlaying: false,
            isPaused: false,
            isLoop: false
        }
    },
    methods: {
        startPlay() {
            this.currentIndex = 0
            this.handleOrder()
        },
        handleOrder() {
            if (this.currentIndex >= this.listItems.length) {
                if (!this.isLoop) {
                    this.isPlaying = false
                    return
                } else {
                    this.currentIndex = 0
                }
            }

            this.audio.volume = this.volume
            this.isPlaying = true
            this.audio.play(this.listItems[this.currentIndex].path)
            this.currentIndex++
        },
        handlePause() {
            if (this.isPaused) {
                this.audio.continuePlay()
                this.isPaused = false
                this.isPlaying = true
                return
            } else if (!this.isPlaying && !this.isPaused) {
                // 播放没有开始，暂停无效果
                return
            }

            this.audio.pause()
            this.isPaused = true
            this.isPlaying = false
        },
        handleStop() {
            this.currentIndex = 0
            this.audio.stop()
            this.isPlaying = false
            this.isPaused = false
        },
        handleClean() {
            this.handleStop()
            this.$store.commit(CLEAN_ALL_ITEMS)
        },
        handleClose() {
            this.$store.commit(CLOSE_PLAY_LIST_DIALOG)
        }
    },
    computed: {
        listItems() {
            return this.$store.state.playList
        }
    }
}
