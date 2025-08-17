"use client";
import React from "react";

export default function page() {
  const test = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getOrderId?method=${"upi"}`, { credentials: "include" });
  };
  return <button onClick={test}>Hrlls</button>;
  s;
}
