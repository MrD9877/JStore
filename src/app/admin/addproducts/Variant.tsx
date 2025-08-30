import { VarityInput } from "./UI";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Wedge from "@/components/ui/Wedge";
import useToast from "@/hooks/useToast";
function VarityForm({
  setIsOpen,
  setVariants,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setVariants: Dispatch<
    SetStateAction<
      {
        stock: number;
        color: string;
        size: string;
      }[]
    >
  >;
}) {
  const [stock, setStock] = useState<number>();
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  const toast = useToast();
  function handleSave() {
    if (!stock || !color || !size) {
      return toast("Please Fill all fields");
    }

    setVariants((pre) => {
      if (pre.length == 0) {
        return [{ stock, color, size }];
      }
      const dublicate = pre.find((item) => item.color === color);
      if (dublicate?.size === size) {
        toast(`This variable size:${size} color:${color} already saved`);
        return pre;
      }
      return [...pre, { stock, color, size }];
    });
  }

  return (
    <div className="flex justify-center items-center fixed z-10 top-0 left-0 mx-auto h-full w-full  ">
      <div className="flex h-fit w-fit bg-black/85 px-10 py-10 rounded-xl">
        <div className="flex flex-col gap-4 justify-center">
          <VarityInput
            name="stock"
            id="stock"
            type="number"
            aria-controls="false"
            value={stock || ""}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <VarityInput name="color" id="color" value={color || ""} onChange={(e) => setColor(e.target.value)} />
          <VarityInput name="size" id="size" value={size || ""} onChange={(e) => setSize(e.target.value)} />
          <div className="w-full grid grid-cols-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 whitespace-nowrap ml-2 h-fit text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 "
            >
              <span>Done</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-purple-600 whitespace-nowrap ml-2 h-fit text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-purple-700 "
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type VariantState = {
  stock: number;
  color: string;
  size: string;
};

export default function AddVarity({ variants, setVariants }: { variants: VariantState[]; setVariants: Dispatch<SetStateAction<VariantState[]>> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full gap-4 sm:items-end flex-col sm:flex-row">
      <div className="max-w-[80%] px-4">
        <label htmlFor={"variants"} className="block text-sm font-medium text-gray-700">
          Variants :
        </label>
        <div className="flex pr-2.5 rounded-lg max-w-full overflow-x-scroll">
          <span
            id="variants"
            className="bg-gray-50 border h-8 w-fit  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1.5 "
          >
            {variants && variants.length === 0 ? (
              <span className="text-gray-400 text-xs overflow-hidden w-full h-fit">Please Add Atleast one variant</span>
            ) : (
              <div className="flex gap-3 w-full text-nowrap overflow-x-scroll">
                {variants.map((item, index) => {
                  return (
                    <span key={index} className="">
                      <Wedge item={item} setVariants={setVariants} />
                    </span>
                  );
                })}
              </div>
            )}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 whitespace-nowrap ml-2 h-fit text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>Add a variant</span>
      </button>
      {isOpen && <VarityForm setIsOpen={setIsOpen} setVariants={setVariants} />}
    </div>
  );
}
