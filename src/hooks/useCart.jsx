"use client";
import { goBack } from "@/lib/storeSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const previousState = useRef(null);
  const updateCart = async (state) => {
    try {
      //   await new Promise((res) => {
      //     setTimeout(res, 1000);
      //   });
      //   throw Error();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(state),
      });
      previousState.current = state;
    } catch (err) {
      if (previousState.current) {
        dispatch(goBack(previousState.current));
      }
    }
  };
  useEffect(() => {
    if (!previousState.current) {
      previousState.current = state;
    }
    updateCart(state);
  }, [state]);
  return updateCart;
}
