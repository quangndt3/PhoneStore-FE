import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAddCategory, ICategory, ICategoryPopulate } from "../../models";
import {
  RemoveCategories,
  addCategory,
  getAllCategories,
  updateCategory,
} from "../../api/categories";

const intialState = {
  categories: [],
  isLoading: false,
} as { categories: ICategoryPopulate[]; isLoading: boolean };

export const fetchCategories = createAsyncThunk(
  "cate/fetch",
  async (arg, thunkAPI) => {
    try {
      const data = await getAllCategories();

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const addCategories = createAsyncThunk(
  "cate/add",
  async (category: IAddCategory, thunkAPI) => {
    try {
      const data = await addCategory(category);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const removeCategories = createAsyncThunk(
  "cate/remove",
  async (id: string, thunkAPI) => {
    try {
      const data = await RemoveCategories(id);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const updateCategories = createAsyncThunk(
  "cate/update",
  async (newCategory: ICategory, thunkAPI) => {
    try {
      const data = await updateCategory(newCategory);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const categoriSlice = createSlice({
  name: "categories",
  initialState: intialState,
  reducers: {
    fetch: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeCategories.fulfilled, (state, action) => {
      state.categories = state.categories.filter(item=>item._id !==  action.payload.category._id);
      state.isLoading = false;
    });
    builder.addCase(removeCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      
      state.isLoading = false;
    });
    builder.addCase(updateCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { fetch } = categoriSlice.actions;
export const categoriReducer = categoriSlice.reducer;
