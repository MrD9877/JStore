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
              <Link href={`../products/${product.productId}`}>
                <img src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${product.images[0]}`} alt="men cloth" />
                <div className="pl-2 py-1">
                  <div className="font-bold leading-snug">{product.title}</div>
                  <div className="test-sm text-gray-400 leading-snug">{product.description}</div>
                </div>
                <div className="pl-1">Rs. {product.price}</div>
              </Link>
            </div>
          );
        })}
      </div>
    );
}
