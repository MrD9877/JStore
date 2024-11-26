"use client"
import React, { useEffect, useState } from 'react'
import AcceptRejectBtn from '../_utility/AcceptRejectBtn'
import CustomerDetailCard from './CustomerDetailCard'
import OrderDetailCard from './OrderDetailCard'
import PackageForm from './PackageForm'

export default function OrderItemCard({ orderId }) {
    const [order, setOrder] = useState()
    const [customer, setCustomer] = useState()
    const [action, setAction] = useState("close")
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
    const handleRocket = (action) => {
        setAction(action)
    }
    useEffect(() => {
        fetchOrder()
    }, [])
    useEffect(() => {
        fetchCustomer()
    }, [order])
    return (
        <>
            <span style={action === "open" ? { display: "" } : { display: "none" }}>
                <PackageForm handleRocket={handleRocket} order={order} customer={customer} />
            </span>
            <div style={{ minHeight: "100vh" }}>
                <div className='lg:flex'>
                    <CustomerDetailCard customer={customer} />
                    <OrderDetailCard order={order} />
                </div>
                {order && (
                    <div className='w-1/2 mx-auto sm:w-1/3 lg:w-1/5 xl:w-1/6'>
                        <AcceptRejectBtn orderId={orderId} orderStatus={order.status} handleRocket={handleRocket} />
                    </div>
                )}
            </div>
        </>
    )
}
