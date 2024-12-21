import Link from "next/link";

export default function page() {
  return (
    <div className="z-20">
      {/* <!-- Main modal --> */}
      <div id="successModal" tabindex="10" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden absolute z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="p-4 text-center bg-white rounded-lg shadow  sm:p-5">
            <div className="w-12 h-12 rounded-full bg-green-100  p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg aria-hidden="true" className="w-8 h-8 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900 ">Successfully Changed Password.</p>
            <Link href="/login">
              <button data-modal-toggle="successModal" type="button" className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
