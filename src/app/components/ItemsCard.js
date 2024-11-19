"use client"
import React, { useEffect, useState } from 'react'
import ReviewStars from './ReviewStars.js'
import Loading from './Loading.js'
import AddToCartBtn from './AddToCartBtn.js'
import Link from 'next/link.js'
import EditProductsBtn from '../_utility/EditProductsBtn.js'

export default function ItemsCard({ array, reviewStars = 4, admin = true }) {
    const [link, setLink] = useState("products")
    useEffect(() => {
        if (admin) setLink("editproducts")
    }, [])
    return (
        <>
            <div className='flex flex-wrap justify-center'>
                {array ? array.map((item) => {
                    return <div key={item.productId} className="w-full mb-2 itemcard m-auto  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/${link}/${item.productId}`}>
                            <img className="p-2 rounded-t-lg" src={item.images[0]} alt="product image" />
                        </Link>
                        <div className="px-2 pb-2">
                            <div className='w-full'>
                                <Link href={`/${link}/${item.productId}`}>
                                    <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{item.description.slice(0, 60)}...</h5>
                                </Link>
                            </div>
                            {/* rateing */}
                            <div className="flex items-center mt-2.5 mb-5">
                                {reviewStars ?
                                    <div className="flex justify-between items-center h-1 w-full ">
                                        <div className='w-1/4 flex'>
                                            <ReviewStars reviewStar={reviewStars} />
                                        </div>
                                        <span className="mr-2 text-xs font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                                    </div> : "No review"}
                            </div>
                            <div className="flex items-center justify-between">
                                {admin ? <EditProductsBtn product={item} /> : <AddToCartBtn product={item} />}
                            </div>
                        </div>
                    </div >
                }) : <Loading />}
            </div>
        </>
    )
}
