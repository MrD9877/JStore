import Link from 'next/link'
import React from 'react'
import Loading from './Loading'

export default function OrderSummary({ order }) {
    return (
        <div>
            <section className="bg-gray-900 py-8 antialiased md:pt-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-white sm:text-2xl">Order summary</h2>
                        <div className="mt-6 sm:mt-8">
                            <div className="relative overflow-x-auto border-b border-gray-800">
                                <table className="w-full text-left font-medium text-white md:table-fixed">
                                    <tbody className="divide-y divide-gray-800">
                                        {order ? order.products && order.products.map((product) => {
                                            return <tr key={product.productId}>
                                                <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                    <div className="flex items-center gap-4">
                                                        <Link href={`/products/${product.productId}`} className="hover:underline">{product.title}</Link>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-base font-normal text-white">{product.count}</td>
                                                <td className="p-4 text-right text-base font-bold text-white">₹ {product.price * product.count}</td>
                                            </tr>
                                        }) : <Loading />}
                                    </tbody>
                                </table>
                            </div>

                            <dl className="flex items-center justify-between gap-4 border-t border-gray-700 pt-2">
                                <dt className="text-lg font-bold text-white">Total</dt>
                                <dd className="text-lg font-bold text-white">₹ {order && order.total}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}
