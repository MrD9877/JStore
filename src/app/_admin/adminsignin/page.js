"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import bgImage from "@/app/_images/bgImage.jpg";
import ShowPassword from "@/app/_utility/ShowPassword";
import Link from "next/link";

export default function AdminSigninPage() {
  const [style, setStyle] = useState();
  const [repeatPasswordState, setRepeatPassword] = useState();
  const [passwordState, setPassword] = useState();
  const router = useRouter();
  const repeatPassword = useRef();
  const repeatPasswordDiv = useRef();
  const passwordDiv = useRef();
  const redInputStyle = {
    background: "rgba(225, 0, 0, 0.2)",
    border: "2px solid red",
    color: "red",
  };
  const { register, handleSubmit } = useForm();

  const popTost = (msg, success) => {
    let emote = "❌";
    if (success) emote = "✅";
    toast(`${msg}`, {
      icon: `${emote}`,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const navigateTOlogin = (nav) => {
    setTimeout(() => {
      router.push(nav);
    }, 2000);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.repeatpassword) {
      popTost("Password does't match");
      setStyle(redInputStyle);
    }
    if (data.password === data.repeatpassword) {
      setStyle({ color: "black" });
      let username = data.username.trim().toLowerCase();
      try {
        const addNewUser = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username, ...data }),
        });
        if (addNewUser.status === 201) {
          popTost("You are now signed in", true);
          navigateTOlogin("/login");
        } else if (addNewUser.status === 400) {
          const res = await addNewUser.json();
          popTost(res.msg, false);
        } else {
          popTost(`error ${addNewUser.status}`, false);
        }
      } catch (err) {
        popTost("Sorry server is down", false);
      }
    }
  };
  useEffect(() => {
    if (repeatPasswordDiv.current) setRepeatPassword(repeatPasswordDiv.current.firstChild);
    if (passwordDiv.current) setPassword(passwordDiv.current.firstChild);
  }, [repeatPasswordDiv, passwordDiv]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div style={{ backgroundImage: `url(${bgImage.src})` }} className="flex h-screen">
        <form style={{ background: "rgba(0, 10,20,0.9)" }} className="border rounded-xl max-w-sm mx-auto bg-white p-12 my-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">
              User Name
            </label>
            <input type="username" {...register("username")} required id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Jonny23" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Your password
            </label>
            <div ref={passwordDiv} className="flex justify-evenly  pr-2.5 rounded-lg">
              <input style={style} type="password" {...register("password")} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
              <span className="ml-3 flex items-center justify-center  my-auto h-fit">
                <ShowPassword input={passwordState} />
              </span>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="repeat-password" className="after:content-['*'] after:ml-0.5 after:text-red-500 block mb-2 text-sm font-medium text-white dark:text-white">
              Repeat password
            </label>
            <div ref={repeatPasswordDiv} className="flex justify-evenly  pr-2.5 rounded-lg">
              <input style={style} ref={repeatPassword} type="password" {...register("repeatpassword")} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
              <span className="ml-3 flex items-center justify-center  my-auto h-fit">
                <ShowPassword input={repeatPasswordState} />
              </span>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="key" className="flex items-center mb-2 text-sm font-medium text-white dark:text-white">
              Key
              <lord-icon style={{ width: "19px", marginLeft: "4px" }} src="https://cdn.lordicon.com/drdlomqk.json" trigger="hover" colors="primary:#6c16c7,secondary:#545454,tertiary:#6c16c7"></lord-icon>
            </label>
            <div className="flex justify-evenly  pr-2.5 rounded-lg">
              <input style={style} type="password" id="key" {...register("key")} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create Admin Account
          </button>
          <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
            already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
