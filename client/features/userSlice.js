import {createSlice} from "@reduxjs/toolkit"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const setUser=createAsyncThunk("get/userdata",async()=>{
    
    try{
   const response= await axios.get("http://localhost:2000/user/getuser",{
        headers:{
            Authorization:document.cookie?document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
        }
    })
    
    return response.data;
}catch(err){
    throw err;
}
})
const initialState={
    userdata:null,
    error:""
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
             clearUser(state,action){
                    state.userdata=null;
                    console.log("hello");
             }
    },
    extraReducers:(builder)=>{
            builder.addCase(setUser.pending,(state,action)=>{

            })
            .addCase(setUser.fulfilled,(state,action)=>{
                state.userdata=action.payload.user;
            })
            .addCase(setUser.rejected,(state,action)=>{
                state.userdata=null;
            })
    }
})

export const {clearUser}=userSlice.actions;
export  {setUser};

export default userSlice.reducer;