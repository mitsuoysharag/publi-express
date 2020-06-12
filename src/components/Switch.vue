<template>
  <label class="switch">
    <input type="checkbox" :checked="value" @input="$emit('input', $event.target.checked)" />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style lang='scss' scoped>
@import "@/styles/color.scss";

.switch {
  position: relative;
  display: inline-block;
  width: 62px;
  height: 30px;
}

input[type="checkbox"] {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border: 4px solid #fff;
  border-radius: 16px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 23px;
  left: 3px;
  bottom: 2.8px;
  background-color: white;
  border-radius: 8px 0 0 8px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $color-secondary;
}

input:checked + .slider:before {
  border-radius: 0 8px 8px 0;
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>