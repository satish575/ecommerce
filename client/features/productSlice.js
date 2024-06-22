import {createSlice} from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState={
    products:['all']
}

const fetchAllProducts=createAsyncThunk('fetch/products',async()=>{
          const response=await axios.get('http://localhost:2000/product/all');
          return response.data;
})

const fetchByCategory=createAsyncThunk('fetch/by/category',async(category)=>{
            const response=await axios.get(`http://localhost:2000/product/${category}`);
            return response.data;
})
const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
          builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{

                 state.products=action.payload.response;
          })
          builder.addCase(fetchByCategory.fulfilled,(state,action)=>{

                 state.products=action.payload.response;

          })
    }
})

export {fetchAllProducts,fetchByCategory};
export default productSlice.reducer;
