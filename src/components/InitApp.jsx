"use client";
import useCart from "@/hooks/useCart";
import useToken from "@/hooks/useToken";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function InitApp() {
  useCart();
  useToken();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
