const bcryptjs=require("bcryptjs");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/user.model");
const jwt=require("jsonwebtoken");
const registration=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        const hashedPassword=await bcryptjs.hash(password,10);
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        });
        const userdata=await newUser.save();
        res.status(200).json({
            success:true,
            data:userdata
        });    
    } catch (error) {
        console.log(error.message.includes("email_1"));
        if(error.code === 11000){

            const duplicateIndex=error.message.includes("email_1") ? "email":
                                error.message.includes("username_1") ? "username":
                                "";
            
            next(new ErrorHandler(400,`${duplicateIndex} already exist`))
        }
    }
      
       
}

const login=async(req,res,next)=>{
    try {
        const {username,password}=req.body;
        if(!username || !password || username=="" || password==""){
            return next(new ErrorHandler(400,"All Fields Are Required"));
        }
        const userdata=await User.findOne({username});
        if(!userdata){
            return next(new ErrorHandler(404,"User not found"));
        }
        const isValidUser=await bcryptjs.compare(password,userdata.password);
        if(!isValidUser){
           return next(new ErrorHandler(400,"Invalid Credentials"));
        }
        const token=jwt.sign({id:userdata._id},process.env.JWT_SECRET);
        const { password:userpassword, ...userDataWithoutPassword } = userdata._doc;
       
        res.status(200).cookie('access_token',token).json({
            success:true,
            userDataWithoutPassword
        });
   
    } catch (error) {
        console.log(error);
    }
}

const logout=(req,res,next)=>{
    res.clearCookie('access_token').json({
        success:true,
        message:"logged out successfully"
    });
}


module.exports={registration,login,logout}