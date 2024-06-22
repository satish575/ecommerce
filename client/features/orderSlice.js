import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios";


const initialState={
    orders:[]
}

const fetchOrdersOfClient=createAsyncThunk("orders/fetchall/client",async()=>{
    try{
   const response= await axios.get("http://localhost:2000/orders/customers",{
        headers:{
            Authorization:document.cookie?document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
        }
    })
    return response.data.orders;
}catch(err){
        return err;
    }
})
const fetchAllOrders=createAsyncThunk("orders/fetchall/admin",async()=>{
           try{
            const response=await axios.get("http://localhost:2000/orders/");
            return response.data.orders;
           }catch(err){

           }
})
const orderSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllOrders.pending,(state,action)=>{
              
        })
        
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.orders=action.payload;
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            
        })
        .addCase(fetchOrdersOfClient.fulfilled,(state,action)=>{
            state.orders=action.payload;
        })
    }
})

export {fetchAllOrders,fetchOrdersOfClient};
export default orderSlice.reducer;