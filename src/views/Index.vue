<template>
    <div id="start-page">
        <nut-row>
            <nut-col :span="24" style="text-align: center">
                <span class="main-title">{{$t('buttons.mainTitle')}}</span>
                <br>
                <div class="git-btn-group">
                    <gh-btns-fork slug="ahoyButton/ahoy_button" show-count></gh-btns-fork>
                    <gh-btns-star slug="ahoyButton/ahoy_button" show-count></gh-btns-star>
                    <gh-btns-follow user="ahoyButton" show-count></gh-btns-follow>
                </div>
                <nut-buttongroup style="word-break: keep-all">
                    <nut-button @click="toPCApp"
                                type="light"
                                style="background-color: #eecbb8">
                        PC
                    </nut-button>
                    <nut-button type="light"
                                @click="toMobileApp">
                        Mobile
                    </nut-button>
                </nut-buttongroup>
            </nut-col>
        </nut-row>
    </div>
</template>

<script>
    import {isMobile} from "../utils/utils";

    export default {
        name: "Index",
        data() {
            return {
                clicked: false
            }
        },
        mounted() {
            if (this.clicked) {
                return
            }

            setTimeout(() => {
                if (this.clicked) {
                    return
                }
                if (isMobile()) {
                    this.toMobileApp()
                    return
                }
                this.toPCApp()
            }, 3000)
        },
        methods: {
            toPCApp() {
                this.$router.push('/pc')
                this.clicked = true
            },
            toMobileApp() {
                this.$router.push('/mobile/main')
                this.clicked = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/variables';
    @import '../styles/mixins';

    html {
        @include fullSize;
    }

    #start-page {
        height: 100%;
        width: 100%;
        display: flex;
        margin: 0;
        justify-content: center;
        align-items: center;
        background-color: $ahoy-primary-color;
    }

    .main-title {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: $ahoy-text-color;
    }

    .git-btn-group {
        margin-bottom: 3rem;
    }
</style>