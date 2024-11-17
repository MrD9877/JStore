"use client"
import DisplayItemsCard from '@/app/components/DisplayItemsCard'
import Loading from '@/app/components/Loading'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { results } from '../../../product'
import SearchBar from "@/navBars/SearchBar";


export default function page() {
    const [searchResult, setSearchResult] = useState()
    const [searchInput, setSearchInput] = useState("")
    const [loading, setLoading] = useState(false)
    const difvalue = useDeferredValue(searchInput)

    const fetchSearch = async () => {
        setLoading(true)
        try {
            console.log(difvalue)
            const res = await fetch(`${process.env.SERVER_URL}/product?search=${difvalue}`, { credentials: "include", difvalue })
            const data = await res.json()
            setLoading(false)
            setSearchResult(data)
        } catch (err) {
            setLoading(false)
            setSearchResult([])
        }
    }

    useEffect(() => {
        fetchSearch()
    }, [difvalue])

    return (
        <>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className='absolute h-screen bg-white w-screen disableTouchSelect'>
                {loading ? <Loading height='30vh' /> : (searchResult ? <DisplayItemsCard array={searchResult} /> : <Loading height='20vh' />)}
            </div>
        </>
    )
}
