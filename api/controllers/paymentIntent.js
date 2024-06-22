const order=require("../models/order.model");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart=require("../models/cart.model");
const Product=require("../models/product.model")
const paymentIntent=async(req,res,next)=>{
    
    const {token,total}=req.body;
    
    
   
    return stripe.customers.create({
        email:token.email,
        source:token.id,

    }).then((customer)=>{
        stripe.charges.create({
            amount:total * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email: token.email,
           
        }).then(async(result)=>{
            const charge_id=result.id;
            const amount=result.amount/100;
            const email=result.receipt_email;
            const receipturl=result.receipt_url;
            
            const userid=req.user.id;
            const userCart=await Cart.findOne({user:userid});
            const {user,products}=userCart;

            const neworder=new order({
                   user,
                   products,
                   chargeid:charge_id,
                   amount,
                   paidby:email
            });

            const orderResponse=await neworder.save();
            
            await Cart.updateOne({_id:userCart._id},{$set:{products:[]}})
            res.status(200).json({
                success:true,
                orderResponse
            })
           
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    
}

module.exports=paymentIntent;