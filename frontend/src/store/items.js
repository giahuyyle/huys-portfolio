import { create } from "zustand";
import { fetchItems, fetchItemByKey } from "../services/content.service.js";

export const useItemsStore = create((set, get) => ({
  items: [],
  cache: new Map(),
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchItems();
      const items = data.items ?? data;
      set({ items, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getByKey: async (key) => {
    const { cache } = get();
    const ck = `key:${key}`;
    if (cache.has(ck)) return cache.get(ck);
    const data = await fetchItemByKey(key);
    const item = data.item ?? data;
    cache.set(ck, item);
    set({ cache: new Map(cache) });
    return item;
  },
}));