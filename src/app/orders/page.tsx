import DisplayOrdersCard from "@/components/DisplayOrdersCard";
import MainNavBar from "@/navbars/MainNavBar";
import React from "react";

export default function Page() {
  return (
    <>
      <MainNavBar />
      <div className="p-10">
        <DisplayOrdersCard />
      </div>
    </>
  );
}
