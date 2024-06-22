const router=require("express").Router();
const {isAuthenticated}=require("../middlewares/isAuthenticated");
const {getAllOrder,updateStatus,getOrderByCustomer}=require("../controllers/order.controller");
router.get("",getAllOrder);
router.patch("/:id",updateStatus);
router.get("/customers",isAuthenticated,getOrderByCustomer);

module.exports=router;