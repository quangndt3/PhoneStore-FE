import React, { createContext, useEffect, useState } from "react";
import Product from "../components/product";
import Slide from "../components/slide";
import { ICategory, IData, IProduct } from "../models";
import { getAll } from "../api/products";


export const skipContext = createContext(2)
const HomePages = () => {
  const [products, setProducts] = useState<IData>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getAll(skip,5 ).then(({ data }) => {
        
      setProducts(data);

        
    });


  }, [skip]);
  useEffect(() => {
    alert("admin account: tk: quangdt3@gmail.com - mk: 123456")
  },[])
  console.log('test');
  
const getSkip=(skipValue:number):void=>{
  setSkip(skipValue)
}

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
