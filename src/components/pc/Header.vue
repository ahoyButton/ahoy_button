<template>
    <el-card class="nav-bar" body-style="{height:100%}">
        <el-row style="{display: flex;align-items: center;}" :gutter="5">
            <el-col :span="1" class="title">
                {{$t('buttons.mainTitle')}}
            </el-col>
            <el-col :span="1" class="divider">
                <el-divider direction="vertical"></el-divider>
            </el-col>
            <el-col :span="11">
                <el-button-group>
                <el-button round type="danger"
                           class="btn ytb-btn"
                           icon="iconfont el-icon-abyoutube"
                           @click="see(YTB_URL)">
                    Marine Ch. 宝鐘マリン
                </el-button>
                <el-button round type="primary"
                           class="btn twt-btn"
                           icon="iconfont el-icon-absocialtwitteroutline"
                           @click="see(TWT_URL)">
                    @houshoumarine
                </el-button>
                </el-button-group>
            </el-col>
            <el-col :span="11">
                    <el-dropdown @command="changeLang" class="lang-selector">
                        <el-button circle
                                   class="btn lang-btn"
                                   icon="iconfont el-icon-abdiqiu">
                        </el-button>
                        <template v-slot:dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="lang in languages"
                                                  :command="lang.value"
                                                  :key="lang.title">
                                    {{lang.title}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button icon="iconfont el-icon-abgithub"
                                class="help-us-btn"
                                @click="see(PROJECT_REPO_URL)">
                        {{$t('header.helpUsImprove')}}
                    </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import {languages} from '@/utils/constants'
    import {YTB_URL, TWT_URL, PROJECT_REPO_URL} from '@/utils/urls'

    export default {
        name: "Header",
        data() {
            return {
                languages,
                YTB_URL,
                TWT_URL,
                PROJECT_REPO_URL
            }
        },
        methods: {
            see(url, target = '_blank') {
                window.open(url, target)
            },
            changeLang(lang) {
                this.$i18n.locale = lang
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../styles/mixins';
@import '../../styles/variables';

.nav-bar {
    @include stickyHeader;
    margin: 0;
    padding: 15px 5px;
    height: 64px;
    border: 0;
    border-radius: 0;
    background-color: $ahoy-primary-color;
    color: $ahoy-text-color;
}

.btn {
    margin-top: -15px;
    font-size: $small-font-size;
    display: flex;
    align-items: center;
}

.ytb-btn {
    background-color: $youtube-color;
}

.twt-btn {
    background-color: $twitter-color;
}

.help-us-btn {
    margin-top: -15px;
    font-size: $normal-text-font-size;
    display: flex;
    align-items: center;
    float: right;
}

.title {
    text-align: center;
    font-size: $small-font-size;
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
    background-color: $ahoy-primary-color;
    color: $ahoy-text-color;
}
</style>
