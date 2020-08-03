<template>
  <div id="app">
      <transition name="switch-page"
                  enter-active-class="animate__animated animate__zoomIn">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
    name: 'app',
    created() {
        this.$i18n.locale = this.getUserLang()
    },
    methods: {
        getUserLang() {
            const lang = navigator.language.toLowerCase().substr(0, 2)
            switch (lang) {
            case 'zh':
                return 'zh_CN'
            case 'ja':
                return 'ja_JP'
            default:
                return 'en'
            }
        }
    }
}
</script>

<style lang="scss">
    @import "styles/mixins";

    html,body,#app {
        @include fullSize;
    }
</style>
