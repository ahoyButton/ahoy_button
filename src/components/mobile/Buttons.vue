<template>
    <div>
        <nut-row class="mobile-btn-panel-title">
            <nut-col :span="24">{{$t('buttons.mainTitle')}}</nut-col>
        </nut-row>
        <nut-row style="margin-bottom: 2rem;">
            <nut-col :span="24"
                     style="text-align: center">
                <nut-switch :active.sync="isListMode">
                </nut-switch>
                <span style="margin-left: 1rem">
                    {{$t('buttons.playListMode')}}
                </span>
            </nut-col>
        </nut-row>

        <el-card v-for="(group, index) in btnGroups" :key="index" class="group">
            <div slot="header">
                <span style="font-size: 1.5rem;">{{group.group_name.lang[lang]}}</span>
            </div>
            <nut-row>
                <nut-button class="sound-btn"
                            type="light"
                            v-for="(btn, i) in group.buttons"
                           :key="i"
                           @click="play(btn)">
                    {{btn.name.lang[lang]}}
                </nut-button>
            </nut-row>
        </el-card>
    </div>
</template>

<script>
    import groups from '../../assets/voices.json'
    import {Player} from "../../utils/player";
    import {ADD_ORDER} from "../../store/mutation-types";
    import {AUDIO_PREFIX} from "../../utils/constants";

    export default {
        name: "Buttons",
        data() {
            return {
                btnGroups: groups,
                isListMode: false,
                sourcePrefix: AUDIO_PREFIX
            }
        },
        computed: {
            lang() {
                return this.$i18n.locale
            },
            volume() {
                return this.$store.state.volume
            }
        },
        methods: {
            play(item) {
                if (this.isListMode) {
                    this.$store.commit(ADD_ORDER, item)
                }
                const player = new Player(this.sourcePrefix, this.volume)
                player.play(item.path)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../styles/index';

.mobile-btn-panel-title {
    text-align: center;
    font-size: 2rem
}

.sound-btn {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    padding: 0 10px;
    float: left;
    background-color: $ahoy-primary-color;
    color: $ahoy-text-color;
}

.group {
    margin: 0.5rem;
}
</style>