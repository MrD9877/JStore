import { IndianStates } from "@/hooks/useEditProfile";
import React from "react";

export default function SelectState() {
  return (
    <select id="state" name="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  max-w-36 ">
      {IndianStates.map((state) => {
        return (
          <option key={state} value={state}>
            {state}
          </option>
        );
      })}
    </select>
  );
}
