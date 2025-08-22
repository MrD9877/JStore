import { CartItemsType } from "./product";

export type StoreState = {
  products: CartItemsType[] | undefined;
  progress: number;
};
