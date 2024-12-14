"use client";
import AddnewOptions from "@/app/_navbars/AddnewOptions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

export default function page() {
  const [file, setFile] = useState([]);
  const { handleSubmit } = useForm();

  const submit = async () => {
    const formData = new FormData();
    file.forEach((pic) => {
      formData.append("image", pic);
    });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/avatar`, { method: "POST", credentials: "include", body: formData });
      if (res.status === 201) console.log("done");
    } catch {
      console.log("err");
      // popTost("oppps somthing went wrong try again..")
    }
  };

  const fileSelected = (event) => {
    const temp = event.target.files;
    setFile([...temp]);
  };
  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <AddnewOptions />
      <form style={{ maxWidth: "650px" }} className="p-8 mx-auto" onSubmit={handleSubmit(submit)}>
        <div className="w-fit mx-auto mb-5 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Images: {file.length}</div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" className="hidden" onChange={fileSelected} type="file" accept="image/*" multiple></input>
          </label>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Avatar
          </button>
        </div>
      </form>
    </div>
  );
}
