const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
      title:{
          type:String,
          required:[true,"Title is required"],
      },
      category:{
          type:mongoose.Types.ObjectId,
          required:[true,"Category is required"]
      },
      description:{
        type:String,
        required:true
      },
      price:{
        type:String,
        required:true
      },
      imgurl:{
        type:String,
        required:true
      },
      reviews:[
        {
            rate:{
                type:Number,
                
            },
            message:{
                type:String
                
            }
        }
      ],
      stocks:{
        type:Number,
        required:true
      }
},
{
    timestamps:true
}

);

const Product=mongoose.model('product',productSchema);

module.exports=Product;