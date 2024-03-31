<template>
  <div>
    <button @click="prevScreen" v-if="currentScreen > 0">Назад</button>
    <button @click="nextScreen">
      {{ currentScreen + 1 !== screens.length ? "Дальше" : "Заново" }}
    </button>
    <component :is="screens[currentScreen]"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RoleSelectionScreen from "@/components/screens/RoleSelectionScreen.vue";
import NameSelectionScreen from "@/components/screens/NameSelectionScreen.vue";
import GameOnOneDeviceScreen from "@/components/screens/GameOnOneDeviceScreen.vue";

export default defineComponent({
  components: {
    RoleSelectionScreen,
    NameSelectionScreen,
    GameOnOneDeviceScreen,
  },
  setup() {
    const screens = ref([
      RoleSelectionScreen,
      NameSelectionScreen,
      GameOnOneDeviceScreen,
    ]);
    const currentScreen = ref(0);

    const prevScreen = () => {
      currentScreen.value--;
    };

    const nextScreen = () => {
      currentScreen.value = (currentScreen.value + 1) % screens.value.length;
    };

    return {
      screens,
      currentScreen,
      nextScreen,
      prevScreen,
    };
  },
});
</script>
