"use client"
import AdminNavBottom from "@/app/_navbars/AdminNavBottom";
import FilterBar from "@/app/_navbars/FilterBar";
import Loading from "@/app/components/Loading";
import OrdersCard from "@/app/components/OrdersCard";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)

    return (
        <div className="mb-20">
            <FilterBar setOrders={setOrders} setLoading={setLoading} />
            {loading ? <Loading /> : (
                <OrdersCard array={orders} />
            )}
            <AdminNavBottom />
        </div>
    )
}
