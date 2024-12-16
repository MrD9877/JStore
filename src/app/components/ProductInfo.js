"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCart } from "@/lib/storeSlice";
import ACTIONS from "@/lib/action";
import ProductBottomNav from "./ProductBottomNav";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function ProductInfo({ productId }) {
  const [product, setProduct] = useState(null);
  const products = useSelector((state) => state.products);
  const testCount = useSelector((state) => state.count);
  const [inCart, setInCart] = useState(false);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();

  const handleChangeCount = (action, item) => {
    if (count === 0 && action === ACTIONS.ADD) {
      dispatch(addToCart({ product: { ...product, selectedColor: color, selectedSize: size } }));
    } else {
      dispatch(editCart({ type: action, product: { ...item, selectedColor: color, selectedSize: size } }));
    }
  };

  const handleSelect = (action, payload) => {
    if (action == ACTIONS.COLOR) {
      setColor(payload);
    }
    if (action == ACTIONS.SIZE) {
      setSize(payload);
    }
  };

  useEffect(() => {
    if (!products || !product) return;
    const contain = products.find((item) => {
      return item.productId === product.productId && item.selectedColor === color && item.selectedSize === size;
    });
    if (contain) {
      setInCart(true);
      setCount(contain.count);
    } else if (!contain) {
      setInCart(false);
      setCount(0);
    }
  }, [products, color, size]);

  useEffect(() => {
    if (!product) return;
    setColor(product.colors[0]);
    setSize(product.size[0]);
  }, [product]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product?productId=${productId}`);
      if (res.status === 200) {
        const data = await res.json();
        setProduct(data);
      }
    } catch {
      consolr.log("reload");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <section style={{ maxWidth: "100vw" }} className="py-10 sm:py-24 relative bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4  sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
            <div className="pro-detail w-full flex flex-col justify-center order-last sm:order-none max-sm:max-w-[608px] max-sm:mx-auto">
              {/* catogory  */}
              <p className="font-medium text-lg text-indigo-600 mb-4"> {product && product.category}</p>
              {/* title  */}
              <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900"> {product && product.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                {/* price  */}
                <h6 className=" font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">₹{product && product.price}</h6>
              </div>
              {/* description  */}
              <p style={{ maxWidth: "100%" }} className="text-gray-500 text-base font-normal mb-8 ">
                {product && product.description}
              </p>
              <div className="block w-full">
                {/* colors  */}
                <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Color</p>
                <div className="text">
                  <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6 ">
                    {product &&
                      product.colors.map((_color) => {
                        return (
                          <button key={_color} data-ui="checked active" onClick={() => handleSelect(ACTIONS.COLOR, _color)} style={_color === color ? { border: "2px solid blue" } : { border: "2px solid black" }} className="p-2.5 border border-black bg-gray-200 rounded-full transition-all duration-300 hover:border-emerald-500 :border-emerald-500">
                            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="20" cy="20" r="20" fill={`${_color}`} />
                            </svg>
                          </button>
                        );
                      })}
                  </div>
                  <div className="block w-full mb-6">
                    <p className="font-medium text-lg leading-8 text-gray-900 mb-4">size</p>
                    {/* size  */}
                    <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-3">
                      {product &&
                        product.size.map((_size) => {
                          return (
                            <button key={_size} onClick={() => handleSelect(ACTIONS.SIZE, _size)} style={_size === size ? { border: "2px solid blue" } : { border: "2px solid gray" }} className="border  text-gray-900 text-lg py-2 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">
                              {_size}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
                    {/* count  */}
                    <div className="flex items-center justify-center w-full">
                      <button onClick={() => handleChangeCount(ACTIONS.SUBTRACT, product)} className="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>
                      <input type="text" className="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full sm:max-w-[118px] border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0" placeholder={count} />
                      <button onClick={() => handleChangeCount(ACTIONS.ADD, product)} className="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    {/* add to cart  */}
                    <ProductBottomNav product={product} inCart={inCart} selectedColor={color} selectedSize={size} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }} className="swiper product-prev mb-6">
                <div className="swiper-wrapper">
                  <Swiper spaceBetween={40} slidesPerView={1}>
                    {product &&
                      product.images.map((src, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div key={index} className="swiper-slide">
                              <img style={{ maxWidth: "90vw", maxHeight: "60vh" }} className="w-auto" src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${src}`} alt={`${product.title}`} />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>
              <div className="swiper product-thumb max-w-[608px] mx-auto">
                <div className="swiper-wrapper flex">
                  {product &&
                    product.imagesUrl.urls.map((src, index) => {
                      if (index > 4) return;
                      return (
                        <div key={index}>
                          <img className="object-scale-down h-32" src={src} alt={`${product.title}`} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
