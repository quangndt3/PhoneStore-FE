import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductColor, removeColor } from '../../../api/product_color';
import { IProductColor } from '../../../models';
import notify from '../../../components/notify';

const AdminProductColor = () => {
    
    const [data, setData] = useState<IProductColor[]>([])
    useEffect(() => {
        getAllProductColor().then(({data})=>{
            
        setData(data.data)
      })
        
      }, [])

      
      const navigate = useNavigate();
      const onNavigate = (id:string) => {
        navigate(`/admin/productColor/update/${id}`)
      }
 const deleteColor = (id:string) => {
  const confirm = window.confirm('Bạn có chắc chắn muốn xoá Màu sắc này không ?(Sẽ xoá tất của các sản phẩm có màu được xoá)')
     if(confirm){
      removeColor(id).then(()=>{
       
        getAllProductColor().then(({data})=>{    
            
          setData(data.data)
          notify("success","Xoá màu thành công")
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Color</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ColorCode</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <a href="/admin/productColor/add">Thêm màu sắc</a>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map(item => {
              
              return (
                <tr key={item._id} className="hover:bg-gray-50">
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 ">
                      <div className="font-medium text-gray-700">{item.color}</div>  
                    </div>
  
                  </th>
        
                  <td className="px-6 py-4 ">
                    <div style={{backgroundColor:item.colorCode}} className='w-[60px] h-5'></div>
                  <span>
                        {item.colorCode}
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

export default AdminProductColor