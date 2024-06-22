const router=require("express").Router();
const paymentIntent=require("../controllers/paymentIntent");
const {isAuthenticated}=require("../middlewares/isAuthenticated");
router.post('/',isAuthenticated,paymentIntent);

module.exports=router;