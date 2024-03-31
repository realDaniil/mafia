<template>
  <div>
    <div v-for="(player, index) in players" :key="index">
      {{ player.name }}
      {{ player.role }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const names = store.state.names.names;
    const onlyRoles = computed(() => store.getters.onlyRoles);
    console.log("onlyRoles", onlyRoles.value);

    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    shuffleArray(onlyRoles.value);

    const players = names.map((name: string, index: number) => {
      return { name: name, role: onlyRoles.value[index] };
    });
    return {
      players,
    };
  },
});
</script>
