"use client";
import { Suspense, useEffect, useState } from "react";
import ProductItemCard from "./cards/ProductItemCard";
import Loading from "./Loading";
import LoadagainBtn from "../_utility/LoadagainBtn";

export default function MainProducts() {
  const [categories, setCategories] = useState(null);
  const [loadAgain, setLoadAgain] = useState(false);
  const [products, setProducts] = useState(null);
  const [productCategory, setProductCategoty] = useState(null);
  const [loadmeter, setLoadMeter] = useState(8);
  const [offerProducts, setOfferProducts] = useState(null);
  const buttonActiveStyle = {
    background: "black",
    color: "white",
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`);
      const data = await res.json();
      setCategories(data);
    } catch {
      setLoadAgain(true);
    }
  };
  const fetchProducts = async () => {
    const fetchString = productCategory === null ? `${process.env.NEXT_PUBLIC_SERVER_URL}/product` : `${process.env.NEXT_PUBLIC_SERVER_URL}/product?category=${productCategory}`;
    try {
      const res = await fetch(fetchString);
      const data = await res.json();
      setProducts(data);
    } catch {
      setLoadAgain(true);
    }
  };
  const fetchOffer = async () => {
    const fetchString = `${process.env.NEXT_PUBLIC_SERVER_URL}/product?category=offer`;
    try {
      const res = await fetch(fetchString);
      const data = await res.json();
      if (data.length > 0) setOfferProducts(data);
    } catch {
      setOfferProducts(null);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchOffer();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [productCategory]);

  const handler = (type) => {
    setProductCategoty(type);
    setLoadMeter(4);
  };
  if (loadAgain) return <LoadagainBtn fetchCategories={fetchCategories} fetchOffer={fetchOffer} fetchProducts={fetchProducts} setLoadAgain={setLoadAgain} />;
  return (
    <>
      <div className="mt-6 w-full px-3">
        <h1 className="mx-auto w-fit font-bold text-2xl">Best Sell Product</h1>
        <nav className="flex flex-wrap my-5 md:justify-center">
          <button style={productCategory === null ? buttonActiveStyle : {}} onClick={() => handler(null)} type="button" className="px-4 font-bold text-lg m-1 rounded-lg bg-white border-2 border-black active:bg-black active:text-white">
            All
          </button>
          {categories &&
            categories.map((item) => {
              return (
                <button style={productCategory === item.category ? buttonActiveStyle : {}} onClick={() => handler(item.category)} key={item.category} type="button" className="px-4 font-bold text-lg m-1 rounded-lg bg-white border-2 border-black ">
                  {item.category}
                </button>
              );
            })}
        </nav>
        <div className="px-5">
          <Suspense fallback={<Loading height="20vh" width="100%" />}>
            <ProductItemCard array={products} loadmeter={loadmeter} />
          </Suspense>
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => setLoadMeter((pre) => pre + 4)} className="border-2  border-black rounded-md px-4 py-1 my-6">
            Load More
          </button>
        </div>
      </div>
      {offerProducts && (
        <>
          <hr className="h-px bg-black mx-auto w-2/3 my-10" />
          <div className="px-3">
            <h1 className="mx-auto w-fit font-bold text-2xl">Limited Time Offers</h1>
            <div className="flex justify-center">
              <ProductItemCard array={offerProducts} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
