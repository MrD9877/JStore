import React, { useEffect, useState } from "react";
import useToast from "./useToast";

export default function useAuth() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const toast = useToast();
  async function logout() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        credentials: "include",
      });
      if (res.ok) setLoggedIn(false);
      else throw Error(res.statusText);
    } catch (err) {
      toast((err as Error).message, false);
    }
  }
  useEffect(() => {
    async function handleCheck() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/checkLogin`, { credentials: "include" }).catch();
      if (res.ok) {
        setLoggedIn(true);
      }
    }
    handleCheck();
  }, []);
  return { isLoggedIn, logout };
}
