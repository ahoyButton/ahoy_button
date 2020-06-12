<template>
  <div id="app">
    <buttons-panel></buttons-panel>
    <transition name="el-fade-in-linear">
      <el-button class="back-top" v-show="goTop" plain circle type="primary" icon="el-icon-top" @click="toTop"></el-button>
    </transition>
  </div>
</template>

<script>
import ButtonsPanel from './components/Buttons'

export default {
  name: 'app',
  components: {
    ButtonsPanel
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
.back-top {
  height: 60px;
  width: 60px;
  position: fixed;
  bottom: 30px;
  right: 20px;
  font-size: 30px;
}
</style>
