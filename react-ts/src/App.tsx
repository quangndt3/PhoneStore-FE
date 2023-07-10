
import './App.css'
import { Routes, Route, redirect, useNavigate, Link  } from 'react-router-dom'
import WebsiteLayout from './layouts/WebsiteLayout'
import HomePages from './pages/HomePages'
import CartPage from './pages/CartPage'
import DetailProduct from './pages/DetailProduct'
import AdminLayout from './layouts/AdminLayout'
import Dashboar from './pages/admin/Dashboar'
import AddProduct from './pages/admin/product/AddProduct'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import AdminProduct from './pages/admin/product/AdminProduct'
import LogIn from './pages/user/login'
import UserLayout from './layouts/UserLayout'
import { signin, signup } from './api/users'
import Signin from './pages/user/Signup'
import AdminCategory from './pages/admin/category/AdminCategory'
import AddCategory from './pages/admin/category/AddCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import { AdminComment } from './pages/admin/comment/AdminComment'
import { AdminDetailComment } from './pages/admin/comment/AdminDetailComment'
import { Navigate } from 'react-router-dom';
import Search from './pages/searchProduct'
import { useEffect, useState } from 'react'
import AdminProductColor from './pages/admin/productColor/AdminProductColor'
import AddProductColor from './pages/admin/productColor/AddProductColor'
import Signup from './pages/user/Signup'
function App() {
 const [cartLength,setCartLength] = useState<number>()

const navigate = useNavigate()
const user = JSON.parse(localStorage.getItem("user")!);
const temp = JSON.parse(localStorage.getItem(`${user?.data._id}`));
useEffect(()=>{
  setCartLength(temp?.length)
},[temp?.length])
const handleCartLenthg=(value:number)=>{
  setCartLength(value)
}  
  return (
    <div className="App">
      <Routes>

        {/* Website */}
        <Route path='/' element={<WebsiteLayout cartLength={cartLength!}  />}>
          <Route index element={<HomePages/>} />
          <Route path='products'>
            <Route path=':id' element={<DetailProduct handleCartLenthg={handleCartLenthg}  />} />
          </Route>
          <Route path='cart'>
              <Route index element={user?<CartPage handleCartLenthg={handleCartLenthg}  />:<Navigate to="/user/login"/>}></Route>
          </Route>
          <Route path='search' element={<Search/>} />
        </Route>

      

         <Route path='/admin'     element={user?<AdminLayout/>:<Navigate to="/"/>}>
          <Route index element={<Dashboar />} />

          <Route path='products' element={<AdminProduct/>} />
          <Route path='product'  >
            <Route path='add' element={<AddProduct />} />
            <Route path='update/:id' element={<UpdateProduct />} />
          </Route>
          
          <Route path='categories' element={<AdminCategory  />} />
          <Route path='category'>
            <Route path='add' element={<AddCategory/>} />
            <Route path=':id/update' element={<UpdateCategory  />} />
          </Route>

          <Route path='comments' element={<AdminComment />} />

          <Route path='detail_comment/:id' element={<AdminDetailComment />} />
          

            <Route path='productColors' element={<AdminProductColor  />} />
          <Route path='productColor'>
            <Route path='add' element={<AddProductColor/>} />
            {/* <Route path=':id/update' element={<UpdateCategory  />} /> */}
          </Route>
        </Route>  

       


        {/* user */}
        <Route path='/user' element={<UserLayout />}>
          <Route path="login" element={<LogIn  />} />
          <Route path="signup" element={<Signup />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App
