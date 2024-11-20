import React, { useEffect, useState } from 'react'

export default function OrderDetailCard({ order }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!order) return
        const c = order.products.reduce((a, b) => {
            return a + b.count
        }, 0)
        setCount(c)
    }, [order])
    return (
        <div className='p-4 mb-10'>
            {console.log(order)}
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order:</h5>
                    <h7 className="text-sm font-bold leading-none text-gray-900 dark:text-white">{order && order.orderId}</h7>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order && order.products.map((product) => {
                                return <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.count}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹ {product.price}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">{count}</td>
                                <td className="px-6 py-3">₹ {order && order.amount}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>

        </div>
    )
}
