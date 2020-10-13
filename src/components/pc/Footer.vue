<template>
    <el-card class="footer" shadow="never">
        <div class="footer-container">
            <span>{{$t('footer.authors')}}{{authorMessage}}</span>
            <br>
            <span>{{$t('footer.contributors')}}{{contributorMessage}}</span>
            <br>
            <span>{{$t('footer.license')}}</span>
            <br>
            <el-row style="margin: 10px 0">
                <el-col :span="10">
                <span>{{$t('footer.followUs')}}</span>
                    <el-link icon="iconfont el-icon-abgithub"
                             href="https://github.com/ahoyButton/ahoy_button/">
                    </el-link>
                    <gh-btns-fork slug="ahoyButton/ahoy_button" show-count></gh-btns-fork>
                    <gh-btns-star slug="ahoyButton/ahoy_button" show-count></gh-btns-star>
                    <gh-btns-follow user="ahoyButton" show-count></gh-btns-follow>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    import ContributorInfoMixin from '@/mixins/contributor-info'

    export default {
        name: "Footer",
        mixins: [ContributorInfoMixin]
    }
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.footer-container {
    margin: 30px 50px;
    text-align: left;
    font-style: italic;
    color: $ahoy-text-color;
}

.footer {
    background-color: $ahoy-footer-background-color;
    border: 0;
    border-radius: 0;
    width: 100%;
    margin-top: 30px;
    margin-left: 0;
    position: relative;
    bottom: 0;
}
</style>
