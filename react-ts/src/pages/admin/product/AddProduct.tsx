import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ICategory,
  IProduct,
  IProductColor,
  IProductVersion,
  ProductForm,
  ProductSchema,
} from "../../../models";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { check } from "../../../components/check";
import { getAllCategories } from "../../../api/categories";
import { addProduct } from "../../../api/products";
import { getAllProductColor } from "../../../api/product_color";
import { getAllProductVersion } from "../../../api/product_version";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const AddProduct = () => {
  const [valueInput, setValueInput] = useState({});
  const [data, setData] = useState<ICategory[]>([]);
  const [color, SetColor] = useState<IProductColor[]>([]);
  const [version, SetVersion] = useState<IProductVersion[]>([]);
  useEffect(() => {
    getAllCategories()
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        alert(err.reponse.data.message);
      });
    getAllProductColor()
      .then(({ data }) => {
        SetColor(data.data);
      })
      .catch((err) => {
        alert(err.reponse.data.message);
      });
    getAllProductVersion()
      .then(({ data }) => {
        SetVersion(data.data);
      })
      .catch((err) => {
        alert(err.reponse.data.message);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(ProductSchema),
  });
  const upload = async (files: any) => {
    const CLOUD_NAME = "djf42qmp6";
    const PRESET_NAME = "spring2023";
    const FOLDER_NAME = "react";
    const linkanh: object[] = [];

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);
      const response = await axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/from-data",
          },
        })
        .then((res) => {
          linkanh.push(res.data.secure_url);
        });
    }

    return linkanh;
  };

  const navigate = useNavigate();

  const onsubmit = async (data: ProductForm) => {
    const specifications = document.querySelectorAll(
      ".attri"
    ) as NodeListOf<HTMLInputElement>;

    const array = [];
    for (var i = 0; i < specifications.length; i++) {
      array.push({ value: specifications[i].value });
    }
    data.specifications! = array!;
    const colors = document.querySelectorAll(
      ".color:checked"
    ) as NodeListOf<HTMLInputElement>;
    const versions = document.querySelectorAll(
      ".version:checked"
    ) as NodeListOf<HTMLInputElement>;
    const inputVersion = document.querySelectorAll(".inputVersion") as NodeListOf<HTMLInputElement>;
    const inputColor = document.querySelectorAll(".inputColor") as NodeListOf<HTMLInputElement>;
    const inputColorCode = document.querySelectorAll(".inputColorCode") as NodeListOf<HTMLInputElement>;
    const price = document.querySelectorAll(".price") as NodeListOf<HTMLInputElement>;
    const quantity = document.querySelectorAll(".quantity") as NodeListOf<HTMLInputElement>;
    const arrayAttribute = [];
    for(var i = 0; i < versions.length; i++){
      const attribute ={
        version:versions[i].value,
        colors:[]
      }
      for(var j=0; j < inputColor.length; j++){
        if(inputVersion[j].value === versions[i].value){
          const color={
            colorName:inputColor[j].value,
            price: price[j].value,
            quantity: quantity[j].value,
            colorCode: "#" + inputColorCode[j].value
          
          }
          attribute.colors.push(color)
        }
      }
      arrayAttribute.push(attribute)
    }
    data.attributes = arrayAttribute

    


    const images = [];
    console.log(data);
    
    const testanh: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".img");
    for (var i = 0; i < testanh.length; i++) {
      images.push(await upload(testanh[i].files));
    }
    data.images = images;
    data.attributes =arrayAttribute
    addProduct(data).then((res) => {
      alert("Thêm sản phẩm thành công")
    })
    .catch(errors=>{
      console.log(errors);
      
      alert(errors.message)
    })

  };

  const addinput = () => {
    const input = document.createElement("input");
    input.className =
      "img w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
    input.type = "file";
    const imgs = document.querySelector("#anh");
    imgs?.appendChild(input);
  };
  const addAttibute = () => {
    const input = document.createElement("input");
    input.className =
      "attri w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
    const imgs = document.querySelector("#atributes");
    imgs?.appendChild(input);
  };

  const showAttibute = () => {
    const table_attribute = document.querySelector("#table-attribute");
    const container = document.querySelector("#overlay");
    table_attribute?.classList.toggle("hidden");
    container?.classList.toggle("hidden");
  };

  const handleAttibute = () => {
    const colors = document.querySelectorAll(
      ".color:checked"
    ) as NodeListOf<HTMLInputElement>;
    const versions = document.querySelectorAll(
      ".version:checked"
    ) as NodeListOf<HTMLInputElement>;
    const array = [];
    const containerAttribute = document.querySelector("#containerInputAttribute") as HTMLInputElement;
    containerAttribute.innerHTML=""
    for (var i = 0; i < versions.length; i++) {
      // input.className= "attri w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
      for (var j = 0; j < colors.length; j++) {
        const form = document.createElement("form");
      
        form.className="productAttribute gap-4 flex my-[5px]"
        const inputVersion = document.createElement("input");
        const inputColor = document.createElement("input");
        const inputColorCode = document.createElement("input");
        const price = document.createElement("input");
        const quanity = document.createElement("input");
        inputVersion.value = version[i].version;
        inputColorCode.value = colors[j].dataset.id!

        
        inputColorCode.placeholder="qyuang"
        price.placeholder="Giá cộng thêm cho phiên bản"
        quanity.placeholder="Số lượng"
        inputVersion.className = "inputVersion rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
        
        inputVersion.setAttribute('disabled','')
        inputColorCode.className = "inputColorCode hidden";
        quanity.className = "quantity rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
        price.className = "price rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
        inputColor.className = "inputColor rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
        inputColor.setAttribute('disabled','')
        inputColor.value = colors[j].value;
        form.appendChild(inputVersion);
        form.appendChild(inputColor);

        form.appendChild(price);
        form.appendChild(quanity);
        form.appendChild(inputColorCode);
        containerAttribute?.appendChild(form);
      }
    }
    showAttibute()
  };
  return (
    <section className="bg-white py-20 lg:py-[120px] relative overflow-hidden   w-[1200px] ">
      <div
        onClick={showAttibute}
        id="overlay"
        className=" fixed top-0 right-0 bottom-0 left-0 z-10  bg-[rgba(0,0,0,0.5)] hidden"
      >

      </div>
      <div className="container w-[1000px] ">
        <div className="flex flex-wrap lg:justify-between mx-4 w-[1000px]">
          <div
            className="hidden fixed top-[25%] left-[45%]  z-20 "
            id="table-attribute"
          >
            
            <div className="bg-white relative border items-stretch border-gray-200 rounded-lg pb-[10px]  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <button type="button" onClick={showAttibute} className="absolute right-2 text-[18px] font-bold cursor-pointer">x</button>
              <ul className=" p-[20px] w-full  text-sm font-medium text-gray-900 sm:flex ">
                <div>
                  <h3 className="">Màu: </h3>
                  {color.map((item) => {
                    return (
                      <li className="w-full border-b border-gray-200 sm:border-b-0 ">
                        <div className="flex items-center pl-3">
                          <input
                            id={item.color}
                            type="checkbox"
                            value={item.color}
                            data-id={item.colorCode}
                            className="color w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={item.color}
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {item.color}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </div>
                <div>
                  <h3 className="inline">Phiên bản: </h3>
                  {version.map((item) => {
                    return (
                      <li className="w-full border-b border-gray-200 sm:border-b-0 ">
                        <div className="flex items-center pl-3">
                          <input
                            id="vue-checkbox-list"
                            type="checkbox"
                            value={item.version}
                            className="version w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.version}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </ul>
              <button className="ml-[10px]" onClick={handleAttibute}>
                Xác nhận
              </button>
            </div>
          </div>
          <div className="  xl:w-5/12 px-4 w-[1000px]">
            <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg w-[1000px] ml-[80px] z-1">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-6">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Tên sản phẩm"
                    name="name"
                    className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                  />
                  <p className="text-red-700 text-[10px]">
                    {errors.name && errors.name.message}
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    {...register("discount")}
                    type="text"
                    name="discount"
                    placeholder="Giảm giá"
                    className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                  />
                  <p className="text-red-700 text-[10px]">
                    {errors.discount && errors.discount.message}
                  </p>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("original_price")}
                    name="original_price"
                    placeholder="Giá gốc"
                    className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                  />
                  <p className="text-red-700 text-[10px]">
                    {errors.original_price && errors.original_price.message}
                  </p>
                </div>

                <button type="button" onClick={addinput}>
                  Ảnh
                </button>
                <div id="anh"></div>
                <button type="button" onClick={addAttibute}>
                  Đặc điểm
                </button>
                <div id="atributes"></div>
                <p className="text-red-700 text-[10px]">
                  {errors.specifications && errors.specifications.message}
                </p>
                <br></br>
                <button type="button" onClick={showAttibute}>
                  Thuộc tính
                </button>
                <div id="containerInputAttribute" className="gird grid-cols-2 gap-4"></div>
                <h1>Danh mục</h1>
                <div className="mb-6">  
                
                  
                  <select
                        {...register("categoryId")}
                    name="categoryId"
                    id="categoryId"
                  >
                    {data.map((item) => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </select>
                  {errors.categoryId && errors.categoryId.message}
                </div>
                <div className="mb-6">
                  <textarea
                    {...register("description")}
                    name="description"
                    placeholder="Miêu tả"
                    className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                resize-none
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                  ></textarea>
                  <p className="text-red-700 text-[10px]">
                    {errors.description && errors.description.message}
                  </p>
                </div>
                <div>
                  <button
                    className="
                                w-full

                                bg-primary
                                rounded
                                border border-primary
                                p-3
                                transition
                                hover:bg-opacity-90
                                "
                  >
                    Thêm sản phẩm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
