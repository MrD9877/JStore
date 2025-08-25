import MainNavBar from "@/navbars/MainNavBar";
import ProductInfo from "./ProductInfo";

export default async function Layout({ children, params }) {
  const id = await params;
  const { productId } = id;
  return (
    <>
      <MainNavBar />
      <ProductInfo productId={productId} />
      {children}
    </>
  );
}
