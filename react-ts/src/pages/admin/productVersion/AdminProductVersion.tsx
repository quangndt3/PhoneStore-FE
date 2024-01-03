import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductColor } from '../../../api/product_color';
import { IProductColor, IProductVersion } from '../../../models';
import { getAllProductVersion, removeVersion } from '../../../api/product_version';
import notify from '../../../components/notify';

const AdminProductVersion = () => {
    
    const [data, setData] = useState<IProductVersion[]>([])
    useEffect(() => {
        getAllProductVersion().then(({data})=>{
            
        setData(data.data)
      })
        
      }, [])

      
      const navigate = useNavigate();
      const onNavigate = (id:string) => {
        navigate(`/admin/productVersion/update/${id}`)
      }
      const deleteColor = (id:string) => {
        const confirm = window.confirm('Bạn có chắc chắn muốn xoá phiên bản sắc này không ? (Sẽ xoá tất của các sản phẩm có phiên bản được xoá)')
           if(confirm){
            removeVersion(id).then(()=>{
             
              getAllProductVersion().then(({data})=>{    
                  
                setData(data.data)
                notify("success","Xoá Phiên bản thành công")
              })
            }).catch(errors=>{
              console.log(errors);
              
          })
           }
        }
      return(
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1200px]">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Version</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">CreatedAt</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">UpdatedAt</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <a href="/admin/productVersion/add">Thêm phiên bản</a>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map(item => {
              
              return (
                <tr key={item._id} className="hover:bg-gray-50">
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 ">
                      <div className="font-medium text-gray-700">{item.version}</div>  
                    </div>
  
                  </th>
        
                  <td className="px-6 py-4 ">
                    
                  <span>
                        {item.createdAt}
                      </span>
                    </td>
                    <td className="px-6 py-4 ">
                    
                    <span>
                          {item.updatedAt}
                        </span>
                      </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                      >
                        <button onClick={() => onNavigate(item._id)}>Update</button>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
  <button onClick={() => deleteColor(item._id)}>
    Delete
  </button>
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

export default AdminProductVersion