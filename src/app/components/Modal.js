'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Loading from './Loading'

export default function Modal({ image }) {
    const router = useRouter()
    const [src, setSrc] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        console.log(image)
        if (!image) return
        setSrc(image)
        setLoading(false)
    }, [image])
    const closeModal = () => {
        router.back()
    }

    const handleOutsideModelclick = (e) => {
        console.log("click")
        const target = e.target.classList
        let clickedOutside = false
        for (let i = 0; i < target.length; i++) {
            const givenclassName = target[i]
            if (givenclassName === "outside") clickedOutside = true
        }
        if (clickedOutside) closeModal()
    }
    return (
        <div onClick={handleOutsideModelclick} className="w-screen h-screen flex justify-center align-middle">
            {/* <!-- Main modal --> */}
            {loading ? <Loading height='10vh' /> : (
                <div id="default-modal" tabIndex="-1" className="outside w-screen h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center">
                    <div className="relative m-auto p-4 w-full max-w-2xl max-h-full">
                        {/* <!-- Modal body --> */}
                        <div className="p-4 space-y-4 flex justify-center">
                            <Image src={src} width={300} height={300} alt='img' />
                        </div>
                    </div>
                </div>)}

        </div>
    )
}
