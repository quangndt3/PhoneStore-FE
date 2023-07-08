
import * as Yup from "yup"
export interface IProduct {
    _id: string;
    name: string;
    discount: number;
    original_price: number;
    description: string;
    images: any;
    brand: string;
    specifications: ISpecification[];
    attributes:IAttribute[]
    categoryId: ICategory;
    comments: IComment[];
  }
  export interface ISpecification {
     
      value: string,
 
  }
  export interface ICard{
    name: string;
    price: string;
    quantity:number;
    version:string;
    _id:string;
    images:string[]
    colorName: string
  }
  export interface IAttribute{
    version: string,
    colors:IColor[]
  }
  export interface IColor{
    colorName: string,
    price:string,
    quantity:string,
    colorCode:string
  }

export interface ICategory {
    _id:string,
    name: string,
    createdAt: string,
    updatedAt: string
  }
  export interface IAddCategory {
    name: string | undefined,

  }
export  interface IUser {
    id: object,
    name: string,
    email: string,
    password: string,
    images: string;
    role:string
}

export interface IAcc{
    name: string,
    email: string,
    password: string,
    rePassword:string
}
export interface IComment{
  _id: string,
  content: string,
  userId: IUser,
  productId: string,
  createdAt:string
}
export interface IAddComment{
  content: string,
  userId: IUser,
  productId: string,
}
export interface token{
  accessToken:string
}

export interface IData{
  results:IProduct[],
  TotalProducts: number
}
export interface IProductColor{
  _id:string,
  color: string,
  colorCode: string
}
export interface IProductVersion{
  version: string,

}
export const ProductSchema = Yup.object({
  name: Yup.string().required("Tên sản phẩm không được để trống"),
  discount: Yup.number().required("Trường giảm giá không được để trống"),
  original_price: Yup.number().min(1,'Giá sản phẩm phải lớn hơn 0').required("Giá không được để trống"),
  description: Yup.string().required("Miêu tả sản phẩm không được để trống"),
  specifications: Yup.array(),
  images: Yup.array(),
  attributes: Yup.array(),
  categoryId: Yup.string().required(),
})

export type ProductForm = Yup.InferType<typeof ProductSchema>

export const ProductColorSchema = Yup.object({
  color: Yup.string().required("Màu không được để trống"),
  colorCode: Yup.string().required("Trường mã màu không được để trống"),
})

export type ProductColorForm = Yup.InferType<typeof ProductColorSchema>