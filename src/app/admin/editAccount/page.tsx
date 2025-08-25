"use client";
import PasswordInput from "@/components/ui/PasswordInput";
import Link from "next/link";
import React, { useState } from "react";
import useAdmin from "./useAdmin";
import EditAdmin from "./EditAdmin";
import Loading from "@/components/Loading";
import { KeyRound } from "lucide-react";

function AdminKeyForm({ getAdmin }: { getAdmin: (key: FormData) => Promise<void> }) {
  return (
    <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="flex h-screen">
      <form style={{ background: "rgba(0, 10,20,0.9)" }} className="border rounded-xl max-w-sm mx-auto bg-white p-12 my-auto" action={getAdmin}>
        <h1 className="text-lg mb-4 font-light text-white">Enter Key To continue :</h1>
        <div className="mb-5">
          <label htmlFor="key" className="flex gap-2 items-center mb-2 text-sm font-medium text-white dark:text-white">
            Key
            <KeyRound width={20} height={15} strokeWidth={1} />
          </label>
          <PasswordInput name="key" />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify
        </button>
        <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
          Login To Admin?{" "}
          <Link href="/admin" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Admin
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function page() {
  const [loading, setLoading] = useState(false);
  const { admin, keyref, getAdmin } = useAdmin(setLoading);
  if (loading)
    return (
      <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }}>
        <Loading width="100%" height="100svh" />;
      </div>
    );
  if (admin === undefined) return <AdminKeyForm getAdmin={getAdmin} />;
  return <EditAdmin keyref={keyref} admin={admin} />;
}
