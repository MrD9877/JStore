"use client"

import { useEffect, useState } from "react"
import gif from "../_images/check.gif"
import Loading from "../components/Loading"

export default function AcceptRejectBtn({ orderId, orderStatus }) {
    const [orderState, setOrderState] = useState()
    const [loading, setLoading] = useState(false)
    const handleOrderEdit = async (type) => {
        setLoading(true)

        try {
            const data = { orderId: orderId, type: type }
            const res = await fetch(`${process.env.SERVER_URL}/orders`, { method: "PATCH", credentials: 'include', body: JSON.stringify(data) })
            setLoading(false)
            if (res.status === 200) return setOrderState(type)
            if (res.status === 401) console.log("not admin")
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setOrderState(orderStatus)
        console.log(orderId)
    }, [])
    return (
        <div className='flex text-sm items-center justify-between'>
            {loading ? <Loading height="0vh" /> :
                orderState ? (
                    orderState === "deliver" ? (
                        <>
                            <div className="flex justify-center w-full align-middle text-white bg-blue-700  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 ">
                                <img className="me-1 h-3 w-3" src={gif.src} />
                            </div>
                        </>
                    ) : (orderState === "decline" ? (
                        <>
                            <div className="flex justify-center w-full align-middle text-white bg-red-700  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 ">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                                </svg>
                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => handleOrderEdit("deliver")} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 mr-3">
                                Deliver
                            </button>
                            <button onClick={() => handleOrderEdit("decline")} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
                                Decline
                            </button>
                        </>
                    ))
                ) : (
                    <>
                        <button onClick={() => handleOrderEdit("accept")} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 mr-3">
                            Accept
                        </button>
                        <button onClick={() => handleOrderEdit("decline")} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
                            Decline
                        </button>
                    </>
                )}
        </div>
    )
}
