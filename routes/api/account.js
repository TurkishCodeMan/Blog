var express=require("express");
var router=express.Router();

var accountController = require("../../controller/account");
const locals = require("../../middleware/locals");

router.get("/session-control",locals)

router.get("/logout",accountController.logout)

router.post("/login",accountController.postLogin);

router.post("/register",accountController.postRegister);

// router.get("/reset-password",accountController.getResetPassword);
// router.post("/reset-password",accountController.postResetPassword);



module.exports =router;