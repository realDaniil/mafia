<template>
  <MyLoader v-if="isLoading" />
  <div v-else>
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-else class="holder">
      <Card :name="player?.name" :role="player?.role" isLoop />
    </div>
  </div>
  <BottomNavBar>
    <button @click="$router.push('/online')">Назад</button>
    <p>ID: {{ $route.params.id }}</p>
  </BottomNavBar>
</template>

<script lang="ts">
import myAxios from "@/utils/myAxios";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";

export default defineComponent({
  components: { Card },
  setup() {
    const route = useRoute();
    const player = ref();
    const errorMessage = ref();
    const isLoading = ref(true);

    if (!route.params.id) {
      errorMessage.value = "Такой комнаты не существует";
    }

    const connect = async () => {
      const playerNumber = sessionStorage.getItem("player-number");
      const playerName = localStorage.getItem("player-name");
      console.log("playerName", playerName);
      try {
        const { data } = await myAxios.post(`/room/${route.params.id}`, {
          playerName,
          playerNumber,
        });
        console.log("data", data);
        player.value = data.player;
        sessionStorage.setItem("player-number", data.playerNumber);

        if (data.room.message === "room-full") {
          errorMessage.value = "Комната полная";
          sessionStorage.removeItem("player-number");
        }
      } catch (error: any) {
        if (error.response.data.message === "not-found") {
          errorMessage.value = "Такой комнаты не существует";
          sessionStorage.removeItem("player-number");
        }
      } finally {
        isLoading.value = false;
      }
    };
    connect();

    return {
      player,
      errorMessage,
      isLoading,
    };
  },
});
</script>

<style scoped>
.holder {
  position: absolute;
  overflow: hidden;
  height: calc(100dvh - 50px);
}
</style>
