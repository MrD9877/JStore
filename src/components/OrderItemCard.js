"use client";
import React, { useEffect, useState } from "react";
import AcceptRejectBtn from "@/utility/AcceptRejectBtn";
import CustomerDetailCard from "./CustomerDetailCard";
import OrderDetailCard from "./OrderDetailCard";
import PackageForm from "./PackageForm";

export default function OrderItemCard({ orderId }) {
  // const [order, setOrder] = useState();
  // const [customer, setCustomer] = useState();
  const [action, setAction] = useState("close");
  const order = {
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
  };
  // const fetchOrder = async () => {
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders?orderId=${orderId}`, { credentials: "include" });
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setOrder(data[0]);
  //     } else if (res.status === 401) {
  //       console.log("pop");
  //     }
  //   } catch {
  //     console.log("popo");
  //   }
  // };
  // const fetchCustomer = async () => {
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer?username=${order.username}`, { credentials: "include" });
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       console.log(data);
  //       setCustomer(data);
  //     } else if (res.status === 401) {
  //       console.log("logib");
  //     } else {
  //       console.log("again");
  //     }
  //   } catch {
  //     console.log("pop");
  //   }
  // };
  // const handleRocket = (action) => {
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   setAction(action);
  // };
  // useEffect(() => {
  //   fetchOrder();
  // }, []);
  // useEffect(() => {
  //   fetchCustomer();
  // }, [order]);
  return (
    <>
      <span style={action === "open" ? { display: "" } : { display: "none" }}>{/* <PackageForm order={order} /> */}</span>
      <div style={{ minHeight: "100vh" }}>
        <div className="lg:flex">
          <CustomerDetailCard order={order} />
          <OrderDetailCard order={order} />
        </div>
        {order && (
          <div className="w-1/2 mx-auto sm:w-1/3 lg:w-1/5 xl:w-1/6">
            {/* <AcceptRejectBtn orderId={orderId} rocketValue={"open"} orderStatus={order.status} handleRocket={handleRocket} /> */}
          </div>
        )}
      </div>
    </>
  );
}
