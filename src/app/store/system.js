import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSystemStore = create(
  immer((set) => ({
    activeMenu: null, //"wifi" | "settings" | "system" | null

    login: true,
    wifi: true,
    bluetooth: true,
    airdrop: true,
    audioPlaying: false,

    volume: 0.6,
    brightness: 1,

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

    toggleAudioPlaying: () =>
      set((state) => {
        state.audioPlaying = !state.audioPlaying;
      }),

    setVolume: (volume) =>
      set((state) => {
        state.volume = volume <= 1 && volume >= 0 ? volume : 0;
      }),

    setBrightness: (brightness) =>
      set((state) => {
        state.brightness = brightness <= 1 && brightness >= 0 ? brightness : 0;
      }),
  })),
);

export default useSystemStore;
