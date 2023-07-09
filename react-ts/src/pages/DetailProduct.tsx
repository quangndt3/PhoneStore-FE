import React, { useContext, useEffect, useState } from "react";
import { IProduct, IComment, IAddComment, IColor, IAttribute } from "../models";
import { useNavigate, useParams } from "react-router-dom";
import formatprice from "../sub";
import { getOne, remove } from "../api/products";
import { addComment, removeComments } from "../api/comments";
import ProductThumbs from "../components/productThumbs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { number } from "joi";
interface Iprops{
  handleCartLenthg(value:number):void
}
const DetailProduct = ({handleCartLenthg}:Iprops) => {
  const [product, setProduct] = useState<IProduct>();
  const [color, setColor] = useState<IAttribute[]>();
  const [currentVersion, setCurrentVersion] = useState<IAttribute>();
  const [currentColor, setCurrentColor] = useState<IColor>();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getOne(id!).then(({ data }) => {
      console.log(data);

      setColor(data.attributes);
      setProduct(data);
      setCurrentVersion(data.attributes[0]);
      setCurrentColor(data.attributes[0].colors[0]);
    });
  }, []);

  useEffect(() => {
    setCurrentVersion(currentVersion);
    setCurrentColor(currentVersion!?.colors[0]);
  }, [currentVersion]);
  var user = JSON.parse(localStorage.getItem("acc")!);
  const handleAddComment = () => {
    if (!user) {
      return alert("Bạn phải đăng nhập để sử dụng chức năng này");
    }
    const comment = document.querySelector("#comment") as HTMLTextAreaElement;

    const Arr: IAddComment = {
      content: comment.value,
      userId: user._id,
      productId: product!._id,
    };
    addComment(Arr).then(() => {
      notify("Bình luận thành công");
      getOne(id!).then(({ data }) => {
        setProduct(data);
      });
    });

    comment.value = "";
  };
  const handleAddToCard = () => {
    if (!user) {
      return alert("Bạn phải đăng nhập để sử dụng chức năng này");
    }
    const quantity = (document.querySelector("#quantity") as HTMLInputElement)
      .value;
    const priceProduct = document.querySelector(
      "#priceProduct"
    ) as HTMLInputElement;
    let arr = [];

    if (localStorage.getItem(user._id)) {
      arr = JSON.parse(localStorage.getItem(user._id)!);
    }

    const index = arr.find((item: IProduct) => item._id == product!._id);

    if (
      index &&
      index.colorName === currentColor?.colorName &&
      index.version === currentVersion?.version
    ) {
      index.quantity = Number(index.quantity) + Number(quantity);
    } else {
      arr.push({
        _id: product?._id,
        name: product?.name,
        images: product?.images,
        price: priceProduct.value,
        version: currentVersion!.version,
        colorName: currentColor!.colorName,
        quantity: quantity,
      });
    }

    localStorage.setItem(user._id, JSON.stringify(arr));
    const temp = JSON.parse(localStorage.getItem(`${user._id}`)!);
    notify("Sản phẩm đã được thêm vào giỏ hàng");
    handleCartLenthg(temp.length)
  };
  const changeCurrentColor = (color: IColor, index: number) => {
    const btn_color = document.querySelectorAll(".color");
    for (let i = 0; i < btn_color.length; i++) {
      btn_color[i].className =
        "color rounded-[35px] w-[35px] h-[35px] p-[3px] ";
    }
    btn_color[index].className =
      "border-2 border-blue-500 color rounded-[35px] w-[35px] h-[35px] p-[3px]";
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
    setCurrentVersion(version);
  };

  // const desc = () => {
  //   return product?.description;
  // };
  const handleRemoveComment = (idComment: string) => {
    removeComments(idComment).then(() => {
      getOne(id!).then(({ data }) => {
        setProduct(data);
      });
    });
  };
  const notify = (content:string) =>
    toast.success(`${content}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // const checkQuantity = () => {
  //   const quantity = document.querySelector("#quantity") as HTMLInputElement;
  //   if (Number(quantity.value) <= 0) {
  //     alert("Số lượng sản phẩm phải lớn hơn 0");
  //     quantity.value = "1";
  let discount = 100 - product!?.discount;
  discount = Number("0" + "." + discount);
  return (
    <>
      <div className="mt-[145px] max-md:mt-[80px] max-w-[1400px] m-auto">
        <div className="pt-4 xl:px-[150px] max-xl:px-[10px] md:px[4px]   max-lg:px-[20px]  ">
          <div className="grid xl:grid-cols-4 max-lg:gap-10 max-md:gap-10 lg:grid-cols-4 lg:gap-7 md:grid-cols-2  max-lg:grid-cols-1 max-md:grid-cols-1 ">
            <div className="product  col-span-2  ">

              <ProductThumbs images={product?.images} />
            </div>

            <div className=" xl:col-span-2 lg:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="mb-4 font-bold text-[19px]">{product?.name}</h1>
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
                        className=" first-of-type:border-blue-500 version border-[1px]  rounded-md w-[65px] text-[#86868F] px-[10px] py-[7px]"
                      >
                        {item.version}
                      </button>
                    );
                  })}
                </div>

                <div className="flex my-[20px] gap-4 ">
                  <span className="my-auto text-[#667080] font-bold ">
                    Màu:
                  </span>
                  {color?.map((item) => {
                    if (item.version === currentVersion!.version) {
                      return item.colors.map((color, index) => {
                        return (
                          <>
                            <div className="first-of-type:border-2 border-blue-500 color rounded-[45px] w-[35px] h-[35px] p-[3px] ">
                              <button
                                onClick={() => {
                                  changeCurrentColor(color, index);
                                }}
                                style={{ backgroundColor: color.colorCode }}
                                className="h-full w-full rounded-[45px]"
                              ></button>
                            </div>
                          </>
                        );
                      });
                    }
                  })}
                </div>
                <div className="flex ">
                  <input
                    type="hidden"
                    id="priceProduct"
                    value={
                      product?.original_price! * discount +
                      Number(currentColor?.price!)
                    }
                  />
                  <p className="text-[24px] text-red-500 font-bold">
                    {formatprice(
                      product?.original_price! * discount +
                        Number(currentColor?.price!)
                    )}
                  </p>
                  
                </div>
                <form action="">
                <input
                  // onChange={checkQuantity}
                  id="quantity"
                  type="number"
                  defaultValue={1}
                  className="rounded-md max-lg:my-[10px] max-lg:w-[100%] lg:mt-[10px]"
                />
              </form>
              <div className="flex gap-5 max-sm:w-[100%] max-lg:justify-between lg:mt-[50px]">
                <button
                  onClick={() => {
                    handleAddToCard();
                  }}
                  className=" bg-red-500 text-white font-bold rounded-md w-[60%] h-[60px] mb-1"
                >
                  Mua ngay
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  limit={3}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
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
            <ul>
              {product?.specifications.map((item) => {
                return (
                  <li className="text-[14px] leading-8"> {item?.value}</li>
                );
              })}
            </ul>
          </div>
          <div>
            {/* <p dangerouslySetInnerHTML={{ __html: desc()! }}></p> */}
          </div>
        </div>
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
          <div className="max-w-2xl lg:pl-[130px] md:pl-[30px]  px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Bình luận ({product?.comments.length})
              </h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Viết một bình luận..."
                  required
                ></textarea>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleAddComment();
                }}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-600 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Gửi bình luận
              </button>
            </form>
            {product?.comments.map((item) => {
              if (user && user.role === "admin") {
                return (
                  <article className="xoa p-6 mb-6 text-base border-t border-gray-200 bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                          <img
                            className="mr-2 w-[60px] h-[60px] rounded-full"
                            src={item.userId.images}
                            alt="Michael Gough"
                          />
                          {item.userId.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-sm:hidden">
                          {item.createdAt}
                        </p>
                      </div>
                      <button
                        id="dropdownComment1Button"
                        data-dropdown-toggle="dropdownComment1"
                        className="btn_remove inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                        data-id={item._id}
                        onClick={() => {
                          handleRemoveComment(item._id!);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#000000"
                          version="1.1"
                          id="Capa_1"
                          width="20px"
                          height="20px"
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
                        <span className="sr-only">Comment settings</span>
                      </button>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {item.content}
                    </p>
                  </article>
                );
              }
              return (
                <article className="xoa p-6 mb-6 text-base border-t border-gray-200 bg-white rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          className="mr-2 w-[60px] h-[60px] rounded-full"
                          src={item.userId.images}
                          alt="Michael Gough"
                        />
                        {item.userId.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-sm:hidden">
                        {item.createdAt.split("T")}
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.content}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailProduct;
