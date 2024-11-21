import React from 'react'
import Loading from '../components/Loading'
import SearchBar from '@/navBars/SearchBar'
import NavBottom from '../components/NavBottom'

export default function loading() {
    return (
        <div>
            <Loading height='50vh' />
        </div>
    )
}
