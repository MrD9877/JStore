import SearchBar from "@/app/_navbars/SearchBar";
import NavBottom from "@/app/components/NavBottom";
import MainNavBar from "../_navbars/MainNavBar";

export default async function ProductsLayout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}
