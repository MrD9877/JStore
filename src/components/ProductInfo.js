"use client"
import React, { useState } from 'react'

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
            {product ? (
                <div className='felx justify-center w-full'>
                    <h1 className='my-3 font-bold felx justify-center items-center text-xl ml-2'>
                        <span>
                            {product.title}
                        </span>
                    </h1>
                    <hr className='bg-gray-100 h-1 border-0 rounded md:my-10' />
                    <div className='w-full my-2 mx-1'>
                        <span className='font-bold felx justify-center items-center text-xl ml-2'>
                            ₹ {product.price}
                            <div>
                                <span className='mx-1 text-sm text-gray-900 font-thin '>MRP incl. of all taxes</span>
                            </div>
                        </span>
                    </div>
                    <hr className='bg-gray-100 h-1 border-0 rounded md:my-10' />
                    <div className='my-4 mx-3'>
                        <span>
                            <div>
                                {product.description.length < 100 && (product.description) || product.description.length > 100 && (
                                    <>
                                        {product.description.slice(0, show.length)}
                                        <div className='flex justify-end mx-3'>
                                            <button className='text-blue-700 text-sm' style={hideButton} onClick={handleShowMore}>{show.btnTxt}</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </span>
                    </div>
                </div>) : "loadind..."
            }
        </>
    )
}
