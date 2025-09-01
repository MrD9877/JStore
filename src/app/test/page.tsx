"use client";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import UploadImage from "../admin/addproducts/UploadImage";

export default function page() {
  const [files, setFile] = useState<FileList>();
  const toast = useToast();
  const test = async () => {
    try {
      if (!files) return;
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("image", file);
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/testBucket`, { method: "POST", credentials: "include", body: formData });
      toast(await res.text());
    } catch (err) {}
  };
  return (
    <>
      <UploadImage setFile={setFile} />
      <button onClick={test}>Upload</button>
    </>
  );
}
