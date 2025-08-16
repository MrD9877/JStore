"use client";
import useCart from "@/hooks/useCart";
import FetchToken from "@/utility/FetchToken";
import React from "react";

export default function InitApp() {
  useCart();
  return (
    <>
      <FetchToken />
    </>
  );
}
