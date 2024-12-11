import ItemsCard from "@/app/components/ItemsCard";
import NavBottom from "@/app/components/NavBottom";
import SearchBar from "@/app/_navbars/SearchBar";
import MainNavBar from "@/app/_navbars/MainNavBar";
import ProductItemCard from "@/app/components/cards/ProductItemCard";

export default async function CategoriesLayout({ children, params }) {
  const id = await params;
  const { type } = id;
  const res = await fetch(`${process.env.SERVER_URL}/category?category=${type}`);
  const product = await res.json();
  return (
    <>
      <MainNavBar />
      {children}
      <ProductItemCard array={product} loadmeter={null} />
    </>
  );
}
