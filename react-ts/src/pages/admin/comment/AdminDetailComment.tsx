import { useEffect, useState } from "react";
import { IComment, IProduct } from "../../../models"
import { useParams } from "react-router-dom";
import { getOne } from "../../../api/products";
import { removeComments } from "../../../api/comments";


export const AdminDetailComment = ()=>{

    const { id } = useParams();
    const [comment,setComment] = useState<IComment[]>()
    
    useEffect(()=>{
        
        getOne(id!).then(({data})=>{

          setComment(data.comments)
        })
     
    }, [])
    const handleRemoveComment = (idComment:string) => {
        const confirm = window.confirm("Are you sure you want to remove this comment")
        if(confirm){

          removeComments(idComment).then(()=>{

              getOne(id!).then(({data})=>{
                setComment(data.comments)
              }).catch(err=>{
                console.log(err);
                
              })
              alert("Xoá bình luận thành công")
        });
      }
      };

    
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[120%]">
          <table className="w-[80%] border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Người bình luận</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ảnh</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nội dung</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ngày bình luận</th>
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
                        <div className="font-medium text-gray-700">{item.userId.name}</div>  
                      </div>
    
                    </th>
                    <td className="px-6 py-4">
                      
                    <span>
                          <img className='w-[60px] h-[60px] border rounded-full' src={item.userId.images} alt="" />
                        </span></td>
                    <td className="px-6 py-4 ">
                      
                    <span>
                          {item.content}
                        </span></td>
                        <td className="px-6 py-4 ">
                      
                      <span>
                            {item.createdAt}
                          </span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                          <button className="btn_remove" onClick={()=>{handleRemoveComment(item._id!)}}>Xoá</button>
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