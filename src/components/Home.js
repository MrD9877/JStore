import Link from "next/link";
import MainCard from "./MainCard";
import MainProducts from "./MainProducts";

export default function HomePage() {
  return (
    <div className="bg-white ">
      <div className="h-fit">
        <img className="hidden md:block w-full" src="/images/cover.png" alt="cover image" />
        <div className="md:hidden">
          <MainCard background="#EEEEEE">
            <span className="flex flex-col items-start px-5 py-10">
              <p className="text-lg mb-3">Winter sale on all Products</p>
              <p className=" text-2xl font-ArchDaughter mb-3">Design for Beauty</p>
              <p className="text-base mb-2 leading-tight">You can have Anything you want in Life you Dress for it.</p>
              <Link className="border-2 border-black px-3" href={"/categories"}>
                All Collection
              </Link>
            </span>
          </MainCard>
        </div>
      </div>
      <div className="sm:flex sm:flex-wrap sm:justify-center">
        <MainCard background="#EEEEEE">
          <img className="w-full object-cover sm:w-auto sm:object-none" src="/images/homeMen.png" alt="men cloths example" />
        </MainCard>
        <MainCard background="#EEEEEE">
          <img className="w-full object-cover sm:w-auto sm:object-none" src="/images/homeWomen.png" alt="men cloths example" />
        </MainCard>
        <MainCard background="#EEEEEE" classname="hidden sm:block">
          <img className="w-full object-cover sm:w-auto sm:object-none" src="/images/homeKids.png" alt="men cloths example" />
        </MainCard>
      </div>
      <MainProducts />
    </div>
  );
}
