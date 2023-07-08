import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAddCategory, ICategory, IProductColor, ProductColorForm, ProductColorSchema } from '../../../models';
import { check } from '../../../components/check';
import { addCategory } from '../../../api/categories';
import { addProductColor } from '../../../api/product_color';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


const AddProductColor = () => {
    const [valueInput, setValueInput] = useState<IProductColor>();


    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductColorForm>({
        resolver: yupResolver(ProductColorSchema),
      });
  
      const onsubmit = (data:ProductColorForm) => {

        
        addProductColor(data).then((res) => {
            alert("Thêm màu thành công")
            navigate('/admin/productColors')
          })
          .catch(errors=>{
            console.log(errors);
            
            alert(errors.message)
          })
      }
    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10">
        <div className="container">
            <div className="flex flex-wrap lg:justify-between -mx-4">

                <div className="w-[500px] ml-[350px] px-4">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                    <form onSubmit={handleSubmit(onsubmit)} >
                        <div className="mb-6">
                            <input
                                   {...register("color")}
                                type="text"
                                placeholder="Tên Màu sắc"
                                name="color"

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
                                <p className="text-red-700 text-[10px]">
                    {errors.color && errors.color.message}
                  </p>
                        </div>
                        <div className="mb-6">
                            <input
                                {...register("colorCode")}
                                type="color"
        
                                id='color'
                                className="
                                w-full
                                rounded
                               
                                h-[30px]
      
                                border border-[f0f0f0]
                                "
                                />
                                <p className="text-red-700 text-[10px]">
                    {errors.colorCode && errors.colorCode.message}
                  </p>
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
                            Thêm màu sắc
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

export default AddProductColor