import {  IProductVersion, ProductVersionForm, token } from "../models";
import instance from "./instance";

const  user:token = JSON.parse(localStorage.getItem("user")!)
export const getAllProductVersion = () => {
    return instance.get("/versions");
}
export const getOneProductVersion = (id:string) => {
    return instance.get("/versions/"+id);
}
export const addProductVersion = (productVersion: ProductVersionForm) => {
    return instance.post("/versions",productVersion,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
export const updateProductVersion = (productVersion: ProductVersionForm,id:string) => {
    return instance.patch("/versions/"+id,productVersion,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
export const removeVersion = (id:string) => {

    
    return instance.delete("/versions/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

