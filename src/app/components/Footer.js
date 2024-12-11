import React from "react";

export default function Footer() {
  return (
    <div className="bg-black text-white mt-10 flex justify-center flex-wrap">
      <div className="flex flex-col justify-center gap-5 pt-5 px-5 sm:py-10 ">
        <h1 className="text-2xl font-bold">About Shop</h1>
        <p>Jagraon Garments</p>
        <p>V.P.O Daudhar, Distric: Moga</p>
        <p className="text-blue-500">
          <span className="text-white">State: </span>Punjab
        </p>
        <p className="text-blue-500">
          <span className="text-white">Phone: </span>+91 8872495291
        </p>
        <p className="text-blue-500">
          <span className="text-white">Email: </span>jagraongarments@gmail.com
        </p>
      </div>
      <div className="flex gap-10 justify-center py-10 px-2">
        <div className="flex flex-col gap-2">
          {/* to do tearm and conditions  */}
          <h1 className="text-2xl text-bold">Tearms & Policies</h1>
          <p>Privacy Policy</p>
          <p>Terms Conditions</p>
        </div>
        <div className="flex flex-col gap-2">
          {/* to do insta link  */}
          <h1 className="text-2xl text-bold">Follow Us</h1>
          <p>Instagram</p>
          <p>FaceBook</p>
        </div>
      </div>
    </div>
  );
}
