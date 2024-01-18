
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
    maxQuantity: number;
    versionIndex: number;
    colorIndex: number;
  }
  export interface IAttribute{
    version_id: IProductVersion,
    colors:IColor[]
    index:number
  }
  export interface IAttributeForm{
    version_id: string,
    colors:IColorForm[]
  }
  export interface IColor{
    color_id: IProductColor,
    price:string,
    quantity:string
    index:number
  }
  export interface IColorForm{
    color_id: string,
    price:string,
    quantity:string
  }

export interface ICategory {
    _id:string,
    name: string,
    createdAt: string,
    updatedAt: string
  }
  export interface ICategoryPopulate {
    _id:string,
    name: string,
    products:IProduct[],
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
  _id:string,
  version: string,
  createdAt: string,
  updatedAt: string
}
export interface IListProduct{
  skip:number,
  limit: number,
  cateState:string,
  currentOrder: string,
  price:number,
}
export const ProductSchema = Yup.object({
  name: Yup.string().required("Tên sản phẩm không được để trống"),
  discount: Yup.number().typeError('Giảm giá không được để trống').min(0,'Giảm giá phải lớn hơn 0').max(99,'Giảm giá không được lớn hơn hoặc bằng 100%').required("Trường giảm giá không được để trống"),
  original_price: Yup.number().min(1,'Giá sản phẩm phải lớn hơn 0').required("Giá không được để trống"),
  description: Yup.string().required("Miêu tả sản phẩm không được để trống"),
  specifications: Yup.array(),
  images: Yup.array(),
  attributes: Yup.array(),
  categoryId: Yup.string().required("Danh mục sản phẩm không được để trống  "),
})

export type ProductForm = Yup.InferType<typeof ProductSchema>

export const ProductColorSchema = Yup.object({
  color: Yup.string().required("Màu không được để trống"),
  colorCode: Yup.string().required("Trường mã màu không được để trống"),
})

export type ProductColorForm = Yup.InferType<typeof ProductColorSchema>

export const ProductVersionSchema = Yup.object({
  version: Yup.string().required("Trường phiên bản không được để trống"),
})

export type ProductVersionForm = Yup.InferType<typeof ProductVersionSchema>

export const OrderSchema = Yup.object({
  user_id: Yup.string(),
  name: Yup.string().required("Tên người nhận hàng không được để trống"),
  email: Yup.string().email().required("Tên sản phẩm không được để trống"),
  phonenumber: Yup.string().required("Số điện thoại không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),
  products: Yup.array(),
  note: Yup.string(),
  status: Yup.number(),
  total: Yup.number(),
})
export interface IOrder{
  _id: string,
  user_id: string,
  name: string,
  email: string,
  phonenumber: number,
  address: string,
  products: any[],
  note: string,
  status: number,
  total:  number
}

export type OrderForm = Yup.InferType<typeof OrderSchema>


export const CouponSchema = Yup.object({
  title: Yup.string().required("Tiêu đề không được để trống"),
  couponCode: Yup.string().required("Mã giảm giá không được để trống"),
  couponStatus: Yup.number(),
  couponEnd: Yup.string().required("Ngày kết thúc không được để trống"),
  couponStart: Yup.string().required("Ngày kết thúc không được để trống"),
  couponValue: Yup.number().required("Số giảm giá không được để trống"),
  quantity : Yup.number().min(1,"Số lượng phải lớn hơn 0").required("Số lượng không được để trống"),
})
export type CouponForm = Yup.InferType<typeof CouponSchema>
export interface ICoupone{
  _id:string,
  title: string,
  couponCode: string,
  couponStatus: number,
  couponStart: string,
  couponEnd: string,
  couponValue: number,
  quantity: number,
}
export interface ICouponeUpdate{
  _id:string,
  title: string,
  couponCode: string,
  couponStart: string,
  couponEnd: string,
  quantity: number,
}