import React, {  useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import { ICategory, IProduct, IUser } from "../models";
const dangxuat = ()=>{
  localStorage.removeItem("acc")
  localStorage.removeItem("user")
  window.location.href="/"
}
const dashboard = (role:string) => {
  if(role=="admin"){
    return (
      <li className="block w-full">
        <a
          href="#"
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          role="menuitem"
        >
          <div className="inline-flex items-center"><a href="/admin/products">Trang quản trị</a></div>
        </a>
      </li>
    );
  }
};
const showUserMobile = (temp:IUser)=>{
  if(temp){
    return(
      <>
                {dashboard(temp.role)}
                <li className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"  onClick={dangxuat}>Đăng xuất</li>
      </>
    
    )
  }
  else{
    return(
      <li className="text-center p-3 hover:bg-[#cccccc]"><a className="block" href="/user/login">abc</a></li>
    )
  }
}
const showUser= (temp:IUser)=>{
  if(temp){
    return(
      <>
      <details className="dropdown mb-32 max-md:hidden">
  <summary className="flex mt-[10px]" ><img
                className="w-[50px] h-[50px] rounded-[50%] mr-3"
                src={temp.images}
                alt=""
              /></summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute">
  {dashboard(temp.role)}
  <li className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"  onClick={dangxuat}>Đăng xuất</li>
  </ul>
</details>
                {/* {dashboard(temp.role)}
                <li onClick={dangxuat}>Đăng xuất</li> */}
      </>
    
    )
  }
  else{
    return(
      <a className=" hidden md:block text-white leading-[60px]" href="/user/login">Đăng nhập</a>
    )
  }
}
interface Iprops{
  cartLength:number
}
const WebsiteLayout = ({cartLength}:Iprops) => {
  const user = JSON.parse(localStorage.getItem("acc")!);
  const [cart, setCart] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(`${user?._id}`)!));
  }, []);

  const handleToggleFilter = ()=>{
    const mobile_filter = document.querySelector(".mobile-filter")
    const overlay = document.querySelector(".overlay")
    const logout = document.querySelector(".logout")
    mobile_filter!.classList.toggle("translate-x-[-100%]")
    overlay!.classList.toggle("hidden")
 
  }

  const handleSearchProductByName = (e:any)=>{

    e.preventDefault()
    const searchInput = (document.querySelector("#search") as HTMLInputElement)
   if(searchInput.value!=""&& searchInput.value!=null){
    navigate(`search?name=${searchInput.value}`)
   }
  }
  const handleSearchProductByName_moblie = (e:any)=>{

    e.preventDefault()
    const searchInput = (document.querySelector("#search_moblie") as HTMLInputElement)
    console.log(searchInput.value);
    handleToggleSearchMobile()
   if(searchInput.value!=" "&& searchInput.value!=null){
    navigate(`search?name=${searchInput.value}`)
   }
  }
  
  const handleToggleSearchMobile = ()=>{
    const search_mobile = document.querySelector(".search-mobile") 
    search_mobile!.classList.toggle("hidden")
  }

  return (
    <>



      <header className=" h-[64px]  fixed top-0 right-0 left-0 bg-[#515154] z-10 max-sm:px-[10px] max-xl:px-[20px]">
      <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.3)] hidden "></div>
    <div className="z-20 relative hidden search-mobile">
      <div className="bg-black fixed top-0 left-0 right-0 h-[70px]  z-50 max-sm">
      <div className=" relative mx-auto text-gray-600 w-2/4 pt-[20px] max-sm:w-[80%]">

    <form action="" onSubmit={handleSearchProductByName_moblie} >
    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full z-40"
          type="search" id="search_moblie"   placeholder="Search"/>
        <button  className="absolute right-0 top-1  mr-4 cursor-pointer h-full " >
          <svg className="text-gray-600 h-4 w-4 fill-current mt-[10px]" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" xmlSpace="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
    </form>

      </div>
      </div>
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.3)]  z-20" onClick={handleToggleSearchMobile}></div>

    </div>
        <div className="  flex justify-between h-full max-w-[1185px]  lg:m-auto ">
        <div className="mb-[20px] hidden max-md:block my-[10px]">
        <button type="button" >
          {user?<img
                onClick={()=>{handleToggleFilter()}}
                className="w-[50px] h-[50px] rounded-[50%] mr-3"
                src={user.images}
                alt=""
              />:<a href="/user/login"><svg className="w-[40px] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="user">
              <path fill="#FFFFFF" d="M7.763 2A6.77 6.77 0 0 0 1 8.763c0 1.807.703 3.505 1.98 4.782a6.718 6.718 0 0 0 4.783 1.981 6.77 6.77 0 0 0 6.763-6.763A6.77 6.77 0 0 0 7.763 2ZM3.675 13.501a5.094 5.094 0 0 1 3.958-1.989c.024.001.047.007.071.007h.023c.022 0 .042-.006.064-.007a5.087 5.087 0 0 1 3.992 2.046 6.226 6.226 0 0 1-4.02 1.468 6.212 6.212 0 0 1-4.088-1.525zm4.032-2.494c-.025 0-.049.004-.074.005a2.243 2.243 0 0 1-2.167-2.255 2.246 2.246 0 0 1 2.262-2.238 2.246 2.246 0 0 1 2.238 2.262c0 1.212-.97 2.197-2.174 2.232-.028-.001-.056-.006-.085-.006Zm4.447 2.215a5.594 5.594 0 0 0-3.116-2.052 2.749 2.749 0 0 0 1.428-2.412A2.747 2.747 0 0 0 7.704 6.02a2.747 2.747 0 0 0-2.738 2.762 2.73 2.73 0 0 0 1.422 2.386 5.602 5.602 0 0 0-3.081 1.995 6.22 6.22 0 0 1-1.806-4.398 6.27 6.27 0 0 1 6.263-6.263 6.27 6.27 0 0 1 6.263 6.263 6.247 6.247 0 0 1-1.873 4.457z"/></svg></a>}
        </button>

        <div className="mobile-filter z-10 fixed top-0 left-0 bottom-0 bg-white w-[320px] max-w-[100%] translate-x-[-100%] transition duration-500 ">
        <svg onClick={()=>{handleToggleFilter()}} className="w-[20px] absolute right-3 top-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
        <h1 className="text-center text-[20px] font-medium mt-[40px]"></h1>
        <ul >
          {showUserMobile(user)}
        </ul>
        </div>
      </div>
         <a href="/" className=" my-[10px] w-[15  0px] ">
         <img
            className="max-w-[173px] max-h-[64px] w-full"
            src=" https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
            alt=""
          />
         </a>

     <div className="pt-2   text-gray-600 w-2/4 max-md:hidden relative">
