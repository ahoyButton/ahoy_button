<template>
    <div>
        <div class="btn-panel-title">{{$t('buttons.mainTitle')}}</div>
        <el-row style="margin: 20px 0;" type="flex" justify="center">
            <el-col :span="3" style="text-align: center;">
                <el-switch v-model="isOrdered"
                           active-color="#c16275"
                           :active-text="$t('buttons.playListMode')">
                </el-switch>
            </el-col>
        </el-row>
        
        <el-card v-for="(group, index) in btnGroups" :key="index" class="group">
            <div slot="header">
                <span style="font-size: 32px">{{group.group_name.lang[lang]}}</span>
            </div>
            <el-row :gutter="15" class="btn-row">
                <el-button class="sound-btn" type="danger"
                           round v-for="(btn, i) in group.buttons"
                           :key="i"
                           @click="play(btn)">
                    {{btn.name.lang[lang]}}
                </el-button>
            </el-row>
        </el-card>

        <!--弹出内容垂直居中-->
        <el-popover placement="bottom-start">
            <el-button class="sound-control" slot="reference" 
                       type="danger"
                       circle
                       :icon="soundControlIcon">
            </el-button>
            <div class="popover-container">
                <el-button circle @click="soundSwitch"
                           class="iconfont sound-icon"
                           :class="soundIconClass">
                </el-button>
                <el-slider class="sound-slider" v-model.number.lazy="volume"></el-slider>
            </div>
        </el-popover>

        <transition name="el-zoom-in-center">
            <div v-show="isOrdered" class="play-list-btn">
                <el-badge :value="playListLength"
                          :hidden="playListLength === 0"
                          :max="99">
                    <el-button type="primary"
                               circle
                               icon="iconfont el-icon-abcategory"
                               @click="showPlayList">
                    </el-button>
                </el-badge>
            </div>
        </transition>

        <play-list></play-list>
    </div>
</template>

<script>
    import groups from '../../assets/voices.json'
    import {Player} from '../../utils/player'
    import PlayList from './PlayList'
    import {
        ADD_ORDER,
        OPEN_PLAY_LIST_DIALOG
    } from '../../store/mutation-types'
    import {AUDIO_PREFIX} from "../../utils/constants"

    import GetLangMixin from '../../mixins/get-lang'
    import GetVolumeMixin from '../../mixins/get-volume'

    export default {
        name: "Buttons",
        mixins: [
            GetLangMixin,
            GetVolumeMixin
        ],
        components: {
            PlayList
        },
        data() {
            return {
                btnGroups: groups,
                isOrdered: false
            }
        },
        methods: {
            play(item) {
                if (this.isOrdered) {
                    this.$store.commit(ADD_ORDER, item)
                }
                const player = new Player(AUDIO_PREFIX, this.volume)
                player.play(item.path)
            },
            soundSwitch() {
                if (this.volume === 0) {
                    this.volume = 100
                    return
                }
                this.volume = 0
            },
            showPlayList() {
                this.$store.commit(OPEN_PLAY_LIST_DIALOG)
            }
        },
        computed: {
            soundIconClass() {
                return {
                    'el-icon-absound-filling': this.volume,
                    'el-icon-absound-Mute': !this.volume
                }
            },
            soundControlIcon() {
                return [
                        'iconfont',
                        this.volume?'el-icon-absound-filling':'el-icon-absound-Mute'
                    ].join(' ')
            },
            playListLength() {
                return this.$store.state.playList.length
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '../../styles/index';

.group {
    padding: 10px;
    margin: 0 80px 10px;
}

.sound-btn {
    font-size: $normal-text-font-size;
    margin-bottom: 10px;
}

.sound-control {
    @include fixedButton(60px, ("bottom": 30px, "left": 20px));
}

.btn-panel-title {
    font-weight: bold;
    font-size: 60px;
    text-align: center;
    margin-bottom: 10px;
}

.btn-row {
    text-align: left;
}

.sound-icon {
    float: left;
    margin-left: 5px;
    font-size: $icon-font-size;
    border: 0;
}

.sound-slider {
    width: 100%;
    margin-left: 5px;
    margin-right: 10px;
}

.popover-container {
    display: flex;
    align-items: center;
}

.play-list-btn {
    @include fixedButton(60px, ("bottom": 100px, "right": 20px));
}
</style>
