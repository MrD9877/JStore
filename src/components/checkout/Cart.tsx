/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ContainerCard, Header, Para } from "./CheckOutCard";
import { useSelector } from "react-redux";

export interface Product {
  productId: string; // custom product identifier
  title: string;
  description: string;
  category: string;
  colors: string[];
  size: string[];
  selectedColor?: string; // optional, because not always selected
  selectedSize?: string; // optional
  images: string[];
  price: number;
  stock: number;
  count?: number; // optional if not always present
  date: string; // ISO date string
}

export default function Cart() {
  const products = useSelector((state: { products: Product[] }) => state.products);
  return (
    <ContainerCard>
      <div className="max-h-[50vh] overflow-y-scroll style-1">
        <div>
          <Header>Cart</Header>
          {products?.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-5 h-10 md:h-15 overflow-hidden gap-4 text-nowrap my-2">
                  <div className="w-10 h-10 md:h-14 md:w-14">
                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${item.images[0]}`} alt="" className="object-contain h-full w-full" />
                  </div>
                  <span className="overflow-scroll style-2 w-full col-span-3 flex items-center">
                    <Para>{item.title}</Para>
                  </span>
                  <span className="col-start-5 flex items-center">
                    <Para>₹ {Math.floor(item.price * 1000) / 100}</Para>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerCard>
  );
}
