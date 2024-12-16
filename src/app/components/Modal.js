"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function Modal({ image }) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleOutsideModelclick = (e) => {
    console.log("click");
    const target = e.target.classList;
    let clickedOutside = false;
    for (let i = 0; i < target.length; i++) {
      const givenclassName = target[i];
      if (givenclassName === "outside") clickedOutside = true;
    }
    if (clickedOutside) closeModal();
  };
  return (
    <div onClick={handleOutsideModelclick} className="w-screen h-screen flex justify-center align-middle">
      {/* <!-- Main modal --> */}
      <div id="default-modal" tabIndex="-1" className="outside w-screen h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center">
        {/* <!-- Modal body --> */}
        <div className="p-4 mt-8 space-y-4 flex justify-center bg-gray-600 w-fit mx-auto">
          <Image src={image} width={300} height={300} alt="img" />
        </div>
      </div>
    </div>
  );
}
