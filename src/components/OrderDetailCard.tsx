import { OrderType } from "@/@types/orders";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function OrderDetailCard({ order }: { order: OrderType }) {
  const [image, setImage] = useState<string>();
  return (
    <div className="p-4 mb-10 w-full">
      {image && (
        <div className="fixed w-full h-full top-0 left-0 bg-black/50">
          <Modal image={image} setImage={setImage} />
        </div>
      )}
      <div className="w-full max-w-md p-4 mx-auto  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order:</h5>
          <h5 className="text-sm font-bold leading-none text-gray-900 dark:text-white overflow-scroll">{order.orderId}</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.items.map((product, index) => {
                  return (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <th
                        onClick={(e) => (e.currentTarget.style.color = "blue")}
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <button onClick={() => setImage(product.image)}>{product.title}</button>
                      </th>
                      <td className="px-6 py-4">{product.variant.quantity}</td>
                      <td onClick={(e) => (e.currentTarget.style.color = "blue")} className="px-6 py-4">
                        <Link href={`/products/${product.productId}`}>₹ {product.price}</Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  Total
                </th>
                <td className="px-6 py-3">{order.items.length}</td>
                <td className="px-6 py-3">₹ {order.amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
