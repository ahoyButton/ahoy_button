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
    export default {
        name: "Index",
        data() {
            return {
                clicked: false
            }
        },
        mounted() {
            //TODO: auto check whether a PC or a mobile device
            if (!this.clicked) {
                setTimeout(() => {
                    if (this.clicked) {
                        return
                    }
                    this.toPCApp()
                }, 3000)
            }
        },
        methods: {
            toPCApp() {
                this.$router.push('/pc')
                this.clicked = true
            },
            toMobileApp() {
                this.$router.push('/mobile')
                this.clicked = true
            }
        }
    }
</script>

<style scoped>
    html {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    #start-page {
        height: 100%;
        width: 100%;
        display: flex;
        margin: 0;
        justify-content: center;
        align-items: center;
        background-color: #c16275;
    }

    .main-title {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: aliceblue;
    }

    .git-btn-group {
        margin-bottom: 3rem;
    }
</style>