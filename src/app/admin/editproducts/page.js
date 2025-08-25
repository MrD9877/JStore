"use client";
import AdminNavBottom from "@/navbars/AdminNavBottom";
import ItemsCard from "@/components/ItemsCard";
import React, { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState();
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`);
      if (res.status === 200) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      console.log("pop");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mt-2 mb-16">
      <ItemsCard array={products} />
      <AdminNavBottom />
    </div>
  );
}
