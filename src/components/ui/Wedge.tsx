import { X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

function getReadableBg(color: string): string {
  // Create a temporary element to let the browser parse the color
  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);

  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);

  // rgb will look like: "rgb(0, 0, 255)"
  const match = rgb.match(/\d+/g);
  if (!match) return "#f9fafb"; // fallback

  const [r, g, b] = match.map(Number);

  // Brightness check (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "black" : "#4b5563";
  // light text → dark bg, dark text → light bg
}
type WedgeType = {
  item: { stock: number; color: string; size: string };
  setVariants: Dispatch<
    SetStateAction<
      {
        stock: number;
        color: string;
        size: string;
      }[]
    >
  >;
};

export default function Wedge({ item, setVariants }: WedgeType) {
  const handleRemove = () => {
    setVariants((pre) => {
      const removed = pre.filter((i) => i.color !== item.color && i.size !== item.size);
      return removed;
    });
  };
  return (
    <span style={{ background: getReadableBg(item.color) }} className="flex text-white bg-gray-600 w-fit px-2 items-center gap-3 rounded-xl ">
      <span style={{ color: item.color }}>{`(${item.color} ${item.size})*${item.stock}`}</span>
      <X width={14} height={14} onClick={handleRemove} />
    </span>
  );
}
