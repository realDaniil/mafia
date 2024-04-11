<template>
  <AppearElement>
    <div class="screen">
      <div class="screen__inner-container py-4">
        <p class="text-xl text-center mb-2">Имена игроков</p>
        <div v-for="(name, index) in names" :key="index">
          <input
            class="mt-4"
            type="text"
            :value="name"
            @input="updateName(index, $event.target?.value)"
            maxlength="100"
          />
        </div>
      </div>
    </div>
  </AppearElement>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const roles = store.state.roles.roles;
    const onlyRoles = computed(() => store.getters.onlyRoles);
    const names = computed(() => store.state.names.names);
    const localNames = localStorage.getItem('names');

    let playerCount = 0;

    store.commit(
      'setNames',
      roles.flatMap((role: { name: string; number: number }) =>
        Array.from({ length: role.number }, () => `Игрок ${++playerCount}`)
      )
    );

    watch(names, newNames => {
      store.commit('setNames', newNames);
    });

    const updateName = (index: number, name: string) => {
      store.commit('setName', { index, name });
      localStorage.setItem('names', JSON.stringify(names.value));
    };

    if (localNames) {
      const storedNames = JSON.parse(localNames);
      if (Array.isArray(storedNames)) {
        for (let i = 0; i < onlyRoles.value.length; i++) {
          const name = storedNames[i] || `Игрок ${i + 1}`;
          updateName(i, name);
        }
      }
    }

    return {
      names,
      updateName
    };
  }
});
</script>
