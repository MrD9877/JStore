"use client"

import { useEffect } from "react"

export default function FetchToken() {
    const fetchToken = async () => {
        await fetch(`${process.env.SERVER_URL}/token`, { credentials: "include" })
    }
    useEffect(() => {
        fetchToken()
    }, [])
    return (<></>)
}
