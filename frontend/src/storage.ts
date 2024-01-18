import { configureStore } from '@reduxjs/toolkit'


import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { categoriReducer } from './pages/slice/categori.slice'
import { ProductReducer } from './pages/slice/product.slice'
import { OrdersReducer } from './pages/slice/order.slice'
import { couponReducer } from './pages/slice/coupon.slice'
import { usersReducer } from './pages/slice/login.slice'
import { usersRegisterReducer } from './pages/slice/register.slice'

export const store = configureStore({
  reducer: {
    categories: categoriReducer,
    products: ProductReducer,
    orders: OrdersReducer,
    coupon: couponReducer,
    usersLogin: usersReducer,
    usersRegister: usersRegisterReducer
  }
})

setupListeners(store.dispatch)
// Redux toolkit query (optional)
// react-query, swr

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch