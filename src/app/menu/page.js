"use client"
import FetchProduct from '@/fetch/FetchProduct'
import React, { useEffect } from 'react'
export default function page() {
    useEffect(() => {
        FetchProduct([20, 10, 22])
    })
    return (
        <div>

        </div>
    )
}
