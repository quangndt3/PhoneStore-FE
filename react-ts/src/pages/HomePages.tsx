import React, { createContext, useContext, useEffect, useState } from "react";
import Product from "../components/product";
import Slide from "../components/slide";
import { ICategory, IData, IProduct } from "../models";
import { useLocation, useParams } from "react-router-dom";
import { getAll } from "../api/products";
import { getAllCategories, getOne } from "../api/categories";
import { number } from "joi";


export const skipContext = createContext(2)
const HomePages = () => {
  const [products, setProducts] = useState<IData>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getAll(skip,1).then(({ data }) => {
        
      setProducts(data);

        
    });


  }, [skip]);
  
const getSkip=(skipValue:number):void=>{
  setSkip(skipValue)
}



  // const filterProductsByCategory = (_id) => {
  //   setCurrentCategory(_id);
  //   getOne(_id).then(({ data }) => {
  //     setProducts(data.products);
  //   });
  // };
  const handleToggleFilter = ()=>{
    const mobile_filter = document.querySelector(".mobile-filter")
    const overlay = document.querySelector(".overlay")
    mobile_filter!.classList.toggle("translate-x-[-100%]")
    overlay!.classList.toggle("hidden")
 
  }
  
  return (


    <div className="mt-[145px] max-md:mt-[90px]">
          <div className="my-[100px]">
          <Slide/>
          </div>
          <Product data={products!} setSkipCallBack={getSkip}/>

    </div>

  );
};

export default HomePages;
