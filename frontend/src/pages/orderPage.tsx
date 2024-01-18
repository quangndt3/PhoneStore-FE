import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../storage"
import { fetchOrder, updateOrders } from "./slice/order.slice"
import { useEffect } from "react"
import orderStatus from "../orderstatus"
import { RestoreProductQuantity } from "../api/products"
import { IOrder } from "../models"

const OrderPage = ()=>{
    const { order, isLoading } = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch<AppDispatch>()
    const user = JSON.parse(localStorage.getItem("user")!);
    const handleFetchCate = async () => {
        try {
          const data = await dispatch(fetchOrder(user.data._id)).unwrap()      
        } catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
        handleFetchCate()
      },[] );
     
      const handleCancelOrder = async (order:any)=>{
      const confirm = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không ?")
      if(confirm){
        try {

     
          let tempStatus = {...order}
          tempStatus.status = 4
 
          
          const temp={
              order: tempStatus,
              id: order._id
          }          
          const data = await dispatch(updateOrders(temp)).unwrap()    
        order.products.map( async (item) =>{
          await RestoreProductQuantity(item._id,item.versionIndex,item.colorIndex,item.quantity)
        })
        handleFetchCate()
        } catch (err) {
          console.log(err);
        }
      }
      }
    return<>
<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md  w-[70%] m-auto mt-[100px]">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500  ">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tên người nhận hàng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Số điện thoại</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Địa chỉ</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Trạng thái đơn hàng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    {order?.map(item=>{
        return<>
         <tr className="hover:bg-gray-50">

<td className="px-6 py-4">{item.name}</td>
  <td className="px-6 py-4">{item.phonenumber}</td>
  <td className="px-6 py-4">{item.address}</td>
  <td className="px-6 py-4">
    <div className="flex gap-2 ">
      <span
        className="w-full  text-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
      >
        {orderStatus(item.status)}
      </span>
    </div>
  </td>
  <td className="px-6 py-4">
    <div className="flex justify-end gap-4 ">
   
      <a x-data="{ tooltip: 'Edite' }" href={"orders/detail/"+item._id}>
          Chi tiết
      </a>
    </div>
  </td>
  {item.status <=1 && <td className="px-6 py-4">
    <div className="flex justify-end gap-4 ">
   
      <button x-data="{ tooltip: 'Edite' }" onClick={()=>handleCancelOrder(item)} >
          Huỷ đơn
      </button>
    </div>
  </td>}
</tr>
        </>
       })}

     
    </tbody>
  </table>
</div>
    </>
}
export default OrderPage