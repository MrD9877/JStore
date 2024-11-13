"use client"
import { createSlice } from '@reduxjs/toolkit'
import ACTIONS from './action';

const findAmount = (products) => {
    const sum = products.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.count);
    }, 0)
    return sum
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        products: undefined,
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.count += 1;
            if (state.products !== undefined) {
                const temp = state.products
                const dublicate = temp.find((item) => item.id === action.payload.id)
                if (dublicate) return state = state
            }
            if (state.products === undefined) {
                state.products = [{ ...action.payload, count: 1 }]
            } else {
                state.products = [...state.products, { ...action.payload, count: 1 }]
            }
            state.total = findAmount(state.products)
        },
        removeFromCart: (state, action) => {
            state.count -= 1
            if (state.products === undefined) {
                return
            } else {
                const temp = [...state.products]
                const index = temp.findIndex((item) => item.id === action.payload)
                state.products = [...state.products.slice(0, index), ...state.products.slice(index + 1)]
            }
            state.total = findAmount(state.products)
        },
        editCart: (state, action) => {
            if (action.payload.type === ACTIONS.ADD) {
                const temp = [...state.products]
                const index = temp.findIndex((item) => item.id === action.payload.product.id)
                state.products[index].count = state.products[index].count + 1
            }
            if (action.payload.type === ACTIONS.SUBTRACT) {
                const temp = [...state.products]
                const index = temp.findIndex((item) => item.id === action.payload.product.id)
                state.products[index].count -= 1
            }
            state.total = findAmount(state.products)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, editCart } = cartSlice.actions

export default cartSlice.reducer