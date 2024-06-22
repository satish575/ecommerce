const ErrorHandler=require("./errorHandler");
const userValidation=(req,res,next)=>{
       
       const {username,email,password}=req.body;
       if(!username || username=="" || !email || email=="" || !password || password==""){
        return next(new ErrorHandler(400,"All the fields are required"));
       }
       if(!(/^[a-zA-Z0-9]+$/.test(username))){
          return next(new ErrorHandler(400,"username should only contain A-Z and 1-9"));
       }
       if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))){
          return next(new ErrorHandler(400,"Please Enter valid email"));
       }
       if(!(/^[A-Za-z\d@$!%*?&]{8,}$/.test(password))){
          return next(new ErrorHandler(400,"password must contain eight characters, combination of uppercase letters, lowercase letters, digits, and common special characters:"));
       }
       next();

}

module.exports={userValidation}