<template>
    <el-card class="nav-bar" body-style="{height:100%}">
        <el-row style="{display: flex;align-items: center;}" :gutter="5">
            <el-col :span="1" class="title">
                {{$t('buttons.mainTitle')}}
            </el-col>
            <el-col :span="1" class="divider">
                <el-divider direction="vertical"></el-divider>
            </el-col>
            <el-col :span="4">
                <el-button round type="danger"
                           class="btn"
                           icon="iconfont el-icon-abyoutube"
                           @click="see('https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg?sub_confirmation=1')">
                    Marine Ch. 宝鐘マリン
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-button round type="primary"
                           class="btn"
                           icon="iconfont el-icon-absocialtwitteroutline"
                           @click="see('https://twitter.com/houshoumarine')">
                    @houshoumarine
                </el-button>
            </el-col>
            <el-col :span="5" :offset="9">
                    <el-dropdown @command="changeLang" class="lang-selector">
                        <el-button circle
                                   class="btn lang-btn"
                                   icon="iconfont el-icon-abdiqiu">
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="lang in languages"
                                              :command="lang.value"
                                              :key="lang.title">
                                {{lang.title}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button icon="iconfont el-icon-abgithub"
                                :class="helpUsBtnClass"
                                @click="see('https://github.com/ahoyButton/ahoy_button')">
                        {{$t('header.helpUsImprove')}}
                    </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                languages: [
                    {
                        title: '中文',
                        value: 'zh_CN'
                    },
                    {
                        title: 'English',
                        value: 'en'
                    },
                    {
                        title: '日本語',
                        value: 'ja_JP'
                    }
                ]
            }
        },
        methods: {
            see(url, target = '_blank') {
                window.open(url, target)
            },
            changeLang(lang) {
                this.$i18n.locale = lang
            }
        },
        computed: {
            helpUsBtnClass() {
                return {
                    'help-us-btn': this.$i18n.locale === 'zh_CN',
                    'small-help-us-btn': this.$i18n.locale !== 'zh_CN'
                }
            }
        }
    }
</script>

<style scoped>
.nav-bar {
    position: sticky;
    top: 0;
    z-index: 200;
    margin: 0;
    padding: 15px 5px;
    height: 64px;
    border: 0;
    border-radius: 0;
    background-color: #c16275;
    color: aliceblue;
}

.btn {
    margin-top: -15px;
    font-size: 20px;
    display: flex;
    align-items: center;
}

.help-us-btn {
    margin-top: -15px;
    font-size: 20px;
    display: flex;
    align-items: center;
    float: right;
}

.small-help-us-btn {
    margin-top: -15px;
    font-size: 15px;
    display: flex;
    align-items: center;
    float: right;
}

.title {
    text-align: center;
    font-size: 16px;
}

.divider {
    height: 100%;
    text-align: center;
    padding: 0;
    margin: -70px 0;
    font-size: 120px;
}

.lang-selector {
    height: 58px;
    width: 58px;
    float: right;
    cursor: pointer;
}

.lang-btn {
    margin-left: 10px;
    border: 0;
    background-color: #c16275;
    color: aliceblue;
}
</style>
