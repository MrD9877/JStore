import React from "react";

export default function LoadagainBtn({ fetchOffer, fetchProducts, setLoadAgain, fetchCategories }) {
  const handleClick = () => {
    setLoadAgain(false);
    fetchOffer();
    fetchProducts();
    fetchCategories();
  };
  return (
    <div className="my-10">
      <h1 className="mx-auto w-fit font-bold text-2xl">Fail to Load!</h1>
      <div className="w-fit mx-auto">
        <button className="border-2 active:bg-black active:text-white border-black rounded-md px-4 py-1 my-6" onClick={handleClick}>
          Try again
        </button>
      </div>
    </div>
  );
}
