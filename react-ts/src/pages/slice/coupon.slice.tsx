import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CouponForm, IAddCategory, ICategory, ICategoryPopulate, ICoupone } from "../../models";
import {
  RemoveCategories,
  addCategory,
  getAllCategories,
  updateCategory,
} from "../../api/categories";
import { addCoupon, getAllCoupon, getOneCouponByCode, updateCoupon,  } from "../../api/coupone";

const intialState = {
  coupons: [],
  isLoading: false,
} as { coupons: ICoupone[]; isLoading: boolean };

export const fetchCoupons = createAsyncThunk(
  "coupon/fetch",
  async (arg, thunkAPI) => {
    try {
      const data = await getAllCoupon();

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const fetchCouponsByCode = createAsyncThunk(
    "coupon/fetchByCode",
    async (code:string, thunkAPI) => {
      try {
        const data = await getOneCouponByCode(code);
  
        return data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  );
export const addCoupons = createAsyncThunk(
  "coupon/add",
  async (coupone: CouponForm, thunkAPI) => {
    try {
      const data = await addCoupon(coupone);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const updateCoupons = createAsyncThunk(
  "coupon/update",
  async (newCoupon: CouponForm, thunkAPI) => {
    try {
      const data = await updateCoupon(newCoupon);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const couponSlice = createSlice({
  name: "categories",
  initialState: intialState,
  reducers: {
    fetch: (state, action) => {
      state.coupons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCoupons.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCouponsByCode.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchCouponsByCode.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.isLoading = false;
      });
    builder.addCase(addCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCoupons.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addCoupons.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCoupons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCoupons.fulfilled, (state, action) => {
      
      state.isLoading = false;
    });
    builder.addCase(updateCoupons.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { fetch } = couponSlice.actions;
export const couponReducer = couponSlice.reducer;
