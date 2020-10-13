<template>
    <div style="box-sizing: border-box;width: 100%;height: 100%">
        <div class="about-us-content">
            <div class="about-us-title">{{$t('aboutUs.title')}}</div>
            <div>{{$t('footer.authors')}}</div>
            <div>{{authorMessage}}</div>
            <div>{{$t('footer.contributors')}}</div>
            <div>{{contributorMessage}}</div>
            <div style="margin-top: 1em">{{$t('footer.license')}}</div>
        </div>
    </div>
</template>

<script>
    import ContributorInfoMixin from '@/mixins/contributor-info'

    export default {
        name: "AboutUs",
        mixins: [ContributorInfoMixin]
    }
</script>

<style lang="scss" scoped>
.about-us-content {
    word-break: break-word;
    max-width: 15em;
    text-align: center;
    margin: 0 auto;
    height: 100%;
}

.about-us-title {
    font-size: 2rem;
    margin-bottom: 1em;
}
</style>