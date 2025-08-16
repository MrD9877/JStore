"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading.js";
import Link from "next/link.js";
import EditProductsBtn from "@/utility/EditProductsBtn";

export default function ItemsCard({ array }) {
  return (
    <>
      <div className="sm:flex sm:flex-wrap sm:gap-3 sm:justify-center">
        {array ? (
          array.map((product, index) => {
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
                <div className="flex pl-2 py-2">
                  <span className="text-gray-900 text-lg mr-1 font-bold">stock:</span>
                  <EditProductsBtn product={product} />
                </div>
              </div>
            );
          })
        ) : (
          <Loading width="100vw" />
        )}
      </div>
    </>
  );
}
