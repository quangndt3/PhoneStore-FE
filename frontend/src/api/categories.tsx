import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IAddCategory, ICategory, token } from "../models";



const  user:token = JSON.parse(localStorage.getItem("user")!)
export const getAllCategories = async () => {
    const res =  await instance.get("/categories");
    
    return res.data
}

export const getOne = (id:string) => {
    return instance.get("/categories/" + id);
}

export const RemoveCategories = async (id:string) => {
    
    const res = await instance.delete("/categories/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
      
    });
    return res.data
}

export const addCategory = async (newCategory:IAddCategory) => {
    
    const res = await  instance.post("/categories",newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
    return res.data
}


export const updateCategory = async (newCategory:ICategory) => {
    console.log(newCategory);
    
    const res = await instance.patch("/categories/"+ newCategory._id,  newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
    return res.data
}