import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, ICategoryPopulate, IListProduct, IProduct, ProductForm } from "../../models";
import { getAllCategories } from "../../api/categories";
import { addProduct, filterProduct, getAll, remove, subtractionProduct, updateProduct } from "../../api/products";

const intialState = {
    products: [],
    isLoading: false
  } as { products: IProduct[] , isLoading: boolean}

  export const fetchProducts = createAsyncThunk(
    'product/fetch',
    async ({skip,limit,cateState,currentOrder,price}:IListProduct, thunkAPI) => {
      try {
        const data = await filterProduct(skip,8,cateState,currentOrder,price)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const subtractionQuantityProducts = createAsyncThunk(
    'product/subtraction',
    async ({id,v_index,c_index,quantity}:any, thunkAPI) => {
      try {
        const data = await subtractionProduct(id,v_index,c_index,quantity)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const fetchProductsAll = createAsyncThunk(
    'product/fetchAll',
    async ({skip,limit}:any, thunkAPI) => {
      try {
        const data = await getAll(skip,limit)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const addProducts = createAsyncThunk(
    'product/create',
    async (newProduct: ProductForm, thunkAPI) => {
      try {
        const data = await addProduct(newProduct)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const updateProducts = createAsyncThunk(
    'product/update',
    async ({newProduct,id}:any, thunkAPI) => {
      try {
        const data = await updateProduct(newProduct,id)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  export const removeProducts = createAsyncThunk(
    'product/delete',
    async (id: string, thunkAPI) => {
      try {
        const data = await remove(id)

        
        return data
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
  
  export const productSlice = createSlice({
    name: "products",
    initialState: intialState,
    reducers: {
        fetch: (state, action) => {
          state.products = action.payload
        },
      },extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {           
          state.products = action.payload          
            state.isLoading = false
          })
          builder.addCase(fetchProductsAll.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(fetchProductsAll.fulfilled, (state, action) => {           
            state.products = action.payload          
              state.isLoading = false
            })
          builder.addCase(addProducts.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(addProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
          });
          builder.addCase(addProducts.rejected, (state) => {
            state.isLoading = false;
          });
          builder.addCase(updateProducts.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(updateProducts.fulfilled, (state, action) => {
            state.isLoading = false;
          });
          builder.addCase(updateProducts.rejected, (state) => {
            state.isLoading = false;
          });
          builder.addCase(removeProducts.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(removeProducts.fulfilled, (state, action) => {
      
            state.isLoading = false;
          });
          builder.addCase(removeProducts.rejected, (state) => {
            state.isLoading = false;
          });
          builder.addCase(subtractionQuantityProducts.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(subtractionQuantityProducts.fulfilled, (state, action) => {
      
            state.isLoading = false;
          });
          builder.addCase(subtractionQuantityProducts.rejected, (state) => {
            state.isLoading = false;
          });
      }
  })
  export const { fetch } = productSlice.actions
export const ProductReducer = productSlice.reducer