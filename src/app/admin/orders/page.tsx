"use client";
import AdminNavBottom from "@/navbars/AdminNavBottom";
import FilterBar from "@/navbars/FilterBar";
import Loading from "@/components/Loading";
import OrdersCard from "@/components/OrdersCard";
import { useEffect, useState } from "react";
import { OrderType } from "@/@types/orders";
import useOrders from "./useOrders";

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderType["status"]>("created");
  const { orders } = useOrders(filter);

  return (
    <div className="mb-20">
      <div className="p-4">
        <FilterBar setFilter={setFilter} />
      </div>
      {orders ? <OrdersCard array={orders} /> : <Loading width="100vw" height="100vh" />}
      <div className="mt-20">
        <AdminNavBottom />
      </div>
    </div>
  );
}
