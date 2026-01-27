import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getLocations } from "../services/content.service";

function normalizeLocationsResponse(data) {
  const arr = data?.locations;
  if (!Array.isArray(arr)) return {};

  return Object.fromEntries(
    arr
      .filter(Boolean)
      .map((loc) => [loc.key, loc])
      .filter(([key]) => typeof key === "string" && key.length > 0)
  );
}

const useLocationStore = create(
  immer((set, get) => ({
    locations: {},
    activeLocation: null,

    fetchLocations: async () => {
      const data = await getLocations(); // <-- call named function
      const normalized = normalizeLocationsResponse(data);

      set((state) => {
        state.locations = normalized;

        if (!state.activeLocation) {
          state.activeLocation =
            normalized.work ?? Object.values(normalized)[0] ?? null;
        }
      });

      return normalized;
    },

    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        const locs = get().locations;
        state.activeLocation = locs.work ?? Object.values(locs)[0] ?? null;
      }),
  }))
);

export default useLocationStore;
