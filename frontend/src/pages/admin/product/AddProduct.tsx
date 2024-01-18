import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IAttribute,
  IAttributeForm,
  ICategory,
  IColor,
  IColorForm,
  IProduct,
  IProductColor,
  IProductVersion,
  ProductForm,
  ProductSchema,
} from "../../../models";
import axios from "axios";
import { getAllCategories } from "../../../api/categories";
import { addProduct } from "../../../api/products";
import { getAllProductColor } from "../../../api/product_color";
import { getAllProductVersion } from "../../../api/product_version";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import notify from "../../../components/notify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../storage";
import { addProducts } from "../../slice/product.slice";
const AddProduct = () => {
  const [valueInput, setValueInput] = useState({});
  const [data, setData] = useState<ICategory[]>([]);
  const [color, SetColor] = useState<IProductColor[]>([]);
  const [version, SetVersion] = useState<IProductVersion[]>([]);
  const [inputImg, setInputImg] = useState<Object[]>([]);
  const [inputFeatured, setInputFeatured] = useState<Object[]>([]);
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setData(res);
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
  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const onsubmit = async (data: ProductForm) => {
      if(validate()){
        const inputVersion_id = document.querySelectorAll(
          ".version:checked"
        ) as NodeListOf<HTMLInputElement>;
        const inputVersion = document.querySelectorAll(
          ".inputVersion"
        ) as NodeListOf<HTMLInputElement>;
        const inputColor_id = document.querySelectorAll(
          ".inputColor_id"
        ) as NodeListOf<HTMLInputElement>;
        
        const price = document.querySelectorAll(
          ".price"
        ) as NodeListOf<HTMLInputElement>;
        const quantity = document.querySelectorAll(
          ".quantity"
        ) as NodeListOf<HTMLInputElement>;
        const arrayAttribute = [];
        for (var i = 0; i < inputVersion_id.length; i++) {
          const attribute:IAttributeForm = {
            version_id: inputVersion_id[i].dataset._id!,
            colors:[
             
            ],
          };
          for(let j = 0;j<inputColor_id.length;j++){
           if(inputVersion[j].value ==inputVersion_id[i].value ){
            const color:IColorForm = {
              color_id: inputColor_id[j].value,
              price: price[j].value,
              quantity: quantity[j].value,
            }
            attribute.colors.push(color)
           }
          }
          arrayAttribute.push(attribute);
        }
        data.attributes = arrayAttribute;
    

        const test = async ()=>{
          const images = [];
          const testanh: NodeListOf<HTMLInputElement> =
          document.querySelectorAll(".img");
        for (var i = 0; i < testanh.length; i++) {
          images.push(await upload(testanh[i].files));
        }
        data.images = images;
        await dispatch(addProducts(data!)).unwrap()
        .then((res) => {

        })
        }

        data.attributes = arrayAttribute;
        console.log(data);
        const add = await toast.promise(
          test().then(res =>{
            navigate("/admin/products");
            
          }),
          {
            pending: 'Đang sử lý',
            success: 'Thêm sản phẩm thành công 👌',
            error: 'Đã gặp lỗi 🤯'
          }
      );

      }
  };
  const validImg = () => {
    const imgs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".img");
    const validImg = document.querySelector("#validImg") as HTMLElement;
    let validAllimgs = true;
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].files?.length == 0) {
        validAllimgs = false;
      }
    }
    if (imgs.length == 0 || validAllimgs==false) {
      validImg.innerText = "Ảnh là trường dữ liệu bắt buộc";
    } else {
      validImg.innerText = "";
    }
    return validAllimgs
  }
  const validSpecification = ()=>{
    const validSpecification = document.querySelector("#validSpecification") as HTMLElement;
    const specification = document.querySelectorAll('.specification') as NodeListOf<HTMLInputElement>;
    let validState = true;
    for (let i = 0; i < specification.length; i++) {
      if (specification[i].value == "") {
        validState = false;
      }
    }
    if (specification.length == 0 || validState==false) {
      validSpecification.innerText = "Đặc điểm nổi bật là trường dữ liệu bắt buộc";
    } else {
      validSpecification.innerText = "";
    }
    return validState
  }
  const handleRemoveInputImg = (e) => {
    const imgs = document.querySelector("#anh");
    imgs?.removeChild(e.target.parentElement);
  };
  const handleRemoveInputFeatured = (e) => {
    const specifications = document.querySelector("#specifications");
    specifications?.removeChild(e.target.parentElement);
    
  };
  const addinput = () => {
    const imgs = document.querySelectorAll(".img") as NodeListOf<HTMLInputElement>;
    if(imgs.length<=9){
      setInputImg([...inputImg, {}]);
    }
    else{
      alert("Chỉ thêm tối đa được 10 ảnh")
    }
  };

  const addFeatured = () => {
const specification = document.querySelectorAll(".specification") as NodeListOf<HTMLInputElement>
    if(specification.length<=3){
      setInputFeatured([...inputFeatured, {}]);
    }
    else{
      alert("Chỉ thêm tối đa được 4 đặc điểm nổi bật")
    }
  };

  const showAttibute = () => {
    const table_attribute = document.querySelector("#table-attribute");
    const container = document.querySelector("#overlay");
    table_attribute?.classList.toggle("hidden");
    container?.classList.toggle("hidden");
  };
  const validate = () => {
    if( validImg()&&validSpecification()&&validAttributes()){
      return true
    }
    return false
  };
  const handleAttibute = () => {
    if(validVersionAndColor()){
      const validAttribute = document.querySelector("#validAttribute") as HTMLElement
      validAttribute.innerText=""
      const colors = document.querySelectorAll(
        ".color:checked"
      ) as NodeListOf<HTMLInputElement>;
      const versions = document.querySelectorAll(
        ".version:checked"
      ) as NodeListOf<HTMLInputElement>;
  
      const containerAttribute = document.querySelector(
        "#containerInputAttribute"
      ) as HTMLInputElement;
      containerAttribute.innerHTML = "";
      for (var i = 0; i < versions.length; i++) {
        for (var j = 0; j < colors.length; j++) {
          const form = document.createElement("form");
  
          form.className = "productAttribute flex justify-between my-[5px] border-b-[3px] pb-3";
          const inputVersion = document.createElement("input");
          const inputColor = document.createElement("input");
          const inputColor_id = document.createElement("input");
          const inputVersion_id = document.createElement("input");
          const price = document.createElement("input");
          const quanity = document.createElement("input");
          inputVersion.value = versions[i].value;
          inputColor_id.value = colors[j].dataset._id!;
          inputVersion_id.value = versions[i].dataset._id!;
          price.placeholder = "Giá phiên bản";
          quanity.placeholder = "Số lượng";
          inputVersion.className =
            "inputVersion rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
  
          inputVersion.setAttribute("disabled", "");
          inputColor_id.className = "inputColor_id hidden";
          inputVersion_id.className = "inputVersion_id hidden";
          quanity.className =
            "quantity rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
          price.className =
            "price rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
          inputColor.className =
            "inputColor rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary";
          inputColor.setAttribute("disabled", "");
          inputColor.value = colors[j].value;
          form.appendChild(inputVersion);
          form.appendChild(inputColor);
  
          form.appendChild(price);
          form.appendChild(quanity);
          form.appendChild(inputColor_id);
          form.appendChild(inputVersion_id);
          containerAttribute?.appendChild(form);
  
        }
      }
      showAttibute();
    }
   
  };
  const validAttributes = ()=>{
    const inputColors = document.querySelectorAll(".inputColor")
    const inputPrice = document.querySelectorAll(".price") as NodeListOf<HTMLInputElement>;
    const inputQuantity = document.querySelectorAll(".quantity") as NodeListOf<HTMLInputElement>;
    const validAttribute = document.querySelector("#validAttribute") as HTMLElement
    validAttribute.innerText=""
    let temp = true
    if(inputColors.length==0){
      temp=false
    }
    if(inputPrice.length>0){
      for(let i=0;i<inputPrice.length;i++){
        if(inputPrice[i].value==""){
          temp=false
          inputPrice[i].style.border="1px solid red"
        }
      }
    }
    if(inputQuantity.length>0){
      for(let i=0;i<inputQuantity.length;i++){
        if(inputQuantity[i].value==""){
          temp=false
          inputQuantity[i].style.border="1px solid red"
        }
      }
    }
    temp==true?validAttribute.innerText="":validAttribute.innerText="Thuộc tính là trường bắt buộc"
    return temp
  }
  const validVersionAndColor = ()=>{
    const versions = document.querySelectorAll(".version:checked");
    const colors = document.querySelectorAll(".color:checked")
    const versionError = document.querySelector("#versionError") as HTMLElement;
    const colorError = document.querySelector("#colorError") as HTMLElement
    versionError.style.display="none"
    colorError.style.display="none"
    let temp=true
    if(versions.length ==0){
      versionError.style.display = "block"
      temp = false
    }
    if(colors.length ==0){
      colorError.style.display = "block"
      temp = false
    }
    return temp
  }
  return (
  
    <section className="bg-white py-20 lg:py-[120px] relative overflow-hidden   w-[1200px] ">       
      <div
        onClick={showAttibute}
        id="overlay"
        className=" fixed top-0 right-0 bottom-0 left-0 z-10  bg-[rgba(0,0,0,0.5)] hidden"
      ></div>
      <div className="container w-[1000px] ">
        <div className="flex flex-wrap lg:justify-between mx-4 w-[1000px]">
          <div
            className="hidden fixed top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]  z-20"
            id="table-attribute"
          >
            <div className="bg-white relative border items-stretch border-gray-200 rounded-lg pb-[10px]  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <button
                type="button"
                onClick={showAttibute}
                className="absolute right-2 text-[18px] font-bold cursor-pointer"
              >
                x
              </button>
              <ul className=" p-[20px] w-full  text-sm font-medium text-gray-900 sm:flex gap-36 max-h-[350px]">
              <div>
                  <h3 className="inline">Phiên bản: </h3>
                  {version.map((item) => {
                    return (
                     <>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 ">
                        <div className="flex items-center pl-3 ">
                          <input
                                 id={item.version}
                            type="checkbox"
                            value={item.version}
                            data-_id={item._id}
                            className="version w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label    htmlFor={item.version} className="cursor-pointer w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {item.version}
                          </label>
                        </div>
                      </li>
                     </>
                    );
                  })}
                  <span className="text-red-500 text-[13px] hidden" id="versionError">Phiên bản là trường bắt buộc</span>
                </div>
                
                <div>
                  <h3 className="">Màu: </h3>
                  <div className="flex flex-wrap max-w-[150px]">
                  {color.map((item) => {
                    return (
                      <li className="w-auto border-b border-gray-200 sm:border-b-0 ">
                        <div className="flex items-center pl-3">
                          <input
                            id={item.color}
                            data-_id={item._id}
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
                  <span className="text-red-500 text-[13px] hidden" id="colorError">Màu là trường bắt buộc</span>
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
                    type="number"
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
                    type="number"
                    {...register("original_price")}
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

                <button
                  className="border-[2px] bg-blue-500 text-white px-[10px] py-2  rounded-md"
                  type="button"
                  onClick={addinput}
                >
                  Ảnh +
                </button>
                <p className="text-red-700 text-[10px] ">
                  <span id="validImg"></span>
                </p>
                <div id="anh">
                  {inputImg.map((input, index) => {
                    return (
                      <>
                        <div className="flex justify-between">
                          
                          <input
                          {...register(`images.${index}`)}
                          onChange={validImg}
                            type="file"
                            className="img w-[90%] rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
                          />
                          <button className="bg-red-500 my-5 text-white rounded-sm px-[10px]" onClick={handleRemoveInputImg} type="button">
                            Xoá
                          </button>
                         
                        </div>
                      </>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="border-[2px] bg-blue-500 text-white px-[10px] py-2  rounded-md"
                  onClick={addFeatured}
                >
                  Đặc điểm nổi bật +
                </button>
                <p className="text-red-700 text-[10px] ">
                  <span id="validSpecification"></span>
                </p>
                <div id="specifications">
                  {inputFeatured.map((item,index)=>{
                    return<>
                 <div className="flex justify-between">
                 <input  {...register(`specifications.${index}.value`)}onChange={validSpecification} className= "specification w-[90%] rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary" type="text" />
                    <button type="button" onClick={handleRemoveInputFeatured} className="bg-red-500 h-[100%] my-3 py-[10px] text-white rounded-sm px-[10px]" >
                            Xoá
                      </button>
                 </div>
                    </>
                  })}
                </div>
                <p className="text-red-700 text-[10px]">
                  {errors.specifications && errors.specifications.message}
                </p>
                <br></br>
                <button
                  type="button"
                  className="border-[2px] bg-blue-500 text-white px-[10px] py-2 rounded-md"
                  onClick={showAttibute}
                >
                  Thuộc tính +
                </button>
                <div
                  id="containerInputAttribute"
                  className="gird grid-cols-2 gap-4"
                ></div>
                  <p className="text-red-700 text-[10px] ">
                  <span id="validAttribute"></span>
                </p>
                <h1>Danh mục</h1>
                <div className="mb-6">
                  <select
                    {...register("categoryId")}
                    className="cursor-pointer  w-full
                    rounded
                    py-3
                    px-[14px]
                    text-body-color text-base
                    border border-[f0f0f0]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary"
                    name="categoryId"
                    id="categoryId"
                  >
                    <option value="" >Chọn danh mục sản phẩm</option>
                    {data.map((item) => {
                      return <option className="cursor-pointer" value={item._id}>{item.name}</option>;
                    })}
                  </select>
                  <p className="text-red-700 text-[10px]">
                  {errors.categoryId && errors.categoryId.message}
                </p>

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
                    onClick={validate}
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
