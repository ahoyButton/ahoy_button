<template>
  <div id="app">
      <transition name="el-fade-in-linear">
        <router-view class="view"></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    html,body,#app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
