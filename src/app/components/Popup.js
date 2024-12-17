"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Popup({ msg = "somthing went wrong!!Go to home page", link = "/" }) {
  const [display, setDispay] = useState("");
  return (
    <>
      <div style={{ display }} className="w-screen h-[70vh] flex justify-center align-middle fixed z-20 items-center ">
        <div id="toast-notification" className="shadow-grayesh mx-auto w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg  dark:bg-gray-800 dark:text-gray-300" role="alert">
          <div className="flex items-center mb-3 border-b border-gray-400">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">New notification</span>
            <button onClick={() => setDispay("none")} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="ms-3 text-sm font-normal w-full">
              <div className="text-sm font-semibold text-gray-900 dark:text-white mx-auto">{msg}</div>
              <div className="text-sm font-normal w-full flex justify-end px-5">
                <Link href={link} replace>
                  <button type="button" data-behavior="commit" className="py-2 px-3 my-2 bg-blue-600 rounded-md">
                    OK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
