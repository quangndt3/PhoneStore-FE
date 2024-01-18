import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, ICategoryPopulate, IListProduct, IOrder, IProduct, IUser, OrderForm, ProductForm } from "../../models";
import { getAllCategories } from "../../api/categories";
import { addProduct, filterProduct, getAll, remove } from "../../api/products";
import { addOrder, getAllOrder, getDetailOrder, getOneOrder, updateOrder } from "../../api/order";
import notify from "../../components/notify";
import LogIn from "../user/login";
import { signin } from "../../api/users";

const intialState = {
    users: {},
    isLoading: false
  } as { users: IUser , isLoading: boolean}

  export const addLogin = createAsyncThunk(
    'user/login',
    async (acc:IUser, thunkAPI) => {
      try {
        const data = await signin(acc)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )


  export const LoginSlice = createSlice({
    name: "login",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
          state.users = action.payload
        },
      },extraReducers: builder => {
       
          builder.addCase(addLogin.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(addLogin.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
          });
          builder.addCase(addLogin.rejected, (state) => {
            state.isLoading = false;
          });
          
      }
  })
  export const { fetch } = LoginSlice.actions
export const usersReducer = LoginSlice.reducer