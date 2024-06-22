const ErrorHandler=require("../middlewares/errorHandler");
const mongoose=require("mongoose");
const Cart=require("../models/cart.model");
const addToCart=async(req,res,next)=>{
    try{
      const userCartExist=await Cart.findOne({user:req.user.id});
      
      if(userCartExist){
        
            userCartExist.products.push({product_id:req.body.productid});
           const CartArray= await userCartExist.save();
            res.status(200).json({
                success:true,
                CartArray});
       
    }
      else{
        
      const newCart=new Cart({
         user:req.user.id,
         products:[
            {
            product_id:req.body.productid,
            }
         ]
      })
        const cartArray=await newCart.save();
        res.status(200).json({
            success:true,
            cartArray});
    }
}catch(err){
    console.log(err);
}
     
}
const getCart=async(req,res,next)=>{
  try{
     const response=await Cart.find({user:req.user.id}).populate('user').populate({
      path: 'products.product_id',
      model: 'product', // Replace with the correct model name for your Product
    }).exec();
     if(!response){
        return next(new ErrorHandler(404,"cart not found"))
     }
    
     res.status(200).json({
      success:true,
      data:response[0].products
     });
  }catch(err){
   // next(new ErrorHandler(500,"internal server error"));
  }
}

const removeFromCart=async(req,res,next)=>{
   try{
    const response=await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: { product_id: req.params.productid } } },
      { new: true }
    );
      res.status(200).json({
         success:true,
         response
      })
   }catch(err){

   }
}
const updateQuantity=async(req,res,next)=>{
     const{productid,quantity}=req.body;
     const response=await Cart.findOneAndUpdate({user:req.user.id,'products.product_id': productid},
     { $set: { 'products.$.quantity': quantity } },
     { new: true }
   )
   res.status(200).json({
      success:true,
      response
   })
}
module.exports={addToCart,getCart,removeFromCart,updateQuantity};