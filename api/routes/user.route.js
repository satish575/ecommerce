const { registration, login, logout } = require("../controllers/user.controller");
const { userValidation } = require("../middlewares/user.registeration.validation");
const {isAuthenticated}=require("../middlewares/isAuthenticated")
const User=require("../models/user.model");
const router=require("express").Router();

router.post("/registration",userValidation,registration);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getuser",isAuthenticated,async(req,res,next)=>{
        
        const user=await User.findOne({_id:req.user.id});
        res.status(200).json({
            success:true,
            user
        });
})

module.exports=router;