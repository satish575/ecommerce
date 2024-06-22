const express=require("express");
const mongoose=require("mongoose");

require("dotenv").config();
const app=express();

// middlewares
app.use(require("cors")({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable passing cookies and other credentials
  }));

  
  app.use(express.static('uploads'));
app.use(express.json());
app.use("/user",require("./routes/user.route"));
app.use("/product",require("./routes/product.route"));
app.use("/category",require("./routes/category.route"));
app.use("/cart",require("./routes/cart.route"));
app.use("/payment",require("./routes/payment.route"));
app.use("/orders",require("./routes/orders.route"));





app.use((err,req,res,next)=>{
      err.statusCode=err.statusCode || 500;
      err.message=err.message || "Internal server error";

      res.status(err.statusCode).json({
        success:false,
        message:err.message});
})


mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(2000,()=>{
        console.log("server listening to port 2000");
    })
})





