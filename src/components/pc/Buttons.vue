<template>
    <div>
        <div class="btn-panel-title"
             @click="easterEgg"
             :class="{'rainbow-text':rainbowText}">
            <div ref="mainTitle">{{$t('buttons.mainTitle')}}</div>
        </div>
        <el-row style="margin: 20px 0;" type="flex" justify="center">
            <el-col :span="3" style="text-align: center;">
                <el-switch v-model="isOrdered"
                           active-color="#c16275"
                           :active-text="$t('buttons.playListMode')">
                </el-switch>
            </el-col>
        </el-row>

        <el-card v-for="(group, index) in btnGroups" class="group" :key="index">
            <template v-slot:header>
                <el-badge :hidden="!!!group.isNew" value="NEW">
                    <span class="bth-group-title">{{group.group_name.lang[lang]}}</span>
                </el-badge>
            </template>
            <el-row :gutter="15" class="btn-row">
                <el-badge v-for="(btn, i) in group.buttons" :hidden="!!!btn.isNew" value="NEW" :key="i">
                    <el-button type="danger"
                               round
                               class="sound-btn"
                               @click="onClick($event, btn)">
                        {{btn.name.lang[lang]}}
                    </el-button>
                </el-badge>
            </el-row>
        </el-card>

        <el-card v-if="showEgg" class="group">
            <template v-slot:header>
                <span class="bth-group-title shield">{{egg.group_name.lang[lang]}}</span>
            </template>
            <el-row :gutter="15" class="btn-row">
                <el-button class="sound-btn egg-btn"
                           v-for="(btn, i) in egg.buttons"
                           :key="i"
                           @click="onClick($event, btn)">
                    <span class="shield">{{btn.name.lang[lang]}}</span>
                </el-button>
            </el-row>
        </el-card>

        <!--弹出内容垂直居中-->
        <el-popover placement="bottom-start">
            <template v-slot:reference>
                <el-button class="sound-control"
                           type="danger"
                           circle
                           :icon="soundControlIcon">
                </el-button>
            </template>
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
    import { Notification } from 'element-ui'
    import {mapState} from 'vuex'
    import {Player} from '@/utils/player'
    import PlayList from './PlayList'
    //import LiveInfo from '@/components/LiveInfo'
    import {
        ADD_ORDER,
        OPEN_PLAY_LIST_DIALOG
    } from '@/store/mutation-types'
    import {AUDIO_PREFIX} from "@/utils/constants"
    import {randomInt, doConfetti} from '@/utils/utils'

    import GetLangMixin from '@/mixins/get-lang'
    import GetVolumeMixin from '@/mixins/get-volume'

    export default {
        name: "Buttons",
        mixins: [
            GetLangMixin,
            GetVolumeMixin
        ],
        components: {
            PlayList,
            //LiveInfo
        },
        data() {
            return {
                isOrdered: false,
                showEgg: false,
                clickCount: 0,
                eggTrigger: randomInt(3, 6),
                rainbowText: false
            }
        },
        methods: {
            easterEgg() {
                if (!process.env.VUE_APP_BUTTONS_EASTER_EGG) {
                    return
                }

                if (this.showEgg) {
                    this.rainbowText = false
                    this.showEgg = false
                    this.clickCount = 0
                    return
                }

                if (++this.clickCount === this.eggTrigger) {
                    this.rainbowText = true
                    this.showEgg = true
                    doConfetti(this.$refs.mainTitle, 500)
                }
            },
            onClick(event, item) {
              doConfetti(event.target)
              this.play(item)
            },
            play(item) {
                if (this.isOrdered) {
                    this.$store.commit(ADD_ORDER, item)
                }
                const player = new Player(AUDIO_PREFIX, this.volume)
                try {
                    player.play(item.path)
                } catch (e) {
                    Notification.error({
                        "title": this.$t('playList.error'),
                        "message": e.toString()
                    })
                }
            },
            soundSwitch() {
                this.volume = this.volume ? 0 : 100
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
@import '../../styles/animations';
@import '../../styles/mixins';
@import '../../styles/variables';

.group {
    padding: 10px;
    margin: 0 80px 10px;
}

.sound-btn {
    font-size: $normal-text-font-size;
    margin-bottom: 15px;
    margin-left: 22px;
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

@mixin eggItem {
    display: block;
    font-size: 20px;
    width: 22px;
    content: '\01F3F4\0200D\02620\0FE0F';
    cursor: pointer;
    pointer-events: auto;
}

@mixin fadeAnimeGenerator($className) {
    animation-name: $className;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.btn-panel-title {
    font-weight: bold;
    font-size: 60px;
    letter-spacing: 5px;
    margin-bottom: 10px;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover::after {
        @include eggItem;
        @include fadeAnimeGenerator(fadeIn);
    }

    &::after {
        @include eggItem;
        @include fadeAnimeGenerator(fadeOut);
    }
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

    &:hover {
        color: $ahoy-text-color;
        transition: color 0.13s linear;
    }
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
