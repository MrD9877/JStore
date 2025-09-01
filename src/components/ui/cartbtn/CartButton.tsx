import { ShoppingCart } from "lucide-react";
import React from "react";
import "./cartstyle.css";

export default function CartButton({ count, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { count: number | undefined }) {
  return (
    <aside {...props} className={`cart w-fit h-fit ${props.className}`}>
      <div className="btn-cart-wrapper ">
        <button className="btn-cart">
          <ShoppingCart />
        </button>
        <div className="count">{count}</div>
      </div>
    </aside>
  );
}
