import { useActionData } from "react-router-dom";
import instance from "./instance";
import { CouponForm, IAddCategory, ICategory, token } from "../models";



const  user:token = JSON.parse(localStorage.getItem("user")!)
export const getAllCoupon = async () => {
    const res =  await instance.get("/coupon");
    
    return res.data
}

export const getOneCoupon = async (id:string) => {
    const res =  await instance.get("/coupon/" + id);
    return res.data
}
export const getOneCouponByCode = async (code:string) => {
    const res =  await instance.get("/couponbycode/" + code);
    return res.data
}


export const addCoupon = async (newCoupon:CouponForm) => {
    
    const res = await  instance.post("/coupon",newCoupon,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
    return res.data
}


export const updateCoupon = async (newCoupon:CouponForm) => {
    
    const res = await instance.patch("/coupon/"+ newCoupon._id,  newCoupon,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
    return res.data
}