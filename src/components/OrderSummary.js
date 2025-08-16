"use client";
import Link from "next/link";
import React from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/lib/storeSlice";

export default function OrderSummary() {
  const products = useSelector((state) => state.products);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();

  const removeProduct = (product) => {
    dispatch(removeFromCart({ product: product }));
  };
  return (
    <div>
      <section className="bg-gray-900 py-8 antialiased md:pt-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Order summary</h2>
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-800">
                <table className="w-full text-left font-medium text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-800">
                    {products &&
                      products.map((product) => {
                        return (
                          <tr key={`${product.id}${product.selectedColor}${product.selectedSize}`}>
                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                              <span className="flex items-center gap-4">
                                <Link href={`/products/${product.productId}`} className="hover:underline">
                                  {product.title}
                                </Link>
                              </span>
                            </td>
                            <td className="p-4 text-base font-normal text-white">{product.count}</td>
                            <td className="py-4 pl-4 text-right text-base font-bold text-white">₹ {product.price * product.count}</td>
                            <td className="py-4 sm:p-4 pl-1 text-right text-base font-bold text-white">
                              <button onClick={() => removeProduct(product)}>
                                <svg fill="#FFFFFF" width="22px" height="22px" viewBox="-2.94 0 31.716 31.716" xmlns="http://www.w3.org/2000/svg">
                                  <g transform="translate(-355.957 -579)">
                                    <path d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z" />
                                    <path d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z" />
                                    <path d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z" />
                                    <path d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z" />
                                    <path d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z" />
                                  </g>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {!products && <Loading width="100%" height="30%" />}
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-700 pt-2">
                <dt className="text-lg font-bold text-white">Total</dt>
                <dd className="text-lg font-bold text-white">₹ {total ? total : 0}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
