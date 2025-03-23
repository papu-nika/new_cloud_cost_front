// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PriceState = {
  id: string;
  sku: string;
  type: string;
  displayName: string;
  state: any;
  number: number;
  price: number;
};

type Store = {
  selected: PriceState[];
  append: (price: PriceState) => void;
  remove: (sku: string) => void;
  update: (sku: string, number: number) => void;
};

export const useTotalPriceStore = create<Store>()(
  persist(
    (set) => ({
      selected: [],

      append: (price: PriceState) => {
        price.id = crypto.randomUUID();
        set((state) => ({ selected: [...state.selected, price] }));
      },

      update: (id: string, number: number) =>
        set((state) => ({
          selected: state.selected.map((selected) =>
            selected.id === id ? { ...selected, number: number } : selected
          ),
        })),

      add: (id: string) =>
        set((state) => ({
          selected: state.selected.map((selected) =>
            selected.id === id
              ? { ...selected, number: selected.number + 1 }
              : selected
          ),
        })),

      remove: (id: string) =>
        set((state) => ({
          selected: state.selected.filter((selected) => selected.id !== id),
        })),
    }),
    {
      name: "total-price-store", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useTotalPriceStore;
