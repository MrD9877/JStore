import { DeliveryAddress } from "@/@types/user";
import React from "react";

export default function ViewDilveryAddress({ dilveryAddress }: { dilveryAddress: DeliveryAddress[] }) {
  return (
    <div>
      {dilveryAddress.map((address, index) => {
        return (
          <div key={index}>
            <h2>{address.nickname}</h2>
            <p className="text-sm text-gray-700 ">
              {address.name} - {address.phonenumber}
            </p>
            <p className="text-sm text-gray-700 ">
              {address.addressLine1},{address.addressLine2},{address.city}, {address.state}, {address.pincode}
            </p>
            <p className="text-sm text-gray-700 ">{address.type}</p>
          </div>
        );
      })}
    </div>
  );
}
