import React, { useEffect, useState } from "react";
import { ICard, IProduct, OrderForm, OrderSchema, ProductColorForm } from "../models";
import formatprice from "../sub";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addOrder } from "../api/order";
import notify from "../components/notify";
import { AppDispatch, RootState } from "../storage";
import { useDispatch, useSelector } from "react-redux";
import { subtractionQuantityProducts } from "./slice/product.slice";
import { subtractionProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import { addOrders } from "./slice/order.slice";
interface Iprops{
  handleCartLenthg(value:number):void
}

const CartPage = ({handleCartLenthg}:Iprops) => {
  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const [product, setproduct] = useState<ICard[]>([]);
  const [sum, setSum] = useState(0);
  const use_id = JSON.parse(localStorage.getItem("user")!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: yupResolver(OrderSchema),
   defaultValues:{
    name: use_id.data.name,
    email: use_id.data.email,
    phonenumber: use_id.data.phonenumber,
   }
  });
  useEffect(() => {
    setproduct(JSON.parse(localStorage.getItem(use_id.data.email)!));
  }, []);
  useEffect(() => {
    let sum = 0;
    if (product != null) {
      const temp = product.map((item) => {
        return (sum += item.quantity * item.price);
      });
    }
    setSum(sum);
  }, [product]);
const tesst = async ()=>{
  product.map(async   item => {
    let id= item._id
    let v_index= item.versionIndex
    let c_index= item.colorIndex
    let quantity= item.quantity
    return await subtractionProduct(id,v_index,c_index,quantity)

 });

}
const navigate  = useNavigate()
  const onsubmit = async   (data:OrderForm) => {
    data.products = product 
    data.products.map((item,index)=>{
      item.version_index = product[index].versionIndex
      item.color_index = product[index].colorIndex
    })   
    data.user_id = use_id.data._id
    data.status = 0

    let temp = 0
    product.map(item=> {
      temp+=Number(item.price)* Number(item.quantity)
    })
    data.total = temp
    tesst()
    console.log(data);
    
    try {
      const dataz = await dispatch(addOrders(data)).unwrap()     
      localStorage.removeItem(use_id.data.email)
        
          navigate("/orders")
          notify('success','đặt hàng thành công') 
    } catch (err) {
      console.log(err);
    }

        
        
    }
  const plus = (id: string) => {
    let temp: ICard[] = product.slice("");
    const pr: ICard = temp.find((item) => item._id == id)!;
     if(pr.quantity>=pr.maxQuantity){
      notify("error","Số lượng trong kho không thể đáp ứng nhu cầu của bạn")
    }
    else{
      pr.quantity = Number(pr.quantity) + 1;
      localStorage.setItem(use_id.data.email, JSON.stringify(temp));
      setproduct(temp);
    }
    
  };


  const Subtraction = (id: string) => {
    let temp: ICard[] = product.slice("");
    const pr: ICard = temp.find((item) => item._id == id)!;
    console.log(pr);
    
    if (pr.quantity <= 1) {
      notify("error","Số lượng sản phẩm phải lớn hơn 0")
    } 
    else {
      pr.quantity = Number(pr.quantity) - 1;

      localStorage.setItem(use_id.data.email, JSON.stringify(temp));
      setproduct(temp);
    }
  };
  const remove = (id: string) => {
    let temp: ICard[] = product.slice("");
    const index = temp.findIndex((item) => item._id == id);
    temp.splice(index, 1);
    localStorage.setItem(use_id.data.email, JSON.stringify(temp));
    setproduct(temp);
    handleCartLenthg(temp.length)
  };
  const toggleorder = ()=>{
    const order = document.querySelector("#order");
    order?.classList.toggle("hidden")
  }
  if (product != null) {
    return (
      <div className=" mt-[40px]  " >
        <div className="py-12 z-1">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Giỏ hàng</h1>

                    {product.map((item) => {
      
                      
                      return (
                        <>
                        <div className="flex justify-between items-center mt-6 pt-6 flex-wrap">
                          <div className="flex  items-center">
                           <img className="w-[100px]" src={item.images?.[0]} alt="" />

                            <div className="flex flex-col ml-3 w-[150px]">
                              <span className="md:text-md font-medium ">
                                {item.name} {item.version} {item.colorName}
                              </span>
                              <span className="text-xs font-light text-gray-400"></span>
                            </div>
                          </div>

                          <div className="flex justify-center items-center ">
                            <div className="pr-8 flex ">
                              <button
                                onClick={() => {
                                  Subtraction(item._id);
                                }}
                                data-id={item._id}
                                className="font-semibold bg-blue-500 w-[20px] text-white rounded-sm"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                disabled
                                className="quantity  bg-gray-100 border h-6 w-[50px] rounded text-sm  text-center  mx-2"
                                value={item.quantity}
                              />
                              <button
                                onClick={() => {
                                  plus(item._id);
                                }}
                                data-id={item._id}
                                className="font-semibold bg-blue-500 w-[20px] text-white rounded-sm"
                              >
                                +
                              </button>
                            </div>

                            <div className="pr-8 ">
                              <span className=" text-xs font-medium">
                                {formatprice(Number(item.price))}
                              </span>
                            </div>
                            <div>
                              <i className="fa fa-close text-xs font-medium"></i>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                remove(item._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                fill="#000000"
                                version="1.1"
                                id="Capa_1"
                                width="30px"
                                height="30px"
                                viewBox="0 0 482.428 482.429"
                                xmlSpace="preserve"
                              >
                                <g>
                                  <g>
                                    <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z" />
                                    <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" />
                                    <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" />
                                    <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" />
                                  </g>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>

                        </>
                      );
                    })}

                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                        <a
                          href="/"
                          className="text-md  font-medium text-blue-500"
                        >
                          Tiếp tục mua hàng
                        </a>
                      </div>
                    
                      <div className="flex justify-center items-end"></div>
                      
                    </div>
                    
                  </div>
                  <div className=" p-5 bg-[#18181B] w- rounded overflow-visible">
                    <span className="text-[25px] font-medium text-gray-100 block pb-3">
                      Chi tiết giỏ hàng
                    </span>

                    <div className="overflow-visible flex justify-between items-center mt-2 border-b py-3">
                      <span className="text-lg text-white font-medium ">
                        Tổng tiền
                      </span>
                      <span className="text-lg text-white font-medium ">
                        {formatprice(sum)}
                      </span>
                    </div>

                    <div className="flex justify-center flex-col pt-3">
                      <textarea
                        rows={4}
                        cols={10}
                        className=" mb-10 focus:outline-none = bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="Ghi chú"
                      />
                    </div>

                    <button onClick={toggleorder} type="button" className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <div id="order" className="bg-white hidden  h-[80%] fixed right-[230px] rounded-lg shadow-lg z-20  w-[70%] top-[80px]">
                    <button onClick={toggleorder} className="font-bold absolute right-10 top-5">x</button>
     <h1 className=" text-[20px] font-bold text-center mb-[50px]">Thông tin đơn hàng</h1>
<form onSubmit={handleSubmit(onsubmit)} className="px-[50px]">
  <div className="relative z-0 w-full mb-6 group">
      <input {...register("name")}  type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên người nhận hàng</label>
      <p className="text-red-700 text-[10px]">
                    {errors.name && errors.name.message}
                  </p>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input {...register("email")}  type="email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      <p className="text-red-700 text-[10px]">
                    {errors.email && errors.email.message}
                  </p>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input {...register("phonenumber")}  type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
      <p className="text-red-700 text-[10px]">
                    {errors.phonenumber && errors.phonenumber.message}
                  </p>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input {...register("address")} type="text"   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ</label>
      <p className="text-red-700 text-[10px]">
                    {errors.address && errors.address.message}
                  </p>
  </div>
  
  <div className="relative  z-0 w-full mb-6 group">
        <textarea {...register("note")} className="rounded-lg"  cols={125} rows={6} placeholder="Ghi chú"></textarea>
        <p className="text-red-700 text-[10px]">
                    {errors.note && errors.note.message}
                  </p>
    </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mua hàng</button>
</form>


          </div>
        </div>
      
    );
  } else {
    return (
      <div className="text-center h-[190px] pt-[100px]">
        <h1 className="mt-[50px] font-bold">
          Không có sản phẩm trong giở hàng
        </h1>
      </div>
    );
  }
};

export default CartPage;
