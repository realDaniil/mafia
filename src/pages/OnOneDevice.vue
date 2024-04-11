<template>
  <component :is="screens[currentScreen]"></component>
  <AppearElement>
    <BottomNavBar>
      <button @click="prevScreen">Назад</button>
      <button @click="nextScreen" :disabled="onlyRoles.length === 0">
        {{ currentScreen + 1 !== screens.length ? 'Дальше' : 'Заново' }}
      </button>
    </BottomNavBar>
  </AppearElement>
</template>

<script lang="ts">
import { computed, defineComponent, markRaw, ref } from 'vue';
import RoleSelectionScreen from '@/components/screens/RoleSelectionScreen.vue';
import NameSelectionScreen from '@/components/screens/NameSelectionScreen.vue';
import GameOnOneDeviceScreen from '@/components/screens/GameOnOneDeviceScreen.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    RoleSelectionScreen,
    NameSelectionScreen,
    GameOnOneDeviceScreen
  },
  setup() {
    const screens = markRaw([RoleSelectionScreen, NameSelectionScreen, GameOnOneDeviceScreen]);
    const currentScreen = ref(0);
    const router = useRouter();
    const store = useStore();

    const onlyRoles = computed(() => store.getters.onlyRoles);

    const prevScreen = () => {
      if (currentScreen.value === 0) return router.push('/');
      currentScreen.value--;
    };

    const nextScreen = () => {
      currentScreen.value = (currentScreen.value + 1) % screens.length;
    };

    return {
      screens,
      currentScreen,
      nextScreen,
      prevScreen,
      onlyRoles
    };
  }
});
</script>
