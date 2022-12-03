"use strict";
const express=require("express");
const router=express.Router();
const multer=require('multer');
const path=require('path');
const controller=require('../controllers/clipController')

router.get('/getAnyClip', controller.getAnyClip);

module.exports=router;