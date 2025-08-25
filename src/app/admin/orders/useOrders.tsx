import { OrdersSchema, OrderType } from "@/@types/orders";
import useToast from "@/hooks/useToast";
import React, { useEffect, useState } from "react";

export default function useOrders(filter: OrderType["status"]) {
  const [orders, setOrders] = useState<OrderType[]>();
  const toast = useToast();

  const fetchOrders = async (filter: OrderType["status"]) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders?status=${filter}`, { credentials: "include" });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        data.length === 0 && toast(`No results for ${filter}`, false);
        // console.log(data);
        // const parseData = await OrdersSchema.parseAsync(data);
        setOrders(data);
      } else if (res.status === 401) {
        toast("Login To Continue!!!", false);
      } else {
        toast(res.statusText, false);
      }
    } catch (err) {
      console.log(err);
      toast("somthing went wrong try Reloading Page", false);
    }
  };
  useEffect(() => {
    fetchOrders(filter);
  }, [filter]);
  return { orders };
}
