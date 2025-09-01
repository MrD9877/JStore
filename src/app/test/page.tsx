"use client";
import { ShoppingCart } from "lucide-react";

export default function page() {
  return (
    <>
      <aside className={`cart w-fit h-fit`}>
        <div className="btn-cart-wrapper ">
          <button className="btn-cart">
            <ShoppingCart />
          </button>
          <div className="count">3</div>
        </div>
      </aside>
    </>
  );
}
