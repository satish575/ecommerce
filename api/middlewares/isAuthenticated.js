const jwt=require("jsonwebtoken")
const ErrorHandler=require("./errorHandler");

const isAuthenticated=(req,res,next)=>{
   
      const token=req.headers.authorization;
      
      if(!token){
       return next(new ErrorHandler(401,"Login to continue"));
      }
      jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
         return next(new ErrorHandler(401,"Login to continue"));
        }
        req.user=decode;
        
        next();
      })
}

module.exports={isAuthenticated};