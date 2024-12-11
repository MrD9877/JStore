"use client";

import { useEffect } from "react";

export default function OutSideAlart({ setInside, inside }) {
  const handler = (e) => {
    const itemClicked = e.target;
    inside.current.contains(itemClicked) ? setInside(true) : setInside(false);
  };
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return <></>;
}
