<template>
    <div id="start-page">
        <nut-row>
            <nut-col :span="24" style="text-align: center">
                <span class="main-title">{{$t('buttons.mainTitle')}}</span>
                <br>
                <div style="margin-bottom: 3rem;">
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
                    <nut-button type="light">
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
        methods: {
            toPCApp() {
                this.$router.push('/pc')
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
</style>