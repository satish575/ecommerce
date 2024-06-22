

const mongoose=require("mongoose");
const order=require("../models/order.model");
const getAllOrder=async(req,res,next)=>{
      try{
        if(req.query.id){
            
            const orders= await order.findOne({_id:req.query.id}).populate('user').populate("products.product_id");
            res.status(200).json({
            success:true,
            orders
        })
        }
        else{
        const orders= await order.find({}).populate('user');
        res.status(200).json({
            success:true,
            orders
        })
    }
      }catch(err){
         console.log(err);
      }
}

const updateStatus=async(req,res,next)=>{
       try{
          const id=req.params.id;
          let status=req.body.status;
          
          await order.updateOne({_id:id},{$set:{status:++status}});
          res.status(200).json({
            success:true
          })
       }catch(err){
        console.log(err);
       }
}
const getOrderByCustomer=async(req,res,next)=>{
   const {id}=req.user;
    const orders=await order.find({user:id});
    res.status(200).json({
      success:true,
      orders
    })
}
module.exports={getAllOrder,updateStatus,getOrderByCustomer};