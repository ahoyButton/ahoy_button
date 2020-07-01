<template>
    <div id="mobile">
        <nut-navbar class="mobile-nav"
                    @on-click-back="back"
                    @on-click-more="showSettings = !showSettings">
            {{$t('buttons.mainTitle')}}
        </nut-navbar>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>

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
                      @click-cell="showLangs = !showLangs">
                <div slot="avatar">
                    <nut-avatar bg-color="#fff"
                                size="large"
                                bg-icon="/images/earth.png">
                    </nut-avatar>
                </div>
            </nut-cell>
            <nut-menu type="simple"
                      :is-visible="showLangs"
                      :list="langs"
                      @choose="switchLang" @close="showLangs = false">
            </nut-menu>
        </nut-popup>
    </div>
</template>

<script>
    import {FILLING_ICON_PATH,
        languages,
        MUTE_ICON_PATH
    } from "../../utils/constants";
    import {MODIFY_VOLUME} from "../../store/mutation-types";

    export default {
        name: "MobileApp",
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
                showLangs: false
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
                this.showLangs = false
                this.langs.map((_, index) => this.langs[index].selected = false)
                this.langs[index].selected = true
            },
            setMute() {
                if (this.volume) {
                    this.volume = 0
                    return
                }

                this.volume = 100
            }
        },
        computed: {
            currentLang() {
                let item = this.langs.find(({selected}) => {return selected})
                return item.text
            },
            volume: {
                get: function () {
                    return this.$store.state.volume
                },
                set: function (value) {
                    this.$store.commit(MODIFY_VOLUME, value)
                }
            },
            soundControlIcon() {
                if (this.volume) {
                    return FILLING_ICON_PATH
                }

                return MUTE_ICON_PATH
            }
        }
    }
</script>

<style scoped>
.mobile-nav {
    background-color: #c16275;
    color: aliceblue;
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>