import LoginPage from "@/components/LoginCard";
import React from "react";

export default function page() {
  return (
    <div className="mt-10">
      <LoginPage welcome={false} link={"/checkout/delivery"} />
    </div>
  );
}
