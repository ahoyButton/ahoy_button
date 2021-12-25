import {CLEAN_ALL_ITEMS, CLOSE_PLAY_LIST_DIALOG} from '@/store/mutation-types'

export default {
    data() {
        return {
            currentIndex: 0,
            isPlaying: false,
            isPaused: false,
            isLoop: false,
            isError: false,
            errMsg: ""
        }
    },
    methods: {
        startPlay() {
            if (this.isPaused) {
                this.handlePause()
                return
            }
            this.currentIndex = 0
            this.handleOrder()
        },
        handleOrder() {
            if (this.currentIndex >= this.listItems.length) {
                if (!this.isLoop) {
                    this.isPlaying = false
                    return
                }

                this.currentIndex = 0
            }

            this.audio.volume = this.volume
            this.isPlaying = true
            try {
                this.audio.play(this.listItems[this.currentIndex].path)
            } catch (e) {
                this.isError = true
                this.errMsg = e.toString()
                if (this.$toast) {  // for NutUI
                    this.$toast.fail(this.$t('playList.error'))
                }
                return
            }
            this.currentIndex++
        },
        handlePause() {
            if (this.isPaused) {
                try {
                    this.audio.continuePlay()
                } catch (e) {
                    this.isError = true
                    this.errMsg = e.toString()
                    if (this.$toast) {
                        this.$toast.fail(this.$t('playList.error'))
                    }
                    return
                }
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
