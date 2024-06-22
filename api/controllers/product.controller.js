const Product=require("../models/product.model");
const Category=require("../models/category.model");
const ErrorHandler=require("../middlewares/errorHandler");
const addNewProduct=async(req,res,next)=>{
  
   const productData=req.body;
   const imgUrl=req.file;

   const title=productData.productName;
   const category=productData.category;
   const description=productData.description;
   const price=productData.productPrice;
   const stocks=productData.stock;
   const imgurl="uploads/"+imgUrl.filename;

   
    try{
     const newProduct=new Product({title,category,description,price,stocks,imgurl});
     console.log(newProduct);
     const result=await newProduct.save();
     res.status(200).json({
        success:true,
        result
     })
    }catch(err){
         next(new ErrorHandler(400,err));
    }
}

const getProductsByCategory=async(req,res,next)=>{
     const category=req.params.category;
     if(category==="all"){
        const response=await Product.find();
        
       return res.status(200).json({
         success:true,
         response
        })
     }else{
        const result=await Category.findOne({title:category});
        
        const response=await Product.find({category:result._id});
        console.log(response);
        
        
        res.status(200).json({
         success:true,
         response
        })
     }
      
      
}

const getProductDetails=async(req,res,next)=>{
   try{
      const {id}=req.query;
      const response=await Product.find({_id:id});
      if(!response.length){
         return next(new ErrorHandler(404,"Product not found"));
      }
      res.status(200).json({
         success:true,
         response
      });
   }catch(err){
      next(err);
   }
     

}
module.exports={addNewProduct,getProductsByCategory,getProductDetails};