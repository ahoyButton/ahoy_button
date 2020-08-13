<template>
    <div style="height: 100%" v-touch:swipeup="showTab" v-touch:swipedown="closeTab">
        <nut-navbar class="mobile-nav"
                    @on-click-back="back"
                    @on-click-more="showSettings = !showSettings">
            {{$t('buttons.mainTitle')}}
        </nut-navbar>

        <div class="view">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

        <nut-backtop :distance="20"></nut-backtop>

        <nut-popup position="left"
                   v-model="showSettings"
                   style="width: 75%;height: 100%;">
            <nut-cell title="Marine Ch. 宝鐘マリン"
                      @click-cell="see('https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg?sub_confirmation=1')">
                <div slot="avatar">
                    <nut-avatar bg-color="#fff"
                                size="large"
                                bg-icon="/images/youtube.png">
                    </nut-avatar>
                </div>
            </nut-cell>
            <nut-cell title="@houshoumarine"
                      @click-cell="see('https://twitter.com/houshoumarine')">
                <div slot="avatar">
                    <nut-avatar bg-color="#fff"
                                size="large"
                                bg-icon="/images/Twitter.png">
                    </nut-avatar>
                </div>
            </nut-cell>
            <nut-cell :title="$t('header.helpUsImprove')"
                      @click-cell="see('https://github.com/ahoyButton/ahoy_button')">
                <div slot="avatar">
                    <nut-avatar bg-color="#fff"
                                size="large"
                                bg-icon="/images/github.png">
                    </nut-avatar>
                </div>
            </nut-cell>
            <nut-cell>
                <div slot="title" style="display: flex;align-items: center;">
                    <el-slider v-model.lazy.number="volume"
                               :show-tooltip="false"
                               style="margin-right: 0.5em;display: inline-block;width: 80%;">
                    </el-slider>
                    <span style="margin: 0 0.5em">{{volume}}</span>
                </div>
                <nut-avatar slot="avatar"
                            size="large"
                            bg-color="#fff"
                            :bg-icon="soundControlIcon"
                            @active-avatar="setMute">
                </nut-avatar>
            </nut-cell>
            <nut-cell :title="currentLang"
                      @click-cell="showLangSwitchMenu = !showLangSwitchMenu">
                <div slot="avatar">
                    <nut-avatar bg-color="#fff"
                                size="large"
                                bg-icon="/images/earth.png">
                    </nut-avatar>
                </div>
            </nut-cell>
            <nut-menu type="simple"
                      :is-visible="showLangSwitchMenu"
                      :list="langs"
                      @choose="switchLang"
                      @close="showLangSwitchMenu = false">
            </nut-menu>
        </nut-popup>

        <transition enter-active-class="animate__animated animate__fadeInUp"
                    leave-active-class="animate__animated animate__fadeOutDown">
            <nut-tabbar v-show="showTabBar"
                        :bottom="true"
                        :tabbar-list="tabList"
                        type="card"
                        @tab-switch="handleSwitch">
            </nut-tabbar>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {
        FILLING_ICON_PATH,
        languages,
        MUTE_ICON_PATH,
        tabList as tabs
    } from '../../utils/constants'
    import GetVolumeMixin from '../../mixins/get-volume'
    import GetLangMixin from '../../mixins/get-lang'
    import TouchEventMixin from '../../mixins/touch-event'

    export default {
        name: "MobileApp",
        mixins: [
            GetVolumeMixin,
            GetLangMixin,
            TouchEventMixin
        ],
        data() {
            let langs = []
            for (let i = 0; i < languages.length; i++) {
                langs.push({
                    index: i,
                    text: languages[i].title,
                    selected: this.$i18n.locale === languages[i].value,
                    lang: languages[i].value
                })
            }
            return {
                showSettings: false,
                langs,
                showLangSwitchMenu: false,
                tabList: tabs[this.$i18n.locale],
                showTabBar: false,
                timeoutHandle: null
            }
        },
        methods: {
            back() {
                this.$router.back()
            },
            see(src, target = '_blank') {
                window.open(src, target)
            },
            switchLang(item, index) {
                this.$i18n.locale = item.lang
                this.showLangSwitchMenu = false
                this.langs.map((_, index) => this.langs[index].selected = false)
                this.langs[index].selected = true
            },
            setMute() {
                if (this.volume) {
                    this.volume = 0
                    return
                }

                this.volume = 100
            },
            handleSwitch(_, index) {
                this.clearTimeoutHandle()
                this.tabList.forEach(ele => Vue.set(ele, 'curr', false))
                Vue.set(this.tabList[index], 'curr', true)
                this.timeoutHandle = setTimeout(() => {
                    this.showTabBar = false
                }, 100)
            },
            showTab() {
                this.clearTimeoutHandle()
                this.showTabBar = true
                this.timeoutHandle = setTimeout(() => {
                    this.showTabBar = false
                }, 5000)
            },
            closeTab() {
                this.clearTimeoutHandle()
                this.showTabBar = false
            },
            clearTimeoutHandle() {
                if (this.timeoutHandle !== null) {
                    clearTimeout(this.timeoutHandle)
                    this.timeoutHandle = null
                }
            }
        },
        computed: {
            currentLang() {
                let item = this.langs.find(({selected}) => {
                    return selected
                })
                return item.text
            },
            soundControlIcon() {
                if (this.volume) {
                    return FILLING_ICON_PATH
                }

                return MUTE_ICON_PATH
            },
            playListSize() {
                return this.$store.state.playList.length
            }
        },
        watch: {
            // we need to update tab bar's data by ourselves
            lang(newValue) {
                let tmp = Array.from(tabs[newValue])
                tmp.forEach(ele => ele.curr = false)
                let curr = this.tabList.findIndex(ele => ele.curr === true)
                tmp[curr].curr = true
                let badgeIndex = this.tabList.findIndex(ele => ele.num !== undefined)
                // 不同于curr，badge会有不存在的情况
                if (badgeIndex !== -1) {
                    tmp[badgeIndex].num = this.tabList[badgeIndex].num
                }
                this.tabList = [...tmp]
            },
            playListSize(newValue) {
                if (newValue > 0) {
                    Vue.set(this.tabList[1], 'num', this.playListSize)
                } else {
                    Vue.delete(this.tabList[1], 'num')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
@import '../../styles/mixins';

.mobile-nav {
    @include stickyHeader;
    background-color: $ahoy-primary-color;
    color: $ahoy-text-color;
    box-shadow: 0 3px 4px -1px #333;
}

.view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    margin-bottom: 65px;
}
</style>
