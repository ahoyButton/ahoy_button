<template>
    <el-card class="footer">
        <div class="footer-container">
            <span>作者：{{authorMessage}}</span>
            <br>
            <span>特别鸣谢：{{contributorMessage}}</span>
            <br>
            <span>{{license}}</span>
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
    margin: 30px 70px;
    text-align: left;
    font-style: italic;
}

.footer {
    width: 100%;
    margin-top: 30px;
    background-color: #272727;
}
</style>