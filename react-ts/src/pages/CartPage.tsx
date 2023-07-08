import React, { useEffect, useState } from "react";
import { ICard, IProduct } from "../models";
import { number } from "joi";
import formatprice from "../sub";
interface Iprops{
  handleCartLenthg(value:number):void
}
const CartPage = ({handleCartLenthg}:Iprops) => {
  const [products, setProducts] = useState<ICard[]>([]);
  const [sum, setSum] = useState(0);
  const use_id = JSON.parse(localStorage.getItem("user")!);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem(use_id.data._id)!));
  }, []);
  useEffect(() => {
    let sum = 0;
    if (products != null) {
      const temp = products.map((item) => {
        return (sum += item.quantity * item.price);
      });
    }
    setSum(sum);
  }, [products]);

  const plus = (id: string) => {
    let temp: ICard[] = products.slice("");
    const pr: ICard = temp.find((item) => item._id == id)!;
    pr.quantity = Number(pr.quantity) + 1;
    localStorage.setItem(use_id.data._id, JSON.stringify(temp));
    setProducts(temp);
  };

  const Subtraction = (id: string) => {
    let temp: ICard[] = products.slice("");
    const pr: ICard = temp.find((item) => item._id == id)!;
    if (pr.quantity <= 1) {
      alert("Số lượng sản phẩm phải lớn hơn 0");
    } else {
      pr.quantity = Number(pr.quantity) - 1;

      localStorage.setItem(use_id.data._id, JSON.stringify(temp));
      setProducts(temp);
    }
  };
  const remove = (id: string) => {
    let temp: ICard[] = products.slice("");
    const index = temp.findIndex((item) => item._id == id);
    temp.splice(index, 1);
    localStorage.setItem(use_id.data._id, JSON.stringify(temp));
    setProducts(temp);
    handleCartLenthg(temp.length)
  };
  if (products != null) {
    return (
      <div className=" ">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Giỏ hàng</h1>

                    {products.map((item) => {
      
                      
                      return (
                        <div className="flex justify-between items-center mt-6 pt-6 flex-wrap">
                          <div className="flex  items-center">
                           <img className="w-[100px]" src={item.images?.[0]} alt="" />

                            <div className="flex flex-col ml-3">
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
                  <div className=" p-5 bg-[#18181B] rounded overflow-visible">
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

                    <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <h1 className="mt-[50px] font-bold">
          Không có sản phẩm trong giở hàng
        </h1>
      </div>
    );
  }
};

export default CartPage;
