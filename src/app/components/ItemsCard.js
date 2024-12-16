"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading.js";
import Link from "next/link.js";
import EditProductsBtn from "../_utility/EditProductsBtn.js";

export default function ItemsCard({ array }) {
  return (
    <>
      <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-3 sm:gap-3 sm:p-6">
        {array ? (
          array.map((item) => {
            return (
              <div key={item.productId} className="w-32 mb-2  m-auto sm:w-auto sm:grid lg:grid-cols-2  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/editproducts/${item.productId}`}>
                  <img className="p-2  rounded-t-lg" src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${item.images[0]}`} alt="product image" />
                </Link>
                <div className="px-2 pb-2 lg:flex lg:flex-col lg:justify-around">
                  <div>
                    <div className="w-full lg:pt-3">
                      <Link href={`/editproducts/${item.productId}`}>
                        <h3 className=" hidden lg:flex font-bold text-lg tracking-tight text-blue-700  overflow-hidden">{item.title}</h3>
                      </Link>
                      <Link href={`/editproducts/${item.productId}`}>
                        <h5 className="text-xs font-semibold tracking-tight text-white overflow-hidden">{item.description.slice(0, 60)}...</h5>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white text-xs font-bold">stock:</span>
                  <EditProductsBtn product={item} />
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
