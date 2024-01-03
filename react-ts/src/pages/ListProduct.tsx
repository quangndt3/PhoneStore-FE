import React, { useContext, useEffect, useState } from "react";
import { ICategory, IData, IProduct } from "../models";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  filterProduct, getAll, getProductByName } from "../api/products";
import { getAllCategories, getOne } from "../api/categories";
import {  FaSortAmountDownAlt,FaSortAmountDown } from "react-icons/fa";

import { Items, Product } from "../components/paginate";
import formatprice from "../sub";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../storage";
import { fetchProducts } from "./slice/product.slice";
import { fetchCategories } from "./slice/categori.slice";

const ListProduct=()=>{  
      // const [products, setProducts] = useState<IData>();
      const [tempData, settempData] = useState<IData>();
      // const [categories, setCategories] = useState<ICategory[]>([]);
      const [cateState, setcateState] = useState<string|"">("");
      const [currentOrder, setCurrentOrder] = useState("");
      const [price,setPrice] = useState<number>(0)
      const test = useLocation().search
      const name =  undefined;
      const order =  new URLSearchParams(test).get('order')?new URLSearchParams(test).get('order'):"";
      const [skip, setSkip] = useState(0);
      const navigate = useNavigate()  


      const { products } = useSelector((state: RootState) => state.products)
      
      const { categories, isLoading } = useSelector((state: RootState) => state.categories)
      const dispatch = useDispatch<AppDispatch>()

      const handleFetchCate = async () => {
        try {
          const data = await dispatch(fetchCategories()).unwrap()      
        } catch (err) {
          console.log(err);
        }
      }

      const handleFetchProduct = async () => {
        try {
          const temp={
            skip:skip,
            limit: 8,
            cateState:cateState,
            currentOrder: currentOrder,
            price:price,
          }
          const data = await dispatch(fetchProducts(temp)).unwrap()      
          console.log(data);
          
        } catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
        
        handleFetchProduct()
        handleFetchCate()
      }, [cateState,skip,currentOrder,price]);
    console.log("re");
    
      const getSkip=(skipValue:number):void=>{
        setSkip(skipValue)
      }
      const noOder=()=>{
        setCurrentOrder("")
      }
      const orderProductByAsc=(order:string)=>{

        setCurrentOrder(order)
      }
      const orderProductByDesc=(order:string)=>{
        setCurrentOrder(order)
      }
      const changePrice = (e) =>{
        setSkip(0)
        setPrice(e.target.value)
      }
      
      const changeProductByCategory=(categoryId:string,index)=>{
        
      setcateState(categoryId)
      const cate = document.querySelectorAll(".cate") 
      for(let i=0; i<cate.length; i++){
        cate[i].style.border = ""
      }
      cate[index].style.border = "1px solid red"
      }
      return (
    
        <div className="mt-[145px] max-md:mt-[90px] flex justify-between">   
                <div className="ml-[160px]">
                  <h2 className="font-bold text-[20px]">Sắp xếp theo</h2>
                  <div className="flex gap-3 my-[15px]">
                    <button style={{border: currentOrder==""?"solid red 1px":""}} onClick={()=>{noOder()}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg ">Liên quan</button>
                    <button  style={{border: currentOrder=="desc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg border-red-500 flex" onClick={()=>{orderProductByDesc("desc")}}><FaSortAmountDown className="my-auto mx-[4px]" />Giá cao</button>
                    <button  style={{border: currentOrder=="asc"?"solid red 1px":""}} className="bg-[#F3F3F3] text-[14px] px-[10px] py-[4px] rounded-lg border-red-500 flex"  onClick={()=>{orderProductByAsc("asc")}}><FaSortAmountDownAlt className="my-auto mx-[4px]" />Giá Thấp</button>
                  </div>
                  <h2 className="font-bold text-[20px]">Danh mục</h2>
                  <div className="flex gap-3 my-[15px] flex-wrap">
                  <button  className="cate bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg " onClick={()=>changeProductByCategory("",0)}>Tất cả</button>
                    {categories.map((category,index)=>{
                        return <>
                        <button  className="cate bg-[#F3F3F3] text-[14px] px-[10px] py-[4px]  rounded-lg " onClick={()=>changeProductByCategory(category._id,index+1)}>{category.name}</button>
                        </>
                    })}
                  </div>
                  <h2 className="font-bold text-[20px]">Mức giá</h2>
                  <div className="flex items-center mb-4">
    <input  id="all" name="price" type="radio" value="0" onClick={changePrice} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="all" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
</div>
                  <div className="flex items-center mb-4">
    <input id="5tr" name="price" type="radio" value="5000000" onClick={changePrice} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="5tr" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trên {formatprice(5000000)}</label>
</div>
<div className="flex items-center mb-4">
    <input id="10tr" name="price" type="radio" value="10000000" onClick={changePrice} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="10tr" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trên {formatprice(10000000)}</label>
</div>
<div className="flex items-center mb-4">
    <input id="15tr" name="price" type="radio" value="15000000" onClick={changePrice} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="15tr" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trên {formatprice(15000000)}</label>
</div>
<div className="flex items-center mb-4">
    <input id="20tr" name="price" type="radio" value="20000000" onClick={changePrice} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="20tr" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trên {formatprice(20000000)}</label>
</div>
                </div>
                
                <div className="">
                <div className="md:flex  items-start ">   
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 max-lg:grid-cols-3  gap-5   max-sm:gap-2 max-w-[1200px] lg:m-auto  max-sm:grid-cols-2 max-sm:px-[10px] max-xl:px-[20px] 2xl:grid-cols-4 pt-[10px] px-[70px]">
        <Items data={products} />
       
    </div>

         </div>
         <Product data={products}  setSkipCallBack={getSkip}/>
                

                </div>
        </div>
        
      );
    };
    
export default ListProduct