import React, { createContext, useEffect, useState } from "react";
import Product from "../components/paginate";
import Slide from "../components/slide";
import { ICategory, ICategoryPopulate, IData, IProduct } from "../models";
import { getAll } from "../api/products";
import ListProductSlide from "../components/listProductSlide";
import { getAllCategories } from "../api/categories";
import { AppDispatch, RootState } from "../storage";
import { fetchCategories } from "./slice/categori.slice";
import { useDispatch, useSelector } from 'react-redux'

export const skipContext = createContext(2)
const HomePages = () => {
  
  const { categories, isLoading } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  const handleFetchCate = async () => {
    try {
      const data = await dispatch(fetchCategories()).unwrap()      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchCate()
  },[] );


  return (


    <div className="mt-[145px] max-md:mt-[90px]">
          <div className="mt-[100px]">

          </div>
          {categories.map(category=>{
            if(category.products.length>0){
              return <>
              <h1 className="ml-[160px] text-[#444444] text-[22px] font-bold my-[30px]">{category.name.toUpperCase()}</h1>
          <ListProductSlide products={category.products}></ListProductSlide>
              </>
            }
             
          })}
          
    </div>

  );
};

export default HomePages;
