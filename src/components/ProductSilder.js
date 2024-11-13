'use client'
import CustomCarousel from "@/components/CustomCarousel"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"

export default function ProductSlider({ product }) {
    const [item, setItem] = useState()
    const data = async () => {
        setItem(() => {
            let pro = product
            if (pro.images.length < 2) {
                // todo find and push pics for all products
                pro.images.push("https://i.imgur.com/YIq57b6.jpeg")
            }
            return pro
        })
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
                </CustomCarousel>
            ) : (
                <Loading width={"100vw"} height={"50vh"} />
            )
            }
        </>
    )
}