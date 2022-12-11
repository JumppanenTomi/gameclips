"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/profileController')

router.get('/getUserProfileById/', controller.getUserProfileById);

module.exports=router;