import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { CartStore, Product } from "./interface";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./mmkv";

type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

export const useCartStore = create<CartStore, any>(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product: Product): void => {
        set((state) => {
          let hasProduct = false;
          // if we have the product already, we should find it, and add 1 to it's quantity;
          const nextProducts = state.products.map((p) => {
            if (p.id === product.id) {
              // we found that the product to add already exsit, we mark it,
              hasProduct = true;
              // then add 1 to quantity
              return { ...p, quantity: p.quantity + 1 };
            } else {
              return p;
            }
          });

          if (hasProduct) {
            return { products: nextProducts };
          }
          // if we don't have the product, add the product with quantity: 1
          return { products: [...state.products, { ...product, quantity: 1 }] };
        });
      },
      reduceProduct: (productId: number): void => {
        set((state) => ({
          products: state.products
            .map((p) => {
              if (p.id === productId) {
                return { ...p, quantity: p.quantity - 1 };
              } else {
                return p;
              }
            })
            .filter((p) => p.quantity !== 0),
        }));
      },
      clearCart: (): void => set({ products: [] }),
      total: () => get().products.reduce((acc, cur) => acc + cur.quantity, 0),
      sum: () =>
        get()
          .products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
          .toFixed(2),
    }),
    { name: "cart", storage: createJSONStorage(() => zustandStorage) }
  )
);
