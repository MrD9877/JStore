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
  // const { orders } = useOrders(filter);
  const orders: OrderType[] = [
    {
      username: "john_doe",
      orderId: "ORD123456",
      items: [
        {
          productId: "PROD1",
          title: "T-Shirt",
          price: 499,
          category: "men",
          date: Date.now(),
          dimentions: { length: 10, weight: 200, height: 2, breadth: 8 },
          variant: { color: "red", size: "M", stock: 10, sku: "SKU1", quantity: 2 },
          image: "/images/homeMen.png",
        },
      ],
      orderDate: Date.now(),
      razorpay: { id: "rzp_test_1" },
      shiprocket: { order_id: "SR123" },
      status: "created",
      promocode: "NEWUSER",
      shippingFee: 50,
      amountPaid: 499,
      amountDue: 0,
      amount: 499,
      address: {
        nickname: "Home",
        state: "Delhi",
        pincode: 110001,
        name: "John Doe",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New Delhi",
        country: "India",
        type: "home",
        phonenumber: 9876543210,
      },
      paymentType: "prepaid",
    },
    {
      username: "jane_smith",
      orderId: "ORD654321",
      items: [
        {
          productId: "PROD2",
          title: "Dress",
          price: 999,
          category: "women",
          date: Date.now(),
          dimentions: { length: 12, weight: 300, height: 3, breadth: 10 },
          variant: { color: "blue", size: "L", stock: 5, sku: "SKU2", quantity: 1 },
          image: "/images/homeWomen.png",
        },
      ],
      orderDate: Date.now(),
      razorpay: { id: "rzp_test_2" },
      status: "packed",
      amountPaid: 999,
      amountDue: 0,
      amount: 999,
      address: {
        nickname: "Office",
        state: "Maharashtra",
        pincode: 400001,
        name: "Jane Smith",
        addressLine1: "456 Market Rd",
        addressLine2: "Suite 12",
        city: "Mumbai",
        country: "India",
        type: "office",
        phonenumber: 9123456789,
      },
      paymentType: "cod",
    },
  ];

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
