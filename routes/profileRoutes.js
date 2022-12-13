"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/profileController')

router.get('/getUserProfileById/:id', controller.getUserProfileById);

module.exports=router;