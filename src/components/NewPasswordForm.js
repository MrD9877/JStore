"use client";
import useToast from "@/hooks/useToast";
import LoadingBtn from "@/utility/LoadingBtn";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useActionState } from "react";

export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const data = Object.fromEntries(formData);
    if (data.password.trim() !== data.confirmPassword.trim()) {
      toast("Password does't match", false);
      return;
    } else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newpassword`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password.trim() }),
        });
        if (res.status === 200) {
          toast("Password changed successfully", true);
          router.push("/recoverpassword/newpassword/sucess");
        } else if (res.status === 400) {
          const data = await res.json();
          toast(`${data.msg}`, false);
        } else {
          toast(`Error ${res.status}`, false);
        }
      } catch {
        toast("Internal server error try again", false);
      }
    }
  });

  let email = searchParams.get("email");
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/icon.ico`} alt="logo" />
            Jagraon Garments
          </Link>
          <div className="w-full p-6 bg-white rounded-lg shadow-grayesh dark:shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Change Password</h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action={submitAction}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  value={email ? email : ""}
                  onChange={(e) => (email = e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="confirmPassword"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                style={{ display: isPending ? "none" : "" }}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reset password
              </button>
              <div style={{ display: isPending ? "" : "none" }}>
                <LoadingBtn />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
