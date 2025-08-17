"use client";
import { useEffect, useState } from "react";
import { UserType } from "./useEditProfile";

export default function useFetchUser() {
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { credentials: "include", mode: "cors" });
      if (res.status === 200) {
        const data = await res.json();
        setLoading(false);
        console.log(data);
        return setUser(data);
      }
      if (res.status === 401) {
        setLoading(false);
        return setUser(null);
      }
      setLoading(false);
      return setUser(null);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { user, error, loading };
}
