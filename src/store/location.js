import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // require explicit argument, ignore undefined calls
    setActiveLocation: (location) => set((state) => {
        if (location === undefined) return;

        // allow explicit null if intended
        state.activeLocation = location;
    }),

    resetActiveLocation: () => set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
    }),
})));

export default useLocationStore;