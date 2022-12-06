"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/browseController')

router.get('/', controller.getAll);

module.exports=router;