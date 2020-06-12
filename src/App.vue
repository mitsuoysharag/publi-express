<template>
  <div class="app" :class="{'dark': night_mode}" data-app>
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

// Input Radio
.checkmark {
  flex-shrink: 0;
  position: relative;
  height: 16px;
  width: 16px;
  margin-right: 8px;

  background-color: #fff;
  border-radius: 50%;

  &::after {
    content: "";
  }
}

input[type="radio"] {
  display: none;

  &:checked ~ .checkmark {
    &::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      height: 10px;
      width: 10px;
      background: $color-secondary;
      border-radius: 50%;
    }
  }
}
</style>