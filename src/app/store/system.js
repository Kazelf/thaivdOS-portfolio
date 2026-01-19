import { useRef } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSystemStore = create(
  immer((set) => ({
    login: true,
    activeMenu: null, //"wifi" | "settings" | "system" | null
    wifi: true,
    bluetooth: true,
    airdrop: true,
    audioPlaying: false,

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

    toggleBluetooth: () =>
      set((state) => {
        state.bluetooth = !state.bluetooth;
      }),

    toggleAirDrop: () =>
      set((state) => {
        state.airdrop = !state.airdrop;
      }),

    setAudioPlaying: (audioPlaying) =>
      set((state) => {
        state.audioPlaying = audioPlaying;
      }),
  })),
);

export default useSystemStore;
