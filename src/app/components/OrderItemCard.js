"use client"
import React, { useEffect, useState } from 'react'
import AcceptRejectBtn from '../_utility/AcceptRejectBtn'
import Loading from './Loading'
import CustomCarousel from './CustomCarousel'
import CustomerDetailCard from './CustomerDetailCard'
import OrderDetailCard from './OrderDetailCard'

export default function OrderItemCard({ orderId }) {
    const [order, setOrder] = useState()
    const [customer, setCustomer] = useState()
    const fetchOrder = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/orders?orderId=${orderId}`, { credentials: "include" })
            if (res.status === 200) {
                const data = await res.json()
                setOrder(data[0])
            } else if (res.status === 401) {
                console.log("pop")
            }
        } catch {
            console.log("popo")
        }
    }
    const fetchCustomer = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/customer?username=${order.username}`, { credentials: "include" })
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                setCustomer(data)
            } else if (res.status === 401) {
                console.log("logib")
            } else {
                console.log("again")
            }
        } catch {
            console.log("pop")
        }
    }
    useEffect(() => {
        fetchOrder()
    }, [])
    useEffect(() => {
        fetchCustomer()
    }, [order])
    return (
        <div style={{ minHeight: "100vh" }} className='bg-gray-500'>
            {order ? (
                <CustomCarousel>
                    {order.products.map((item) => {
                        return <div className='w-screen bg-gray-700'>
                            <img className='object-contain' style={{ height: "30vh" }} src={item.images[0]} alt="" />
                        </div>
                    })}
                </CustomCarousel>
            ) : <Loading height='30vh' />}
            <CustomerDetailCard customer={customer} />
            <OrderDetailCard order={order} />
            <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className='flex justify-center mt-3 mb-0 items-center'>
                    {order && <AcceptRejectBtn orderStatus={order.status} orderId={orderId} />}
                </div>
            </div>
        </div>
    )
}
