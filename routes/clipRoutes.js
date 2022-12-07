"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/clipController')

router.get('/getRandomQuery', controller.getRandomQuery);

router.delete('/deleteClip/', controller.deleteClip)
module.exports=router;