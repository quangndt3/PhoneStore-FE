import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IData, IProduct } from '../../../models'

import { getAll, remove } from '../../../api/products'
import ProductAmin from '../../../components/product_Admin'
import notify from '../../../components/notify'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../storage'
import { fetchProducts, fetchProductsAll, removeProducts } from '../../slice/product.slice'
const AdminProduct = () => {

  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
    const handleDeleteProduct = async (id:string) => {
      const confirm = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không ?')
      if(confirm){
      try {
        await dispatch(removeProducts(id!)).unwrap()
        handleFetchProduct()
        notify("success","Xoá sản phẩm thành công")
      } catch (error) {
        alert(error)
      }
      }

      
    }
  
    

    // const [products, setProducts] = useState<IData>();
  const [skip, setSkip] = useState(0);
  const handleFetchProduct = async () => {
    try {
      const temp = {
        skip: skip,
        limit: 5,
      }
      const data = await dispatch(fetchProductsAll(temp)).unwrap()      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchProduct()
  }, [skip]);

  
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


    <div className=" max-md:mt-[90px]">
          <div className="my-[50px]">
   
          </div>
          <ProductAmin data={products!} setSkipCallBack={getSkip} deleteProduct={handleDeleteProduct}/>

    
    </div>

  );
}

export default AdminProduct