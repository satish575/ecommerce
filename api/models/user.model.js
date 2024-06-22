const mongoose=require("mongoose");

const userSchma=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username already exist"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exist"]
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const User=mongoose.model("User",userSchma);

module.exports=User;