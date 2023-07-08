import React, { useContext, useEffect, useState } from "react";
import Product from "../components/product";
import Slide from "../components/slide";
import { ICategory, IData, IProduct } from "../models";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  getProductByName } from "../api/products";
import { getAllCategories, getOne } from "../api/categories";
import { FaAccessibleIcon ,FaSortAmountDownAlt,FaSortAmountDown } from "react-icons/fa";

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
    getProductByName(skip,1,name,order).then(({ data }) => {      
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
  return (

    <div className="mt-[145px] max-md:mt-[90px] ">   
            <h1 className="text-[#707070]  text-center">Tìm thấy <span className="font-bold">{products?.TotalProducts} </span> cho từ khoá '{name}'</h1>
            <div className="ml-[160px]">
              <h2 className="font-bold text-[20px]">Sắp xếp theo</h2>
              <div className="flex gap-3 my-[15px]">
                <button style={{border: currentOrder=="lienquan"?"solid red 1px":""}} onClick={()=>{noOder()}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg ">Liên quan</button>
                <button  style={{border: currentOrder=="desc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg border-red-500 flex" onClick={()=>{orderProductByDesc("desc")}}><FaSortAmountDown className="my-auto mx-[4px]" />Giá cao</button>
                <button  style={{border: currentOrder=="asc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px] rounded-lg border-red-500 flex"  onClick={()=>{orderProductByAsc("asc")}}><FaSortAmountDownAlt className="my-auto mx-[4px]" />Giá Thấp</button>
              </div>
            </div>
            <Product data={products} setSkipCallBack={getSkip}/>
    </div>
    
  );
};

export default Search;
