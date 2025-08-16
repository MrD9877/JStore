"use client";
import AdminNavBottom from "@/navbars/AdminNavBottom";
import FilterBar from "@/navbars/FilterBar";
import Loading from "@/components/Loading";
import OrdersCard from "@/components/OrdersCard";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="mb-20">
      <FilterBar setOrders={setOrders} setLoading={setLoading} />
      {loading ? <Loading /> : <OrdersCard array={orders} />}
      <div className="mt-20">
        <AdminNavBottom />
      </div>
    </div>
  );
}
