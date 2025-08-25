import AdminNavBottom from "@/navbars/AdminNavBottom";
import AddProduct from "@/app/admin/addproducts/AddProduct";
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
