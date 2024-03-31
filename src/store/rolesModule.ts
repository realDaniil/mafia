interface Role {
  id: number;
  name: string;
  number: number;
  isCustom?: boolean;
}

interface State {
  roles: Role[];
}

export const rolesModule = {
  state: (): State => ({
    roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  }),
  getters: {
    onlyRoles(state: State): string[] {
      return state.roles.flatMap((role: Role) =>
        Array.from({ length: role.number }, () => role.name)
      );
    },
  },
  mutations: {
    setRoles(state: State, roles: Role[]) {
      state.roles = roles;
    },
    addRole(state: State, role: Role) {
      state.roles.push({ ...role, id: state.roles.length + 1 });
    },
    deleteRole(state: State, roleIndex: number) {
      state.roles.splice(roleIndex, 1);
    },
    updateRole(state: State, payload: { index: number; number: number }) {
      const { index, number } = payload;
      state.roles[index].number = number;
    },
  },
};
