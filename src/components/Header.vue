<template>
    <el-card class="nav-bar" body-style="{height:100%}">
        <el-row style="{display: flex;align-items: center;}" :gutter="5">
            <el-col :span="1" class="title">
                船长按钮
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
            <el-col :span="3" :offset="11">
                <el-button icon="iconfont el-icon-abgithub"
                           class="btn" @click="see('https://github.com/ahoyButton/ahoy_button')">
                    帮助我们改进网页
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            see(url, target = '_blank') {
                window.open(url, target)
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
</style>
