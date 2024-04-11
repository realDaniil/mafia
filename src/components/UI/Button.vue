<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped>
.button {
  background: var(--red);
  border-radius: 8px;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 1rem;
  width: 300px;
}
</style>
