<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped>
.button {
  font-size: 17px;
  background: transparent;
  border: none;
  padding: 1em 1.5em;
  color: #ffedd3;
  text-transform: uppercase;
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;
}

.button::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #ffc506;
  transition: 0.5s ease;
}

.button:hover {
  color: #1e1e2b;
  transition-delay: 0.5s;
}

.button:hover::before {
  width: 100%;
}

.button::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  background-color: #ffc506;
  transition: 0.4s ease;
  z-index: -1;
}

.button:hover::after {
  height: 100%;
  transition-delay: 0.4s;
  color: aliceblue;
}
</style>
