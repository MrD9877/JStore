"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import gif from "../_images/check.gif"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/storeSlice"

export default function AddToCartBtn({ product, inCart = undefined }) {
    const dispatch = useDispatch()
    const [cartBtnStyle, setCartBtnStyle] = useState({ addtocart: { display: "" }, gotocart: { display: "none" } })

    const changebutton = (state) => {
        if (state) {
            setCartBtnStyle({ addtocart: { display: "none" }, gotocart: { display: "" } })
        } else if (!state) {
            setCartBtnStyle({ addtocart: { display: "" }, gotocart: { display: "none" } })
        }
    }
    const handleAddcart = (e) => {
        changebutton(true)
        const color = product.colors[0]
        const size = product.size[0]
        dispatch(addToCart({ product: { ...product, selectedColor: color, selectedSize: size } }))
    }
    useEffect(() => {
        if (inCart) {
            changebutton(true)
        } else if (!inCart) {
            changebutton(false)
        }
    }, [inCart])
    return (
        <div>
            <button style={cartBtnStyle.addtocart} id="addtocart" onClick={handleAddcart} type="button" className="bg-blue-600 rounded-xl p-3 flex justify-center items-center py-2 h-6 text-xs m-auto">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                </svg>
                Add to cart
            </button>
            <Link href="/cart" style={cartBtnStyle.gotocart} id="gotocart" type="button" className="bg-blue-600 rounded-xl p-3 flex justify-center items-center py-2 h-6 text-xs m-auto">
                <Image className="mr-2" height={14} src={gif} alt="gif" />
                Go to Cart
            </Link>
        </div>

    )
}
