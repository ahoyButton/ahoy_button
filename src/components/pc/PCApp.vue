<template>
  <div id="pc">
      <HeaderBar></HeaderBar>
      <buttons-panel></buttons-panel>
      <FooterBar></FooterBar>
      <transition name="backtop-anime"
                  enter-active-class="animate__animated animate__fadeInRight"
                  leave-active-class="animate__animated animate__fadeOutLeft">
        <el-button class="back-top" v-show="goTop" plain circle type="primary" icon="el-icon-top" @click="toTop"></el-button>
      </transition>
  </div>
</template>

<script>
import ButtonsPanel from './Buttons'
import FooterBar from './Footer'
import HeaderBar from './Header'

export default {
  name: 'pc-app',
  components: {
    ButtonsPanel,
    HeaderBar,
    FooterBar,
  },
  data() {
    return {
      goTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    getScrollLength() {
        return document.documentElement.scrollTop || document.body.scrollTop
    },
    handleScroll() {
      const scrollLength = this.getScrollLength()
      this.goTop = (scrollLength > 30)
    },
    toTop() {
      const scroll2Top = () => {
          const scrollLength = this.getScrollLength()
          if (scrollLength === 0) {
              return
          }

          document.body.scrollTop = document.documentElement.scrollTop = scrollLength - 50
          window.requestAnimationFrame(scroll2Top)
      }

      window.requestAnimationFrame(scroll2Top)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/index';

html,body,#pc {
  @include fullSize;
}

.back-top {
  @include fixedButton(60px, ("bottom": 30px, "right": 20px));
}
</style>
