const mongoose=require("mongoose");
const Product=require("./product.model")
const orderSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
       
      },
      products: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
           
          },
          quantity: {
            type: Number,
            default: 1,
          },
        }
      ],
      chargeid:{
         type:String,
         required:true,
         unique:[true,"charge already exist"],
      },
      amount:{
        type:Number,
        required:true
      },
      paidby:{
        type:String,
        required:true
      },
      status:{
        type:Number,
        default:0,
      }
      
},{
  timestamps:true
})

const order=mongoose.model('Order',orderSchema);

module.exports=order;