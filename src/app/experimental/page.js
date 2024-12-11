"use client";
import React, { useEffect, useRef } from "react";

export default function page() {
  const inputRef = useRef();
  const divRef = useRef();

  const handler = () => {
    console.log(inputRef.current);
    console.log(divRef.current);
  };

  return (
    <div ref={divRef}>
      <input ref={inputRef} type="text" />
      <button onClick={handler}>Click</button>
    </div>
  );
}
