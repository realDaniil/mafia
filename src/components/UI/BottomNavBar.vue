<template>
  <div class="bottom-nav-bar">
    <slot></slot>
  </div>
</template>

<style scoped>
.bottom-nav-bar {
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  box-sizing: border-box;
}
</style>
