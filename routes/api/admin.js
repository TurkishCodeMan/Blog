var express=require("express");


var router=express.Router();

var adminController=require("../../controller/admin");
const authControl = require("../../middleware/authControl");
const isAdmin = require("../../middleware/isAdmin");

router.get("/posts",authControl,isAdmin,adminController.getPosts)
router.get("/categories",authControl,isAdmin,adminController.getCategories)
router.get("/all-user",authControl,isAdmin,adminController.getAllUser)
router.post("/create-category",authControl,isAdmin,adminController.createCategory);
router.post("/delete-post/:id",authControl,isAdmin,adminController.deletePost);
router.post("/delete-user/:id",authControl,isAdmin,adminController.deleteUser);
router.post("/delete-category/:id",authControl,isAdmin,adminController.deleteCategory)




module.exports =router;