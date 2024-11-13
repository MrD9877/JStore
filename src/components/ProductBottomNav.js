"use client"
import "../app/globals.css"
import { valueContext, setValueContext } from "@/lib/Store"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import gif from "../images/check.gif"

export default function ProductBottomNav({ product }) {

    const cartItems = useContext(valueContext)
    const dispatch = useContext(setValueContext)
    const [cartBtnStyle, setCartBtnStyle] = useState({
        addtocart: {
            display: ""
        },
        gotocart: {
            display: "none"
        }
    })
    const handleAddcart = (e) => {
        console.log(product)
        if (e.currentTarget.id === "addtocart") {
            setCartBtnStyle({
                addtocart: {
                    display: "none"
                },
                gotocart: {
                    display: "",
                }
            })
        }
        dispatch({
            type: "addTocart",
            payload: {
                product: product
            }
        })
    }

    return (
        <footer style={{ listStyle: "none", position: "fixed", display: "inline-block", bottom: 0 }}>
            <nav className="w-screen flex justify-center align-middle mb-4 bg-white" >
                <button style={cartBtnStyle.addtocart} id="addtocart" onClick={handleAddcart} type="button" className="bg-blue-600 rounded-xl p-3 flex justify-center items-center py-4 m-auto">
                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                    </svg>
                    Add to cart
                </button>
                <Link href="/cart" style={cartBtnStyle.gotocart} id="gotocart" type="button" className="bg-blue-500 rounded-xl p-3 flex justify-center items-center py-4 m-auto">
                    <Image height={30} src={gif} alt="gif" />
                    Go to Cart
                </Link>

                <button type="button" className="bg-gray-400 text-black rounded-xl p-3 flex justify-center items-center m-auto">
                    <lord-icon
                        src="https://cdn.lordicon.com/evyuuwna.json"
                        trigger="hover"
                    >
                    </lord-icon>
                    Order Now
                </button>
            </nav>
        </footer>
    )
}
