import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations, musics } from "../constants";

const DEFAULT_LOCATION = locations.work;
const DEFAULT_CATEGORY = musics.favourites;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    musicCategory: DEFAULT_CATEGORY,

    setActiveLocation: (location) =>
      set((state) => {
        if (!location) return;
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),

    setMusicCategory: (category) =>
      set((state) => {
        if (!category) return;
        state.musicCategory = category;
      }),

    resetMusicCategory: () =>
      set((state) => {
        state.musicCategory = DEFAULT_CATEGORY;
      }),
  })),
);

export default useLocationStore;
