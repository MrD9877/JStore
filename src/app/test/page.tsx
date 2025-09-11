"use client";
import { ShoppingCart } from "lucide-react";
import useFiles from "../admin/addproducts/useFilesBundlers";
import UploadImage from "../admin/addproducts/UploadImage";
import { useState } from "react";

export default function page() {
  async function test() {
    await fetch("http://localhost:3000/checkLogin", { credentials: "include" });
  }
  return (
    <>
      {/* {JSON.stringify(images)}
      <UploadImage setFile={setFiles} /> */}
      <button onClick={test}>upload</button>
    </>
  );
}
