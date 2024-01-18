import React, {  useEffect, useState } from "react";
import { IProduct, IAddComment, IColor, IAttribute } from "../models";
import {  useNavigate, useParams } from "react-router-dom";
import formatprice from "../sub";
import { getOne, getRelatedProduct } from "../api/products";
import ProductThumbs from "../components/productThumbs";
import "react-toastify/dist/ReactToastify.css";
import notify from "../components/notify";
interface Iprops{
  handleCartLenthg(value:number):void
}
const DetailProduct = ({handleCartLenthg}:Iprops) => {
 
  const [product, setProduct] = useState<IProduct>();
  const [color, setColor] = useState<IAttribute[]>();
  const [currentVersion, setCurrentVersion] = useState<IAttribute>();
  const [currentColor, setCurrentColor] = useState<IColor>();
  const [relatedProduct,setRelatedProduct] =  useState<IProduct[]>()
  const navigate = useNavigate()
  const onNavigate = (id:string) => {
    navigate(`/products/${id}`)
  }
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getOne(id!).then(({ data }) => {

      setColor(data.attributes);
      setProduct(data);
      data.attributes[0].index=0
      setCurrentVersion(data.attributes[0]);
      data.attributes[0].colors[0].index=0
      setCurrentColor(data.attributes[0].colors[0]);
      getRelatedProduct(data?.categoryId._id!).then(({ data }) => {
            setRelatedProduct(data.data)
                })
    });

  }, []);
  useEffect(() => {
    setCurrentVersion(currentVersion);
    setCurrentColor(currentVersion!?.colors[0]);
  }, [currentVersion]);
  var user = JSON.parse(localStorage.getItem("acc")!);
  console.log(relatedProduct);
  
  const handleAddToCard = () => {

    if (!user) {
      return alert("Bạn phải đăng nhập để sử dụng chức năng này");
    }
  if(Number(currentColor?.quantity)!<1){
        notify("error", "Sản phẩm tạm thời hết hàng")
       return false
      }
      else{
        const priceProduct = document.querySelector(
          "#priceProduct"
        ) as HTMLInputElement;
        let arr = [];
    
        if (localStorage.getItem(user.email)) {
          arr = JSON.parse(localStorage.getItem(user.email)!);
        }
    
        const index = arr.find((item: IProduct) => item._id == product!._id && item.version==currentVersion?.version_id.version && item.colorName == currentColor?.color_id.color);
        
        if (index) {
         if(currentColor?.quantity! >index.quantity ){
          index.quantity = Number(index.quantity) + 1;
         }
         else{
          notify("error","Sản phẩm tạm thời hết hàng")
          return false
         }
        } else {
            arr.push({
              _id: product?._id,
              name: product?.name,
              images: product?.images,
              price: priceProduct.value,
              version: currentVersion?.version_id.version,
              colorName: currentColor?.color_id.color,
              quantity: 1,
              colorIndex: currentColor?.index,
              versionIndex: currentVersion?.index,
              maxQuantity: currentColor?.quantity,
            });
      }
  
      localStorage.setItem(user.email, JSON.stringify(arr));
      const temp = JSON.parse(localStorage.getItem(`${user.email}`)!);
      notify("success","Sản phẩm đã được thêm vào giỏ hàng");
      handleCartLenthg(temp.length)
    }

    
    

  
  };
  const changeCurrentColor = (color: IColor, index: number) => {
    const btn_color = document.querySelectorAll(".color");
    for (let i = 0; i < btn_color.length; i++) {
      btn_color[i].className =
        "color rounded-[35px] w-[35px] h-[35px] p-[3px] ";
    }
    btn_color[index].className =
      "border-2 border-blue-500 color rounded-[35px] w-[35px] h-[35px] p-[3px]";
      color.index = index
    setCurrentColor(color);
  };
  const changeCurrentVersion = (version: IAttribute, index: number) => {
    const btn_version = document.querySelectorAll(".version");
    for (let i = 0; i < btn_version.length; i++) {
      btn_version[i].className =
        "version border-[1px]  rounded-md w-[65px] text-[#86868F] px-[10px] py-[7px] ";
    }
    btn_version[index].className =
      " version border-[2px]  rounded-md w-[65px] border-blue-500 text-[#86868F] px-[10px] py-[7px] ";
      version.index = index
    setCurrentVersion(version);
  };




  let discount = 100 - product!?.discount;
  discount = Number("0" + "." + discount);
  return (
    <>
      <div className="mt-[115px] max-md:mt-[80px] max-w-[1400px] m-auto">
        <div className="pt-4 xl:px-[150px] max-xl:px-[10px] md:px[4px]   max-lg:px-[20px]  ">
          <div className="grid xl:grid-cols-4 max-lg:gap-10 max-md:gap-10 lg:grid-cols-4 lg:gap-7 md:grid-cols-2  max-lg:grid-cols-1 max-md:grid-cols-1 ">
            <div className="product  col-span-2  ">

            <ProductThumbs images={product?.images} />
            </div>

            <div className=" xl:col-span-2 lg:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="mb-4 font-bold text-[19px]">{product?.name} {currentVersion?.version_id.version} {currentColor?.color_id.color}</h1>
                <div className="flex gap-4">
                  <span className="my-auto text-[#667080] font-bold ">
                    Dung lượng:
                  </span>
                  {product?.attributes.map((item, index) => {
                    return (
                      <button
                        onClick={() => {
                          changeCurrentVersion(item, index);
                        }}
                        className=" first-of-type:border-blue-500 cursor-pointer version border-[1px]  rounded-md w-[65px] text-[#86868F] px-[10px] py-[7px]"
                      >
                        {item.version_id.version}
                      </button>
                    );
                  })}
                </div>

                <div className="flex my-[20px] gap-4 ">
                  <span className="my-auto text-[#667080] font-bold ">
                    Màu:
                  </span>
                  {color?.map((item) => {
                    if (item.version_id.version === currentVersion!.version_id.version) {
                      return item.colors.map((color, index) => {
                        if(Number(color.quantity)>0){
                          return (
                            <>
                              <div className="first-of-type:border-2 cursor-pointer border-blue-500 color rounded-[45px] w-[35px] h-[35px] p-[3px] ">
                                <button
                                  onClick={() => {
                                    changeCurrentColor(color, index);
                                  }}
                                  style={{ backgroundColor: color.color_id.colorCode }}
                                  className="h-full w-full rounded-[45px]"
                                ></button>
                              </div>
                            </>
                          );
                        }
                      });
                    }
                  })}
                  <span className="my-auto text-[#667080] font-bold ">
                    Số lượng:
                  </span>
                  <span className="my-auto text-[#667080] font-bold ">
                    {currentColor?.quantity}
                  </span>
                </div>
                <div className="flex ">
                  <input
                    type="hidden"
                    id="priceProduct"
                    value={product?.discount!>0?Math.ceil((product?.original_price!+ Number(currentColor?.price!)) * discount) :product?.original_price!+Number(currentColor?.price!)}
                  />
                  <p className="text-[24px] text-red-500 font-bold">
                    
   {product?.discount!>0?formatprice(Math.ceil((product?.original_price!+ Number(currentColor?.price!)) * discount)):formatprice(product?.original_price!+Number(currentColor?.price!))}
                  </p>
                  
                </div>
               
              <div className="flex gap-5 max-sm:w-[100%] max-lg:justify-between lg:mt-[50px]">
                <button
                  onClick={() => {
                    handleAddToCard();
                  }}
                  className=" bg-red-500 text-white font-bold rounded-md w-[60%] h-[60px] mb-1"
                >
                  Mua ngay
                </button>
               
                <button
                  className="border-2 border-red-500 min-w-[60px] text-center rounded-md h-[59px] "
                  onClick={() => {
                    handleAddToCard();
                  }}
                >
                  <svg
                    className="mx-auto  "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.1477 3.25H4.33514L3.15497 1.1346C3.0225 0.897154 2.7719 0.75 2.5 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5C0.25 1.91421 0.585786 2.25 1 2.25H2.0596L3.22429 4.33765L5.91037 10.2809L5.91312 10.2869L6.14971 10.8104L3.45287 13.687C3.25895 13.8939 3.19825 14.1924 3.29599 14.4585C3.39372 14.7247 3.63317 14.913 3.91486 14.9452L6.37299 15.2261C9.44767 15.5775 12.5524 15.5775 15.627 15.2261L18.0852 14.9452C18.4967 14.8981 18.7922 14.5264 18.7452 14.1148C18.6981 13.7033 18.3264 13.4078 17.9149 13.4549L15.4567 13.7358C12.4952 14.0742 9.50481 14.0742 6.54331 13.7358L5.56779 13.6243L7.54717 11.513C7.56632 11.4925 7.5841 11.4713 7.60052 11.4494L8.35334 11.5474C9.40826 11.6847 10.4746 11.7116 11.5351 11.6277C14.0086 11.4321 16.301 10.2551 17.9015 8.35907L18.4795 7.67425C18.499 7.65125 18.517 7.62711 18.5335 7.60194L19.6109 5.96009C20.3745 4.79633 19.5397 3.25 18.1477 3.25ZM7.65627 9.94405C7.49086 9.92253 7.34823 9.81745 7.27858 9.66604L7.27725 9.66311L5.05674 4.75H18.1477C18.3466 4.75 18.4658 4.9709 18.3567 5.13716L17.3042 6.74123L16.7552 7.39152C15.4132 8.98139 13.4909 9.96832 11.4169 10.1324C10.4603 10.208 9.49842 10.1837 8.54688 10.0599L7.65627 9.94405Z"
                      fill="#D70018"
                    />
                    <path
                      d="M5.5 16.5C4.67157 16.5 4 17.1716 4 18C4 18.8284 4.67157 19.5 5.5 19.5C6.32843 19.5 7 18.8284 7 18C7 17.1716 6.32843 16.5 5.5 16.5Z"
                      fill="#D70018"
                    />
                    <path
                      d="M15 18C15 17.1716 15.6716 16.5 16.5 16.5C17.3284 16.5 18 17.1716 18 18C18 18.8284 17.3284 19.5 16.5 19.5C15.6716 19.5 15 18.8284 15 18Z"
                      fill="#D70018"
                    />
                  </svg>
                </button>
              </div>
              </div>
             
          
            </div>
          </div>
          <div className="bg-[#F2F2F2] p-4 rounded-md mt-[80px] mb-4">
            <h2 className="text-red-500 text-center font-medium mb-4">
              ĐẶC ĐIỂM NỔI BẬT
            </h2>
            <ul className="list-disc pl-[10px]">
              {product?.specifications.map((item) => {
                return (
                  <li className="text-[14px] leading-8"> {item?.value}</li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-[21px] my-[5px]">Mô tả</h1>
              {product?.description}
          </div>
          <h1 className="font-bold text-[21px] mt-[15px]">Sản phẩm liên quan</h1>
          <div className="pt-[30px] grid xl:grid-cols-4 lg:grid-cols-4 max-lg:grid-cols-3  gap-5   max-sm:gap-2 max-w-[1200px] lg:m-auto  max-sm:grid-cols-2 max-sm:px-[10px] max-xl:px-[20px] 2xl:grid-cols-5 pl-[10px]">
        { relatedProduct?.map((item:IProduct) => {
          let discount = 100 - item.discount
          discount = Number("0"+ "." + discount)

          
          return<>
           <a  className="p-[20px] max-sm:p-[10px] relative border rounded-xl cursor-pointer  shadow-md hover:shadow-xl" href={"/products/"+item._id}>
               {item.discount>0&& <div className="p-[5px] font-medium absolute top-[10px] left-[-5px]  text-white bg-red-500 leading-4  text-[14px] rounded-r-[3px]">
              Giảm {item.discount}%
              <div className="after:content-[''] filter: brightness-[60%] border-t-[7px] border-t-[#E01020]  border-l-[7px] border-l-transparent absolute left-[0px] bottom-[-6px]">

              </div>
            </div>}
          <img
            alt="Art"
            src={item.images?.[0]}
            className=""
          />
      
          <h4 className="text-[14px] font-bold max-lg:text-[12px]">{item.name} {item.attributes[0].version_id.version}</h4>
          <div className="flex justify-between max-lg:flex-wrap" >
            {item.discount>0?<p className="font-bold text-red-500 text-[16px] max-sm:text-[13px]">{formatprice(Math.ceil((item.original_price+Number(item.attributes[0].colors[0].price))*discount))}</p>:<p className="font-bold text-red-500 text-[16px] max-sm:text-[13px]">{formatprice(item.original_price+Number(item.attributes[0].colors[0].price))}</p>}
            {item.discount>0&&<p className="text-[12px] leading-7 text-[#707070] max-sm:text-[11px] line-through">{formatprice(item.original_price + Number(item.attributes[0].colors[0].price))}</p>}
          </div>
    
        </a>
          </>
        })} 

        </div>
        </div>
     
 
      </div>
    </>
  );
};

export default DetailProduct;
