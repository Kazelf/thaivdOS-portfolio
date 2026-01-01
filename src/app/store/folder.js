import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

const DEFAULT_FOLDER = {
  id: "root",
  name: "Portfolio",
  kind: "folder",
  children: Object.values(locations),
};

const useFolderStore = create(
  immer((set) => ({
    path: [DEFAULT_FOLDER],
    currentFolder: DEFAULT_FOLDER,

    openFolder: (folder) =>
      set((state) => {
        state.path.push(folder);
        state.currentFolder = folder;
      }),

    jumpTo: (index) =>
      set((state) => {
        state.path = state.path.slice(0, index + 1);
        state.currentFolder = state.path[state.path.length - 1];
      }),

    goBack: () =>
      set((state) => {
        if (state.path.length <= 1) return;
        state.path.pop();
        state.currentFolder = state.path[state.path.length - 1];
      }),
  }))
);

export default useFolderStore;
