"use client"
import AdminNavBottom from "@/app/_navbars/AdminNavBottom"
import AdminProfileCard from "@/app/components/AmindProfileCard"
import FetchUser from "@/app/components/FetchUser"
import Loading from "@/app/components/Loading"
import Popup from "@/app/components/Popup"
import { useState } from "react"

export default function page() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [error, setError] = useState(false)
    return (
        <div>
            <FetchUser setLoading={setLoading} setError={setError} setUser={setUser} />
            {loading ? <Loading /> : (
                user ? (
                    <AdminProfileCard user={user} />
                ) : (
                    <Popup link={"/login"} msg={"Login to Continue or Reload page if Already loged..."} />
                )
            )}
            <div className="mt-20">
                <AdminNavBottom />
            </div>
        </div>
    )
}
