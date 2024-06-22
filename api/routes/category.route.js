const router=require("express").Router();
const {addNewCategory, getAllCategory}=require("../controllers/category.controller")
router.post('/add',addNewCategory);
router.get('/',getAllCategory);
module.exports=router;