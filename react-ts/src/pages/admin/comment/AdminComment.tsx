import { useEffect, useState } from "react";
import { IProduct } from "../../../models"
import { useNavigate, useParams } from "react-router-dom";
import { getAllComment } from "../../../api/comments";
import { getAll, getAll_no } from "../../../api/products";


export const AdminComment = ()=>{

    const [comment,SetComment] = useState<IProduct[]>()
    useEffect(()=>{
      getAll_no().then(({data})=>{
        SetComment(data)
      })
    }, [])
   
    const navigate = useNavigate();
    const onNavigate = (id:string) => {
      navigate(`/admin/detail_comment/${id}`)
    }
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1200px]">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tên sản phẩm</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ảnh</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Số lượng Bình luận</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    
              {comment?.map(item => {
                
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 ">
                        <div className="font-medium text-gray-700">{item.name}</div>  
                      </div>
    
                    </th>
                    <td className="px-6 py-4">
                      
                    <span>
                          <img className='w-[150px]' src={item.images[0]} alt="" />
                        </span></td>
                    <td className="px-6 py-4 pl-[80px]">
                      
                    <span>
                          {item.comments.length}
                        </span></td>
                      
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                          <button onClick={()=>{onNavigate(item._id)}}>Chi tiết</button>
                        </span>

                      </div>
                    </td>
    
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
}