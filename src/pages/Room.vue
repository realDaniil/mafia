<template>
  <div>
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
    <Card v-else :name="player?.name" :role="player?.role" />
  </div>
</template>

<script lang="ts">
import myAxios from "@/utils/myAxios";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import Card from "@/components/card/Card.vue";

export default defineComponent({
  components: { Card },
  setup() {
    const route = useRoute();
    const player = ref();
    const errorMessage = ref();

    const connect = async () => {
      try {
        const { data } = await myAxios.get(`/room/${route.params.id}`);
        console.log("data", data);
        const playerNumber = sessionStorage.getItem("playerNumber");

        if (!playerNumber || typeof playerNumber !== "number") {
          sessionStorage.setItem(
            "playerNumber",
            `${data.connectedPlayers - 1}`
          );
        }
        player.value = data.players[sessionStorage.getItem("playerNumber")!];

        if (data.message === "room-full") {
          errorMessage.value = "Комната полная";
          sessionStorage.removeItem("playerNumber");
        }
      } catch (error: any) {
        if (error.response.data.message === "not-found") {
          errorMessage.value = "Такой комнаты не существует";
          sessionStorage.removeItem("playerNumber");
        }
      }
    };
    connect();

    return {
      player,
      errorMessage,
    };
  },
});
</script>
