"use client";
import { setCart } from "@/lib/storeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const { products } = useSelector((state) => ({ products: state.products }));
  const dispatch = useDispatch();

  const updateCart = async (products) => {
    if (!products) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(products),
      });
    } catch (err) {
      console.log("error in saving cart items");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { credentials: "include" });
      const data = await res.json();
      if (data) {
        console.log(data);
        dispatch(setCart({ products: data }));
      } else {
        throw Error("no Data found in cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (products) {
      updateCart(products);
    }
  }, [products]);

  return {};
}
