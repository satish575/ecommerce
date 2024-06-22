const router=require("express").Router();
const {addNewProduct,getProductsByCategory, getProductDetails}=require("../controllers/product.controller");
const upload=require("../middlewares/imageUploader");
router.post('/add',upload.single("image"),addNewProduct)
router.get("/:category",getProductsByCategory);
router.get("",getProductDetails);
module.exports=router;