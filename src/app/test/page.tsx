"use client";
import { ShoppingCart } from "lucide-react";
import useFiles from "../admin/addproducts/useFilesBundlers";
import UploadImage from "../admin/addproducts/UploadImage";
import { useState } from "react";

export default function page() {
  const [files, setFiles] = useState<FileList>();
  const { images, uploadFiles } = useFiles(files);
  return (
    <>
      {JSON.stringify(images)}
      <UploadImage setFile={setFiles} />
      <button onClick={uploadFiles}>upload</button>
    </>
  );
}
