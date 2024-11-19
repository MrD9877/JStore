"use client"
import Loading from '@/app/components/Loading'
import React from 'react'

export default function loading() {
    return (
        <>
            <div className='h-screen'>
                <Loading height={'50vh'} />
            </div>
        </>
    )
}
