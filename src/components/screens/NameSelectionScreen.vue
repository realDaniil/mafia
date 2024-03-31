<template>
  <div>
    <div v-for="(name, index) in names" :key="index">
      <input
        type="text"
        :value="name"
        @input="updateName(index, $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const roles = store.state.roles.roles;
    const names = computed(() => store.state.names.names);

    let playerCount = 0;

    store.commit(
      "setNames",
      roles.flatMap((role: { name: string; number: number }) =>
        Array.from({ length: role.number }, () => `Игрок ${++playerCount}`)
      )
    );

    watch(names, (newNames) => {
      store.commit("setNames", newNames);
    });

    const updateName = (index: number, name: string) => {
      store.commit("setName", { index, name });
    };

    return {
      roles,
      names,
      updateName,
    };
  },
});
</script>
