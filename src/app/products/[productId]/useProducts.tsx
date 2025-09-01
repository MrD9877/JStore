import { ProductSchema, ProductsSchema, ProductType } from "@/@types/product";
import React, { useEffect, useState } from "react";

export default function useProducts(productId: string | undefined | null) {
  const [product, setProduct] = useState<ProductType>();
  const [colors, setColors] = useState<string[]>();
  const [sizes, setSizes] = useState<string[]>();
  useEffect(() => {
    const setSizeAndColor = (variants: ProductType["variants"]) => {
      let colors: string[] = [];
      let sizes: string[] = [];
      variants.forEach((element) => {
        if (!colors.includes(element.color)) {
          colors.push(element.color);
        }
        if (!sizes.includes(element.size)) {
          sizes.push(element.size);
        }
      });
      setColors(colors);
      setSizes(sizes);
    };
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product?productId=${productId}`);
        if (res.status === 200) {
          const data = await res.json();
          const parsedData = await ProductSchema.parseAsync(data);
          setProduct(parsedData);
          setSizeAndColor(parsedData.variants);
        }
      } catch (err) {
        console.log(err);
        console.log("reload");
      }
    };
    fetchProduct();
  }, [productId]);

  return { product, colors, sizes };
}
