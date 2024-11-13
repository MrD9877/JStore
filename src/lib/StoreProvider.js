'use client'
import { useState } from 'react'
import { valueContext, setValueContext } from './Store'
import Store from './Store'



export default function StoreProvider({ children }) {
    const obj = Store()
    return (
        <setValueContext.Provider value={obj.dispatch}>
            <valueContext.Provider value={obj.state}>
                {children}
            </valueContext.Provider>
        </setValueContext.Provider>
    )
}


