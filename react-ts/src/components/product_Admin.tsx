import { useNavigate } from "react-router-dom";
import { IAttributeForm, IData, IProduct } from "../models";
import formatprice from "../sub";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { skipContext } from "../pages/HomePages";

type Props = {
  data: IData;
  setSkipCallBack: (value: number) => void;
  deleteProduct: (id: string) => void;
};

function Items({ currentItems,deleteProduct }: any) {
  const navigate = useNavigate();
  const onNavigate = (id: string) => {
    navigate(`/admin/product/update/${id}`);
  };

  return (
    <>
      {currentItems &&
        currentItems.map((item: IProduct) => (
          <tr key={item._id} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 ">
                <div className="font-medium text-gray-700">{item.name}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              <span>
                <img className="w-[200px]" src={item.images[0]} alt="" />
              </span>
            </td>
            <td className="px-6 pr-[20px] py-4 ">
                {item.attributes.map(attribute=>{
                              let discount = 100 - item!?.discount;
                              discount = Number("0" + "." + discount);
                
                return(
                 <>
                 <div className="w-auto flex justify-between mt-[10px]">
                 <span className="my-auto min-w-[40px] ">{attribute.version_id?.version}:  </span>
              <div className="flex flex-col pl-[15px] ">
                 {attribute.colors.map(color=>{
                  
                  return<>
               
                  <span>{color?.color_id?.color}: {formatprice(Math.ceil(Number((item.original_price+color.price))*discount))}</span>
                  </>
                 })}
                 </div>
                 </div>

                  </>
                )
              })}
            </td>
            
            <td className="px-6 py-4 text-center ml-[10px]">
              <span className="w-[10px]" >{item.discount}%</span>
            </td>
            <td className="px-6 py-4">
              {item.attributes.map(item=>{
                
                
                return(
                 <>
                 <div className="w-[100px] flex justify-between mt-[10px]">
                 <span className="my-auto min-w-[40px] ">{item.version_id?.version}:  </span>
              <div className="flex flex-col pl-[15px] ">
                 {item.colors.map(item=>{
                  
                  return<>
               
                  <span>{item?.color_id?.color}:{item.quantity}</span>
                  </>
                 })}
                 </div>
                 </div>

                  </>
                )
              })}
            
            </td>

            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                  <button onClick={() => onNavigate(item._id)}>Update</button>
                </span>
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}
const ProductAmin = (props: Props) => {
  const [data, setData] = useState<IData>(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props]);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const currentItems: IProduct[] = data?.results;
  const pageCount = Math.ceil(data?.TotalProducts / itemsPerPage);
  const abc = data?.results?.length;
  const setSkip = (skip: number) => {
    props.setSkipCallBack(skip);
  };
  console.log(abc);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data?.TotalProducts;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setSkip(newOffset);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1200px]">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 overflow-auto">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Giá
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Giảm giá
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Số lượng
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <a href="/admin/product/add">Thêm sản phẩm</a>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <Items currentItems={currentItems} deleteProduct ={props.deleteProduct}  />
          </tbody>
        </table>
      </div>

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

export default ProductAmin;
