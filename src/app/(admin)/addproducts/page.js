import AdminNavBottom from "@/navbars/AdminNavBottom";
import AddProduct from "@/components/AddProduct";
import React from "react";

export default function page() {
  return (
    <>
      <div className="mb-20">
        <AddProduct />
      </div>
      <AdminNavBottom />
    </>
  );
}
