"use client";
import React, { use, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { set } from "react-hook-form";
import FetchUser from "@/app/components/FetchUser";
import LoadingBtn from "@/app/_utility/LoadingBtn";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  const [count, setCount] = useState(0);
  const navigate = useRouter();
  const inputRef = useRef();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const username = searchParams.get("username");

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
    if (!username) {
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
        body: JSON.stringify({ username: username.trim().toLowerCase() }),
      });
      setLoading(false);
      if (checkUser.status === 400) {
        const data = await checkUser.json();
        const email = data.email;
        popTost(data.msg, false);
        return;
      }
      if (checkUser.status === 200) {
        const data = await checkUser.json();
        const email = data.email;
        popTost("OTP is send to your register email", true);
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const otp = inputValue.join("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/resetpassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, username }),
      });
      setLoading(false);
      if (res.status === 200) {
        navigate.push(`/recoverpassword/newpassword?username=${username}`);
      }
      if (res.status === 400) {
        popTost("Invalid OTP", false);
      }
      if (res.status === 500) {
        popTost("Internal server error try again", false);
      }
    } catch {
      setLoading(false);
      popTost("Internal server error try again", false);
    }
  };

  const fetchEmail = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getemail`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setEmail(data.email);
      }
    } catch {
      setEmail(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newArr = [...inputValue];
      newArr[count] = "";
      setInputValue(newArr);
      if (count > 0) setCount(count - 1);
    }
  };

  const handleChange = (e, index) => {
    e.preventDefault();
    if (count < 3 && count >= 0) {
      setCount(count + 1);
    }
    const newArr = [...inputValue];
    if (newArr[index] !== "") return;
    newArr[index] = e.target.value;
    setInputValue(newArr);
  };

  useEffect(() => {
    if (inputRef.current) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [inputRef, count, inputValue]);

  useEffect(() => {
    if (count <= 3 && count >= 0) {
      inputRef.current.children[count].focus();
    }
  }, [count]);

  useEffect(() => {
    if (!username) {
      navigate.push("/recoverpassword");
      return;
    }
    fetchEmail();
  }, [username]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex align-middle justify-center items-center h-screen">
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-grayesh">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Account Verification</h1>
            <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your Register Email {email}.</p>
          </header>
          <div id="otp-form">
            <div ref={inputRef} className="flex items-center justify-center gap-3">
              {inputValue.map((_, index) => (
                <input key={index} value={inputValue[index]} onChange={(e) => handleChange(e, index)} type="text" className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              ))}
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <button style={{ display: loading ? "none" : "inline-flex" }} onClick={handleSubmit} className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
                Verify
              </button>
              <span style={{ display: loading ? "inline-flex" : "none" }}>
                <LoadingBtn />
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{" "}
            <button disabled={loading} onClick={handleSendEmail} className="font-medium text-indigo-500 hover:text-indigo-600">
              Resend
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
