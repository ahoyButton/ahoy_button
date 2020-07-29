<template>
    <div>
        <div class="btn-panel-title"
             @click="easterEgg"
             :class="{'rainbow-text':rainbowText}">
            {{$t('buttons.mainTitle')}}
        </div>
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
                <span class="bth-group-title">{{group.group_name.lang[lang]}}</span>
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

        <el-card v-if="showEgg" class="group">
            <div slot="header">
                <span class="bth-group-title shield">{{egg.group_name.lang[lang]}}</span>
            </div>
            <el-row :gutter="15" class="btn-row">
                <el-button class="sound-btn egg-btn"
                           v-for="(btn, i) in egg.buttons"
                           :key="i"
                           @click="play(btn)">
                    <span class="shield">{{btn.name.lang[lang]}}</span>
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
    import {mapState} from 'vuex'
    import {Player} from '../../utils/player'
    import PlayList from './PlayList'
    import {
        ADD_ORDER,
        OPEN_PLAY_LIST_DIALOG
    } from '../../store/mutation-types'
    import {AUDIO_PREFIX} from "../../utils/constants"
    import {random} from 'lodash'

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
                isOrdered: false,
                showEgg: false,
                clickCount: 0,
                eggTrigger: random(3, 6),
                rainbowText: false
            }
        },
        methods: {
            easterEgg() {
                if (this.showEgg) {
                    this.rainbowText = false
                    this.showEgg = false
                    this.clickCount = 0
                    return
                }

                if (++this.clickCount === this.eggTrigger) {
                    this.rainbowText = true
                    this.showEgg = true
                }
            },
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
            ...mapState([
                'btnGroups',
                'egg'
            ]),
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
    background-color: $ahoy-primary-color;
    border: 0;
}

.egg-btn {
    background-color: $shield-color;
    border: 0;
}

.sound-control {
    @include fixedButton(60px, ("bottom": 30px, "left": 20px));
}

.btn-panel-title {
    font-weight: bold;
    font-size: 60px;
    text-align: center;
    margin-bottom: 10px;
    pointer-events: none;
}

@mixin eggItem {
    display: block;
    font-size: 20px;
    width: 22px;
    content: '\01F3F4\0200D\02620\0FE0F';
    cursor: pointer;
    pointer-events: auto;
    margin: 0 auto;
}

@mixin fadeAnimeGenerator($className) {
    animation-name: $className;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.btn-panel-title:hover::after {
    @include eggItem;
    @include fadeAnimeGenerator(fadeIn);
}

.btn-panel-title::after {
    @include eggItem;
    @include fadeAnimeGenerator(fadeOut);
}

.btn-row {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
}

.bth-group-title {
    font-size: 32px;
}

.shield {
    background-color: $shield-color;
    color: $shield-color;
}

.shield:hover {
    color: $ahoy-text-color;
    transition: color 0.13s linear;
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
