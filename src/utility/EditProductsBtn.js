"use client";
import React, { useEffect, useState } from "react";

export default function EditProductsBtn({ product }) {
  const [count, setCount] = useState(undefined);
  const fetchChange = async () => {
    try {
      const data = { productId: product.productId, patch: "stock", content: count };
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.status === 401) console.log("pop");
    } catch {
      console.log("pop");
    }
  };

  useEffect(() => {
    if (product.stock === count || count === undefined) return;
    fetchChange();
  }, [count]);

  useEffect(() => {
    setCount(product.stock);
  }, [product]);

  return (
    <>
      <div className="flex items-center">
        {/* decrese btn  */}
        <button
          type="button"
          onClick={() => setCount((pre) => pre - 1)}
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border  focus:outline-none focus:ring-2 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700"
        >
          <svg className="h-2.5 w-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>

        {/* number of items  */}
        <span
          type="text"
          id="counter-input"
          className="w-5 shrink-0 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 text-black"
        >
          {count}
        </span>

        {/* increse btn  */}
        <button
          type="button"
          onClick={() => setCount((pre) => pre + 1)}
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700"
        >
          <svg className="h-2.5 w-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </>
  );
}
