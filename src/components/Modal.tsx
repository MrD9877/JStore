"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useOutsideAlert from "@/hooks/useOutsideAlart";

export default function Modal({ image, setImage }: { setImage: React.Dispatch<React.SetStateAction<string | undefined>>; image: string }) {
  const [isInside, setisInside, ref] = useOutsideAlert(true);
  const closeModal = () => {
    setImage(undefined);
  };

  useEffect(() => {
    if (!isInside) {
      closeModal();
    }
  }, [isInside]);
  return (
    <div className="w-screen h-screen flex justify-center align-middle">
      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        tabIndex={-1}
        className="outside w-screen h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center"
      >
        {/* <!-- Modal body --> */}
        <div ref={ref} className="p-4 mt-8 space-y-4 flex justify-center bg-gray-600 w-fit mx-auto">
          <Image src={image} width={300} height={300} alt="img" />
        </div>
      </div>
    </div>
  );
}
