"use client";
import React from "react";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../_images/avatars/avatar.png";
import DeliveryForm from "./DeliveryForm";

export default function DeliveryInfoForm({ linkAfterDone = "/profile" }) {
  const router = useRouter();
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
  const uploadForm = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${process.env.SERVER_URL}/user`, { method: "POST", credentials: "include", body: JSON.stringify(data) });
      return res.status;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const submitForm = async (data) => {
    const user = { name: data.name, phonenumber: data.phonenumber, email: data.email, avatar: avatar.src };
    const deliveryaddress = { state: data.state, pin: data.pin, city: data.city, streetname: data.streetname, housenumber: data.housenumber };
    const res = await uploadForm({ user: user, deliveryaddress: deliveryaddress });
    if (res === 201) router.back();
    if (res === 406) popTost("opps!Somthing went Wrong!! try again.", false);
    if (res === 401) router.push("/login");
    if (!res) popTost("opps!Somthing went Wrong!! try again.", false);
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-8 md:mt-5 lg:mt-10 h-fit lg:w-lg lg:mx-auto">
        <div className="duration-500 group overflow-hidden relative rounded bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly">
          <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
          <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
          <div className="z-10 flex flex-col justify-evenly w-full h-full">
            <span className="text-2xl font-bold">Delivery Details</span>
            <DeliveryForm submitForm={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
