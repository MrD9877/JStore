import useOutsideAlert from "@/hooks/useOutsideAlart";
import Link from "next/link";
import React from "react";

type Order = {};

export default function ActionButton({ order }: { order: Order }) {
  const [showModal, setShowModal, ref] = useOutsideAlert();

  const handleOrderAgain = async () => {
    const orderItems = "";
    setShowModal(false);
  };

  return (
    <div ref={ref} className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
      <button
        onClick={() => setShowModal(true)}
        id="actionsMenuDropdownModal10"
        data-dropdown-toggle="dropdownOrderModal10"
        type="button"
        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
      >
        Actions
        <svg
          className="-me-0.5 ms-1.5 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id="dropdownOrderModal10"
        className={`z-10 absolute w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 ${showModal ? "block" : "hidden"}`}
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="bottom"
      >
        <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown10">
          <li>
            <button
              onClick={handleOrderAgain}
              className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                ></path>
              </svg>
              <span>Order again</span>
            </button>
          </li>
          <li>
            <Link
              href="/viewOrder"
              className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              </svg>
              Order details
            </Link>
          </li>
          {/* <li>
            <a href="#" data-modal-target="deleteOrderModal" data-modal-toggle="deleteOrderModal" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
              </svg>
              Cancel order
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
