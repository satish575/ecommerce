const { addToCart,getCart,removeFromCart,updateQuantity} = require("../controllers/cart.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router=require("express").Router();


router.post('/add',isAuthenticated,addToCart);
router.get("/getCart",isAuthenticated,getCart);
router.delete("/remove/:productid",isAuthenticated,removeFromCart);
router.post("/addQuantity",isAuthenticated,updateQuantity);


module.exports=router;