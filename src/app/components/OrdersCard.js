"use client"
import React from 'react'
import Loading from './Loading.js'
import CustomCarousel from './CustomCarousel.js'
import AcceptRejectBtn from '../_utility/AcceptRejectBtn.js'
import Image from 'next/image.js'
import Link from 'next/link.js'

export default function OrdersCard({ array }) {
    return (
        <>
            {array ? array.map((item) => {

                return <div key={item.orderId} style={{ width: "90vw" }} className="relative flex m-auto  my-3 bg-white shadow-sm border border-slate-200 rounded-lg w-96">

                    <CustomCarousel>
                        {item.products.map((product) => {
                            return <div>
                                <Image width={200} height={100} src={product.images[0]} alt="product-image" className="w-1/3 rounded-md md:rounded-lg object-cover" />
                            </div>
                        })}
                    </CustomCarousel>
                    <div style={{ maxWidth: "70%" }} className="px-6 py-2">
                        <Link href={`/orders/${item.orderId}`}>
                            <div class="w-full max-w-md py-4 px-2 bg-white sm:p-8 ">
                                <div class="flex items-center justify-between mb-2">
                                </div>
                                <div class="flow-root">
                                    <ul role="list" class="divide-y divide-gray-200 ">
                                        {item.products.map((product) => {
                                            return <li key={product._id} class="py-1 sm:py-4">
                                                <div class="flex justify-between items-center">
                                                    <div className='flex mr-2 text-sm  justify-center align-middle '>
                                                        <p className='text-red-500 flex align-middle justify-center' >
                                                            {product.count}*
                                                        </p>
                                                        <p class="text-sm font-medium text-gray-900 truncate ">
                                                            {product.title.slice(0, 15)}
                                                        </p>
                                                    </div>
                                                    <p class="text-sm text-green-500 truncate ">
                                                        ₹ {product.price}
                                                    </p>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </Link>

                        <div class="w-full max-w-md px-4 mb-2 bg-white sm:p-8 ">
                            <div className='flex text-sm  items-center justify-between'>
                                Amount : <span className='text-red-700'>₹ {item.amount}</span>
                            </div>
                        </div>
                        <div class="w-4/5 px-4 mt-2 m-auto bg-white ">
                            <AcceptRejectBtn orderId={item.orderId} orderStatus={item.status} />
                        </div>
                    </div>
                </div>
            }) : <Loading />}

        </>
    )
}
