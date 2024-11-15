"use client"
import { configureStore } from '@reduxjs/toolkit'
import reducer from './storeSlice'

export const makeStore = configureStore({
    reducer
})
