import SearchBar from "@/app/_navbars/SearchBar";
import NavBottom from "@/app/components/NavBottom";

export default async function ProductsLayout({ children }) {
  return (
    <>
      {children}
      <NavBottom />
    </>
  );
}
