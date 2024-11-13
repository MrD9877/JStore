"use client"
import { createContext, useState, useReducer } from 'react';
export const valueContext = createContext(0);
export const setValueContext = createContext("")

const ACTIONS = {
    ADD: "increment",
    SUBTRACT: "dicrement"
}

function addTocart(state, action) {
    let returnObj = state
    const dublicate = state.products.find((item, index) => {
        if (item.product.id === action.payload.product.id) {
            return { item: item, index: index }
        }
    })
    if (dublicate === undefined) {
        returnObj.count += 1
        returnObj.products.push({
            product: action.payload.product,
            count: 1
        })
        return returnObj

    }
}

export function reducer(state, action) {
    switch (action.type) {
        case "addTocart":
            const returnObj = addTocart(state, action)
            console.log(returnObj.products[0])
            return returnObj;
        case ACTIONS.SUBTRACT:
            return { count: state.count - 1 };
        default:
            return state
    }
}

export default function Store() {
    const [state, dispatch] = useReducer(reducer, { count: 0, products: [] })
    const obj = { state: state, dispatch: dispatch }


    return (obj)
}
