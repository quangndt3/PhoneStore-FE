import {  IProductVersion } from "../models";
import instance from "./instance";


export const getAllProductVersion = () => {
    return instance.get("/versions");
}

export const add = (productVersion: IProductVersion) => {
    return instance.post("/versions",productVersion);
}