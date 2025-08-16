"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBtn from "@/utility/LoadingBtn";

export default function RecoverPage() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

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
  const handleSendEmail = async () => {
    if (!userName) {
      popTost("Please enter your username", false);
      return;
    }
    try {
      setLoading(true);
      const checkUser = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sendotp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName.trim().toLowerCase() }),
      });
      setLoading(false);
      if (checkUser.status === 400) {
        const data = await checkUser.json();
        const email = data.email;
        popTost(data.msg, false);
        if (data.msg.includes("OTP already sent")) {
          navigate.push(`/recoverpassword/otp?username=${userName.trim().toLowerCase()}&email=${email}`);
        }
        return;
      }
      if (checkUser.status === 200) {
        const data = await checkUser.json();
        const email = data.email;
        popTost("OTP is send to your register email", true);
        navigate.push(`/recoverpassword/otp?username=${userName.trim().toLowerCase()}`);
      }
      if (checkUser.status === 500) {
        popTost("Internal server error try again", false);
        return;
      }
    } catch (err) {
      setLoading(false);
      popTost("Sorry server is down", false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="flex align-middle justify-center items-center h-screen">
        <div style={{ background: "rgba(0, 10,20,0.9)", maxWidth: "400px" }} className="shadow-neon  px-12 pb-1 h-fit  lg:mb-32 xl:mb-16 mx-auto mb-52 p-6 w-5/6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full">
            <div className="mb-4">
              <p className="mb-5 font-normal  text-white dark:text-gray-400">PLease input Your username:</p>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">
                User Name
              </label>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} type="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-3" placeholder="Jonny23" />
              {loading ? (
                <LoadingBtn />
              ) : (
                <button onClick={handleSendEmail} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                  Send Otp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
