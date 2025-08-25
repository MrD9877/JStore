import { useRef } from "react";

export function VarityInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-white mb-2">
        {props.name?.toLocaleUpperCase()} :
      </label>
      <div className="flex justify-evenly  pr-2.5 rounded-lg">
        <input
          type="text"
          required
          ref={ref}
          className="shadow-sm h-fit  border  text-sm rounded-lg block w-full px-2.5 py-1 bg-white border-gray-600 placeholder-black text-black focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
          {...props}
        />
      </div>
    </div>
  );
}
export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.name?.toUpperCase()} :
      </label>
      <div className="flex justify-evenly  pr-2.5 rounded-lg">
        <input
          type="text"
          required
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
          {...props}
        />
      </div>
    </div>
  );
}
