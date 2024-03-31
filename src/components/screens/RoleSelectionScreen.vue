<template>
  <div>
    <p>Количество ролей</p>
    <RoleSelectionElement
      v-for="(role, index) in roles"
      :key="index"
      :role="role"
      :roleIndex="index"
      @delete="deleteRole"
      @update="updateRole"
    />
    <div>
      <input v-model="newRole" type="text" placeholder="Добавить роль" />
      <button @click="addRole">Добавить</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import RoleSelectionElement from "./RoleSelectionElement.vue";

export default {
  components: {
    RoleSelectionElement,
  },
  setup() {
    const store = useStore();
    const newRole = ref();

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
    };
  },
};
</script>
