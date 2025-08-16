import LoginPage from "@/components/LoginCard";
import React from "react";

export default function page() {
  return (
    <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOSTED_URL}/images/bgImage.jpg)` }} className="flex align-middle h-screen">
      <LoginPage />
    </div>
  );
}
