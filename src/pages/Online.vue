<template>
  <AppearElement>
    <div v-if="isCreatingRoom">
      <RoleSelectionScreen>
        <input
          v-model="dataForRoom.name"
          type="text"
          placeholder="Ваше имя"
          style="width: 100%"
          maxlength="100"
        />
      </RoleSelectionScreen>
    </div>
    <div v-else class="holder">
      <p class="text-xl">Онлайн</p>
      <MyButton @click="setCreatingRoom(true)">Создать комнату</MyButton>
      <MyButton style="background: #636363" @click="setModalVisible(true)"
        >Присоединиться к комнате</MyButton
      >
      <div
        class="modal"
        :class="{ show: isModalVisible }"
        @click="setModalVisible(false)"
      >
        <div @click.stop class="modal__content">
          <p class="mb-4 text-xl">Введите ваше имя и код комнаты</p>
          <input
            v-model="dataForRoom.name"
            type="text"
            placeholder="Ваше имя"
            maxlength="100"
          />
          <input
            v-model="dataForRoom.id"
            type="text"
            placeholder="ID игры: a3gr"
            class="my-4"
          />
          <MyButton
            @click="connectToRoom"
            :disabled="
              dataForRoom.id.length === 0 || dataForRoom.name.length === 0
            "
            >Подключится</MyButton
          >
        </div>
      </div>
    </div>
  </AppearElement>
  <AppearElement>
    <BottomNavBar>
      <button @click="setCreatingRoom(false)">Назад</button>
      <button
        v-if="isCreatingRoom"
        @click="generateRoom"
        :disabled="onlyRoles.length === 0"
      >
        Создать
      </button>
    </BottomNavBar>
  </AppearElement>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import RoleSelectionScreen from "@/components/screens/RoleSelectionScreen.vue";
import myAxios from "@/utils/myAxios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import shuffleArray from "@/utils/shuffleArray";

export default defineComponent({
  components: { RoleSelectionScreen },
  setup() {
    const isModalVisible = ref(false);
    const isCreatingRoom = ref(false);
    const router = useRouter();
    const store = useStore();
    const dataForRoom = ref({
      name: localStorage.getItem("player-name") || "",
      id: "",
    });
    const onlyRoles = computed(() => store.getters.onlyRoles);

    const setModalVisible = (value: boolean) => {
      isModalVisible.value = value;
    };

    const setCreatingRoom = (value: boolean) => {
      if (isCreatingRoom.value === false && value === false)
        return router.push("/");
      isCreatingRoom.value = value;
    };

    const generateRoom = async () => {
      const players = shuffleArray(onlyRoles.value).map(
        (role: string, index: number) => {
          return { name: `Игрок ${index + 1}`, role };
        }
      );
      sessionStorage.removeItem("player-number");
      try {
        const { data } = await myAxios.post("/generate", {
          players,
          name: dataForRoom.value.name,
        });
        router.push(`/room/${data.id}`);
      } catch (error) {
        console.log("error", error);
      }
    };

    watch(dataForRoom.value, () => {
      localStorage.setItem("player-name", dataForRoom.value.name);
    });

    const connectToRoom = async () => {
      sessionStorage.removeItem("player-number");
      router.push(`/room/${dataForRoom.value.id}`);
    };

    return {
      isModalVisible,
      isCreatingRoom,
      setModalVisible,
      setCreatingRoom,
      generateRoom,
      dataForRoom,
      connectToRoom,
      onlyRoles,
    };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  opacity: 0;
  transition: 0.5s;
}
.modal__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  background: rgb(54, 54, 54);
  border-radius: 1rem;
}
.modal.show {
  opacity: 1;
  z-index: 1;
}
</style>
