"use client";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./Store";

export default function StoreProvider({ children }: { children: React.ReactElement }) {
  return <Provider store={makeStore}>{children}</Provider>;
}
