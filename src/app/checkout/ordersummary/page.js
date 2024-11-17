"use client"
import DisplayOrderSummary from '@/app/components/displayOrderSummary'
import FetchUser from '@/app/components/FetchUser'
import Loading from '@/app/components/Loading'
import React, { useState } from 'react'

export default function page() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div>
            <FetchUser setLoading={setLoading} setError={setError} setUser={setUser} />
            {error ? "error" : (loading ? <Loading height='30vh' /> : <DisplayOrderSummary user={user} />)}
        </div>
    )
}
