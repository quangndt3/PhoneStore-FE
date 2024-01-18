import { IProductColor, ProductColorForm, token } from "../models";
import instance from "./instance";

const  user:token = JSON.parse(localStorage.getItem("user")!)
export const getAllProductColor = () => {
    return instance.get("/colors");
}

export const getOneProductColor = (id:string) => {
    return instance.get("/colors/"+id);
}
export const addProductColor = (productColor: ProductColorForm) => {
    return instance.post("/colors",productColor,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
export const updateProductColor = (productColor: ProductColorForm,id:string) => {
    return instance.patch(`/colors/${id}`,productColor,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
export const removeColor = (id:string) => {

    
    return instance.delete("/colors/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
