import ShowPassword from "@/utility/ShowPassword";
import React, { JSX, ReactNode, useRef } from "react";

export default function PasswordInput(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "required" | "ref" | "classname">) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-evenly  pr-2.5 rounded-lg">
      <input
        type="password"
        required
        ref={ref}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        {...props}
      />
      <span className="ml-3 flex items-center justify-center  my-auto h-fit">
        <ShowPassword input={ref} />
      </span>
    </div>
  );
}
