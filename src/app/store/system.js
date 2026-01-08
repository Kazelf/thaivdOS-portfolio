import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSystemStore = create(
  immer((set) => ({
    login: false,

    setLogin: (login) =>
      set((state) => {
        state.login = login;
      }),
  }))
);

export default useSystemStore;
