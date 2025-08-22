import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ProductImageDisplay({ images }: { images: string[] }) {
  return (
    <div>
      <div style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" } as React.CSSProperties} className="swiper product-prev mb-6">
        <div className="swiper-wrapper">
          <Swiper spaceBetween={40} slidesPerView={1}>
            {images.map((src, index) => {
              return (
                <SwiperSlide key={index}>
                  <div key={index} className="swiper-slide">
                    <img style={{ maxWidth: "90vw", maxHeight: "60vh" }} className="w-auto" src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${src}`} alt="product image" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="swiper product-thumb max-w-[608px] mx-auto">
        <div className="swiper-wrapper flex">
          {images.map((src, index) => {
            if (index > 4) return;
            return (
              <div key={index}>
                <img className="object-scale-down h-32" src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${src}`} alt="product image" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
