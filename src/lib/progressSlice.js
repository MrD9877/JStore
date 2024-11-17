"use client"
import { createSlice } from '@reduxjs/toolkit'
import ACTIONS from './action';

export const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        progress: 0,
    },
    reducers: {
        editProgress: (state, action) => {
            state.progress += state.progress;
        },
    }
})

export const { editProgress } = progressSlice.actions

export default progressSlice.reducer