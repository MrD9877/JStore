import React, { useRef, useState } from "react";
import useToast from "@/hooks/useToast";
import { Loader2Icon } from "lucide-react";

export default function Description({ title, price, category }: { title?: string; price?: number; category?: string }) {
  const description = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchAiresponse = async () => {
    if (!description.current) return;
    if (!title || !price || !category) return toast("Please will other fields first");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/openai`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ title, price: `₹ ${price}`, category }),
      });
      if (response.status === 200) {
        const data = await response.json();
        description.current.value = data.description;
      } else {
        toast(response.statusText);
      }
    } catch (err) {
      toast("opps AI not Responding Try again or Do it your self lazy Bump.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-4 mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Product Details
        </label>
        <div className="flex">
          <input
            ref={description}
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            placeholder="This is top of line jeens with staight fit design"
            required
          />
          <button
            onClick={fetchAiresponse}
            disabled={loading}
            type="button"
            className="bg-purple-600 whitespace-nowrap ml-2 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="animate-spin flex items-center px-4">
                <Loader2Icon />
              </span>
            ) : (
              <span>Ask AI</span>
            )}
          </button>
          <span className="text-xs text-red-500 italic">For description Only*</span>
        </div>
      </div>
    </>
  );
}
