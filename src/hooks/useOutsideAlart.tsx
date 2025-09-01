"use client";

import { useEffect, useRef, useState } from "react";

export default function useOutsideAlert(intial?: boolean) {
  const [isInside, setisInside] = useState(intial || false);
  const inside = useRef<HTMLDivElement>(null);

  const handler = (e: PointerEvent) => {
    const itemClicked = e.target as Node;
    if (!inside.current) return;
    inside.current.contains(itemClicked) ? setisInside(true) : setisInside(false);
  };
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return [isInside, setisInside, inside] as const;
}
