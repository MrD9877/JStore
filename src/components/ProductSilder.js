'use client'
import CustomCarousel from "@/components/CustomCarousel"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"

export default function ProductSlider({ product }) {
    const [item, setItem] = useState()
    const data = async () => {
        setItem(product)
    }
    useEffect(() => {
        data()
    }, [])

    return (
        <>
            {item ? (
                <CustomCarousel height={"50vh"} width={"100vw"}>
                    {item.images.map((src, index) => {
                        return <img key={index} className="w-auto" src={src} alt="" />
                    })}
                    {/* <img key="dummy" className="w-auto" src="https://i.imgur.com/YIq57b6.jpeg" alt="" /> */}
                </CustomCarousel>
            ) : (
                <Loading width={"100vw"} height={"50vh"} />
            )
            }
        </>
    )
}