<template>
    <el-card class="footer" shadow="never">
        <div class="footer-container">
            <span>作者：{{authorMessage}}</span>
            <br>
            <span>特别鸣谢：{{contributorMessage}}</span>
            <br>
            <span>{{license}}</span>
            <br>
            <el-row style="margin: 10px 0">
                <el-col :span="8">
                <span>关注我们：</span>
                    <el-link icon="iconfont el-icon-abgithub"
                             href="https://github.com/ahoyButton/ahoy_button/">
                    </el-link>
                    <gh-btns-fork class="git-btn" slug="ahoyButton/ahoy_button" show-count></gh-btns-fork>
                    <gh-btns-star class="git-btn" slug="ahoyButton/ahoy_button" show-count></gh-btns-star>
                    <gh-btns-follow user="ahoyButton" show-count></gh-btns-follow>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    import {genMessage} from '../utils'

    export default {
        name: "Footer",
        data() {
            return {
                // 开发者
                authors: [],
                // 素材提供者
                contributors: [],
                // 免责声明
                license: "本站为爱好者学习交流创作，与Hololive官方无关，切勿用于任何商业目的"
            }
        },
        computed: {
            authorMessage() {
                return genMessage(this.authors)
            },
            contributorMessage() {
                return genMessage(this.contributors)
            }
        }
    }
</script>

<style scoped>
.footer-container {
    margin: 30px 50px;
    text-align: left;
    font-style: italic;
    color: aliceblue;
}

.footer {
    background-color: #272727;
    border: 0;
    border-radius: 0;
    width: 100%;
    margin-top: 30px;
    margin-left: 0;
    position: relative;
    bottom: 0;
}
</style>
