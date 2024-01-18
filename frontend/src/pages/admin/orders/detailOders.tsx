import { useDispatch, useSelector } from "react-redux"


import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../../storage"
import { fetchOrderDetail } from "../../slice/order.slice"
import formatprice from "../../../sub"


const OrderDetailAmin = ()=>{
    const { order, isLoading } = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch<AppDispatch>()
    const user = JSON.parse(localStorage.getItem("user")!);
    const {id} = useParams()
    const handleFetchCate = async () => {
        try {
          const data = await dispatch(fetchOrderDetail(id!)).unwrap()      
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        handleFetchCate()
      },[] );
      console.log(order);
      let total
    return<>
<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md ml-[30px] w-[130%] m-auto mt-[100px]">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500  ">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tên sản phẩm</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ảnh</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Phiên bản</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Số lượng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Giá</th>

        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Thành tiền</th>
      </tr>

    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    {order?.products?.map(item=>{
        return<>
         <tr className="hover:bg-gray-50">

    <td className="px-6 py-4">{item.name}</td>
  <td className="px-6 py-4"><img className="w-[100px]" src={item.images[0]} alt="" /></td>
  <td className="px-6 py-4">{item.version}/{item.colorName}</td>
  <td className="px-6 py-4">{item.quantity}</td>
  <td className="px-6 py-4">{formatprice(item.price)}</td>
  <td className="px-6 py-4">{formatprice(Number(item.price*item.quantity))}</td>


</tr>
        </>
       })}
      <tr>
        <td  colSpan={5} className="text-center font-bold py-[10px]">Tổng</td>
        <td  className="text-center font-bold py-[10px] pr-[50px]">{formatprice(order.total)}</td>
      </tr>
     
    </tbody>
  </table>
</div>
    </>
}
export default OrderDetailAmin