"use client";
import React from "react";
import { useRouter } from "next/navigation";
import paceholderImage from "../_images/bgImage.jpg";

export default function DisplayItemsCard({ array }) {
  const router = useRouter();
  const handleClickOnItem = (e, id) => {
    // todo if admin push to admin/id
    console.log(id);
    router.push(`/products/${id}`, { scroll: false });
  };
  return (
    <div className="w-full sm:w-auto  mx-auto max-w-md  border border-gray-200 rounded-lg shadow p-2 bg-gray-500">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 ">
          {array.length < 1 && (
            <li key="no results" className="p-3 sm:p-4 ">
              <div className="flex items-center text-white">No Results....</div>
            </li>
          )}
          {array.map((items, index) => {
            return (
              <li key={index} onClick={(e) => handleClickOnItem(e, items.productId)} className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-3 sm:p-4 odd:bg-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={index < 4 ? `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${items.images[0]}` : paceholderImage.src} alt="Neil image" />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{items.title.slice(0, 25)}...</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{items.description.slice(0, 35)}...</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">₹ {items.price}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
