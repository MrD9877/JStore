import { CartItemsType, ProductType } from "@/@types/product";
import ACTIONS, { ActionType } from "@/lib/action";
import React, { useEffect, useState } from "react";

export default function useProductDetails({ products, product }: { products: CartItemsType[] | undefined | null; product: ProductType | undefined }) {
  const [inCart, setInCart] = useState(false);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  const [outOfStock, setOutOfStock] = useState(false);
  const [sku, setSku] = useState<string>();

  useEffect(() => {
    if (!products || !product) return;
    const selectedVariant = product.variants.find((item) => item.color === color && item.size === size);
    if (!selectedVariant) return setOutOfStock(true);
    setSku(selectedVariant.sku);
    const contain = products.find((item) => {
      return item.variant.sku === selectedVariant.sku;
    });
    if (contain) {
      setInCart(true);
      setCount(contain.variant.quantity);
    } else if (!contain) {
      setInCart(false);
      setCount(0);
    }
  }, [products, color, size]);

  useEffect(() => {
    if (!product) return;
    setColor(product.variants[0].color);
    setSize(product.variants[0].size);
  }, [product]);

  const handleSelect = (action: ActionType, payload: string) => {
    if (action == ACTIONS.COLOR) {
      setColor(payload);
    }
    if (action == ACTIONS.SIZE) {
      setSize(payload);
    }
  };

  return { color, size, outOfStock, count, inCart, sku, handleSelect };
}
