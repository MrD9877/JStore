"use client"
import React, { useState } from 'react'
import CustomCarousel from './CustomCarousel'
import ProductBottomNav from './ProductBottomNav'

export default function ProductInfo({ product }) {
    const [hideButton, setHideButton] = useState({})
    const [show, setShow] = useState({ length: 100, btnTxt: "...show more" })
    const handleShowMore = () => {
        if (show.length == 100) {
            setShow(() => {
                const newShow = {
                    length: product.description.length,
                    btnTxt: "...Show less"
                }
                console.log(newShow.length)
                return newShow
            })
            return
        }
        setShow({
            length: 100,
            btnTxt: "...show more"
        })
    }
    return (
        <>
            <section className="py-8  md:py-16 bg-gray-900 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <CustomCarousel >
                                {product.images.map((src, index) => {
                                    return <img key={index} className="w-auto" src={src} alt={`${product.title}`} />
                                })}
                                {/* <img key="dummy" className="w-auto" src="https://i.imgur.com/YIq57b6.jpeg" alt="" /> */}
                            </CustomCarousel>
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                            >
                                {product && product.title}
                            </h1>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                <p
                                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                >
                                    ₹ {product && product.price}
                                </p>
                            </div>

                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <span
                                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <ProductBottomNav product={product} />
                                </span>

                            </div>

                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                {product && product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
