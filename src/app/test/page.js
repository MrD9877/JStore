"use client";
import useToast from "@/hooks/useToast";
import React from "react";

export default async function page() {
  const popTost = useToast();
  return (
    <>
      <button onClick={() => popTost("hanj")}>tost</button>
    </>
  );
}
