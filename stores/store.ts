import { indexDBStorage } from "@/utils/indexDb-storage";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const createIndexDBStore = <T extends object>({
  name,
  methods,
}: {
  name: string;
  methods: StateCreator<T>;
}) =>
  create(
    persist(methods, {
      name,
      storage: createJSONStorage(() => indexDBStorage),
    })
  );
