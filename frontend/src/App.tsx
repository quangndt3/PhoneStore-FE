
import './App.css'
import { Routes, Route, redirect, useNavigate, Link, Navigate  } from 'react-router-dom'
import WebsiteLayout from './layouts/WebsiteLayout'
import HomePages from './pages/HomePages'
import DetailProduct from './pages/DetailProduct'
import AdminLayout from './layouts/AdminLayout'
import Dashboar from './pages/admin/Dashboar'
import AddProduct from './pages/admin/product/AddProduct'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import AdminProduct from './pages/admin/product/AdminProduct'
import AdminCategory from './pages/admin/category/AdminCategory'
import AddCategory from './pages/admin/category/AddCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import Search from './pages/searchProduct'
import AdminProductColor from './pages/admin/productColor/AdminProductColor'
import AddProductColor from './pages/admin/productColor/AddProductColor'
import UpdateProductColor from './pages/admin/productColor/UpdateProductColor'
import AdminProductVersion from './pages/admin/productVersion/AdminProductVersion'
import AddProductVersion from './pages/admin/productVersion/AddProductVersion'
import UpdateProductVersion from './pages/admin/productVersion/UpdateProduct'
import ListProduct from './pages/ListProduct'
import { useEffect, useState } from 'react'
import CartPage from './pages/CartPage'
import UserLayout from './layouts/UserLayout'
import LogIn from './pages/user/login'
import Signup from './pages/user/Signup'
import OrderPage from './pages/orderPage'
import OrderDetailPage from './pages/detailOderPage'
import AdminOrder from './pages/admin/orders/AdminOrders'
import OrderDetailAmin from './pages/admin/orders/detailOders'
import CouponAdmin from './pages/admin/coupon/AdminCoupon'
function App() {
  const [cartLength,setCartLength] = useState<number>()
  const user = JSON.parse(localStorage.getItem("user")!);
  const temp = JSON.parse(localStorage.getItem(`${user?.data.email}`));
  
  
  useEffect(()=>{
    setCartLength(temp?.length)
  },[temp?.length])
  const handleCartLenthg=(value:number)=>{
    setCartLength(value)
  }  

const navigate = useNavigate()

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
          <Route path='listProduct' element={<ListProduct/>} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orders/detail/:id" element={<OrderDetailPage />} />
        </Route>

      

         <Route path='/admin'    element={user?.data?.role==="admin"?<AdminLayout/>:<Navigate to="/"/>}>
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
          <Route path='orders' element={<AdminOrder/>} />
          <Route path="orders/detail/:id" element={<OrderDetailAmin />} />
          
          <Route path='coupons' element={<CouponAdmin/>} />
          

          <Route path='productColors' element={<AdminProductColor  />} />
          <Route path='productColor'>
            <Route path='add' element={<AddProductColor/>} />
            <Route path='update/:id' element={<UpdateProductColor  />} />
          </Route>
          <Route path='productVersions' element={<AdminProductVersion  />} />
          <Route path='productVersion'>
            <Route path='add' element={<AddProductVersion/>} />
            <Route path='update/:id' element={<UpdateProductVersion   />} />
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
