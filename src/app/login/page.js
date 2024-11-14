import LoginPage from "@/components/LoginCard"
import bgImage from "../_images/bgImage.jpg"
import React from 'react'

export default function page() {
    return (
        <div style={{ backgroundImage: `url(${bgImage.src})` }} className='flex align-middle h-screen'>
            <LoginPage />
        </div>
    )
}
