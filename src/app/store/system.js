import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSystemStore = create(
  immer((set) => ({
    login: true,
    activeMenu: null, //"wifi" | "settings" | "system" | null
    wifi: true,

    setLogin: (login) =>
      set((state) => {
        state.login = login;
      }),

    toggleMenu: (menu) =>
      set((state) => {
        state.activeMenu = menu === state.activeMenu ? null : menu;
      }),

    closeMenu: () => set({ activeMenu: null }),

    toggleWifi: () =>
      set((state) => {
        state.wifi = !state.wifi;
      }),
  })),
);

export default useSystemStore;
