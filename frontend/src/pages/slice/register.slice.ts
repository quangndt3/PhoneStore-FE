import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, ICategoryPopulate, IListProduct, IOrder, IProduct, IUser, OrderForm, ProductForm } from "../../models";
import { getAllCategories } from "../../api/categories";
import { addProduct, filterProduct, getAll, remove } from "../../api/products";
import { addOrder, getAllOrder, getDetailOrder, getOneOrder, updateOrder } from "../../api/order";
import notify from "../../components/notify";
import LogIn from "../user/login";
import { signin, signup } from "../../api/users";

const intialState = {
    usersRegister: {},
    isLoading: false
  } as { usersRegister: IUser , isLoading: boolean}

  export const register = createAsyncThunk(
    'user/register',
    async (acc:IUser, thunkAPI) => {
      try {
        const data = await signup(acc)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )


  export const registerSlice = createSlice({
    name: "register",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
          state.usersRegister = action.payload
        },
      },extraReducers: builder => {
       
          builder.addCase(register.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(register.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
          });
          builder.addCase(register.rejected, (state) => {
            state.isLoading = false;
          });
          
      }
  })
  export const { fetch } = registerSlice.actions
export const usersRegisterReducer = registerSlice.reducer