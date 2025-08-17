import MainNavBar from "@/navbars/MainNavBar";
import ProductItemCard from "@/components/ProductItemCard";

export default async function CategoriesLayout({ children, params }) {
  const id = await params;
  const { type } = id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category?category=${type}`);
  const product = await res.json();
  return (
    <div className="mb-4">
      <MainNavBar />
      {children}
      <ProductItemCard array={product} loadmeter={null} />
    </div>
  );
}
