import useToast from "@/hooks/useToast";
import { useState } from "react";

export default function FetchOpenAI({ description, setAiPromo }) {
  const toast = useToast();
  const fetchAiresponse = async () => {
    try {
      setAiPromo(false);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/openai`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(aidata),
      });
      if (response.status === 200) {
        const data = await response.json();
        description.current.value = data.description;
      } else {
        toast(response.status);
      }
    } catch (err) {
      toast("opps AI not Responding Try again or Do it your self lazy Bump.");
    }
  };
  return (
    <div className="absolute z-30">
      <div className="card flex items-center justify-center w-screen min-h-screen">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-purple-600 rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">Add any key points you want.</h3>

              <button
                onClick={() => setAiPromo(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <div className="relative mb-4">
                <input
                  name="suggestions"
                  onChange={(e) => changeData("suggestions", e)}
                  className="p-4 block z-50 w-full bg-gray-100 border-none rounded-lg text-md focus:border-none focus:ring-0 focus:outline-none resize-none"
                  placeholder="Bellbottoms,trending,...(optional*)"
                />
                <div className="absolute w-fit bottom-0 right-0 p-2 rounded-b-md bg-none">
                  <div className="flex justify-end items-center">
                    <div className="flex items-center gap-x-1">
                      <button
                        onClick={fetchAiresponse}
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-10 rounded-lg text-white bg-blue-400 hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2"
                      >
                        <svg
                          className="flex-shrink-0 size-6"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
