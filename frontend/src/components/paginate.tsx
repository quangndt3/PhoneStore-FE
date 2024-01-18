import { useNavigate } from "react-router-dom";
import { IData, IProduct } from "../models";
import formatprice from "../sub";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { skipContext } from "../pages/HomePages";

type Props = {
   data:IData
   setSkipCallBack:(value:number)=>void
}
type PropsItem = {
  data:IData
}

export const Items = (props:PropsItem) =>{
  
  const currentItems = props.data?.results
  const navigate = useNavigate();
  const onNavigate = (id:string) => {
    navigate(`/products/${id}`)
  }
  
  return (
 



    <>  
    {currentItems &&
        currentItems.map((item:IProduct) => {
          let discount = 100 - item.discount
          discount = Number("0"+ "." + discount)

          
          return<>
           <a  className="p-[20px] max-sm:p-[10px] relative border rounded-xl cursor-pointer  shadow-md hover:shadow-xl" onClick={() => onNavigate(item._id)}>
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
            {item.discount>0&&<p className="text-[14px] leading-7 text-[#707070] max-sm:text-[11px] line-through">{formatprice(item.original_price + Number(item.attributes[0].colors[0].price))}</p>}
          </div>
    
        </a>
          </>
        })}
       
    </>
  );
}
export const Product = (props:Props) => {

  
  const [data,setData] = useState<IData>(props.data)
  useEffect(()=>{
    setData(props.data)
  },[props])

  
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage=8  
  const currentItems:IProduct[] = data?.results
  const pageCount = Math.ceil(data?.TotalProducts / itemsPerPage);
  const abc = data?.results?.length
  const setSkip = (skip:number)=>{
    props.setSkipCallBack(skip)
  }
  console.log(itemOffset);
  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % data?.TotalProducts;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setSkip(newOffset)  
  };


  return (
    <>
  <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination list-none flex w-auto w-full justify-center items-center mt-[50px] "
        pageLinkClassName="page-num py-[8px] px-[15px] border-[1px] rounded-sm cursor-pointer hover:bg-[#4F46E5]  hover:text-white "
        previousLinkClassName="page-num py-[8px] px-[15px]  border-[1px] cursor-pointer hover:bg-[#4F46E5] hover:text-white text-[#A8AFB9] rounded-s-lg"
        nextLinkClassName="page-num py-[8px] px-[15px] border-[1px] rounded-sm cursor-pointer hover:bg-[#4F46E5] hover:text-white  text-[#A8AFB9] rounded-e-lg"
        activeClassName="active bg-[#4F46E5] pb-[6.2px] pt-[7px]  text-white border-[0px]"
      />

    </>

  );
};
