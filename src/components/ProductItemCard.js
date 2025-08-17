import React from "react";
import Link from "next/link";

export default function ProductItemCard({ array, loadmeter }) {
  if (array)
    return (
      <div className="sm:flex sm:flex-wrap sm:gap-3 sm:justify-center">
        {array.map((product, index) => {
          if (index > loadmeter) return;
          return (
            <div key={product.productId} className="pb-4 mt-4 border border-black rounded-md max-w-80 mx-auto">
              <Link href={`../products/${product.productId}`} className="grid grid-rows-3 h-full w-full gap-2">
                <img src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${product.images[0]}`} alt="men cloth" className="row-span-2" />
                <main className="">
                  <div className="pl-2 py-1">
                    <div className="font-bold leading-snug">{product.title}</div>
                    <div className="test-sm text-gray-400 leading-snug">{product.description.split(" ").length > 30 ? `${product.description.split(" ").slice(0, 30).join(" ")}...` : product.description}</div>
                  </div>
                  <div className="pl-1 text-xl">Rs. {product.price}</div>
                </main>
              </Link>
            </div>
          );
        })}
      </div>
    );
}
