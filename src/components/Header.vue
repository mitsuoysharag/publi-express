<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/logo-blanco.png" alt="PubliExpress" />
    </div>

    <div class="header__actions">
      <mswitch v-model="$store.state.night_mode" />
    </div>
  </header>
</template>

<script>
import mswitch from "@/components/Switch";

export default {
  data: () => ({
    night_mode: false
  }),
  components: {
    mswitch
  }
};
</script>

<style lang='scss' scoped>
.header {
  height: 44px;
  margin: 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    height: 100%;
    img {
      height: 100%;
    }
  }

  &__actions {
  }
}
</style>