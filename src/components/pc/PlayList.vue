<template>
    <el-dialog :visible="show" center
               :before-close="handleClose"
               :show-close="false">
        <template v-slot:title>
            <div class="play-list-title">
                <span>
                    {{titleInfo}}
                </span>
                <el-button class="close-btn"
                           circle
                           @click="handleClose">
                    <i class="el-icon-close"></i>
                </el-button>
            </div>
        </template>
        <div>
            <el-alert v-show="isError" show-icon
                      class="err-bar"
                      type="error"
                      :title="$t('playList.error')"
                      :description="errMsg"
                      @close="isError = false">
            </el-alert>
            <el-row>
                <span class="current-list-title">
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
                             icon="el-icon-video-play"
                             :disabled="isPlayListEmpty">
                      {{$t('playList.play')}}
                  </el-button>
                  <el-button type="warning" @click="handlePause"
                             icon="el-icon-video-pause"
                             :disabled="isPlayListEmpty">
                      {{$t('playList.pause')}}
                  </el-button>            
                  <el-button type="info" @click="handleStop"
                             icon="el-icon-switch-button"
                             :disabled="isPlayListEmpty">
                      {{$t('playList.stop')}}
                  </el-button>
                  <el-button type="danger" @click="handleClean"
                             icon="el-icon-delete"
                             :disabled="isPlayListEmpty">
                      {{$t('playList.clear')}}
                  </el-button>
                </el-button-group>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import {Player} from '@/utils/player'
import {REMOVE_ORDER} from '@/store/mutation-types'
import {sprintf} from 'sprintf-js'
import {AUDIO_PREFIX} from '@/utils/constants'

import PlayListControlMixin from '@/mixins/play-list-control'
import GetLangMixin from '@/mixins/get-lang'
import GetVolumeMixin from '@/mixins/get-volume'

export default {
    name: 'PlayList',
    mixins: [
        PlayListControlMixin,
        GetLangMixin,
        GetVolumeMixin
    ],
    data() {
        return {
            audio: new Player(AUDIO_PREFIX, this.volume, this.handleOrder)
        }
    },
    methods: {
        removeItem(index) {
            if (index < this.currentIndex) {
                this.currentIndex -= 1
            }
            this.$store.commit(REMOVE_ORDER, index)
        }
    },
    computed: {
        titleInfo() {
            if (this.isError) {
                return this.$t('playList.error')
            }
            
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
        isPlayListEmpty() {
            return this.$store.state.playList.length === 0
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.el-dialog__wrapper {
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.0px);
  -webkit-backdrop-filter: blur(13.0px);
  border-radius: 10px;
}

.err-bar {
    margin-top: -20px;
}

.play-list-title {
    height: 100%;
    width: 100%;
    background-color: $ahoy-primary-color;
    padding: 20px 20px 10px 20px;
    margin: -20px -20px 0;
    font-size: 25px;
    color: $ahoy-text-color;
    position: relative;
}

.close-btn {
    font-size: $normal-text-font-size;
    color: $ahoy-text-color;
    background-color: $ahoy-primary-color;
    position: absolute;
    top: 33%;
    bottom: 33%;
    right: 20px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.current-list-title {
    display: block;
    font-size: $normal-text-font-size;
    margin-bottom: 10px;
    margin-top: 10px;
}

.play-list {
    margin: 10px 0 40px;
    max-height: 300px;
    overflow-y: auto;
}

.play-list-item {
    color: $ahoy-text-color;
    font-size: $normal-text-font-size;
    margin-right: 20px;
    border: 1px solid $ahoy-primary-color;
    margin-bottom: 10px;
}

.el-button {
    font-size: $small-font-size;
}
</style>
