import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { check } from '../../../components/check'
import { getOne, updateCategory } from '../../../api/categories'
import notify from '../../../components/notify'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../storage'
import { updateCategories } from '../../slice/categori.slice'
// import { updateProduct} from '../../api/product'
interface category {
    _id:string,
    name: string,
    createdAt: string,
    updatedAt: string
}
interface IProps {
    categories: category[],
    onUpdate: (id: category) => void
}

const UpdateCategory= () => {   
    
    const { id } = useParams()
    const [cate, setCate] = useState<category>()
    useEffect(() => {
        getOne(id!).then(({data})=>{
            setCate(data)
        })
    },[])
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({})
    const onHandleChange = (e:any) => {
        const name = e.target.name
        const value = e.target.value
      console.log(name);
      
        setInputValue({ ...inputValue, name: value })   
    }
    const { categories, isLoading } = useSelector((state: RootState) => state.categories)
    const dispatch = useDispatch<AppDispatch>()
    const onHandleSubmit = async (e:any) => {
            e.preventDefault()
            const updateData:category= {...cate!, ...inputValue!}
            const cateName = document.querySelector("#cateName") as HTMLInputElement
            if(cateName.value !== ""){


                try {
                    await dispatch(updateCategories(updateData!)).unwrap()
                    navigate('/admin/categories')
                    notify("success","Cập nhật danh mục thành công")

                } catch (err:any) {
                    console.log(err)
                }
                
            }
            else{
                notify("error","Trường danh mục không được để trống")
            }
               
            
            }
       
           
            
    

    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10">
        <div className="container">
            <div className="flex flex-wrap lg:justify-between -mx-4">

                <div className="w-[500px] ml-[300px] px-4">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                    <form onSubmit={onHandleSubmit}>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Tên danh mục"
                                name="cateName"
                                id="cateName"
                                onChange={onHandleChange} 
                                defaultValue={cate?.name}
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
            
                        <div>
                            <button
                                type="submit"
                                className="
                                w-full

                                bg-primary
                                rounded
                                border border-primary
                                p-3
                                transition
                                hover:bg-opacity-90
                                "
                                >
                            Sửa danh mục
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </section>

    )
}

export default UpdateCategory