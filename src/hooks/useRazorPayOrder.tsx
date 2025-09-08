import React from "react";

export default function useRazorPayOrder() {
  async function cancelOrder(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cancelOrder`, {
      method: "POST",
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    if (!res.ok) throw Error(res.statusText);
    const data = await res.json();
    return data;
  }
  return { cancelOrder };
}
