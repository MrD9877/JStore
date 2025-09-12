"use client";
import { createSlice } from "@reduxjs/toolkit";
import ACTIONS, { ActionType } from "./action";
import { StoreState } from "@/@types/reduxStore";
import { CartItemsType, ProductType } from "@/@types/product";

const initialState: StoreState = {
  products: undefined,
  progress: 0,
};

type BasePayload = {
  type: ActionType;
  toast?: (msg: string, success?: boolean) => void;
};

type EditCartPayload = (BasePayload & { product: ProductType; sku: string }) | (BasePayload & { cartItem: CartItemsType });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    editProgress: (state, action) => {
      state.progress = action.payload;
    },
    setCart: (state, action) => {
      state.products = action.payload.products;
    },
    addToCart: (state, action: { payload: { product: ProductType; sku: string } }) => {
      const variant = action.payload.product.variants.find((variant) => variant.sku === action.payload.sku);
      if (!variant || variant.stock === 0) {
        return;
      }
      const cartItem: CartItemsType = {
        ...action.payload.product,
        image: action.payload.product.images[0],
        variant: { ...variant, quantity: 1 },
      };
      if (state.products) {
        const findDublicate = state.products.find((item) => item.variant.sku === variant.sku);
        if (findDublicate) return;
        state.products = [...state.products, cartItem];
      } else if (!state.products) {
        state.products = [cartItem];
      }
    },
    removeFromCart: (state, action: { payload: { product: ProductType; sku: string } | { cartItem: CartItemsType } }) => {
      let variant: Omit<CartItemsType["variant"], "quantity"> | undefined;
      if ("product" in action.payload && "sku" in action.payload) {
        const sku = action.payload.sku;
        variant = action.payload.product.variants.find((variant) => variant.sku === sku);
      }
      if ("cartItem" in action.payload) {
        variant = action.payload.cartItem.variant;
      }
      if (!variant || !state.products) {
        return;
      } else {
        state.products = state.products.filter((item) => item.variant.sku !== variant.sku);
      }
    },
    editCart: (state, action: { payload: EditCartPayload }) => {
      let variant: Omit<CartItemsType["variant"], "quantity"> | undefined;
      if ("product" in action.payload && "sku" in action.payload) {
        const sku = action.payload.sku;
        variant = action.payload.product.variants.find((variant) => variant.sku === sku);
      }
      if ("cartItem" in action.payload) {
        variant = action.payload.cartItem.variant;
      }
      if (!variant || !state.products) return;
      if (action.payload.type === ACTIONS.ADD) {
        state.products = state.products.map((items) => {
          if (items.variant.sku === variant.sku) {
            if (items.variant.quantity < variant.stock) {
              items.variant.quantity += 1;
            } else if ("toast" in action.payload) {
              action.payload.toast?.(`Only ${variant.stock} in Stock!!`);
            }
          }
          return items;
        });
      }
      if (action.payload.type === ACTIONS.SUBTRACT) {
        state.products = state.products.map((items) => {
          if (items.variant.sku === variant.sku) {
            if (items.variant.quantity > 1) {
              items.variant.quantity -= 1;
            }
          }
          return items;
        });
      }
    },
    clearCart: (state) => {
      state.products = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, editCart, setCart, editProgress, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
