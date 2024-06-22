
const Category=require("../models/category.model");
const addNewCategory=async(req,res,next)=>{

    try{
    const newCategory=new Category(req.body);
    const result=await newCategory.save();
    res.status(200).json({
        success:true,
        result
    });
}catch(err){
    console.log(err);
}
}

const getAllCategory=async(req,res,next)=>{
    
    try {
       const response = await Category.find();
       
       res.status(200).json({
        success:true,
        response
       })
    } catch (error) {
        
    }
}
module.exports={addNewCategory,getAllCategory};