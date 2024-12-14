"use client";
import React from "react";
import Loading from "./Loading.js";
import AcceptRejectBtn from "../_utility/AcceptRejectBtn.js";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function OrdersCard({ array }) {
  const router = useRouter();
  const handleRocket = (orderId) => {
    router.push(`/orders/${orderId}`);
  };
  return (
    <>
      <div className="flex flex-wrap">
        {array ? (
          array.map((item) => {
            return (
              <div key={item.orderId} className="shadow-grayesh relative flex sm:mx-3 mx-auto h-full w-60 sm:max-h-80 overflow-scroll my-3 bg-white  border border-slate-200 rounded-lg sm:flex-col">
                <div className="px-6 py-2">
                  <Link href={`/orders/${item.orderId}`}>
                    <div className="w-full max-w-md py-4 px-2 bg-white ">
                      <div className="flex items-center justify-between mb-2"></div>
                      <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 ">
                          {item.products.map((product) => {
                            return (
                              <li key={product._id} className="py-1 ">
                                <div className="flex justify-between items-center">
                                  <div className="flex mr-2 text-sm  justify-center align-middle ">
                                    <p className="text-red-500 flex align-middle justify-center">{product.count}*</p>
                                    <p className="text-sm font-medium text-gray-900 truncate ">{product.title.slice(0, 15)}</p>
                                  </div>
                                  <p className="text-sm text-green-500 truncate ">₹ {product.price}</p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </Link>

                  <div className="w-full max-w-md px-4 mb-2 bg-white  ">
                    <div className="flex text-sm  items-center justify-between">
                      Amount : <span className="text-red-700">₹ {item.amount}</span>
                    </div>
                  </div>
                  <div className="w-full px-4 mt-2 m-auto bg-white">
                    <AcceptRejectBtn handleRocket={handleRocket} rocketValue={item.orderId} orderId={item.orderId} orderStatus={item.status} />
                  </div>
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
