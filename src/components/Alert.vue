<template>
  <div v-show="value" class="alert">
    <slot></slot>
    <svg
      @click="$emit('input', false)"
      class="alert__close"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
    >
      <path fill="none" d="M0 0 36 36 M36 0 0 36" />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style lang='scss' scoped>
@import "@/styles/color.scss";

.alert {
  padding: 12px 18px;
  color: $color-secondary;
  border: 1px solid $color-secondary;
  font-weight: bold;
  //
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__close {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    margin-left: 16px;
    stroke-width: 6;
    stroke: $color-secondary;
    cursor: pointer;
  }
}
</style>