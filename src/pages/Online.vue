<template>
  <div v-if="isCreatingRoom">
    <RoleSelectionScreen />
    <button @click="setCreatingRoom(false)">Назад</button>
    <button @click="generateRoom">Создать</button>
  </div>
  <div v-else>
    <button @click="setCreatingRoom(true)">Создать комнату</button>
    <button @click="setModalVisible(true)">Присоединиться к комнате</button>
    <div
      class="modal"
      :class="{ show: isModalVisible }"
      @click="setModalVisible(false)"
    >
      <div @click.stop class="modal__content">
        <p>Введите ваше имя и код комнаты</p>
        <input v-model="dataForRoom.name" type="text" placeholder="Ваше имя" />
        <input v-model="dataForRoom.id" type="text" placeholder="a3gr" />
        <button @click="connectToRoom">Подключится</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import RoleSelectionScreen from "@/components/screens/RoleSelectionScreen.vue";
import myAxios from "@/utils/myAxios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { RoleSelectionScreen },
  setup() {
    const isModalVisible = ref(false);
    const isCreatingRoom = ref(false);
    const router = useRouter();
    const store = useStore();
    const dataForRoom = ref({
      name: localStorage.getItem("user-name") || "",
      id: "",
    });
    const players = [{ name: "player 1", role: "Role" }];
    // console.log(
    //   [store.state.roles.roles],
    //   store.state.roles.roles.flatMap(
    //   (role: { name: string; number: number }) =>
    //     Array.from({ length: role.number }, () => role.name)
    // )
    // );
    const onlyRoles = computed(() => store.getters.onlyRoles);
    console.log("onlyRoles", onlyRoles.value);

    const setModalVisible = (value: boolean) => {
      isModalVisible.value = value;
    };

    const setCreatingRoom = (value: boolean) => {
      isCreatingRoom.value = value;
    };

    const generateRoom = async () => {
      sessionStorage.removeItem("playerNumber");
      try {
        const { data } = await myAxios.post("/generate", {
          players,
          name: "infoForRoom.name",
        });
        router.push(`/room/${data.id}`);
      } catch (error) {
        console.log("error", error);
      }
    };

    watch(dataForRoom.value, () => {
      localStorage.setItem("user-name", dataForRoom.value.name);
    });

    const connectToRoom = async () => {
      try {
        const { data } = await myAxios.post(
          `/connect/${dataForRoom.value.id}`,
          { name: dataForRoom.value.name }
        );
        sessionStorage.setItem("playerNumber", `${data.playerNumber - 1}`);
        router.push(`/room/${dataForRoom.value.id}`);
      } catch (error) {
        console.log("error", error);
      }
    };

    return {
      isModalVisible,
      isCreatingRoom,
      setModalVisible,
      setCreatingRoom,
      generateRoom,
      dataForRoom,
      connectToRoom,
    };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
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
  background: white;
  border-radius: 1rem;
}
.modal.show {
  opacity: 1;
  z-index: 1;
}
</style>
