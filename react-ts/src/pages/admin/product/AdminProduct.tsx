import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IData, IProduct } from '../../../models'
import   formatprice  from '../../../sub'
import { check } from '../../../components/check'
import { getAll, remove } from '../../../api/products'
import ProductAmin from '../../../components/product_Admin'
const AdminProduct = () => {


    const handleDeleteProduct = (id:string) => {
      const confirm = window.confirm('Are you sure you want to delete this product')
      if(confirm){
        remove(id).then(()=>{
          alert("Xoá sản phẩm thành công")
          getAll(skip,1).then(({data})=>{
      
            
            setProducts(data)
          })
      }).catch(err=>{
          alert(err.response.data.message)
          console.log(err);
          
      })
      }

      
    }
  
    

    const [products, setProducts] = useState<IData>();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getAll(skip,1).then(({ data }) => {
        
      setProducts(data);

        
    });


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


    <div className="mt-[145px] max-md:mt-[90px]">
          <div className="my-[100px]">
   
          </div>
          <ProductAmin data={products!} setSkipCallBack={getSkip} deleteProduct={handleDeleteProduct}/>

    
    </div>

  );
}

export default AdminProduct