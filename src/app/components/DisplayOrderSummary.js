"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import UserProfileCard from './UserProfileCard'
import toast, { Toaster } from 'react-hot-toast';

export default function DisplayOrderSummary({ user }) {
    const products = useSelector(state => state.products)
    const total = useSelector(state => state.total)

    const popTost = (msg, success) => {
        let emote = "❌";
        if (success) emote = "✅"
        toast(`${msg}`,
            {
                icon: `${emote}`,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }


    const handleOrder = async () => {
        const res = await fetch(`${process.env.SERVER_URL}/order`, { method: "POST", credentials: "include", body: JSON.stringify(products) })
        if (res.status === 200) {
            popTost("Done", true)
        } else if (res.status === 400) {
            const msg = await res.json().msg
            popTost("msg", false)
        } else if (res.status === 401) {
            popTost("login to continue", false)
        }
    }
    return (
        <div className='p-1'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <UserProfileCard user={user} />
            {/* order summary  */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 sm:p-6">
                    <p className="text-xl font-semibold text-white">Order summary</p>

                    <div className="space-y-4">
                        <div className="space-y-2">

                            {products ? products.map((item) => {
                                return (
                                    <dl key={item.productId} className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-400">
                                            <span className='text-red-600'>
                                                {item.count}
                                            </span>
                                            <span>
                                                * {item.title}
                                            </span>

                                        </dt>
                                        <dd className="text-base font-medium text-white">₹{item.price}</dd>
                                    </dl>
                                )
                            }) : (
                                ""
                            )}

                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
                            <dt className="text-base font-bold  text-white">Total</dt>
                            <dd className="text-base font-bold text-white">₹{total}</dd>
                        </dl>
                    </div>
                    <button onClick={handleOrder} >
                        <div className="flex w-full items-center justify-center rounded-lg  px-5 py-2.5 text-sm font-medium text-green-500  focus:outline-none focus:ring-4 hover:bg-blue-800 bg-blue-rgba focus:ring-primary-800">
                            Order
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
