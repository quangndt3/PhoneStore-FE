import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, ICategoryPopulate, IListProduct, IOrder, IProduct, OrderForm, ProductForm } from "../../models";
import { getAllCategories } from "../../api/categories";
import { addProduct, filterProduct, getAll, remove } from "../../api/products";
import { addOrder, getAllOrder, getDetailOrder, getOneOrder, updateOrder } from "../../api/order";
import notify from "../../components/notify";

const intialState = {
    order: [],
    isLoading: false
  } as { order: IOrder[] , isLoading: boolean}

  export const fetchOrder = createAsyncThunk(
    'order/fetch',
    async (id:string, thunkAPI) => {
      try {
        const data = await getOneOrder(id)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const fetchOrderAll = createAsyncThunk(
    'order/fetchAll',
    async (arg, thunkAPI) => {
      try {
        const data = await getAllOrder()

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const fetchOrderDetail = createAsyncThunk(
    'order/fetchdetail',
    async (id:string, thunkAPI) => {
      try {
   
        
        const data = await getDetailOrder(id)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const addOrders = createAsyncThunk(
    'order/create',
    async (newOrder: OrderForm, thunkAPI) => {
      try {
        const data = await addOrder(newOrder)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const updateOrders = createAsyncThunk(
    'order/update',
    async ({order,id}:any, thunkAPI) => {
      try {
        const data = await updateOrder(order,id)
        notify("success","Cập nhật trạng thái đơn hàng thành công")
        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const CancelOrders = createAsyncThunk(
    'order/cancel',
    async ({order,id}:any, thunkAPI) => {
      try {
        const data = await updateOrder(order,id)
        notify("success","Huỷ đơn hàng thành công")
        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const OrderSlice = createSlice({
    name: "orders",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
          state.order = action.payload
        },
      },extraReducers: builder => {
        builder.addCase(fetchOrder.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(fetchOrder.fulfilled, (state, action) => {           
          state.order = action.payload          
            state.isLoading = false
          })
          builder.addCase(fetchOrderAll.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(fetchOrderAll.fulfilled, (state, action) => {           
            state.order = action.payload          
              state.isLoading = false
            })
          builder.addCase(fetchOrderDetail.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(fetchOrderDetail.fulfilled, (state, action) => {           
            state.order = action.payload          
              state.isLoading = false
            })
          builder.addCase(addOrders.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(addOrders.fulfilled, (state, action) => {
            state.isLoading = false;
          });
          builder.addCase(addOrders.rejected, (state) => {
            state.isLoading = false;
          });
          builder.addCase(updateOrders.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(updateOrders.fulfilled, (state, action) => {
            state.isLoading = false;


            
          });
          builder.addCase(CancelOrders.rejected, (state) => {
            state.isLoading = false;
          });
          builder.addCase(CancelOrders.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(CancelOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            
            
          });
          builder.addCase(updateOrders.rejected, (state) => {
            state.isLoading = false;
          });
      }
  })
  export const { fetch } = OrderSlice.actions
export const OrdersReducer = OrderSlice.reducer