"use client"
import { createSlice } from '@reduxjs/toolkit'
import ACTIONS from './action';

const findAmount = (products) => {
    const sum = products.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.count);
    }, 0)
    return sum
}

const updateCart = async (state) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/cart`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(state)
            })
    } catch (err) {
        console.log("error in saving cart items")
    }
}

const findGivenIndex = (temp, action) => {
    const index = temp.findIndex((item) => item.productId === action.payload.product.productId && item.selectedColor === action.payload.product.selectedColor && item.selectedSize === action.payload.product.selectedSize)
    console.log(index)
    return index
}

export const cartSlice = createSlice({
    name: 'cart',
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
            state.count += 1;
            if (state.products !== undefined) {
                const temp = state.products
                const dublicate = findGivenIndex(temp, action)
                if (dublicate !== -1) return state = state
            }
            if (state.products === undefined) {
                state.products = [{ ...action.payload.product, count: 1 }]
            } else {
                state.products = [...state.products, { ...action.payload.product, count: 1 }]
            }
            state.total = findAmount(state.products)
            updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.count -= 1
            if (state.products === undefined) {
                return
            } else {
                const temp = [...state.products]
                const index = findGivenIndex(temp, action)
                state.products = [...state.products.slice(0, index), ...state.products.slice(index + 1)]
            }
            state.total = findAmount(state.products)
            updateCart(state)
        },
        editCart: (state, action) => {
            if (action.payload.type === ACTIONS.ADD) {
                const temp = [...state.products]
                const index = findGivenIndex(temp, action)
                state.products[index].count = state.products[index].count + 1
            }
            if (action.payload.type === ACTIONS.SUBTRACT) {
                const temp = [...state.products]
                const index = findGivenIndex(temp, action)
                if (state.products[index].count <= 1) {
                    state.products[index].count = 1
                } else {
                    state.products[index].count -= 1
                }
            }
            state.total = findAmount(state.products)
            updateCart(state)
        },
        clearCart: (state) => {
            state.count = 0
            state.products = undefined
            state.total = 0
            updateCart(state)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, editCart, setCart, editProgress, clearCart } = cartSlice.actions

export default cartSlice.reducer