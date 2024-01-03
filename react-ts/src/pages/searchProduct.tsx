import React, {  useEffect, useState } from "react";
import { ICategory, IData } from "../models";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  getProductByName } from "../api/products";
import { getAllCategories,  } from "../api/categories";
import {  FaSortAmountDownAlt,FaSortAmountDown } from "react-icons/fa";
import { Items, Product } from "../components/paginate";

const Search = () => {
  const [products, setProducts] = useState<IData>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentOrder, setCurrentOrder] = useState("lienquan");
  const test = useLocation().search
  const name =  new URLSearchParams(test).get('name');
  const order =  new URLSearchParams(test).get('order')?new URLSearchParams(test).get('order'):"";
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate()  
  useEffect(() => {
    getProductByName(skip,8,name,order).then(({ data }) => {      
      setProducts(data);
    });
    getAllCategories().then(({ data }) => {
      setCategories(data);
    });
  }, [name,skip,order]);

  const getSkip=(skipValue:number):void=>{
    setSkip(skipValue)
  }
  const noOder=()=>{
    navigate(`/search?name=${name}`)
    setCurrentOrder("lienquan")
  }
  const orderProductByAsc=(order:string)=>{
    navigate(`/search?name=${name}&order=${order}`)
    setCurrentOrder(order)
  }
  const orderProductByDesc=(order:string)=>{
    navigate(`/search?name=${name}&order=${order}`)
    setCurrentOrder(order)
  }
  console.log(products);
  
  return (

    <div className="mt-[145px] max-md:mt-[90px] ">   
            <h1 className="text-[#707070]  text-center">Tìm thấy <span className="font-bold">{products?.TotalProducts} </span> kết quả cho từ khoá '<span  className="font-bold">{name}</span>'</h1>
            <div className="ml-[160px]">
              <h2 className="font-bold text-[20px]">Sắp xếp theo</h2>
              <div className="flex gap-3 my-[15px]">
                <button style={{border: currentOrder=="lienquan"?"solid red 1px":""}} onClick={()=>{noOder()}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg ">Liên quan</button>
                <button  style={{border: currentOrder=="desc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg border-red-500 flex" onClick={()=>{orderProductByDesc("desc")}}><FaSortAmountDown className="my-auto mx-[4px]" />Giá cao</button>
                <button  style={{border: currentOrder=="asc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px] rounded-lg border-red-500 flex"  onClick={()=>{orderProductByAsc("asc")}}><FaSortAmountDownAlt className="my-auto mx-[4px]" />Giá Thấp</button>
              </div>
            </div>
            <div className="">
                <div className="md:flex  items-start ">   
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 max-lg:grid-cols-3  gap-5   max-sm:gap-2 max-w-[1200px] lg:m-auto  max-sm:grid-cols-2 max-sm:px-[10px] max-xl:px-[20px] 2xl:grid-cols-4 pt-[10px] px-[70px]">
       {products?.results!?.length>0 && <Items data={products} />}
       {products?.results?.length==0 && <div className="w-full text-center col-span-4"><img src="https://cdn2.cellphones.com.vn/x,webp/media/wysiwyg/empty-search.png" className="mb-[10px]" alt="" /><h1 className="text-[#4A4A4A4A ] font-bold">Không có kết quả bạn cần tìm</h1></div> }
    </div>

         </div>
         <Product data={products}  setSkipCallBack={getSkip}/>
    </div>
    </div>
  );
};

export default Search;
