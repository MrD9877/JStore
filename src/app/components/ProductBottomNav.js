"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import gif from "../_images/check.gif"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/storeSlice"


export default function ProductBottomNav({ product }) {
    const dispatch = useDispatch()
    const [cartBtnStyle, setCartBtnStyle] = useState({
        addtocart: {
            display: ""
        },
        gotocart: {
            display: "none"
        }
    })
    const handleAddcart = (e) => {
        setCartBtnStyle({
            addtocart: {
                display: "none"
            },
            gotocart: {
                display: "",
            }
        })
        dispatch(addToCart(product))
    }
    return (
        <span href="/cart" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button onClick={handleAddcart} style={cartBtnStyle.addtocart}>
                <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                </svg>
            </button>
            <Link href="/cart" style={cartBtnStyle.gotocart} id="gotocart" type="button" className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                <Image className="mr-2" height={20} src={gif} alt="gif" />
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Add to Cart</span>
        </span>
    )
}
