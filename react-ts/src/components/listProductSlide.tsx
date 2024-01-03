import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper';
import { IData, IProduct } from '../models';
import formatprice from '../sub';
import { useNavigate } from 'react-router-dom';
type Iprops={
    products:IProduct[]
}
export default function ListProductSlide({products}:Iprops) {
    const navigate = useNavigate();
    const onNavigate = (id:string) => {
        navigate(`/products/${id}`)
      }
  
    return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
     
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            
          }}
          
        modules={[Pagination,Autoplay]}
        className="grid xl:grid-cols-4 lg:grid-cols-4 max-lg:grid-cols-3  gap-5   max-sm:gap-2 max-w-[1200px] lg:m-auto  max-sm:grid-cols-2 max-sm:px-[10px] max-xl:px-[20px] 2xl:grid-cols-5 pl-[10px]"
      >
        {products.map((item) => {
          let discount = 100 - item.discount
          discount = Number("0"+ "." + discount)

          console.log(item);
          
          return<>
           <SwiperSlide className="p-[20px] max-sm:p-[10px] relative border rounded-xl cursor-pointer  shadow-md hover:shadow-xl">
           <a   onClick={() => onNavigate(item._id)}>
               {item.discount>0&& <div className="p-[5px] font-medium absolute top-[10px] left-[-5px]  text-white bg-red-500 leading-4  text-[14px] rounded-r-[3px]">
              Giảm {item.discount}%
              <div className="after:content-[''] filter: brightness-[60%] border-t-[7px] border-t-[#E01020]  border-l-[7px] border-l-transparent absolute left-[0px] bottom-[-6px]">

              </div>
            </div>}
          <img
            alt="Art"
            src={item.images?.[0]}
            className=""
          />
      
          <h4 className="text-[14px] font-bold max-lg:text-[12px]">{item.name} {item.attributes[0].version_id?.version}</h4>
          <div className="flex justify-between max-lg:flex-wrap" >
            {item.discount>0?<p className="font-bold text-red-500 text-[16px] max-sm:text-[13px]">{formatprice(Math.ceil((item.original_price+Number(item.attributes[0].colors[0].price))*discount))}</p>:<p className="font-bold text-red-500 text-[16px] max-sm:text-[13px]">{formatprice(item.original_price+Number(item.attributes[0].colors[0].price))}</p>}
            {item.discount>0&&<p className="text-[14px] leading-7 text-[#707070] max-sm:text-[11px] line-through">{formatprice(item.original_price + Number(item.attributes[0].colors[0].price))}</p>}
          </div>
    
        </a>
        </SwiperSlide>
          </>
        })}
      </Swiper>
    </>
  );
}
