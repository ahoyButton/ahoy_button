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
