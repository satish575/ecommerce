import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import ErrorHandler from "../utils/ErrorHandler";

const addToCart=createAsyncThunk("add/cart",async(productid)=>{
     console.log("inside method");
    try{
     const response= await axios.post("http://localhost:2000/cart/add",
        {productid},
        {
            headers:{
                Authorization:document.cookie ? document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
            }
        }
      )
      
      return response.data.data;
      
      
    }catch(err){
    
        const eh=new ErrorHandler(err.response.status,err.response.data.message);
        throw eh;
       
    }
})


const getCartData=createAsyncThunk("get/cart",async()=>{
    try{
    const response= await axios.get("http://localhost:2000/cart/getCart",
        
        {
            headers:{
                Authorization:document.cookie ? document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
            }
        }
      )
      return response.data.data;
    }catch(err){
        const eh=new ErrorHandler(err.response.status,err.response.data.message);
        throw eh;
    }
        
})

const removeFromCart=createAsyncThunk("remove/cart",async(productid)=>{
    try{
        
       const response=await axios.delete(`http://localhost:2000/cart/remove/${productid}`,
       
       {
           headers:{
               Authorization:document.cookie?document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
           }
       }
     )
     return response.data.response;
    }catch(err){

    }
})

const addQuantity=createAsyncThunk("add/quantity/cart",async({productid,quantity})=>{
    
    await axios.post("http://localhost:2000/cart/addQuantity",{productid,quantity},{
        headers:{
            Authorization:document.cookie?document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
        }
    })
})



const initialState={
    cartData:[],
    error:'',
    total:0,
    addCartError:''

}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
           cartErrorDel:(state,action)=>{
               state.addCartError= action.payload;
               console.log("hello");
           },
           cartError:(state,action)=>{
            state.error=action.payload;
            
           }
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state,action)=>{
             
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            
             alert("added successfully");
        })
        .addCase(addToCart.rejected,(state,action)=>{
            console.log(action.error);
            state.addCartError=action.error.message;   
            
        })
        .addCase(getCartData.pending,(state,action)=>{
             
        })
        .addCase(getCartData.fulfilled,(state,action)=>{
            state.cartData=action.payload;
            state.total = state.cartData.reduce((acc, cur) => acc + cur.product_id.price * cur.quantity, 0);
        })
        .addCase(getCartData.rejected,(state,action)=>{
            state.error=action.error.message;  
        })
        .addCase(removeFromCart.pending,(state,action)=>{

        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.cartData=action.payload;
        })
        .addCase(removeFromCart.rejected,(state,action)=>{

        })
        .addCase(addQuantity.pending,(state,action)=>{

        })
        .addCase(addQuantity.fulfilled,(state,action)=>{
            console.log(action.payload);
        })
        .addCase(addQuantity.rejected,(state,action)=>{

        })
    }
})

export const {cartErrorDel,cartError}=cartSlice.actions;
export {addToCart,getCartData,removeFromCart,addQuantity};
export default cartSlice.reducer;


