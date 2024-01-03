import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
interface Props{
    images:string[]
}
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

export default function ProductThumbs({images}:Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null) 

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#3E3A38',
          '--swiper-pagination-color': '#3E3A38',
        
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2  w-full"
      >
        {images?.map(image=>{
            return<>
             <SwiperSlide>
          <img className='max-lg:m-auto w-full' src={image} />
        </SwiperSlide>
            </>
        })}
       
        

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mb-[2px]  "
      >
    {images?.map(image=>{
            return<>
             <SwiperSlide>
          <img className='border-[1px] w-[100px] max-sm:w-[70px] m-auto border-[#cccccc] rounded-xl cursor-pointer' src={image} />
        </SwiperSlide>
            </>
        })}
        
      </Swiper>
    </>
  );
}