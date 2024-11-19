"use client"
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading';
import CopytoClip from '../_utility/CopytoClip';

export default function DisplayOrdersCard() {
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true)
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
    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/order`, { credentials: "include" })
            if (res.status === 200) {
                const data = await res.json()
                setLoading(false)
                setOrders(data)
            } else {
                setLoading(false)
                popTost("login to Continue")
            }
        } catch (err) {
            setLoading(false)
            popTost(err.message)
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Latest orders</h3>
                {loading ? <Loading /> : (orders && orders.length > 0 && orders.map((order) => {
                    var date = new Date(order.orderDate).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })

                    return <div key={order._id} className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
                        {/* order id  */}
                        <dl className="w-1/2 sm:w-48">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                            <dd className="mt-1.5 flex align-middle text-base font-semibold text-gray-900 dark:text-white">
                                <span onClick={() => CopytoClip(order.orderId, popTost)} className="hover:underline">{order.orderId.slice(0, 10)}...</span>
                                <button onClick={() => CopytoClip(order.orderId, popTost)}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "25px" }}
                                    ></lord-icon>
                                </button>
                            </dd>
                        </dl>
                        {/* date  */}
                        <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{date}</dd>
                        </dl>
                        {/* amount  */}
                        <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">₹ {order.amount}</dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                            {/* order status  */}
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                {/* cancel svg */}

                                {/* <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                                    </svg> */}

                                {/* completed  */}
                                {/* <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
                                    </svg> */}

                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                                </svg>
                                In transit
                            </dd>
                        </dl>

                        {/* action btn  */}
                        {/* <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                        <button
                            id="actionsMenuDropdownModal10"
                            data-dropdown-toggle="dropdownOrderModal10"
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                        >
                            Actions
                            <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="dropdownOrderModal10" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown10">
                                <li>
                                    <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                                        </svg>
                                        <span>Order again</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                        </svg>
                                        Order details
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-modal-target="deleteOrderModal" data-modal-toggle="deleteOrderModal" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
                                        </svg>
                                        Cancel order
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    </div>
                }))}
            </div>
        </>
    )
}
