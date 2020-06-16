<template>
    <el-dialog :visible="show" center
               :before-close="handleClose"
               :show-close="false">
        <div slot="title" class="play-list-title">
            <span>
                {{titleInfo}}
            </span>
            <el-button icon="el-icon-close"
                       class="close-btn"
                       circle
                       @click="handleClose">
            </el-button>
        </div>
        <div>
            <el-row>
                <span class='current-list-title'>
                    当前列表:
                </span>
            </el-row>
            <el-row class="play-list">
                <el-tag color="#c16275" closable
                        class="play-list-item"
                        effect="dark"
                        v-for="(item, index) in listItems" :key="index"
                        @close="removeItem(index)">
                    {{item.name}}
                </el-tag>
            </el-row>
            <el-row>
                <el-button-group>
                  <el-button type="primary" @click="startPlay"
                             icon="el-icon-video-play">
                    播放
                  </el-button>
                  <el-button type="warning" @click="handlePause"
                             icon="el-icon-video-pause">
                    暂停
                  </el-button>            
                  <el-button type="info" @click="handleStop"
                             icon="el-icon-switch-button">
                    停止
                  </el-button>
                  <el-button type="danger" @click="handleClean"
                             icon="el-icon-delete">
                    清空列表
                  </el-button>
                </el-button-group>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import {addSourcePrefix} from '../utils'
import {
    REMOVE_ORDER,
    CLEAN_ALL_ITEMS,
    CLOSE_PLAY_LIST_DIALOG
} from '../store/mutation-types'

export default {
    name: 'PlayList',
    props: {
        audioPrefix: {
            type: String,
            required: true
        },
        volume: {
            type: Number,
            default: 100
        }
    },
    created() {
        this.audio.addEventListener('ended', this.handleOrder, false)
        this.audio.preload = 'auto'
    },
    data() {
        return {
            audio: new Audio,
            currentIndex: 0,
            isPlaying: false
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
            //TODO: loop
            if (this.currentIndex >= this.listItems.length) {
                return
            }
            const source = addSourcePrefix(this.listItems[this.currentIndex].path, this.audioPrefix)
            this.audio.src = source
            console.log(source)
            this.audio.volume = 1
            this.isPlaying = true
            this.audio.play()
            this.currentIndex++
        },
        handlePause() {
            this.audio.pause()
            this.isPlaying = false
        },
        handleStop() {
            this.currentIndex = 0
            this.handlePause()
            this.audio.currentTime = 0
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
            const prefix = '播放列表'
            const title = `当前有${this.listItems.length}个音频`
            if (this.isPlaying) {
                // index在play后被立即+1,无需重复
                const currentPlaying = `正在播放第${this.currentIndex ===0?1:this.currentIndex}个`
                return prefix + '（' + title + '，' + currentPlaying + '）'
            }

            return prefix + '(' + title + ')'
        },
        show() {
            return this.$store.state.showPlayListDialog
        },
        listItems() {
            return this.$store.state.playList
        },
        audioVolume() {
            return this.volume / 100
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
}

.close-btn {
    font-size: 20px;
    color: aliceblue;
    float: right;
    background-color: #c16275;
    margin-top: -10px;
    border: 0;
}

.current-list-title {
    display: block;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.play-list {
    margin: 10px 0 40px;
}

.play-list-item {
    color: aliceblue;
    font-size: 22px;
    margin-right: 20px;
    border: 1px solid #c16275;
    margin-bottom: 10px;
}

.el-button {
    font-size: 18px;
}
</style>
