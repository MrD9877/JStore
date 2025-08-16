"use client";
import DisplayOrderSummary from "@/components/DisplayOrderSummary";
import FetchUser from "@/components/FetchUser";
import Loading from "@/components/Loading";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div>
      <FetchUser setLoading={setLoading} setError={setError} setUser={setUser} />
      <div className="px-0.5 mx-auto mt-10 sm:mx-10">
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col mx-auto 2xl:w-1/3">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-white font-bold">Personal Info</h4>
              <ul className="mt-2 text-white">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24 overflow-scroll">Full name:</span>
                  <span className="text-white sm:ml-10">{user && user.name} kumar</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-white sm:ml-10">{user && user.phonenumber}</span>
                </li>
                <li className="flex border-b py-2 overflow-scroll">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-white ml-2 sm:ml-10">{user && user.email ? user.email : "Not provided"}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Country:</span>
                  <span className="text-white sm:ml-10"> INDIA</span>
                </li>
                <li className="flex border-b py-2 overflow-scroll">
                  <span className="font-bold w-24">State:</span>
                  <span className="text-white sm:ml-10"> {user && user.deliveryaddress.state}</span>
                </li>
                <li className="flex border-b py-2 overflow-scroll">
                  <span className="font-bold w-24">Location:</span>
                  <span className="text-white ml-2 sm:ml-10">
                    {" "}
                    {user && user.deliveryaddress.housenumber} {user && user.deliveryaddress.streetname} {user && user.deliveryaddress.city}
                  </span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">PIN:</span>
                  <span className="text-white sm:ml-10"> {user && user.deliveryaddress.pin}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Languages:</span>
                  <span className="text-white sm:ml-10">English</span>
                </li>
              </ul>
              <Link href={"/profile/delivery"}>
                <button className="flex items-center mt-4 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg className="-ms-0.5 me-1.5 h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"></path>
                  </svg>
                  <span>EditProfile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>{user && <DisplayOrderSummary user={user} />}</div>
    </div>
  );
}
