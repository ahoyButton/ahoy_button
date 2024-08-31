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
            <template v-slot:header>
                <nut-badge value="NEW" :hidden="!!!group.isNew">
                    <span style="font-size: 1.5rem;">{{group.group_name.lang[lang]}}</span>
                </nut-badge>
            </template>
            <nut-row type="flex" flex-wrap="wrap">
                <nut-badge value="NEW" :hidden="!!!btn.isNew"
                           v-for="(btn, i) in group.buttons"
                           :key="i" style="margin-top: 0.5em"
                           right="2em">
                    <nut-button class="sound-btn"
                                type="light" shape="circle"
                                @click="play(btn)">
                        {{btn.name.lang[lang]}}
                    </nut-button>
                </nut-badge>
            </nut-row>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {Player} from '@/utils/player'
    import {ADD_ORDER} from '@/store/mutation-types'
    import {AUDIO_PREFIX} from '@/utils/constants'
    //import LiveInfo from '@/components/LiveInfo'

    export default {
        name: "Buttons",
        components: {
            //LiveInfo
        },
        data() {
            return {
                isListMode: false,
                sourcePrefix: AUDIO_PREFIX
            }
        },
        computed: {
            lang() {
                return this.$i18n.locale
            },
            ...mapState([
                'btnGroups',
                'egg',
                'volume'
            ])
        },
        methods: {
            play(item) {
                if (this.isListMode) {
                    this.$store.commit(ADD_ORDER, item)
                }
                const player = new Player(this.sourcePrefix, this.volume)
                try {
                    player.play(item.path)
                } catch (e) {
                    this.$toast.fail(this.$t('playList.error'))
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.mobile-btn-panel-title {
    text-align: center;
    font-size: 2rem
}

.sound-btn {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    padding: 0 1em;
    background-color: $ahoy-primary-color;
    color: $ahoy-text-color;
}

.live-info-panel {
    font-size: 14px !important;
    margin: 0.5rem;
}

.group {
    margin: 0.5rem;
}
</style>
