<template>
  <AppearElement>
    <div class="screen">
      <div class="screen__inner-container py-4">
        <transition-group name="list" tag="div">
          <div key="text">
            <p class="text-xl text-center mb-2">Количество ролей</p>
          </div>
          <RoleSelectionElement
            v-for="(role, index) in roles"
            :key="role.id"
            :role="role"
            :roleIndex="index"
            @delete="deleteRole"
            @update="updateRole"
          />
          <div class="flex justify-between w-[300px] my-4" key="add-role">
            <input
              v-model="newRole"
              type="text"
              placeholder="Добавить роль"
              maxlength="100"
            />
            <button @click="addRole" :disabled="isDisabled">Добавить</button>
          </div>
          <div key="slot">
            <slot></slot>
          </div>
        </transition-group>
      </div>
    </div>
  </AppearElement>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import RoleSelectionElement from "./RoleSelectionElement.vue";

export default {
  components: {
    RoleSelectionElement,
  },
  setup() {
    const store = useStore();
    const newRole = ref();
    const isDisabled = computed(() => !newRole.value);

    const setLocalRoles = () => {
      localStorage.setItem("roles", JSON.stringify(store.state.roles.roles));
    };

    store.subscribe((mutation, state) => {
      if (
        mutation.type === "addRole" ||
        mutation.type === "deleteRole" ||
        mutation.type === "updateRole"
      ) {
        localStorage.setItem("roles", JSON.stringify(state.roles.roles));
      }
    });

    const localRoles = localStorage.getItem("roles");

    if (!localRoles || !localRoles.length) {
      store.commit("setRoles", [
        { id: 1, name: "Мирный житель", number: 0 },
        { id: 2, name: "Комиссар", number: 0 },
        { id: 3, name: "Доктор", number: 0 },
        { id: 4, name: "Путана", number: 0 },
        { id: 5, name: "Мафия", number: 0 },
        { id: 6, name: "Дон", number: 0 },
        { id: 7, name: "Маньяк", number: 0 },
      ]);
      setLocalRoles();
    }
    store.commit("setRoles", JSON.parse(localStorage.getItem("roles")!));

    const addRole = () => {
      store.commit("addRole", {
        name: newRole.value,
        number: 0,
        isCustom: true,
      });
      newRole.value = "";
    };

    const deleteRole = (roleIndex: number) => {
      store.commit("deleteRole", roleIndex);
    };

    const updateRole = (payload: { index: string; number: number }) => {
      store.commit("updateRole", payload);
      setLocalRoles();
    };

    return {
      roles: store.state.roles.roles,
      newRole,
      addRole,
      deleteRole,
      updateRole,
      isDisabled,
    };
  },
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
