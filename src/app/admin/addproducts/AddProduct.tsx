"use client";
import Loading from "@/components/Loading.js";
import AddnewOptions from "@/navbars/AddnewOptions";
import useToast from "@/hooks/useToast";
import Description from "./Description";
import UploadImage from "./UploadImage";
import { FormEvent, useState } from "react";
import AddVarity, { VariantState } from "./Variant";
import { FormInput } from "./UI";

export default function AddProduct() {
  const [files, setFile] = useState<FileList>();
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<VariantState[]>([]);
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<string>();
  const toast = useToast();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files || files.length < 2) return toast("Atleast 2 images...");
    if (!title || !price || !category) return toast("Please fill all the fields...", false);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    Array.from(files).forEach((file) => {
      formData.append("image", file);
    });
    formData.append("variants", JSON.stringify(variants));
    formData.append(
      "dimentions",
      JSON.stringify({
        weight: formData.get("weight"),
        height: formData.get("height"),
        length: formData.get("length"),
        breadth: formData.get("breadth"),
      })
    );
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, { method: "POST", credentials: "include", body: formData });
      if (res.status === 200) toast("Done", true);
      setLoading(false);
    } catch {
      toast("oppps somthing went wrong try again..", false);
    }
  };

  if (loading)
    return (
      <div className="bg-gray-100 w-full flex flex-col">
        <Loading />
      </div>
    );
  return (
    <>
      <div className="bg-gray-100 w-full flex flex-col">
        <AddnewOptions />
        <div className="bg-gray-100">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Product</h1>
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <!-- Product Title --> */}
                  <FormInput
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Black Ripped Jenns..."
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {/* <!-- Price --> */}
                  <FormInput
                    name="price"
                    type="number"
                    id="price"
                    required
                    step="0.01"
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  {/* category */}
                  <FormInput name="category" placeholder="jeens" value={category || ""} onChange={(e) => setCategory(e.target.value)} />
                  <FormInput name="priority score" type="number" placeholder="3 (Hiher this number higher in user search result)" defaultValue={0} />
                </div>

                {/* <!-- Product Details --> */}
                <Description title={title} price={price} category={category} />
                <div className="mt-6">
                  <AddVarity variants={variants} setVariants={setVariants} />
                </div>
                <div className="my-4">
                  <h2 className="text-xl font-mono mb-2">Dimentions:</h2>
                  <div className="flex items-center w-[50%]">
                    <FormInput name="weight" type="number" placeholder="In grams" required />
                    <FormInput name="height" type="number" placeholder="In cm" required />
                    <FormInput name="length" type="number" placeholder="In cm" required />
                    <FormInput name="breadth" type="number" placeholder="In cm" required />
                  </div>
                </div>
                {/* imagecount  */}
                <div className="w-fit mx-auto mb-5 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Images: {(files && files.length) || 0}
                </div>
                {/* <!-- Upload Images --> */}
                <UploadImage setFile={setFile} />
                {/* <!-- Submit Button --> */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
