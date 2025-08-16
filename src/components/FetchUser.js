"use client";
import { useEffect } from "react";

export default function FetchUser({ setLoading, setError, setUser }) {
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
  return <></>;
}
