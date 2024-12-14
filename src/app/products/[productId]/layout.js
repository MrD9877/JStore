import MainNavBar from "@/app/_navbars/MainNavBar";
import ProductInfo from "@/app/components/ProductInfo";

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
