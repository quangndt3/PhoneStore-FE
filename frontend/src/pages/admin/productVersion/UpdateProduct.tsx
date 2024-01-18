import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAddCategory, ICategory, IProductColor, ProductColorForm, ProductColorSchema, ProductVersionForm, ProductVersionSchema } from '../../../models';
import { getOneProductColor, updateProductColor } from '../../../api/product_color';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getOneProductVersion, updateProductVersion } from '../../../api/product_version';


const UpdateProductVersion = () => {
    const { id } = useParams()

    const getOne = async () => {
        const { data } = await  getOneProductVersion(id!);
        data.data._id = undefined
        data.data.createdAt = undefined
        data.data.updatedAt = undefined
        console.log(data.data);
        
        return data.data;
      };
    const navigate = useNavigate();
     
    const onsubmit = (data:ProductVersionForm) => {        
        updateProductVersion(data,id!).then((res) => {

            
            alert("Cập nhật phiên bản công")
            navigate('/admin/productVersions')
          })
          .catch(errors=>{
            alert(errors.message)
          })
      }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductVersionForm>({
        resolver: yupResolver(ProductVersionSchema),
        defaultValues: async ()=>{
            return await getOne()
        }
      });
      
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
                                placeholder="Tên phiên bản"
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
                            Cập nhật phiên bản
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

export default UpdateProductVersion