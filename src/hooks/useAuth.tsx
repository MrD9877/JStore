import React, { useEffect, useState } from "react";
import useToast from "./useToast";

export default function useAuth() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  async function logout() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        credentials: "include",
      });
      if (res.ok) setLoggedIn(false);
      else throw Error(res.statusText);
    } catch (err) {
      toast((err as Error).message, false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function handleCheck() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/checkLogin`, { credentials: "include" }).catch();
        if (res.ok) {
          setLoggedIn(true);
        }
      } finally {
        setLoading(false);
      }
    }
    handleCheck();
  }, []);
  return { isLoggedIn, logout, loading };
}
