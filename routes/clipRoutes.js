"use strict";
const express=require("express");
const router=express.Router();
const controller=require('../controllers/clipController')
const file=require('../utils/file')
const fs=require('fs');
const multer=require('multer');
const path=require('path');

router.post('/', file.upload, controller.uploadClip);

router.get('/getRandomQuery', controller.getRandomQuery);

router.delete('/', controller.deleteClip)

module.exports=router;