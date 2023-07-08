import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slide() {
   const prev =  document.querySelector(".swiper-button-prev")
   prev?.classList.add("max-sm:hidden")

   const next =  document.querySelector(".swiper-button-next")
   next?.classList.add("max-sm:hidden")
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-w-[1200px] m-auto lg:m-auto z-0 max-md:h-[200px] max-sm:mx-[10px] max-xl:mx-[20px]"
      >

          <SwiperSlide ><img className="h-full w-full" src="https://shopdunk.com/images/uploaded/PC13.png" alt="" /></SwiperSlide>
          <SwiperSlide ><img  className="h-full w-full" src="https://shopdunk.com/images/uploaded/banner/Banner%20Th%C3%A1ng%2005%202023/banner%20mac2-19.jpeg" alt="" /></SwiperSlide>
          <SwiperSlide ><img  className="h-full w-full" src="https://shopdunk.com/images/uploaded/ipadPC6.png" alt="" /></SwiperSlide>
          <SwiperSlide ><img  className="h-full w-full" src="https://shopdunk.com/images/uploaded/PC661.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}