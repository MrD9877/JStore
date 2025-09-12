"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import CopytoClip from "@/utility/CopytoClip";
import useToast from "@/hooks/useToast";
import ActionButton from "./ActionButton";

function CancelSvg() {
  return (
    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
    </svg>
  );
}
function CompleteSvg() {
  return (
    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
    </svg>
  );
}
function TransitSvg() {
  return (
    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      ></path>
    </svg>
  );
}

export default function DisplayOrdersCard() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order`, { credentials: "include" });
      if (res.status === 200) {
        const data = await res.json();
        setLoading(false);
        setOrders(data);
      } else {
        setLoading(false);
        toast("login to Continue");
      }
    } catch (err) {
      setLoading(false);
      toast(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders && orders.length === 0) {
    return <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">No orders yet</h3>;
  }

  return (
    <>
      {orders && orders.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Latest orders</h3>
          {loading ? (
            <Loading />
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((order, index) => {
              const date = new Date(order.orderDate).toLocaleString(undefined, { timeZone: "Asia/Kolkata" });

              return (
                <div
                  key={order._id}
                  className={`flex flex-wrap items-center gap-y-4  border-gray-200 py-4 dark:border-gray-700 md:pb-5 ${index !== order.length - 1 && "border-b"}`}
                >
                  {/* order id  */}
                  <dl className="w-1/2 sm:w-48">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                    <dd className="mt-1.5 flex align-middle text-base font-semibold text-gray-900 dark:text-white">
                      <span onClick={() => CopytoClip(order.orderId, toast)} className="hover:underline">
                        {order.orderId.slice(0, 10)}...
                      </span>
                      <button onClick={() => CopytoClip(order.orderId, toast)}>
                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "30px", height: "25px" }}></lord-icon>
                      </button>
                    </dd>
                  </dl>
                  {/* date  */}
                  <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{date}</dd>
                  </dl>
                  {/* amount  */}
                  <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Amount:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">₹ {order.amount}</dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                    {/* order status  */}
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      {/* completed  */}
                      {order.status}
                      <TransitSvg />
                    </dd>
                  </dl>

                  {/* action btn  */}
                  <ActionButton />
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
