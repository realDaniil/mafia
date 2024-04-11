<template>
  <AppearElement>
    <div v-if="deletedRolesCounter >= players.length" class="screen">
      <div class="screen__inner-container">
        <div class="py-4">
          <p class="text-center text-xl">Игроки</p>
          <div
            v-for="(player, index) in players"
            :key="index"
            class="flex mt-4 justify-between"
          >
            <p class="mr-4 short-text">{{ player?.name || "Имя игрока" }}</p>
            <button @click="showCard(player?.name, player?.role)">
              Узнать роль
            </button>
          </div>
          <div
            class="one-card-holder holder"
            ref="oneCardHolderRef"
            :class="isModalVisible && 'show'"
            @click="handleModalClose"
          ></div>
        </div>
      </div>
    </div>
    <div v-else class="holder">
      <Card
        v-for="(player, index) in reversedPlayers"
        :key="index"
        :name="player?.name"
        :role="player?.role"
        :style="transformCardStyle(index)"
        @cardRemoved="handleCardRemoved"
        :class="
          players.length !== index + 1 + deletedRolesCounter && 'disabled'
        "
      />
    </div>
  </AppearElement>
</template>

<script lang="ts">
import { computed, createVNode, defineComponent, ref, render } from "vue";
import { useStore } from "vuex";
import shuffleArray from "@/utils/shuffleArray";
import Card from "@/components/Card.vue";

export default defineComponent({
  components: { Card },
  setup() {
    const store = useStore();
    const names = store.state.names.names;
    const onlyRoles = computed(() => store.getters.onlyRoles);
    const roles = shuffleArray(onlyRoles.value);
    const deletedRolesCounter = ref(0);
    const card = ref({ name: "", role: "" });
    const isModalVisible = ref(false);
    const oneCardHolderRef = ref();
    const firstSelectedCardClick = ref(true);

    const handleCardRemoved = () => {
      deletedRolesCounter.value++;
    };

    const players = names.map((name: string, index: number) => {
      return { name: name, role: roles[index] };
    });

    const showCard = (name: string, role: string) => {
      isModalVisible.value = true;
      oneCardHolderRef.value.innerHTML = "";
      card.value = { name, role };

      const vnode = createVNode(Card, { name, role });
      const container = document.createElement("div");
      render(vnode, container);

      const cardElement = container.firstChild;
      if (cardElement) {
        oneCardHolderRef.value.appendChild(cardElement);
      }
    };

    const handleModalClose = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest(".card") && firstSelectedCardClick.value) {
        firstSelectedCardClick.value = false;
      } else {
        isModalVisible.value = false;
        firstSelectedCardClick.value = true;
      }
    };

    const transformCardStyle = (index: number) => {
      let translatePosition =
        (players.length - index - 1 - deletedRolesCounter.value) * 6;
      if (translatePosition > 18) translatePosition = 18;

      return {
        transform: `translate(-${translatePosition}px, -${translatePosition}px)`,
      };
    };

    return {
      players,
      deletedRolesCounter,
      handleCardRemoved,
      card,
      showCard,
      isModalVisible,
      oneCardHolderRef,
      handleModalClose,
      reversedPlayers: [...players].reverse(),
      transformCardStyle,
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
.disabled {
  pointer-events: none;
}
.one-card-holder {
  transition: 0.2s;
  opacity: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
}
.one-card-holder.show {
  opacity: 1;
  z-index: 1;
}
</style>
