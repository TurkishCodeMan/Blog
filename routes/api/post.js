var express = require("express");

var router = express.Router();

var postController = require("../../controller/post");
const authControl = require("../../middleware/authControl");



router.get("/", postController.getIndex);
router.get("/posts/:id", postController.getPostById)
router.get("/my-post/:id",authControl,postController.getMyPost)
router.get("/categories", postController.getAllCategories);
router.get("/categories/:id",postController.getProductByCategory);


router.post("/create-post",authControl,postController.createPost);


module.exports = router;