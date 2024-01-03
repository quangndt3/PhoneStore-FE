import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IAddCategory, ICategory, IOrder, OrderForm, token } from "../models";




export const addOrder = async (order:OrderForm) => {
    const res =  await instance.post("/order", order);
    
    return res.data
}
export const getAllOrder = async () => {
    const res =  await instance.get("/order/");
    
    return res.data.data
}
export const getOneOrder = async (id:string) => {
    const res =  await instance.get("/order/"+id);
    
    return res.data.data
}
export const getDetailOrder = async (id:string) => {
    const res =  await instance.get("/orderDetail/"+id);
    console.log( res.data.data);
    
    return res.data.data
}
export const updateOrder = async (newStatus:any,id:string) => {
    const res =  await instance.patch("/order/"+id, newStatus);
    
    return res.data
}