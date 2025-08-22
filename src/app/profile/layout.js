import DisplayOrdersCard from "@/components/DisplayOrdersCard";
import MainNavBar from "../../navbars/MainNavBar";

export default async function ProductsLayout({ children }) {
  return (
    <div className="bg-white w-screen py-8 antialiased  md:py-8">
      <MainNavBar />
      {children}
      <div className="p-10">
        <DisplayOrdersCard />
      </div>
    </div>
  );
}
