import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IAddCategory, ICategory, token } from "../models";



const  user:token = JSON.parse(localStorage.getItem("user")!)
export const getAllCategories = () => {
    return instance.get("/categories");
}

export const getOne = (id:string) => {
    return instance.get("/categories/" + id);
}

export const RemoveCategories = (id:string) => {
    
    return instance.delete("/categories/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const addCategory = (newCategory:IAddCategory) => {
    
    return instance.post("/categories",newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}


export const updateCategory = (newCategory:ICategory) => {
    
    return instance.patch("/categories/"+ newCategory._id,  newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}