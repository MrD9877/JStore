"use client"

import { useEffect, useState } from "react"
import gif from "../_images/check.gif"
import Loading from "../components/Loading"
import CreateRocketOrder from "../components/CreateRocketOrder"

export default function AcceptRejectBtn({ orderId, orderStatus, handleRocket, rocketValue }) {
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
        console.log(orderStatus)
        setOrderState(orderStatus)
    }, [])
    return (
        <div className='flex text-sm items-center justify-between'>
            {loading ? <Loading height="30px" width="100%" /> : (orderState === "deliver" && <>
                <div className="flex justify-center w-full align-middle text-white bg-blue-700  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 ">
                    <img className="me-1 h-3 w-3" src={gif.src} />
                </div>
            </> || orderState === "decline" && <>
                <div className="flex justify-center w-full align-middle text-white bg-red-700  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 ">
                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                    </svg>
                </div>
            </> || orderState === "accepted" && <>
                <button onClick={() => handleRocket(rocketValue)} className="flex align-middle focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 mr-3">
                    Rocket<svg fill="#000000" width="16px" height="16px" viewBox="-6 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 26.080c-0.4 0-0.8-0.16-1.080-0.44-0.4-0.4-0.56-0.96-0.4-1.52l0.56-1.92c0.12-0.44 0-0.88-0.32-1.16 0 0 0 0 0 0l-1.68-1.68c-0.32-0.32-0.76-0.44-1.2-0.32l-1.92 0.56c-0.52 0.16-1.12 0-1.52-0.4-0.52-0.52-0.6-1.36-0.16-1.96l2.12-3.12c0.6-0.84 1.56-1.36 2.6-1.36 0.040 0 0.080 0 0.12 0l1.96 0.28c6.84-8.4 12.12-7.040 12.36-7 0.28 0.080 0.52 0.32 0.6 0.6 0.080 0.24 1.4 5.52-7 12.36l0.28 1.96c0 0.040 0 0.080 0 0.12 0 1.040-0.48 2-1.36 2.6l-3.080 2.12c-0.28 0.16-0.56 0.28-0.88 0.28zM7.92 19.8c0.76 0.72 1.040 1.8 0.76 2.84l-0.44 1.6 2.76-1.92c0.4-0.28 0.64-0.72 0.64-1.16l-0.32-2.36c-0.040-0.28 0.080-0.6 0.32-0.76 6.4-5.080 6.92-9 6.88-10.4-0.040 0-0.040 0-0.080 0-1.48 0-5.4 0.68-10.32 6.88-0.2 0.24-0.48 0.36-0.76 0.32l-2.36-0.32c-0.48 0-0.92 0.24-1.16 0.64l-1.92 2.76 1.6-0.44c1-0.28 2.080 0 2.84 0.76l1.56 1.56zM15.76 11.12c0 0.464-0.376 0.84-0.84 0.84s-0.84-0.376-0.84-0.84c0-0.464 0.376-0.84 0.84-0.84s0.84 0.376 0.84 0.84z"></path>
                    </svg>
                </button>
                <button onClick={() => handleOrderEdit("decline")} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
                    Decline
                </button>
            </> || orderState === "new" && <>
                <button onClick={() => handleOrderEdit("accepted")} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 mr-3">
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