<form action=""  onSubmit={handleSearchProductByName}>
<input className="border-2h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
          type="search"  id="search" name="search" placeholder="Search"/>
        <button  className="absolute right-0 top-0 mt-5 mr-4">
          <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" xmlSpace="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
</form>
      </div>
     
          <div className="flex gap-4 ">
          <button type="button" id="icon_search_moblie" onClick={handleToggleSearchMobile} className=" max-md:block hidden">
          <svg className="text-white h-5  fill-current w-[30px]" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" xmlSpace="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
            <a href="/cart" className="max-sm:hidden relative">
             
              <div className="bg-white absolute min-w-[20px] h-[20px] rounded-[300px] bottom-[15px] right-[2px] text-red-500 leading-[20px] text-center font-bold">{cartLength?cartLength:"0"}</div>
              <svg className="w-[30px] h-[30px]  mt-4 " xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 902.86 902.86" xmlSpace="preserve">
<g>
	<g>
		<path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z     M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
		<path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717    c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744    c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742    C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744    c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z     M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742    S619.162,694.432,619.162,716.897z"/>
	</g>
</g>
</svg>
            </a>
            {/* <div className="bg-white rounded-[50%] text-center w-[20px] h-[20px] absolute top-8 left-4 text-red-500 font-medium leading-5">
        
            </div> */}
          {showUser(user)}
          </div>

 
        </div>
        <div className="bg-red-500 fixed right-4 bottom-4 rounded-[50%] w-[60px] h-[60px] hidden justify-center  flex-col max-sm:flex  ">
        <svg className="w-[30px] h-[30px]   m-auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 902.86 902.86" xmlSpace="preserve">
<g>
	<g>
		<path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z     M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
		<path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717    c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744    c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742    C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744    c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z     M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742    S619.162,694.432,619.162,716.897z"/>
	</g>
</g>
</svg>

        </div>
      </header>
      {/* Content */}
      <Outlet />
   <footer className="bg-[#1D1D1F] text-white lg:px-[146px] max-md:grid-cols-2 grid max-lg:grid-cols-5  lg:grid-cols-5 pt-[64px] gap-[50px] mt-[200px]">
    <div className="md:col-span-2 max-md:col-span-2 max-md:px-[10px]" >
      <img className="w-[184px]" src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png" alt="" />
      <p className="block text-justify py-[8px] my-[10px]">
      Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người dùng Việt Nam.
      </p>
      <div className="flex">
        <div className="w-[56px]">
<img src="https://shopdunk.com/Themes/SD/Content/images/Face.png" alt="" />
        </div>
        <div className="w-[56px]">
<img src="https://shopdunk.com/Themes/SD/Content/images/Youtube.png" alt="" />
        </div>
        <div className="w-[56px]">
<img src="https://shopdunk.com/Themes/SD/Content/images/Zalo.png" alt="" />
        </div>
      </div>
    </div>
    <div>
      <div className="text-white mb-[15px] md:col-span-1 ">
        <strong>Thông tin</strong>
      </div>
      <ul>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Tin tức</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Giới thiệu</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Check IMEI</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Phương thức thanh toán</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Thuê điểm bán lẻ</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Bảo hành và sửa chữa</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Tuyển dụng</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Đánh giá chất lượng, khiếu nại</li>
      </ul>
    </div>
    <div>
      <div className="text-white mb-[15px]">
        <strong>Chính sách</strong>
      </div>
      <ul>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Thu cũ đổi mới</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Giao hàng</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Giao hàng (ZaloPay)</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Huỷ Giao hàng</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Đổi trả</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Bảo hành</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Dịch vụ</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Giả quyết khiếu nại</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Bảo mật thông tin</li>
      </ul>
    </div>
    <div>
      <div className="text-white mb-[15px]">
        <strong>Địa chỉ & Liên hệ</strong>
      </div>
      <ul>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Tài khoản của tôi</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Đơn đạt hàng</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Hệ thống của hàng</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Tìm Store trên Google Map</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Mua hàng: 19006626</li>
        <li className="text-[13px] text-[#86868B] leading-[28px]">Doanh nghiệp: 0822688668</li>
      </ul>
    </div>
   </footer>
    </>
  );
};

export default WebsiteLayout;
