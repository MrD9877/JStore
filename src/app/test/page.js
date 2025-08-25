"use client";
import useToast from "@/hooks/useToast";
import React from "react";

export default function page() {
  const toast = useToast();
  const test = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/test`, { credentials: "include" });
      toast(await res.text());
    } catch (err) {
      toast(err.message);
    }
  };
  return <button onClick={test}>Hrlls</button>;
  s;
}
