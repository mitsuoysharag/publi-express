<template>
  <div class="app" :class="{'dark': night_mode}">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
    <Header />
    <div class="app__body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  computed: {
    night_mode() {
      return this.$store.state.night_mode;
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "@/styles/color.scss";

.app {
  background: $color-background;
  min-height: 100vh;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;

  display: flex;
  flex-direction: column;

  &.dark {
    background: $color-background-night;
  }

  &__body {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>