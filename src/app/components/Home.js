import Link from "next/link";
import MainNavBar from "../_navbars/MainNavBar";
import MainCard from "./cards/MainCard";
import imageMen from "@/app/_images/homeMen.png";
import imageWomen from "@/app/_images/homeKids.png";
import imageKid from "@/app/_images/homeWomen.png";
import ProductItemCard from "./cards/ProductItemCard";
import Footer from "./Footer";
import MainProducts from "./MainProducts";
import coverImage from "@/app/_images/cover.png";

export default function HomePage() {
  return (
    <div className="bg-white ">
      <div className="h-fit">
        <img className="hidden md:block w-full" src={coverImage.src} alt="cover image" />
        <div className="md:hidden">
          <MainCard background="#EEEEEE">
            <span className="flex flex-col items-start px-5 py-10">
              <p className="text-lg mb-3">Winter sale on all Products</p>
              <p className=" text-2xl font-ArchDaughter mb-3">Design for Beauty</p>
              <p className="text-base mb-2 leading-tight">You can have Anything you want in Life you Dress for it.</p>
              <Link className="border-2 border-black px-3" href={"/products"}>
                All Collection
              </Link>
            </span>
          </MainCard>
        </div>
      </div>
      <div className="sm:flex sm:flex-wrap sm:justify-center">
        <MainCard background="#EEEEEE">
          <img className="w-full object-cover sm:w-auto sm:object-none" src={imageMen.src} alt="men cloths example" />
        </MainCard>
        <MainCard background="#EEEEEE">
          <img className="w-full object-cover sm:w-auto sm:object-none" src={imageWomen.src} alt="men cloths example" />
        </MainCard>
        <MainCard background="#EEEEEE">
          <img className="w-full object-cover sm:w-auto sm:object-none" src={imageKid.src} alt="men cloths example" />
        </MainCard>
      </div>
      <MainProducts />
      <div className="px-3">
        <h2 className="text-lg font-bold py-6">Limited Time Offers</h2>
        <div className="flex justify-center">
          <ProductItemCard />
        </div>
      </div>
    </div>
  );
}
