<template>
  <transition
    name="fade"
    appear
    @before-enter="disableScroll"
    @after-enter="enableScroll"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    disableScroll() {
      document.body.style.overflow = "hidden";
    },
    enableScroll() {
      document.body.style.overflow = "";
    },
  },
});
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
