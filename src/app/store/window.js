import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    toggleFullscreenWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;

        if (!win.isFullscreen) {
          win.lastNormalBounds = win.bounds ?? null;
          win.isFullscreen = true;
        } else {
          win.isFullscreen = false;
          win.bounds = win.lastNormalBounds ?? win.bounds;
          win.lastNormalBounds = null;
        }

        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    setWindowBounds: (windowKey, bounds) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.bounds = bounds;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.isFullscreen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        win.lastNormalBounds = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    resetAllWindows: () =>
      set((state) => {
        state.windows = WINDOW_CONFIG;
      }),
  }))
);

export default useWindowStore;
