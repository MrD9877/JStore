"use client";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import Loading from "./Loading";
import Link from "next/link";
import FetchAddress from "../_utility/FetchAddress";

export default function PickupAddress({ user }) {
  const [pickup, setPickup] = useState();
  const popTost = useToast();

  const fetchPickupAddress = async () => {
    const address = await FetchAddress(user.shiprocket.token);
    setPickup(address);
  };
  useEffect(() => {
    if (user.shiprocket) {
      fetchPickupAddress();
    }
  }, []);
  return (
    <>
      <div className="my-4 flex flex-col ">
        <div className="w-full flex flex-col ">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">ShipRocket Pickup </h4>
            {pickup ? (
              pickup.map((item) => {
                return (
                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Pickup Location:</span>
                      <span className="text-gray-700">{item.pickup_location}</span>
                    </li>
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Address:</span>
                      <span className="text-gray-700">{item.address}</span>
                    </li>
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">City:</span>
                      <span className="text-gray-700">{item.city}</span>
                    </li>
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Phone:</span>
                      <span className="text-gray-700">{item.phone}</span>
                    </li>
                  </ul>
                );
              })
            ) : (
              <Loading />
            )}
            <Link href={"/adminprofile/pickup"}>
              <button className="flex items-center mt-4 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg className="-ms-0.5 me-1.5 h-4 w-4" width="24" height="24" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#FFFFFF"
                    d="M18.1818182,0 C19.1859723,0 20,0.814027728 20,1.81818182 L20,18.1818182 C20,19.1859723 19.1859723,20 18.1818182,20 L1.81818182,20 C0.814027728,20 0,19.1859723 0,18.1818182 L0,1.81818182 C0,0.814027728 0.814027728,0 1.81818182,0 L18.1818182,0 Z M10.2975939,4.91062796 C9.92103616,4.91062796 9.61577577,5.21588836 9.61577577,5.59244614 L9.61577577,5.59244614 L9.615,9.299 L5.90909091,9.299131 C5.56676565,9.299131 5.28336385,9.55141232 5.23466539,9.88019509 L5.22727273,9.98094918 C5.22727273,10.357507 5.53253313,10.6627674 5.90909091,10.6627674 L5.90909091,10.6627674 L9.615,10.662 L9.61577577,14.3694522 C9.61577577,14.7117775 9.86805709,14.9951793 10.1968399,15.0438777 L10.2975939,15.0512704 C10.6741517,15.0512704 10.9794121,14.74601 10.9794121,14.3694522 L10.9794121,14.3694522 L10.979,10.662 L14.686097,10.6627674 C15.0284222,10.6627674 15.311824,10.410486 15.3605225,10.0817033 L15.3679152,9.98094918 C15.3679152,9.6043914 15.0626548,9.299131 14.686097,9.299131 L14.686097,9.299131 L10.979,9.299 L10.9794121,5.59244614 C10.9794121,5.25012088 10.7271308,4.96671909 10.398348,4.91802062 Z"
                  />
                </svg>
                <span>New</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
