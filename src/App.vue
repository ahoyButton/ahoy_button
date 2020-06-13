<template>
  <div id="app">
      <HeaderBar></HeaderBar>
      <buttons-panel></buttons-panel>
      <FooterBar></FooterBar>
      <transition name="el-fade-in-linear">
        <el-button class="back-top" v-show="goTop" plain circle type="primary" icon="el-icon-top" @click="toTop"></el-button>
      </transition>
  </div>
</template>

<script>
import ButtonsPanel from './components/Buttons'
import FooterBar from './components/Footer'
import HeaderBar from './components/Header'

export default {
  name: 'app',
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
    handleScroll() {
      const scrollLength = document.documentElement.scrollTop || document.body.scrollTop
      this.goTop = (scrollLength > 30)
    },
    toTop() {
      //TODO: add animations
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

html,body{
  padding:0;
  margin:0;
}

.back-top {
  height: 60px;
  width: 60px;
  position: fixed;
  bottom: 30px;
  right: 20px;
  font-size: 30px;
}
</style>
