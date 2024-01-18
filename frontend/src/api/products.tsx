import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IProduct, ProductForm, token } from "../models";

const user: token = JSON.parse(localStorage.getItem("user")!);

export const getOne = (id: string) => {
  return instance.get("/products/" + id);
};
export const getAll = async (skip: number, limit: number) => {
  const res = await instance.get(`/products?skip=${skip}&limit=${limit}`);
  return res.data
};
export const getAll_no = () => {
  return instance.get(`/product`);
};
export const remove = async (id: string) => {
  const res =  await instance.delete("/products/" + id, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  });
  return res.data
};

export const addProduct = async (newProduct: ProductForm) => {

  const res = await  instance.post("/products", newProduct, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  });
  return res.data
};

export const updateProduct = (newProduct: ProductForm, id: string) => {
  return instance.patch("/products/" + id, newProduct, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  });
};

export const getProductByName = (
  skip: number,
  limit: number,
  name: string | null,
  order: string | undefined
) => {
  return instance.get(
    `/filterProduct?skip=${skip}&limit=${limit}&name=${name}&order=${order}`
  );
};
export const filterProduct = async (
  skip: number,
  limit: number,
  categoryId: string | undefined,
  order: string | undefined,
  min: number
) => {
  const res = await instance.get(
    `/listProduct?skip=${skip}&limit=${limit}&categoryId=${categoryId}&order=${order}&min=${min}`
  );
  return res.data
};

export const getRelatedProduct = (id: string) => {
  console.log(`/relatedProduct/` + id);

  return instance.get(`/relatedProduct/` + id);
};

export const subtractionProduct = (id:string,v_index:number,c_index:number,quantity:number) => {
  return instance.patch(`/subtractionQuantity?_id=${id}&v_index=${v_index}&c_index=${c_index}&quantity=${quantity}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  });
};
export const RestoreProductQuantity = (id:string,v_index:number,c_index:number,quantity:number) => {
  return instance.patch(`/resotreQuantity?_id=${id}&v_index=${v_index}&c_index=${c_index}&quantity=${quantity}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  });
};