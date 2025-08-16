import Link from "next/link";
import { useForm } from "react-hook-form";
import LoadingBtn from "@/utility/LoadingBtn";
import { useEffect, useRef, useState } from "react";
import ShowPassword from "@/utility/ShowPassword";
import { useRouter } from "next/navigation";

export default function Form({ onSubmit, style, loading }) {
  const router = useRouter();
  const passwordInput = useRef(null);
  const [inputState, setInputState] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!passwordInput.current) return;
    setInputState(passwordInput.current.firstChild);
  }, [passwordInput]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">
              User Name
            </label>
            <input type="username" {...register("username")} required id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Jonny23" />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Your password
            </label>
            <div ref={passwordInput} className="flex justify-evenly  pr-2.5 rounded-lg">
              <input style={style} type="password" {...register("password")} required className="shadow-sm text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" />
              <span className="ml-3 flex items-center justify-center  my-auto h-fit">
                <ShowPassword input={inputState} />
              </span>
            </div>
          </div>
          {loading ? (
            <LoadingBtn />
          ) : (
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Log In
            </button>
          )}
          <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
            <Link href="/recoverpassword" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Forgot password?
            </Link>
          </p>
          <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
        <div className="w-4/5 mx-auto text-white">
          <div className="flex mx-auto items-center justify-center my-1">
            <hr className="w-24 h-1 my-1 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
            <button onDoubleClick={() => router.push("/adminsignin")} className="mx-2">
              or
            </button>
            <hr className="w-24 h-1 my-1 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
          </div>
          <div className="mb-2">
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/googleauth`}>
              <button type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Login with Google<div></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
