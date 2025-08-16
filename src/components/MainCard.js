import React from "react";

export default function MainCard({ children, background }) {
  return (
    <div style={{ background: background }} className="mx-3 mt-6  rounded-xl ">
      {children}
    </div>
  );
}
