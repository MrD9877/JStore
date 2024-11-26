"use client"
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '../../../colors'


export default function SearchBar({ searchInput, setSearchInput }) {
    const searchBar = useRef()
    const searchBarDiv = useRef()
    const router = useRouter()

    const handleFocus = () => {
        searchBar.current.style.border = `solid 2px ${colors.blue}`
        searchBar.current.style.background = `${colors.white}`
        searchBarDiv.current.style.background = `${colors.gray}`
        router.push("/search")
    }
    const handleOffFocus = () => {
        searchBar.current.style.background = `${colors.gray}`
        searchBarDiv.current.style.background = `${colors.white}`
        searchBar.current.style.border = `solid 2px ${colors.white}`
    }
    const handleInput = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <>
            <div ref={searchBarDiv} className='w-screen searchBarDiv px-px'>
                <div ref={searchBar} className='flex justify-between searchBar px-3 border rounded-xl'>
                    <div className="flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input value={searchInput} onChange={handleInput} onClick={handleFocus} onFocus={handleFocus} onBlur={handleOffFocus} type='text' className='searchBarInput focus:border-blue-500' placeholder="jeens,T-shirt,Men's cloths..." />
                    <button className="text-white searchBarBtn  bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
        </>
    )
}
