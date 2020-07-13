<template>
    <div class="mobile-play-list">
        <nut-row class="play-list-info-row" style="margin-top: 5px">
            <nut-col :span="24" style="text-align: center;">
                <span>
                    {{$t('playList.dialogTitle')}}
                </span>
            </nut-col>
        </nut-row>
        <nut-row class="play-list-info-row" style="margin-top: 1em">
            <nut-col :span="24" class="play-list-btn-panel">
                <nut-button class="play-list-btn play-btn"
                            type="light"
                            shape="circle"
                            @click="startPlay">
                    {{$t('playList.play')}}
                </nut-button>
                <nut-button class="play-list-btn pause-btn"
                            type="light"
                            shape="circle"
                            @click="handlePause">
                    {{$t('playList.pause')}}
                </nut-button>
                <nut-button class="play-list-btn stop-btn"
                            type="light"
                            shape="circle"
                            @click="handleStop">
                    {{$t('playList.stop')}}
                </nut-button>
                <nut-button class="play-list-btn clear-btn"
                            type="light"
                            shape="circle"
                            @click="handleClean">
                    {{$t('playList.clear')}}
                </nut-button>
            </nut-col>
        </nut-row>
        <nut-row class="play-list-info-row" style="margin-top: 1em;margin-bottom: 0.5em">
            <nut-col :span="24">
                {{$t('playList.currentList')}}
            </nut-col>
        </nut-row>
        <nut-row class="play-list-info-row">
            <nut-col :span="24">
                <div class="play-list-mode-switch">
                    <nut-switch :active.sync="isLoop" size="small"></nut-switch>
                    <span style="margin-left: 5px">
                        {{$t('playList.loopMode')}}
                    </span>
                </div>
            </nut-col>
        </nut-row>
        <div>
            <PlayListItem v-for="(item,index) in listItems"
                      :key="index"
                      :title="item.name.lang[lang]"
                      :path="item.path">
            </PlayListItem>
        </div>
    </div>
</template>

<script>
    import PlayListItem from './PlayListItem'
    import PlayListControlMixin from '../../mixins/play-list-control'
    import GetVolumeMixin from '../../mixins/get-volume'
    import GetLangMixin from '../../mixins/get-lang'
    import {Player} from '../../utils/player'
    import {AUDIO_PREFIX} from '../../utils/constants'

    export default {
        name: "PlayList",
        mixins: [
            PlayListControlMixin,
            GetVolumeMixin,
            GetLangMixin
        ],
        components: {
            PlayListItem
        },
        data() {
            return {
                audio: new Player(AUDIO_PREFIX, this.volume, this.handleOrder)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../styles/index';

.play-list-btn-panel {
    display: flex;
    align-items: center;
}

.play-list-btn {
    color: $ahoy-text-color;
    padding: 0 10px;
    border: 1px;
}

.play-list-info-row {
    margin: 0 10px;
}

.play-list-mode-switch {
    margin-bottom: 1em;
    font-size: 0.5em;
}

.play-btn {
    background-color: #409eff;
}

.pause-btn {
    background-color: #ebb563;
}

.stop-btn {
    background-color: gray;
}

.clear-btn {
    background-color: #f78989;
}
</style>