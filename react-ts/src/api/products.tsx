import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IProduct, ProductForm, token } from "../models";


    const  user:token = JSON.parse(localStorage.getItem("user")!)

export const getOne = (id:string) => {
    return instance.get("/products/" + id);
}
export const getAll = (skip:number,limit:number) => {

    
    return instance.get(`/products?skip=${skip}&limit=${limit}`);
}
export const getAll_no = () => {

    
    return instance.get(`/product`);
}
export const remove = (id:string) => {

    
    return instance.delete("/products/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const addProduct = (newProduct:ProductForm) => {

    console.log(newProduct);
    
    return instance.post("/products",  newProduct,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const updateProduct = (newProduct:ProductForm,id:string) => {

    
    return instance.patch("/products/"+ id,  newProduct,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const getProductByName = (skip:number,limit:number,name:string|null,order:string|undefined) => {
    return instance.get(`/filterProduct?skip=${skip}&limit=${limit}&name=${name}&order=${order}`)
    }




