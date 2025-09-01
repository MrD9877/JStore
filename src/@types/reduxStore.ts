import { CartItemsType } from "./product.js";

export type StoreState = {
  products: CartItemsType[] | undefined | null;
  progress: number;
};
