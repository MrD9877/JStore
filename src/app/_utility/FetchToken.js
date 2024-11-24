"use client"

import { useEffect } from "react"

export default function FetchToken() {
    const fetchToken = async () => {
        try {
            await fetch(`${process.env.SERVER_URL}/token`, { credentials: "include" })
        } catch {

        }
    }
    useEffect(() => {
        fetchToken()
    }, [])
    return (<></>)
}
