interface State {
  names: string[];
}

export const namesModule = {
  state: (): State => ({
    names: []
  }),
  mutations: {
    setNames(state: State, names: string[]) {
      state.names = names;
    },
    setName(state: State, { index, name }: { index: number; name: string }) {
      state.names[index] = name;
    }
  }
};
