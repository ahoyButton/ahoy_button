<template>
    <div id="mobile">
        <Buttons></Buttons>
        <nut-backtop :distance="20"></nut-backtop>
    </div>
</template>

<script>
    import Buttons from './Buttons'

    export default {
        name: "MobileApp",
        components: {Buttons},
        comments: {
            Buttons
        }
    }
</script>

<style scoped>

</style>