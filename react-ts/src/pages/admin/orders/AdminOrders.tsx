import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../storage"
import { fetchOrder, fetchOrderAll, updateOrder, updateOrders } from "../../slice/order.slice"
import { useEffect } from "react"
import orderStatus from "../../../orderstatus"

const AdminOrder = ()=>{
    const { order, isLoading } = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch<AppDispatch>()
    const handleFetchCate = async () => {
        try {
          const data = await dispatch(fetchOrderAll()).unwrap()      
        } catch (err) {
          console.log(err);
        }
      }
        useEffect(() => {
          handleFetchCate()
            
          }, []) 
          const changeStatusOrder = async (status:any,index)=>{

            try {
                const newStatus = document.querySelectorAll(".select") 
           
                let tempStatus = {...status}
                tempStatus.status = newStatus[index].value
       
                
                const temp={
                    order: tempStatus,
                    id: status._id
                }
                
                const data = await dispatch(updateOrders(temp)).unwrap()      
                handleFetchCate()
              } catch (err) {
                console.log(err);
              }
          }
    return <>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md  w-[1200px] ml-[20px] m-auto mt-[100px]">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500  ">
    <thead className="bg-gray-50">
      <tr>
      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Mã đơn hàng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tên người nhận hàng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Số điện thoại</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Địa chỉ</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ghi chú</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Trạng thái đơn hàng</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    {order?.map((item,index)=>{
        return<>
         <tr className="hover:bg-gray-50">
         <td className="px-6 py-4">{item.
         _id}</td>
<td className="px-6 py-4">{item.name}</td>
  <td className="px-6 py-4">{item.phonenumber}</td>
  <td className="px-6 py-4 max-w-[50px]">{item.address}</td>
  <td className="px-6 py-4">{item.note}</td>
  <td className="px-6 py-4 w-[200px]">

      {item.status<3&& <select name="" className="w-full select rounded-lg text-[14px]"  onChange={()=>changeStatusOrder(item,index)}>
        <option selected={item.status==0} value={0}>{orderStatus(0)}</option>
        <option selected={item.status==1} value={1}>{orderStatus(1)}</option>
        <option selected={item.status==2} value={2}>{orderStatus(2)}</option>
        <option selected={item.status==3} value={3}>{orderStatus(3)}</option>
        <option selected={item.status==4} value={4}>{orderStatus(4)}</option>
      </select>||<h1>{orderStatus(item.status)}</h1>}

  </td>
  <td className="px-6 py-4">
    <div className="flex justify-end gap-4 ">
   
      <a x-data="{ tooltip: 'Edite' }" className="w-[50px]" href={"orders/detail/"+item._id}>
          Chi tiết
      </a>
    </div>
  </td>
</tr>
        </>
       })}

     
    </tbody>
  </table>
</div>
    </>
}
export default AdminOrder