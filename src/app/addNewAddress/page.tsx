"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { AdressType, IndianStates } from "@/hooks/useEditProfile";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useRef } from "react";

export default function Example() {
  const router = useRouter();
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const hadlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newDeliveryAddress`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw Error(res.statusText);
      }
      formRef.current?.reset();
      toast("Saved");
      router.back();
    } catch (err) {
      toast((err as Error).message, false);
    }
  };
  return (
    <form ref={formRef} className="bg-gray-900 px-8 py-10" onSubmit={hadlesubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Delivery Address</h2>
          <p className="mt-1 text-sm/6 text-gray-400">Use a address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="nickname" className="block text-sm/6 font-medium text-white">
                Save As
              </label>
              <div className="mt-2">
                <input id="nickname" name="nickname" type="nickname" autoComplete="nickname" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="e.g., Home or “Shubham`s House” — any nickname to help you remember" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
                First name
              </label>
              <div className="mt-2">
                <input id="first-name" name="first-name" type="text" autoComplete="given-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
                Last name
              </label>
              <div className="mt-2">
                <input id="last-name" name="last-name" type="text" autoComplete="family-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phonenumber" className="block text-sm/6 font-medium text-white">
                Phonenumber
              </label>
              <div className="mt-2">
                <input maxLength={10} minLength={10} pattern="[0-9]{10}" id="phonenumber" name="phonenumber" type="phonenumber" autoComplete="phonenumber" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="state" className="block text-sm/6 font-medium text-white">
                State
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select id="state" name="state" autoComplete="state-name" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                  {IndianStates.map((state) => {
                    return (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4" />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="city" className="block text-sm/6 font-medium text-white">
                City
              </label>
              <div className="mt-2">
                <input id="city" name="city" type="text" autoComplete="city" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="addressLine1" className="block text-sm/6 font-medium text-white">
                Address Line1
              </label>
              <div className="mt-2">
                <input id="addressLine1" name="addressLine1" type="text" autoComplete="address-level2" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="addressLine2" className="block text-sm/6 font-medium text-white">
                Address Line2
              </label>
              <div className="mt-2">
                <input id="addressLine2" name="addressLine2" type="text" autoComplete="address-level1" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pincode" className="block text-sm/6 font-medium text-white">
                Postal code
              </label>
              <div className="mt-2">
                <input id="pincode" name="pincode" maxLength={6} minLength={6} type="text" autoComplete="pincode" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>
            <fieldset>
              <legend className="text-sm/6 font-semibold text-white">Address Type</legend>
              <div className="mt-6 flex gap-5">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id={AdressType.Home}
                        value={AdressType.Home}
                        name="type"
                        type="radio"
                        aria-describedby={AdressType.Home}
                        className="col-start-1 row-start-1 appearance-none rounded border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
                      />
                      <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-white/25">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                        <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor={AdressType.Home} className="font-medium text-white">
                      {AdressType.Home.toUpperCase()}
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id={AdressType.Office}
                        value={AdressType.Office}
                        name="type"
                        type="radio"
                        aria-describedby={AdressType.Office}
                        className="col-start-1 row-start-1 appearance-none rounded border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
                      />
                      <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-white/25">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                        <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor={AdressType.Office} className="font-medium text-white">
                      {AdressType.Office.toUpperCase()}
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id={AdressType.Other}
                        value={AdressType.Other}
                        name="type"
                        type="radio"
                        aria-describedby={AdressType.Other}
                        className="col-start-1 row-start-1 appearance-none rounded border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
                      />
                      <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-white/25">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                        <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor={AdressType.Other} className="font-medium text-white">
                      {AdressType.Other.toUpperCase()}
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={() => router.back()} className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Save
        </button>
      </div>
    </form>
  );
}
