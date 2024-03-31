<template>
  <div class="holder">
    <p>{{ role.name }}</p>
    <div>
      <button @click="setCount('minus')">-</button>
      {{ role.number }}
      <button @click="setCount('plus')">+</button>
    </div>
    <button v-if="role.isCustom" @click="deleteRole">Удалить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      count: this.role.number,
    };
  },
  props: ["roleIndex", "role"],
  methods: {
    setCount(sign: string) {
      if (sign === "minus") {
        this.count = this.count > 0 ? this.count - 1 : 0;
      } else {
        this.count = this.count < 100 ? this.count + 1 : 100;
      }
      this.$emit("update", {
        index: this.roleIndex,
        number: this.count,
      });
    },
    deleteRole() {
      this.$emit("delete", this.roleIndex);
    },
  },
});
</script>

<style scoped>
.holder {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
