"use client"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, editCart } from "@/lib/storeSlice"
import ACTIONS from '@/lib/action'
import Link from 'next/link'
import Popup from "../components/Popup"

export default function CartPage() {
    const total = useSelector(state => state.total)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const removeItem = (id) => {
        console.log(id)
        dispatch(removeFromCart(id))
    }

    const handleChangeCount = (action, item) => {
        dispatch(editCart({ type: action, product: { ...item } }))
    }

    return (
        <div className='mb-20'>
            <section className="py-8 antialiased bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {/* cart Items  */}
                                {products ? (
                                    products.map((item, index) => {
                                        return <div key={item.productId} className="rounded-lg border  p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <span className="shrink-0 md:order-1">
                                                    {/* image  */}
                                                    <img className="h-20 w-20" src={item.images[0]} alt="imac image" />
                                                </span>

                                                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">

                                                    <div className="flex items-center">
                                                        {/* decrese btn  */}
                                                        <button type="button" onClick={() => handleChangeCount(ACTIONS.SUBTRACT, item)} id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border  focus:outline-none focus:ring-2 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700">
                                                            <svg className="h-2.5 w-2.5 text-gray-900 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>

                                                        {/* number of items  */}
                                                        <span type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 text-white" >
                                                            {item.count ? item.count : 0}
                                                        </span>

                                                        {/* increse btn  */}
                                                        <button type="button" onClick={() => handleChangeCount(ACTIONS.ADD, item)} id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-100 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700">
                                                            <svg className="h-2.5 w-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="text-end md:order-4 md:w-32">
                                                        {/* price  */}
                                                        <p className="text-base font-bold  text-white">₹ {item.price}</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    {/* description  */}
                                                    <span className="text-base font-medium  text-white">{item.description}</span>
                                                    <div className="flex items-center gap-4">
                                                        {/* remove btn  */}
                                                        <button type="button" onClick={() => removeItem(item.productId)} className="inline-flex items-center text-sm font-medium hover:underline text-red-500">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                ) : <Popup msg={"Start by adding Items"} link={"/products"} />}

                            </div>
                        </div>

                        {/* order summart */}
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
                                <Link href="/checkout" >
                                    <div className="flex w-full items-center justify-center rounded-lg  px-5 py-2.5 text-sm font-medium text-green-500  focus:outline-none focus:ring-4 hover:bg-blue-800 bg-blue-rgba focus:ring-primary-800">
                                        Proceed to Checkout
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
