import { CartItemsType } from './product.js';

export type StoreState = {
  products: CartItemsType[] | undefined;
  progress: number;
};
