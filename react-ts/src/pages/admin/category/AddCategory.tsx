import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAddCategory, ICategory } from '../../../models';
import { check } from '../../../components/check';
import { addCategory } from '../../../api/categories';



const AddCategory = () => {
    const [valueInput, setValueInput] = useState<IAddCategory>();


    
    const navigate = useNavigate();
    const onHandleChange = (e:any) => {
        e.preventDefault();

        const value = e.target.value;
        setValueInput({name: value })
    }
    const onHandleSubmit = (e:any) => {
        e.preventDefault();
        addCategory(valueInput!).then(()=>{
            alert("Thêm danh mục thành công")
            navigate('/admin/categories')
        }).catch(err => {
            alert(err.response.data.message)
        })
    
    }


    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10">
        <div className="container">
            <div className="flex flex-wrap lg:justify-between -mx-4">

                <div className="w-[500px] ml-[350px] px-4">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                    <form onSubmit={onHandleSubmit}>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Tên danh mục"
                                name="name"
                                onChange={onHandleChange} 
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
                            Thêm danh mục
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

export default AddCategory