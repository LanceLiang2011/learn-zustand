import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";
const storage = new MMKV({ id: "cart-storage" });

export const zustandStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name: string) => {
    return storage.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    return storage.delete(name);
  },
};
