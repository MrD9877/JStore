"use client";
import DisplayItemsCard from "@/app/components/DisplayItemsCard";
import Loading from "@/app/components/Loading";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { results } from "../../../product";
import SearchBar from "@/app/_navbars/SearchBar";

export default function page() {
  return (
    <>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="absolute h-screen disableTouchSelect">
        {loading ? (
          <Loading height="30vh" width="100vw" />
        ) : searchResult ? (
          <div className="w-screen h-72 overflow-scroll">
            <DisplayItemsCard array={searchResult} />
          </div>
        ) : (
          <Loading height="30vh" width="100vw" />
        )}
      </div>
    </>
  );
}
