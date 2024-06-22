import {createSlice} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    categories:[]
}
const categorySlice=createSlice({
    name:"categories",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
          builder.addCase(fetchCategories.pending,(state,action)=>{
                
          })
          .addCase(fetchCategories.fulfilled,(state,action)=>{
             state.categories=action.payload.response;
          })
    }
})
const fetchCategories=createAsyncThunk('fetch/category', async()=>{
          const response=await axios.get("http://localhost:2000/category/");
          return response.data;
})
export {fetchCategories};
export const {} =categorySlice.actions;
export default categorySlice.reducer;