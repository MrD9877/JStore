import { UserType } from "@/@types/user";
import React, { useState } from "react";

export enum AdressType {
  Home = "home",
  Office = "office",
  Other = "other",
}

export const IndianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function useEditProfile(setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>) {
  const [editLoading, setEditLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const handleSubmit = async (e: FormData) => {
    setEditLoading(true);
    try {
      const name = e.get("name") as string;
      const phonenumber = Number(e.get("phonenumber"));
      const state = e.get("state") as string;
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { method: "PATCH", body: JSON.stringify({ name, phonenumber, state }), credentials: "include" });
      if (!res.status) throw Error(res.statusText);
      setUser((pre) => {
        if (pre) return { ...pre, name, phonenumber, state };
        return pre;
      });
      setEditProfile(false);
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  };
  return { handleSubmit, editLoading, editProfile, setEditProfile };
}
