"use client";
import { createSlice } from "@reduxjs/toolkit";
import ACTIONS from "./action";

const findAmount = (products) => {
  const sum = products.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.count;
  }, 0);
  return sum;
};

const updateCart = async (state, previousState) => {
  try {
    // await new Promise((res) => {
    //   setTimeout(res, 1000);
    // });
    // throw Error();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(state),
    });
  } catch (err) {
    console.log(err);
  }
};

const findGivenIndex = (temp, action) => {
  const index = temp.findIndex((item) => item.productId === action.payload.product.productId && item.selectedColor === action.payload.product.selectedColor && item.selectedSize === action.payload.product.selectedSize);
  return index;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
    products: undefined,
    total: 0,
    progress: 0,
  },
  reducers: {
    editProgress: (state, action) => {
      state.progress = action.payload;
    },
    setCart: (state, action) => {
      state.count = action.payload.count;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
    addToCart: (state, action) => {
      const previousState = {
        products: structuredClone(state.products),
        count: state.count,
      };
      if (!state.products) {
        state.products = [{ ...action.payload.product, count: 1 }];
      } else {
        const duplicateIndex = findGivenIndex(state.products, action);
        if (duplicateIndex !== -1) return;

        state.products.push({ ...action.payload.product, count: 1 });
      }
      state.count += 1;
      state.total = findAmount(state.products);
      updateCart(state, previousState);
    },
    removeFromCart: (state, action) => {
      const previousState = {
        products: structuredClone(state.products),
        count: state.count,
      };
      state.count -= 1;
      if (state.products === undefined) {
        return;
      } else {
        const temp = [...state.products];
        const index = findGivenIndex(temp, action);
        state.products = [...state.products.slice(0, index), ...state.products.slice(index + 1)];
      }
      state.total = findAmount(state.products);
      updateCart(state, previousState);
    },
    editCart: (state, action) => {
      const previousState = {
        products: structuredClone(state.products),
        count: state.count,
      };
      if (action.payload.type === ACTIONS.ADD) {
        const temp = [...state.products];
        const index = findGivenIndex(temp, action);
        state.products[index].count = state.products[index].count + 1;
      }
      if (action.payload.type === ACTIONS.SUBTRACT) {
        const temp = [...state.products];
        const index = findGivenIndex(temp, action);
        if (state.products[index].count <= 1) {
          state.products[index].count = 1;
        } else {
          state.products[index].count -= 1;
        }
      }
      state.total = findAmount(state.products);
      updateCart(state, previousState);
    },
    clearCart: (state) => {
      const previousState = {
        products: structuredClone(state.products),
        count: state.count,
      };
      state.count = 0;
      state.products = undefined;
      state.total = 0;
      updateCart(state, previousState);
    },
    goBack: (state, action) => {
      state.products = action.payload.products;
      state.count = action.payload.count;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, editCart, setCart, editProgress, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
