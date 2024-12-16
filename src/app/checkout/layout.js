"use client";
import { useEffect, useState } from "react";
import CheckoutBar from "../_navbars/CheckoutBar";
import FetchUser from "../components/FetchUser";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { editProgress } from "@/lib/storeSlice";

export default function layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);

  useEffect(() => {
    if (count === 0) return router.push("/checkout");
    let progressBar = user ? (user.name ? 3 : 2) : 1;
    if (!loading) dispatch(editProgress(progressBar));
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (progress === 1) router.push("/checkout/login");
      if (progress === 2) router.push("/checkout/delivery");
      if (progress === 3) router.push("/checkout/ordersummary");
    }
  }, [progress, user]);
  return (
    <div className="bg-gray-900 min-h-screen">
      <CheckoutBar />
      <FetchUser setLoading={setLoading} setError={setError} setUser={setUser} />
      {error ? "error" : loading && <Loading />}
      {children}
    </div>
  );
}
