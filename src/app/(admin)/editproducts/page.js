"use client"
import ItemsCard from '@/app/components/ItemsCard'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [products, setProducts] = useState()
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/product`)
            if (res.status === 200) {
                const data = await res.json()
                setProducts(data)
            }
        } catch {
            console.log("pop")
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='mt-2'>
            <ItemsCard admin={true} array={products} />
        </div>
    )
}