import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAddCategory, ICategory, IProductColor, ProductColorForm, ProductColorSchema, ProductVersionForm, ProductVersionSchema } from '../../../models';
import { check } from '../../../components/check';
import { addCategory } from '../../../api/categories';
import { addProductColor } from '../../../api/product_color';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addProductVersion } from '../../../api/product_version';
import { toast } from 'react-toastify';


const AddProductVersion = () => {    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductVersionForm>({
        resolver: yupResolver(ProductVersionSchema),
      });
  
      const onsubmit = async (data:ProductVersionForm) => {

        
        addProductVersion(data).then((res) => {
            alert("Thêm phiên bản thành công")
            navigate('/admin/productVersions')
          })
          .catch(errors=>{            
            console.log(errors)
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
                                   {...register("version")}
                                type="text"
                                placeholder="Phiên bản"
                                name="version"

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
                    {errors.version && errors.version.message}
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
                            Thêm phiên bản
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

export default AddProductVersion