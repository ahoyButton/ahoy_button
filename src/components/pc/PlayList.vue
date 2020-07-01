<template>
    <el-dialog :visible="show" center
               :before-close="handleClose"
               :show-close="false">
        <div slot="title" class="play-list-title">
            <span>
                {{titleInfo}}
            </span>
            <el-button class="close-btn"
                       circle
                       @click="handleClose">
                <i class="el-icon-close"></i>
            </el-button>
        </div>
        <div>
            <el-row>
                <span class='current-list-title'>
                    {{$t('playList.currentList')}}:
                </span>
            </el-row>
            <el-row class="play-list">
                <el-tag color="#c16275" closable
                        class="play-list-item"
                        effect="dark"
                        v-for="(item, index) in listItems" :key="index"
                        @close="removeItem(index)">
                    {{item.name.lang[lang]}}
                </el-tag>
            </el-row>
            <el-row>
                <el-switch v-model="isLoop"
                           active-color="#c16275"
                           :active-text="$t('playList.loopMode')"
                           style="margin-bottom: 10px">
                </el-switch>
            </el-row>
            <el-row>
                <el-button-group>
                  <el-button type="primary" @click="startPlay"
                             icon="el-icon-video-play">
                      {{$t('playList.play')}}
                  </el-button>
                  <el-button type="warning" @click="handlePause"
                             icon="el-icon-video-pause">
                      {{$t('playList.pause')}}
                  </el-button>            
                  <el-button type="info" @click="handleStop"
                             icon="el-icon-switch-button">
                      {{$t('playList.stop')}}
                  </el-button>
                  <el-button type="danger" @click="handleClean"
                             icon="el-icon-delete">
                      {{$t('playList.clear')}}
                  </el-button>
                </el-button-group>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import {Player} from "../../utils/player"
import {
    REMOVE_ORDER,
    CLEAN_ALL_ITEMS,
    CLOSE_PLAY_LIST_DIALOG
} from '../../store/mutation-types'
import {sprintf} from 'sprintf-js'

export default {
    name: 'PlayList',
    props: {
        audioPrefix: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            audio: new Player(this.audioPrefix, this.volume, this.handleOrder),
            currentIndex: 0,
            isPlaying: false,
            isPaused: false,
            isLoop: false
        }
    },
    methods: {
        removeItem(index) {
            if (index < this.currentIndex) {
                this.currentIndex -= 1
            }
            this.$store.commit(REMOVE_ORDER, index)
        },
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
        titleInfo() {
            const prefix = this.$t('playList.dialogTitle')
            const currentTotal = this.$t('playList.currentTotal')
            const title = sprintf(currentTotal, this.listItems.length)
            if (this.isPlaying) {
                // index在play后被立即+1,无需重复
                const currentPlayingInfo = this.$t('playList.currentPlayingInfo')
                const currentPlaying = sprintf(currentPlayingInfo, this.currentIndex===0?1:this.currentIndex)
                return sprintf('%s（%s - %s）', prefix, title, currentPlaying)
            }

            return sprintf('%s（%s）', prefix, title)
        },
        show() {
            return this.$store.state.showPlayListDialog
        },
        listItems() {
            return this.$store.state.playList
        },
        lang() {
            return this.$i18n.locale
        },
        volume() {
            return this.$store.state.volume
        }
    }
}
</script>

<style scoped>
.play-list-title {
    height: 100%;
    width: 100%;
    background-color: #c16275;
    padding: 20px 20px 10px 20px;
    margin: -20px -20px 0;
    font-size: 25px;
    color: aliceblue;
    position: relative;
}

.close-btn {
    font-size: 20px;
    color: aliceblue;
    position: absolute;
    top: 33%;
    bottom: 33%;
    right: 20px;
    background-color: #c16275;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.current-list-title {
    display: block;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.play-list {
    margin: 10px 0 40px;
    max-height: 300px;
    overflow-y: auto;
}

.play-list-item {
    color: aliceblue;
    font-size: 22px;
    margin-right: 20px;
    border: 1px solid #c16275;
    margin-bottom: 10px;
}

.el-button {
    font-size: 16px;
}
</style>
