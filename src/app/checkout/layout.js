"use client";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { editProgress } from "@/lib/storeSlice";
import useFetchUser from "@/hooks/useFetchUser";

export default function layout({ children }) {
  const router = useRouter();
  const { user, error, loading } = useFetchUser();
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
    <div className="min-h-screen bg-[rgba(18,18,18,0.82)]">
      {error ? "error" : loading && <Loading />}
      {children}
    </div>
  );
}
