"use client";
import { useRef } from "react";

import ShowPassword from "@/utility/ShowPassword";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";

export default function AdminSigninPage() {
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    const password = data.get("password");
    if (!password) return toast("No password", false);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`, {
      method: "POST",
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    if (res.ok) {
      toast("welcome Shubham");
      router.push("/admin/orders");
    } else {
      toast("Wrong Password", false);
    }
  };
  return (
    <>
      <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="flex h-screen">
        <form style={{ background: "rgba(0, 10,20,0.9)" }} className="border rounded-xl max-w-sm mx-auto bg-white p-12 my-auto" action={onSubmit}>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Your password
            </label>
            <PasswordInput name="password" />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
            Create or Edit Admin Account?{" "}
            <Link href="/admin/editAccount" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Edit Admin
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
