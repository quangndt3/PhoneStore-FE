import { IProductColor, ProductColorForm } from "../models";
import instance from "./instance";


export const getAllProductColor = () => {
    return instance.get("/colors");
}

export const addProductColor = (productColor: ProductColorForm) => {
    return instance.post("/colors",productColor);
}
export const updateProductColor = (productColor: ProductColorForm,id:string) => {
    return instance.post(`/colors/${id}`,productColor);
}