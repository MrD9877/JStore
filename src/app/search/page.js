"use client"
import DisplayItemsCard from '@/components/DisplayItemsCard'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'
import { results } from '../../../product'

export default function page() {
    const [searchResult, setSearchResult] = useState()
    useEffect(() => {
        setSearchResult(results)
    })
    return (
        <div className='absolute h-screen bg-white w-screen disableTouchSelect'>
            {searchResult ? <DisplayItemsCard array={searchResult} /> : <Loading height='20vh' />}
        </div>
    )
}
