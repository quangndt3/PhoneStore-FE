import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { ICategory, IProduct, ProductForm, ProductSchema } from '../../../models'
import { check } from '../../../components/check'
import { getAll, getOne, updateProduct } from '../../../api/products'
import { getAllCategories } from '../../../api/categories'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
// import { updateProduct} from '../../api/product'




const UpdateProduct = () => {

    
    const { id } = useParams()
    const [sanpham, setProduct] = useState<IProduct>()
    const [category,setCategory] = useState<ICategory[]>()
    useEffect(() => {
         getOne(id!).then(({data})=>{
 
          
          for(let i=0;i<data.attributes.length;i++) {
            for(let j=0;j<data.attributes[i].colors.length;j++) {
              data.attributes[i].colors[j].versionName = data.attributes[i].version
            }
          }
            setProduct(data)
         }).catch(err=>{
            alert(err.reponse.data.message)
         })
         getAllCategories().then(({data})=>{
            setCategory(data)
         }).catch(err=>{
            alert(err.response.data.message)
         })
         
    },[])
      
    
  const getOneProduct = async () => {
    const { data } = await getOne(id!);

    return data;
  };
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductForm>({
        resolver: yupResolver(ProductSchema),
        defaultValues: async () => {
            return await getOneProduct();
          },
      });
      
    const onsubmit = async (data:ProductForm) => {
        const imgs = document.querySelectorAll('.img') as NodeListOf<HTMLInputElement>
        const images =[]
    
        
        for(let i=0; i<imgs.length; i++) {
            if(imgs[i].files!.length>0) {
                images.push(await upload(imgs[i].files));

                
            }
            else{
                images.push(sanpham?.images[i])
            }
        }
 

            data.images = images
  
            const inputVersion = document.querySelectorAll(".version") as NodeListOf<HTMLInputElement>
        const inputColor = document.querySelectorAll(".color") as NodeListOf<HTMLInputElement>
        const inputPrice = document.querySelectorAll(".price") as NodeListOf<HTMLInputElement>
        const inputQuantity = document.querySelectorAll(".quantity") as NodeListOf<HTMLInputElement>
        const inputColorCode = document.querySelectorAll(".colorCode") as NodeListOf<HTMLInputElement>
        const attributeArray = []
        for(var i = 0; i < sanpham?.attributes.length; i++){
          const attribute ={
            version:sanpham?.attributes[i].version,
            colors:[]
          }
          for(var j=0; j < inputColor.length; j++){
            if(inputVersion[j].value === sanpham?.attributes[i].version){
              const color={
                colorName:inputColor[j].value,
                price: inputPrice[j].value,
                quantity: inputQuantity[j].value,   
                colorCode: inputColorCode[j].value,              
              }
              attribute.colors.push(color)
            }
          }
          attributeArray.push(attribute)
        }
        data.attributes = []
        data.attributes=attributeArray
        const cate_id = document.querySelector("#cate_id") as HTMLInputElement
        data.categoryId = cate_id.value
        console.log(data);
        
         updateProduct(data,id!).then(() => {

            
            alert("Updated product complete!")
            // navigate('/admin/products');
         }).catch(errors=>{
            console.log(errors);
            
         })
    }   
    
    const upload = async (files: any) => {
        const CLOUD_NAME = "djf42qmp6";
        const PRESET_NAME = "spring2023";
        const FOLDER_NAME = "react";
        const linkanh: object[] = [];
    
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME);
        formData.append("folder", FOLDER_NAME);
    
        for (const file of files) {
          formData.append("file", file);
          const response = await axios
            .post(api, formData, {
              headers: {
                "Content-Type": "multipart/from-data",
              },
            })
            .then((res) => {
              linkanh.push(res.data.secure_url);
            });
        }
    
        return linkanh;
      };

    


    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 w-[1300px]">
        <div className="container ">
            <div className="flex flex-wrap justify-between mx-4 ">
                <div className="w-full  xl:w-[60%] px-4 mx-auto">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg ">
                    <form onSubmit={handleSubmit(onsubmit)} >
                        <div className="mb-6">
                            <h2 className='mb-4'>Tên sản phẩm</h2>
                            <input
                                 {...register("name")}
                                type="text"
                                placeholder="Your Name"
                                name="name"
                    
                                 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <p className="text-red-700 text-[10px]">
                  {errors.name && errors.name.message}
                </p>
                <p className="text-red-700 text-[10px]">
                  {errors.discount && errors.discount.message}
                </p>
                <p className="text-red-700 text-[10px]">
                  {errors.original_price && errors.original_price.message}
                </p>
                <p className="text-red-700 text-[10px]">
                  {errors.description && errors.description.message}
                </p>
                <p className="text-red-700 text-[10px]">
                  {errors.categoryId && errors.categoryId.message}
                </p>
                <h2 className='mb-4'>Giảm giá</h2>
                        <div className="mb-6">
                            <input
                                        {...register("discount")}
                                type="text"
                                name="discount"
                                placeholder="Giảm giá"
             
                                 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <h2 className='mb-4'>Giá sản phẩm</h2>
                        <div className="mb-6">
                            <input
                                        {...register("original_price")}
                                type="text"
                                name="price"
                                placeholder="Giá"
             
                                 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>

                        <h2 className='mb-4'>Ảnh sản phẩm</h2>
                        {sanpham?.images.map(img =>{
                            return(
                                <>
                              
                                <img className='w-[200px] mb-5' src={img} alt="" />
                                <input type="file" className='img w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary'  />
                                </>
                            )
                        })}
                        <h2 className='mb-4'>Tính năng sản phẩm</h2>
                        {sanpham?.specifications.map((item,index)=>{
                          
                            
                            return(
                                <input {...register(`specifications.${index}.value`)} type="text" className='attri w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary' defaultValue={item.value} />
                            )
                        })}

                    <h2 className='mb-4'>Thuộc tính sản phẩm</h2>
                     <div id="containerAttribute">
                     <div className='grid grid-cols-4 mb-3 gap-3'>
                        <div className='font-bold'>Phiên bản</div>
                        <div className='font-bold'>Màu sắc</div>
                        <div className='font-bold'>Giá</div>
                        <div className='font-bold'>Số lượng</div>
                      </div>
                 {sanpham?.attributes.map((item)=>{
                  return item.colors.map((color)=>{
                   
                    
                    return<>
                    <div className='pb-5 border-b-[1px] border-black mb-3'>
            
                      <div className='grid grid-cols-4 gap-3'>
                      <input
                                    
                                    type="hidden"
                                    disabled
                                   value={color.colorCode}
                                    className="
                                    colorCode
                                    "
                                    />
                      <input
                                    
                                    type="text"
                                    placeholder="Phiên bản"
                                    disabled
                                   value={color.versionName}
                                    className="
                                    version
                                    "
                                    />
                      <input
                                    
                                    type="text"
                                   
                                    placeholder="Màu"
                                    
                                    value={color.colorName}
                                    name="color"
                                    className="
                                    color
                                    "
                                    />
                                     <input
                                   defaultValue={color.price}
                                    name='price'
                                    type="text"
                     
                                    placeholder="Giá"
            

                                    className="
                                    price
                                    "
                                    />
                                     <input
                                    defaultValue={color.quantity}
                                    type="text"
                                    name="quantity"
                                    placeholder="Giá"
                    
                              
                                    className="
                                    quantity
                                    "
                                    />
                      </div>
                      
                      </div>
                </>
                  })
                  
              
                 })}
                     </div>
                        
                        <div className="mb-6">
                        <h2 className='mb-4'>Danh mục sản phẩm</h2>
                            <select      id="cate_id" className=' w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary'>
                                
                            {category!?.map(item=>{
                            
                                if(item._id == sanpham?.categoryId._id){
                                
                                  return (
                                    <option selected value={item._id} >{item.name}</option>
                                  )
                                }else{
                                  return(
                                    <option  value={item._id} >{item.name} </option>
                                  )
                                }  
                            })}
                            </select>
                        </div>
                        <h2 className='mb-4'>Miêu tả</h2>
                        <div className="mb-6">
                            <textarea
                                  {...register("description")}
                                name="descripton"  
                     
                                 
                                placeholder="Miêu tả"
                                className="

                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                resize-none
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="
                                w-full

                                bg-primary
                                rounded
                                border border-primary
                                p-3
                                transition
                                hover:bg-opacity-90
                                "
                                >
                            Sửa sản phẩm
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </section>

    )
}

export default UpdateProduct