/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ContainerCard, Header, Para } from "./CheckOutCard";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { CartItemsType } from "@/@types/product";

export default function Cart() {
  const products = useSelector((state: { products: CartItemsType[] }) => state.products);
  if (!products)
    return (
      <div className="w-full max-h-[50vh] ">
        <Loading height="50%" />
      </div>
    );
  return (
    <ContainerCard>
      <div className="max-h-[50vh] overflow-y-scroll style-1">
        <div>
          <Header>Cart</Header>
          {products &&
            products.map((item, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-5 h-10 md:h-15 overflow-hidden gap-4 text-nowrap my-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 md:h-14 md:w-14 ">
                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${item.image}`} alt="" className="object-contain h-full w-[80%]" />
                      </div>
                      <span className="flex items-center">
                        <Para>x {item.variant.quantity}</Para>
                      </span>
                    </div>

                    <span className="overflow-scroll style-2 w-full col-span-3 flex items-center">
                      <Para>{item.title}</Para>
                    </span>
                    <span className="col-start-5 flex items-center">
                      <Para>₹ {item.price}</Para>
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
