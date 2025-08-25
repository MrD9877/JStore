"use client";
import Loading from "@/components/Loading";
import { StoreState } from "@/@types/reduxStore";
import useAuth from "@/hooks/useAuth";
import LoginPage from "@/components/LoginCard";
import { useSelector } from "react-redux";
import Popup from "@/components/Popup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function layout() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const product = useSelector((state: StoreState) => state.products);

  useEffect(() => {
    if (isLoggedIn && product) router.push("/checkout/ordersummary");
  }, [isLoggedIn, product]);

  if (loading)
    return (
      <div className="min-h-screen bg-[rgba(18,18,18,0.82)]">
        <Loading />
      </div>
    );

  if (!isLoggedIn)
    return (
      <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="flex align-middle h-screen">
        <LoginPage />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-[rgba(18,18,18,0.82)]">
        <Popup msg={"Add item to Checkout!GO to shoping page?"} link="/categories" />;
      </div>
    );

  return (
    <div className="min-h-screen bg-[rgba(18,18,18,0.82)]">
      <Loading />
    </div>
  );
}
