"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBottom() {
  const pathname = usePathname();
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-screen h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex font-medium justify-between items-center py-2 px-1.5 sm:px-4">
          <Link
            style={pathname === "/admin/orders" ? { background: "#1f2937" } : {}}
            href="/admin/orders"
            className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 dark:hover:bg-gray-800 group "
          >
            <svg
              style={pathname === "/admin/orders" ? { color: "#2563eb" } : {}}
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="5" y="3" width="18" height="21" rx="2" fill="#9ca3af" fillOpacity="0.24" />
              <path d="M9.5 7.5L14.5 7.5" stroke="#2563eb" strokeLinecap="round" />
              <path d="M9.5 10.5L12.5 10.5" stroke="#2563eb" strokeLinecap="round" />
              <path d="M9.5 13.5L13.5 13.5" stroke="#2563eb" strokeLinecap="round" />
              <path d="M9.5 16.5L12.5 16.5" stroke="#2563eb" strokeLinecap="round" />
              <rect x="7" y="7" width="1.4" height="1.4" rx="0.6" fill="#2563eb" />
              <rect x="7" y="10" width="1.4" height="1.4" rx="0.6" fill="#2563eb" />
              <rect x="7" y="13" width="1.4" height="1.4" rx="0.6" fill="#2563eb" />
              <rect x="7" y="16" width="1.4" height="1.4" rx="0.6" fill="#2563eb" />
            </svg>
            <span className="text-sm text-gray-400 roup-hover:text-blue-500">Orders</span>
          </Link>
          <Link
            style={pathname === "/admin/addproducts" ? { background: "#1f2937" } : {}}
            href="/admin/addproducts"
            className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              style={pathname === "/admin/addproducts" ? { color: "#2563eb" } : {}}
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#9ca3af"
                d="M18.1818182,0 C19.1859723,0 20,0.814027728 20,1.81818182 L20,18.1818182 C20,19.1859723 19.1859723,20 18.1818182,20 L1.81818182,20 C0.814027728,20 0,19.1859723 0,18.1818182 L0,1.81818182 C0,0.814027728 0.814027728,0 1.81818182,0 L18.1818182,0 Z M10.2975939,4.91062796 C9.92103616,4.91062796 9.61577577,5.21588836 9.61577577,5.59244614 L9.61577577,5.59244614 L9.615,9.299 L5.90909091,9.299131 C5.56676565,9.299131 5.28336385,9.55141232 5.23466539,9.88019509 L5.22727273,9.98094918 C5.22727273,10.357507 5.53253313,10.6627674 5.90909091,10.6627674 L5.90909091,10.6627674 L9.615,10.662 L9.61577577,14.3694522 C9.61577577,14.7117775 9.86805709,14.9951793 10.1968399,15.0438777 L10.2975939,15.0512704 C10.6741517,15.0512704 10.9794121,14.74601 10.9794121,14.3694522 L10.9794121,14.3694522 L10.979,10.662 L14.686097,10.6627674 C15.0284222,10.6627674 15.311824,10.410486 15.3605225,10.0817033 L15.3679152,9.98094918 C15.3679152,9.6043914 15.0626548,9.299131 14.686097,9.299131 L14.686097,9.299131 L10.979,9.299 L10.9794121,5.59244614 C10.9794121,5.25012088 10.7271308,4.96671909 10.398348,4.91802062 Z"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">AddNew</span>
          </Link>
          <Link
            style={pathname === "/admin/editproducts" ? { background: "#1f2937" } : {}}
            href="/admin/editproducts"
            className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              style={pathname === "/admin/editproducts" ? { color: "#2563eb" } : {}}
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#9ca3af"
                d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Products</span>
          </Link>
          <Link
            style={pathname === "/admin" ? { background: "#1f2937" } : {}}
            href="/admin"
            className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              style={pathname === "/admin" ? { color: "#2563eb" } : {}}
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Edit Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
