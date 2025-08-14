"use client";
import MainNavBar from "@/app/_navbars/MainNavBar";
import ProductInfo from "@/app/components/ProductInfo";
import { useParams } from "next/navigation";

export default function Layout({ children }) {
  const params = useParams();
  const productId = params?.productId;
  return (
    <>
      <MainNavBar />
      <ProductInfo productId={productId} />
      {children}
    </>
  );
}
